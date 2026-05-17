import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";

// Initialize Database
const db = new Database("socialflow.db");

// Seed Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    plan_id TEXT,
    status TEXT,
    billing_cycle TEXT,
    current_period_end DATETIME,
    trial_start DATETIME,
    trial_end DATETIME,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS billing_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    invoice_number TEXT,
    amount TEXT,
    status TEXT,
    date DATETIME,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Create a default user if not exists
const userExists = db.prepare("SELECT * FROM users WHERE email = ?").get("pujirahmadani27@gmail.com");
if (!userExists) {
  const insertUser = db.prepare("INSERT INTO users (email, name) VALUES (?, ?)");
  const info = insertUser.run("pujirahmadani27@gmail.com", "Puji Rahmadani");
  const userId = info.lastInsertRowid;

  // Initial Free Trial Subscription
  const now = new Date();
  const trialEnd = new Date();
  trialEnd.setDate(now.getDate() + 14);

  db.prepare(`
    INSERT INTO subscriptions (user_id, plan_id, status, billing_cycle, current_period_end, trial_start, trial_end)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(userId, "pro", "trialing", "monthly", trialEnd.toISOString(), now.toISOString(), trialEnd.toISOString());

  // Initial Invoice
  db.prepare(`
    INSERT INTO billing_history (user_id, invoice_number, amount, status, date)
    VALUES (?, ?, ?, ?, ?)
  `).run(userId, "INV-2024-001", "$0.00", "Paid", now.toISOString());
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/user-details", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get("pujirahmadani27@gmail.com") as any;
    const subscription = db.prepare("SELECT * FROM subscriptions WHERE user_id = ?").get(user.id);
    const history = db.prepare("SELECT * FROM billing_history WHERE user_id = ? ORDER BY date DESC").all(user.id);

    res.json({
      user,
      subscription,
      history
    });
  });

  app.post("/api/subscribe", (req, res) => {
    const { planId, billingCycle } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get("pujirahmadani27@gmail.com") as any;
    
    const amount = planId === 'pro' ? (billingCycle === 'yearly' ? '$8' : '$10') : (billingCycle === 'yearly' ? '$18' : '$22');
    const invoiceNum = `INV-2024-00${Math.floor(Math.random() * 900) + 100}`;
    const now = new Date();
    const periodEnd = new Date();
    if (billingCycle === 'yearly') {
      periodEnd.setFullYear(now.getFullYear() + 1);
    } else {
      periodEnd.setMonth(now.getMonth() + 1);
    }

    try {
      db.transaction(() => {
        // Update subscription
        db.prepare(`
          UPDATE subscriptions 
          SET plan_id = ?, status = ?, billing_cycle = ?, current_period_end = ?, trial_end = NULL
          WHERE user_id = ?
        `).run(planId, "active", billingCycle, periodEnd.toISOString(), user.id);

        // Add billing history
        db.prepare(`
          INSERT INTO billing_history (user_id, invoice_number, amount, status, date)
          VALUES (?, ?, ?, ?, ?)
        `).run(user.id, invoiceNum, amount, "Paid", now.toISOString());
      })();

      res.json({ success: true, message: `Successfully subscribed to ${planId}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Subscription failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
