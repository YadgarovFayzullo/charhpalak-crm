// UI constants. All data comes from the KiGo backend (src/api.js).

export const APP_URL = (import.meta.env.VITE_APP_URL || 'http://localhost:5174').replace(/\/$/, '')
export const appLink = (route) => `${APP_URL}/#${route}`

export const NAV = [
  { to: '/', ic: '▦', label: 'Boshqaruv', end: true },
  { to: '/arizalar', ic: '✉', label: 'Arizalar', badge: 'requests' },
  { to: '/turnirlar', ic: '🏆', label: 'Turnirlar' },
  { to: '/landing', ic: '◧', label: 'Landing va ilova' },
  { to: '/klublar', ic: '⌂', label: 'Klublar va murabbiylar', badge: 'clubs' },
  { to: '/foydalanuvchilar', ic: '☺', label: 'Foydalanuvchilar' },
  { to: '/tolovlar', ic: '₴', label: 'Bronlar va to‘lovlar' },
  { to: '/shikoyatlar', ic: '⚑', label: 'Shikoyatlar va sharhlar', badge: 'complaints' },
  { to: '/homiylar', ic: '★', label: 'Homiylar' },
  { to: '/sozlamalar', ic: '⚙', label: 'Sozlamalar va rollar' },
]

// Status pills: [label, class]
export const STATUS = {
  new: ['Yangi', 's-new'],
  rev: ['Ko‘rib chiqilmoqda', 's-rev'],
  info: ['Ma’lumot so‘raldi', 's-info'],
  ok: ['Tasdiqlangan', 's-ok'],
  pub: ['E’lon qilingan', 's-pub'],
  no: ['Rad etilgan', 's-no'],
}

export const TOURNAMENT_STATUS = { draft: ['Qoralama', 's-gray'], rev: ['Tekshiruvda', 's-rev'], pub: ['E’lon qilingan', 's-pub'], run: ['Davom etmoqda', 's-new'], end: ['Yakunlangan', 's-gray'], stop: ['To‘xtatilgan', 's-no'] }

export const PAYMENT_STATUS = {
  paid: ['To‘langan', 's-ok'], pending: ['To‘lov kutilmoqda', 's-rev'], refreq: ['Qaytarish so‘raldi', 's-info'],
  refunded: ['Qaytarildi', 's-gray'], denied: ['Qaytarish rad etildi', 's-no'], cancelled: ['Bekor qilindi', 's-gray'],
}

export const DIRECTORY_STATUS = { ok: 's-ok', trial: 's-new', debt: 's-no', rev: 's-rev', warn: 's-info', blocked: 's-no' }

export const DIRECTORY = {
  klub: { cols: ['Klub', 'Tarif', 'Keyingi to‘lov', 'Bron / oy', 'Holat'], toggles: [['Saytda «Tavsiya klublar»', 'kigo.uz bosh sahifasi'], ['Ilovada «Yaqin atrofda»', 'joylashuv bo‘yicha'], ['Bron qabul qilish', 'o‘chirilsa sahifa ko‘rinadi, bron yopiladi']],
    filters: [['all', 'Hammasi'], ['ok', 'To‘langan'], ['trial', 'Sinov'], ['debt', 'Qarzdor']] },
  murabbiy: { cols: ['Murabbiy', 'Sport', 'Dars narxi', 'Dars / oy', 'Holat'], toggles: [['Saytda «Murabbiylar»', ''], ['Klub sahifasida ko‘rsatish', ''], ['Dars bron qilish', '']],
    filters: [['all', 'Hammasi'], ['ok', 'Faol'], ['rev', 'Tekshiruvda']] },
  foyd: { cols: ['Foydalanuvchi', 'Shahar', 'Bronlar', 'Ro‘yxatdan', 'Holat'], toggles: [['Bron qila oladi', ''], ['Turnir ariza bera oladi', ''], ['Chat va sharh yoza oladi', '']],
    filters: [['all', 'Hammasi'], ['ok', 'Faol'], ['warn', 'Ogohlantirilgan']] },
}

export const INFO_FIELDS = ['Turnir haqida', 'Joy va sana', 'Ishtirok va to‘lov', 'Sovrinlar', 'Muqova rasmi']
export const REJECT_REASONS = ['Sana band', 'Joy tasdiqlanmadi', 'Ma’lumot yetarli emas', 'Qoidalarga zid', 'Takroriy ariza']
export const DEADLINES = ['24 soat', '72 soat', '7 kun']

export const LANDING_HELP = {
  hero: 'Yoqilgan bo‘lsa, sahifaning eng tepasida chiqadi. Tasdiqlangan turnirni yoki umumiy xabarni tanlaysiz.',
  tur: 'Bu yerga faqat «E’lon qilingan» turnirlar tushadi. Arizani tasdiqlashda «Saytda ko‘rsatish» yoqilsa, turnir shu ro‘yxatga o‘zi qo‘shiladi.',
  cta: 'Saytdagi «+ Turnir o‘tkazish» tugmasi. Bosilganda foydalanuvchi ariza to‘ldiradi, ariza admin paneldagi «Arizalar» bo‘limiga tushadi.',
  faq: 'Savollarni sudrab tartiblang. Ilovada «Yordam» bo‘limida ham chiqadi.',
  spons: 'Homiy arizasi tasdiqlangach shu yerga qo‘shish mumkin.',
  shop: 'Do‘kon tayyor bo‘lguncha «Tez kunda» bloki. O‘chirilsa, saytda umuman ko‘rinmaydi.',
}
export const FAQ = ['KiGo nima va qanday ishlaydi?', 'Bronni qanday bekor qilaman?', 'Turnir qanday o‘tkaziladi?', 'Klubimni qanday ulayman?']
export const GENERAL_HERO = { id: 'general', title: 'Sport o‘ynash endi oson', sub: 'Umumiy: joy bron, sherik, turnir', btn: 'Joy topish', link: 'Qidiruv sahifasi' }
