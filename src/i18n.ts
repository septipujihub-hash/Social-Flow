import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  id: {
    translation: {
      "dashboard": "Dasbor",
      "calendar": "Kalender",
      "planner": "Perencana",
      "idea_board": "Papan Ide",
      "posts": "Kelola Konten",
      "analytics": "Analitik",
      "team": "Kolaborasi Tim",
      "settings": "Pengaturan",
      "search": "Cari konten...",
      "upcoming_posts": "Konten Mendatang",
      "recent_ideas": "Ide Terbaru",
      "status_draft": "Draf",
      "status_scheduled": "Dijadwalkan",
      "status_published": "Diterbitkan",
      "platform": "Platform",
      "campaign": "Kampanye",
      "quick_action": "Aksi Cepat",
      "create_post": "Buat Konten",
      "add_idea": "Tambah Ide",
      "language": "Bahasa",
      "logout": "Keluar",
      "total_content": "Total Konten",
      "growth": "Pertumbuhan",
      "welcome_back": "Selamat datang kembali,",
      "overview": "Ikhtisar Performa",
      "platform_dist": "Distribusi Platform",
      "new_post": "Konten Baru",
      "save": "Simpan",
      "cancel": "Batal"
    }
  },
  en: {
    translation: {
      "dashboard": "Dashboard",
      "calendar": "Calendar",
      "planner": "Planner",
      "idea_board": "Idea Board",
      "posts": "Post Management",
      "analytics": "Analytics",
      "team": "Team Collaboration",
      "settings": "Settings",
      "search": "Search content...",
      "upcoming_posts": "Upcoming Posts",
      "recent_ideas": "Recent Ideas",
      "status_draft": "Draft",
      "status_scheduled": "Scheduled",
      "status_published": "Published",
      "platform": "Platform",
      "campaign": "Campaign",
      "quick_action": "Quick Action",
      "create_post": "Create Content",
      "add_idea": "Add Idea",
      "language": "Language",
      "logout": "Logout",
      "total_content": "Total Content",
      "growth": "Growth",
      "welcome_back": "Welcome back,",
      "overview": "Performance Overview",
      "platform_dist": "Platform Distribution",
      "new_post": "New Post",
      "save": "Save",
      "cancel": "Cancel"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
