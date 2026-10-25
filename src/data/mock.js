// Demo data from the KiGo Admin design. Replace with API calls once the shared database is ready.

export const APP_URL = (import.meta.env.VITE_APP_URL || 'http://localhost:5174').replace(/\/$/, '')
export const appLink = (route) => `${APP_URL}/#${route}`

export const ME = { i: 'AK', bg: '#FFE4D6', fg: '#9A3A12', name: 'Aziza K.', role: 'Moderator' }

export const NAV = [
  { to: '/', ic: '▦', label: 'Boshqaruv', end: true },
  { to: '/arizalar', ic: '✉', label: 'Arizalar', badge: 7 },
  { to: '/turnirlar', ic: '🏆', label: 'Turnirlar' },
  { to: '/landing', ic: '◧', label: 'Landing va ilova' },
  { to: '/klublar', ic: '⌂', label: 'Klublar va murabbiylar', badge: 2 },
  { to: '/foydalanuvchilar', ic: '☺', label: 'Foydalanuvchilar' },
  { to: '/tolovlar', ic: '₴', label: 'Bronlar va to‘lovlar' },
  { to: '/shikoyatlar', ic: '⚑', label: 'Shikoyatlar va sharhlar', badge: 3 },
  { to: '/homiylar', ic: '★', label: 'Homiylar' },
  { to: '/sozlamalar', ic: '⚙', label: 'Sozlamalar va rollar' },
]

// Status pills shared by several screens: [label, class]
export const STATUS = {
  new: ['Yangi', 's-new'],
  rev: ['Ko‘rib chiqilmoqda', 's-rev'],
  info: ['Ma’lumot so‘raldi', 's-info'],
  ok: ['Tasdiqlangan', 's-ok'],
  pub: ['E’lon qilingan', 's-pub'],
  no: ['Rad etilgan', 's-no'],
}

// ---------- Boshqaruv ----------

export const DASH = {
  periods: ['Bugun', '7 kun', '30 kun'],
  kpis: [
    [['Bronlar', '128', '+12% kechagidan', '#2C7A12', '/tolovlar'], ['Tushum', '18,4 mln', 'KiGo ulushi 0,3 mln', '#5A6B5E', '/tolovlar'], ['Yangi arizalar', '7', '2 tasi muddati o‘tgan', '#B4321C', '/arizalar'], ['Ochiq shikoyatlar', '3', '1 tasi shoshilinch', '#B4321C', '/shikoyatlar']],
    [['Bronlar', '842', '+8% o‘tgan haftadan', '#2C7A12', '/tolovlar'], ['Tushum', '121 mln', 'KiGo ulushi 1,9 mln', '#5A6B5E', '/tolovlar'], ['Yangi arizalar', '19', '12 tasi tasdiqlandi', '#5A6B5E', '/arizalar'], ['Faol foydalanuvchi', '6 240', '+410 yangi', '#2C7A12', '/foydalanuvchilar']],
    [['Bronlar', '3 510', '+21% o‘tgan oydan', '#2C7A12', '/tolovlar'], ['Tushum', '486 mln', 'KiGo ulushi 7,8 mln', '#5A6B5E', '/tolovlar'], ['Yangi arizalar', '64', 'o‘rtacha javob 9 soat', '#5A6B5E', '/arizalar'], ['Faol klublar', '[N]', 'to‘lov qilgan', '#5A6B5E', '/klublar']],
  ],
  bars: [[96, 118, 104, 131, 160, 142, 91], [96, 118, 104, 131, 160, 142, 91], [610, 702, 655, 820, 723, 0, 0]],
  barLabels: [['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'], ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'], ['1-h', '2-h', '3-h', '4-h', '5-h', '', '']],
  queue: [
    ['Chilonzor Padel Open', 'Turnir', 'Aziz T.', '31 soat', '#B4321C', 's-new', 'Yangi'],
    ['«Shox» bilyard klubi', 'Klub', 'Shoxrux A.', '26 soat', '#B4321C', 's-new', 'Yangi'],
    ['Yunusobod Chess Cup', 'Turnir', 'Malika R.', '5 soat', '#13241A', 's-info', 'Ma’lumot so‘raldi'],
    ['Suzish murabbiyi', 'Murabbiy', 'Dilnoza S.', '3 soat', '#13241A', 's-rev', 'Ko‘rib chiqilmoqda'],
    ['Padel Store', 'Homiy', 'Padel Store', '1 soat', '#13241A', 's-new', 'Yangi'],
  ],
  live: [['Bosh banner', '«Chilonzor Padel Open»'], ['Tanlangan turnirlar', '3 / 4 joy'], ['Tavsiya klublar', '6 ta'], ['Homiy logotiplari', '4 ta'], ['Do‘kon kutish ro‘yxati', 'yoqilgan']],
  feed: [
    ['AK', '#FFE4D6', 'Aziza K.', 'Yunusobod Chess Cup arizasidan ma’lumot so‘radi', '14:20'],
    ['BM', '#B9C8FF', 'Bekzod M.', 'bosh bannerni «Pirat Cup 2026» ga almashtirdi', '12:02'],
    ['NS', '#9EE6C8', 'Nodira S.', '2 ta pul qaytarishni tasdiqladi', '11:48'],
    ['AK', '#FFE4D6', 'Aziza K.', '«Tennis Park» klubini tasdiqladi', '10:15'],
    ['TZ', '#FFD58A', 'Tizim', '«Autumn 3x3» turnirini «Yakunlangan» qildi', '09:00'],
  ],
  quick: [['/arizalar', '✉ Yangi arizalarni ko‘rish'], ['/landing', '◧ Bosh bannerni almashtirish'], ['/turnirlar', '🏆 Turnirni tanlanganlarga qo‘shish'], ['/tolovlar', '₴ Pul qaytarish so‘rovlari (2)'], ['/shikoyatlar', '⚑ Ochiq shikoyatlar (3)']],
}

// ---------- Arizalar ----------

export const APP_TYPES = { turnir: 'Turnir', klub: 'Klub', murabbiy: 'Murabbiy', homiy: 'Homiy' }

export const APPLICATIONS = [
  { id: 'T-0142', t: 'turnir', name: 'Chilonzor Padel Open', sub: 'Padel · juftlik · 15–16 noy', who: 'Aziz Toshmatov', ini: 'AT', tg: '@aziz_t', phone: '+998 90 123 45 67', since: '2024-yildan · 41 bron · ★ 4.8', prev: '2 ta turnir o‘tkazgan, shikoyat yo‘q', age: '31 soat', late: true, st: 'new', when: '24-okt, 11:05',
    kv: [['Joy', 'Padel Club «Chilonzor»'], ['Sana', '15–16 noyabr, 10:00'], ['Format', 'Juftlik · guruh + pley-off'], ['Ishtirok', '8–16 juftlik'], ['Kirish', '200 000 so‘m · Click/Payme'], ['Sovrin', '3 mln + kubok · homiy Padel Store']], files: ['muqova.jpg', 'qoidalar.pdf'] },
  { id: 'T-0141', t: 'turnir', name: 'Yunusobod Chess Cup', sub: 'Shaxmat · yakka · 2 noy', who: 'Malika Rahimova', ini: 'MR', tg: '@malika_chess', phone: '+998 93 410 22 10', since: '2025-yildan · 6 bron', prev: 'Birinchi turnir', age: '5 soat', st: 'info', when: '24-okt, 09:40',
    kv: [['Joy', 'Boshqa joy: Yunusobod 4-kvartal, maktab zali'], ['Sana', '2 noyabr, 09:00'], ['Format', 'Shveytsariya tizimi, 7 tur'], ['Ishtirok', '24–48 kishi'], ['Kirish', 'Bepul'], ['Sovrin', 'Kubok va medallar']], files: ['nizom.docx'] },
  { id: 'T-0139', t: 'turnir', name: 'Pirat Cup 2026', sub: 'Bilyard · yakka · 12–14 noy', who: '«Pirat» klubi', ini: 'PR', tg: '@pirat_billiard', phone: '+998 71 200 10 10', since: 'KiGo Business mijozi', prev: '5 ta turnir', age: '—', st: 'pub', when: '18-okt',
    kv: [['Joy', '«Pirat», Chilonzor'], ['Sana', '12–14 noyabr'], ['Format', 'Guruh 8×8 + pley-off'], ['Ishtirok', '32 / 64'], ['Kirish', '50 000 so‘m'], ['Sovrin', '5 000 000 so‘m']], files: ['muqova.jpg'] },
  { id: 'T-0137', t: 'turnir', name: 'Street 3x3 Autumn', sub: 'Basketbol · jamoa · 9 noy', who: 'Jamshid Usmonov', ini: 'JU', tg: '@jamshid3x3', phone: '+998 97 777 03 03', since: '2025-yildan · 12 o‘yin', prev: '1 ta turnir', age: '2 soat', st: 'rev', when: '24-okt, 12:10',
    kv: [['Joy', 'Magic City maydoni'], ['Sana', '9 noyabr'], ['Format', '3x3, olimpiya tizimi'], ['Ishtirok', '12–24 jamoa'], ['Kirish', '150 000 so‘m jamoa'], ['Sovrin', '2 mln + forma']], files: [] },
  { id: 'T-0135', t: 'turnir', name: 'Night Run 10K', sub: 'Yugurish · 20 noy', who: 'RunTashkent', ini: 'RT', tg: '@runtashkent', phone: '+998 90 900 90 90', since: '2026-yildan', prev: '—', age: '—', st: 'no', when: '20-okt',
    kv: [['Joy', 'Yangi Toshkent bog‘i'], ['Sana', '20 noyabr, 21:00'], ['Ishtirok', '300 kishi'], ['Kirish', '120 000 so‘m']], files: ['marshrut.pdf'] },
  { id: 'K-051', t: 'klub', name: '«Shox» bilyard klubi', sub: 'Bilyard · 8 stol · Sergeli', who: 'Shoxrux Aliyev', ini: 'SA', tg: '@shox_club', phone: '+998 99 111 22 33', since: 'yangi', prev: '—', age: '26 soat', late: true, st: 'new', when: '23-okt, 10:30',
    kv: [['Manzil', 'Sergeli, Yangi Sergeli ko‘chasi 12'], ['Stollar', '8 ta: 6 rus, 2 pul'], ['Ish vaqti', '12:00–03:00'], ['Narx', '45 000 so‘m / soat'], ['Tarif', '300 000 so‘m/oy + 1–2%']], files: ['guvohnoma.pdf', 'rasmlar (12)'] },
  { id: 'K-050', t: 'klub', name: 'Tennis Park Yunusobod', sub: 'Tennis · 6 kort', who: 'Akmal N.', ini: 'AN', tg: '@tennispark', phone: '+998 90 555 66 77', since: 'yangi', prev: '—', age: '—', st: 'ok', when: '22-okt',
    kv: [['Manzil', 'Yunusobod 11'], ['Kortlar', '6 ta, 2 yopiq'], ['Tarif', '300 000 so‘m/oy + 1–2%']], files: ['guvohnoma.pdf'] },
  { id: 'K-049', t: 'klub', name: 'Arena FC mini-futbol', sub: 'Futbol · 2 maydon', who: 'Sanjar B.', ini: 'SB', tg: '@arenafc', phone: '+998 93 300 30 30', since: 'yangi', prev: '—', age: '8 soat', st: 'rev', when: '24-okt, 06:00',
    kv: [['Manzil', 'Mirzo Ulug‘bek'], ['Maydon', '2 ta, sun’iy o‘t'], ['Tarif', '300 000 so‘m/oy + 1–2%']], files: ['rasmlar (6)'] },
  { id: 'M-033', t: 'murabbiy', name: 'Dilnoza Sobirova', sub: 'Suzish · bolalar va kattalar', who: 'Dilnoza Sobirova', ini: 'DS', tg: '@dilnoza_swim', phone: '+998 94 123 00 11', since: '2025-yildan', prev: '—', age: '3 soat', st: 'rev', when: '24-okt, 11:20',
    kv: [['Sport', 'Suzish'], ['Tajriba', '8 yil, sport ustasi nomzodi'], ['Qayerda', '«Aqua» basseyni, Chilonzor'], ['Narx', '150 000 so‘m / dars'], ['Komissiya', '5% har bir darsdan']], files: ['sertifikat.pdf'] },
  { id: 'M-032', t: 'murabbiy', name: 'Timur Azimov', sub: 'Tennis · yakka darslar', who: 'Timur Azimov', ini: 'TA', tg: '@timur_tennis', phone: '+998 90 222 11 00', since: 'yangi', prev: '—', age: '1 soat', st: 'new', when: '24-okt, 13:30',
    kv: [['Sport', 'Tennis'], ['Tajriba', '5 yil'], ['Narx', '200 000 so‘m / dars'], ['Komissiya', '5% har bir darsdan']], files: ['diplom.jpg'] },
  { id: 'H-008', t: 'homiy', name: 'Padel Store', sub: 'Homiylik: Chilonzor Padel Open', who: 'Padel Store Tashkent', ini: 'PS', tg: '@padelstore', phone: '+998 71 250 50 50', since: 'yangi', prev: '—', age: '1 soat', st: 'new', when: '24-okt, 13:00',
    kv: [['Kompaniya', 'MChJ «Padel Store»'], ['Turnir', 'Chilonzor Padel Open'], ['Hissa', 'Sovrin raketkalar + 1 mln so‘m'], ['Paket', '[paket narxi belgilanmagan]']], files: ['logo.svg'] },
]

export const APP_CHECKS = {
  turnir: [['Tashkilotchi shaxsi', 'Telegram va telefon mos keldi · avtomatik'], ['Klub kortlarni berishga rozi', 'Klub KiGo’da: so‘rov yuborilgan'], ['Sana va joy bo‘sh', 'Klub jadvali bilan solishtirildi · avtomatik'], ['Sovrin fondi manbasi aniq', 'Homiy yoki tashkilotchi hisobidan'], ['To‘lov rekviziti tekshirildi', 'Karta egasi tashkilotchi bilan bir xil'], ['Tavsif, qoidalar, rasm to‘g‘ri', 'Haqoratli yoki chalg‘ituvchi gap yo‘q']],
  klub: [['Guvohnoma / STIR', 'Hujjat ilova qilingan'], ['Manzil va rasmlar', 'Xaritada nuqta to‘g‘ri'], ['Narxlar va ish vaqti', ''], ['Shartnoma imzolandi', 'Elektron imzo yoki qog‘oz'], ['Tarif va birinchi to‘lov', '300 000 so‘m/oy + 1–2%']],
  murabbiy: [['Shaxsi', 'Telegram va telefon'], ['Sertifikat yoki diplom', ''], ['Tajriba va mashg‘ulot joyi', ''], ['Narx va 5% shartiga rozilik', '']],
  homiy: [['Kompaniya ma’lumotlari', ''], ['Logotip sifati (SVG/PNG)', ''], ['Turnir tashkilotchisi rozi', ''], ['Homiylik to‘lovi', '[shart belgilanmagan]']],
}

// [key, label, hint, default on]; "list" is mandatory
export const APP_PLACES = {
  turnir: [['list', 'Turnirlar ro‘yxati', 'Ilova va saytda doim chiqadi', true], ['feat', 'Sayt: «Tanlangan turnirlar»', 'kigo.uz bosh sahifasidagi kartalar', false], ['banner', 'Ilova: bosh ekran banneri', 'Mini ilova bosh ekranining tepasida', false], ['chan', '@kigo_uz kanalga post', 'Avtomatik post: rasm, sana, ro‘yxat tugmasi', false], ['push', 'Shu sport o‘yinchilariga xabar', 'Padel o‘ynaydigan [N] foydalanuvchiga bot xabari', false]],
  klub: [['list', 'Qidiruv va xarita', 'Klub sahifasi ochiladi, bron qilish mumkin', true], ['feat', 'Sayt: «Tavsiya klublar»', 'kigo.uz bosh sahifasi', false], ['near', 'Ilova: «Yaqin atrofda» bloki', '', false], ['crm', 'KiGo Business CRM’ni ulash', 'Klub egasiga kirish havolasi boradi', true]],
  murabbiy: [['list', 'Murabbiylar ro‘yxati', 'Profil ochiladi, dars bron qilinadi', true], ['feat', 'Sayt: «Murabbiylar» bloki', '', false], ['club', 'Klub sahifasida ko‘rsatish', '«Aqua» basseyni sahifasi', false]],
  homiy: [['list', 'Turnir sahifasidagi homiylar', 'Chilonzor Padel Open', true], ['feat', 'Sayt: homiylar logotip qatori', '', false], ['banner', 'Ilova: bosh ekran banneri', '', false]],
}

export const FEATURED_SLOTS = [['1', 'Pirat Cup 2026'], ['2', 'Autumn 3x3'], ['3', 'bo‘sh'], ['4', 'bo‘sh']]
export const INFO_FIELDS = ['Turnir haqida', 'Joy va sana', 'Ishtirok va to‘lov', 'Sovrinlar', 'Muqova rasmi']
export const REJECT_REASONS = ['Sana band', 'Joy tasdiqlanmadi', 'Ma’lumot yetarli emas', 'Qoidalarga zid', 'Takroriy ariza']

// ---------- Turnirlar ----------

export const TOURNAMENTS = [
  { id: 'padel', name: 'Chilonzor Padel Open', sport: 'Padel · juftlik', org: 'Aziz T.', date: '15–16 noy', c: 2, m: 16, money: '400 000', st: 'pub' },
  { id: 'pirat', name: 'Pirat Cup 2026', sport: 'Bilyard · yakka', org: '«Pirat» klubi', date: '12–14 noy', c: 32, m: 64, money: '1,6 mln', st: 'pub' },
  { id: 'autumn', name: 'Autumn 3x3 League', sport: 'Basketbol · jamoa', org: 'Jamshid U.', date: '20 okt – 3 noy', c: 16, m: 16, money: '2,4 mln', st: 'run' },
  { id: 'chess', name: 'Yunusobod Chess Cup', sport: 'Shaxmat · yakka', org: 'Malika R.', date: '2 noy', c: 0, m: 48, money: '—', st: 'rev' },
  { id: 'futsal', name: 'Futsal Kubogi', sport: 'Futbol · jamoa', org: 'Arena FC', date: '1–5 okt', c: 12, m: 12, money: '3,6 mln', st: 'end' },
  { id: 'draft', name: 'Tennis Junior', sport: 'Tennis · yakka', org: 'Timur A.', date: '—', c: 0, m: 32, money: '—', st: 'draft' },
  { id: 'night', name: 'Night Run 10K', sport: 'Yugurish', org: 'RunTashkent', date: '20 noy', c: 0, m: 300, money: '—', st: 'stop' },
]

export const TOURNAMENT_STATUS = { draft: ['Qoralama', 's-gray'], rev: ['Tekshiruvda', 's-rev'], pub: ['E’lon qilingan', 's-pub'], run: ['Davom etmoqda', 's-new'], end: ['Yakunlangan', 's-gray'], stop: ['To‘xtatilgan', 's-no'] }

// ---------- Landing ----------

export const LANDING_SITE = [
  ['hero', 'Bosh banner (hero)', 'Sahifa tepasi: sarlavha, rasm, asosiy tugma', true],
  ['sport', 'Sport turlari', 'Bilyard, futbol, padel… tugmalari', true],
  ['tur', 'Tanlangan turnirlar', '4 ta karta · Turnirlar bo‘limidan', true],
  ['club', 'Tavsiya klublar', 'Reyting bo‘yicha yoki qo‘lda', true],
  ['coach', 'Murabbiylar', 'Tasdiqlangan murabbiylar', false],
  ['cta', '«O‘z turniringizni o‘tkazing»', 'Tashkilotchilar uchun ariza tugmasi', true],
  ['part', 'Hamkorlik', 'Klub, murabbiy, tashkilotchi, homiy', true],
  ['spons', 'Homiylar logotiplari', 'Tasdiqlangan homiylar', true],
  ['faq', 'Ko‘p so‘raladigan savollar', '6 ta savol', true],
  ['shop', 'Do‘kon (tez kunda)', 'Kutish ro‘yxatiga yozilish', false],
]

export const LANDING_APP = [
  ['hero', 'Bosh ekran banneri', '1 ta katta karta, eng tepada', true],
  ['quick', 'Tezkor tugmalar', 'Joy bron, sherik topish, turnirlar', true],
  ['near', 'Yaqin atrofda', 'Joylashuv bo‘yicha klublar', true],
  ['tur', 'Turnirlar karuseli', 'Tanlangan turnirlar bilan bir xil', true],
  ['games', 'Ochiq o‘yinlar', 'Sherik kerak o‘yinlar', true],
  ['shop', 'Do‘kon banneri', 'Tez kunda', false],
]

export const HERO_OPTIONS = [
  ['Chilonzor Padel Open', 'Turnir · 15–16 noyabr · ro‘yxat ochiq', 'Ro‘yxatdan o‘tish', 'Turnir sahifasi'],
  ['Pirat Cup 2026', 'Turnir · bilyard · 12–14 noyabr', 'Batafsil', 'Turnir sahifasi'],
  ['Sport o‘ynash endi oson', 'Umumiy: joy bron, sherik, turnir', 'Joy topish', 'Qidiruv sahifasi'],
]

export const LANDING_HELP = {
  hero: 'Yoqilgan bo‘lsa, sahifaning eng tepasida chiqadi. Tasdiqlangan turnirni yoki umumiy xabarni tanlaysiz.',
  tur: 'Bu yerga faqat «E’lon qilingan» turnirlar tushadi. Arizani tasdiqlashda «Saytda ko‘rsatish» yoqilsa, turnir shu ro‘yxatga o‘zi qo‘shiladi.',
  cta: 'Saytdagi «+ Turnir o‘tkazish» tugmasi. Bosilganda foydalanuvchi ariza to‘ldiradi, ariza admin paneldagi «Arizalar» bo‘limiga tushadi.',
  faq: 'Savollarni sudrab tartiblang. Ilovada «Yordam» bo‘limida ham chiqadi.',
  spons: 'Homiy arizasi tasdiqlangach shu yerga qo‘shish mumkin.',
  shop: 'Do‘kon tayyor bo‘lguncha «Tez kunda» bloki. O‘chirilsa, saytda umuman ko‘rinmaydi.',
}

export const FAQ = ['KiGo nima va qanday ishlaydi?', 'Bronni qanday bekor qilaman?', 'Turnir qanday o‘tkaziladi?', 'Klubimni qanday ulayman?']
export const SPONSORS = ['Padel Store', 'Sport Market', 'Hydro']
export const FEATURED_TOURNAMENTS = ['Pirat Cup 2026', 'Autumn 3x3 League', 'Chilonzor Padel Open']

// ---------- Klublar, murabbiylar, foydalanuvchilar ----------

// row: [initials, color, name, sub, col2, col3, col4, status, statusLabel, details]
export const DIRECTORY = {
  klub: { cols: ['Klub', 'Tarif', 'Keyingi to‘lov', 'Bron / oy', 'Holat'], count: 4, rows: [
    ['PR', '#FFD58A', '«Pirat»', 'Bilyard · Chilonzor · 12 stol', '300 000 + 1%', '1-noyabr', '412', 'ok', 'To‘langan', [['Egasi', 'Rustam M. · @pirat_billiard'], ['Komissiya', '1% (yillik shartnoma)'], ['CRM', 'Ulangan · 3 xodim'], ['Reyting', '★ 4.8 · 214 sharh'], ['Shu oy tushum', '38 mln so‘m · KiGo ulushi 380 000']]],
    ['TP', '#9EE6C8', 'Tennis Park', 'Tennis · Yunusobod · 6 kort', '300 000 + 2%', '22-noyabr', '96', 'trial', 'Sinov', [['Egasi', 'Akmal N.'], ['Komissiya', '2%'], ['CRM', 'Ulanmagan'], ['Reyting', '★ 4.6 · 18 sharh'], ['Sinov', '[sinov muddati] tugaydi']]],
    ['AF', '#B9C8FF', 'Arena FC', 'Futbol · M. Ulug‘bek · 2 maydon', '300 000 + 2%', '5-oktabr', '133', 'debt', 'Qarzdor', [['Egasi', 'Sanjar B.'], ['Qarz', '300 000 so‘m · 19 kun'], ['CRM', 'Ulangan'], ['Reyting', '★ 4.4'], ['Eslatma', 'Bot 3 marta eslatdi']]],
    ['CC', '#FFB59A', 'Cyber Zone', 'Kompyuter klubi · 40 PK', '300 000 + 1%', '14-noyabr', '688', 'ok', 'To‘langan', [['Egasi', 'Ibrohim Q.'], ['Komissiya', '1%'], ['CRM', 'Ulangan'], ['Reyting', '★ 4.7'], ['Shu oy tushum', '52 mln so‘m']]],
  ], toggles: [['Saytda «Tavsiya klublar»', 'kigo.uz bosh sahifasi'], ['Ilovada «Yaqin atrofda»', 'joylashuv bo‘yicha'], ['Bron qabul qilish', 'o‘chirilsa sahifa ko‘rinadi, bron yopiladi']], route: '/club/pirat',
  filters: [['all', 'Hammasi'], ['ok', 'To‘langan'], ['trial', 'Sinov'], ['debt', 'Qarzdor']] },
  murabbiy: { cols: ['Murabbiy', 'Sport', 'Dars narxi', 'Dars / oy', 'Holat'], count: 3, rows: [
    ['DS', '#9EE6C8', 'Dilnoza Sobirova', '«Aqua» basseyni', 'Suzish', '150 000', '64', 'ok', 'Faol', [['Telegram', '@dilnoza_swim'], ['Komissiya', '5% har bir darsdan'], ['Shu oy', '9,6 mln · KiGo ulushi 480 000'], ['Reyting', '★ 4.9 · 41 sharh'], ['Sertifikat', 'tekshirilgan']]],
    ['TA', '#FFD58A', 'Timur Azimov', 'Tennis Park', 'Tennis', '200 000', '—', 'rev', 'Tekshiruvda', [['Telegram', '@timur_tennis'], ['Komissiya', '5%'], ['Ariza', 'M-032'], ['Reyting', '—'], ['Sertifikat', 'kutilmoqda']]],
    ['OK', '#B9C8FF', 'Otabek Karimov', 'Arena FC', 'Futbol', '120 000', '22', 'ok', 'Faol', [['Telegram', '@otabek_coach'], ['Komissiya', '5%'], ['Shu oy', '2,6 mln'], ['Reyting', '★ 4.5'], ['Sertifikat', 'tekshirilgan']]],
  ], toggles: [['Saytda «Murabbiylar»', ''], ['Klub sahifasida ko‘rsatish', ''], ['Dars bron qilish', '']], route: '/club/aqua',
  filters: [['all', 'Hammasi'], ['ok', 'Faol'], ['rev', 'Tekshiruvda']] },
  foyd: { cols: ['Foydalanuvchi', 'Shahar', 'Bronlar', 'Ro‘yxatdan', 'Holat'], count: '6 240', rows: [
    ['AT', '#FFD58A', 'Aziz Toshmatov', '@aziz_t · tashkilotchi', 'Toshkent', '41', '2024', 'ok', 'Faol', [['Telefon', '+998 90 123 45 67'], ['Rollar', 'O‘yinchi, tashkilotchi'], ['Reyting', '★ 4.8'], ['Kelmay qolish', '0'], ['Turnirlar', '2 o‘tkazgan, 6 qatnashgan']]],
    ['BO', '#FFB59A', 'Bobur Olimov', '@bobur_o', 'Toshkent', '18', '2025', 'ok', 'Faol', [['Telefon', '+998 93 ••• •• 12'], ['Rollar', 'O‘yinchi'], ['Reyting', '★ 4.6'], ['Kelmay qolish', '1'], ['Turnirlar', '3 qatnashgan']]],
    ['XX', '#ECEFE9', 'Sardor X.', '@sard0r_x', 'Samarqand', '3', '2026', 'warn', 'Ogohlantirilgan', [['Telefon', '+998 97 ••• •• 40'], ['Rollar', 'O‘yinchi'], ['Shikoyat', '2 ta: haqorat'], ['Kelmay qolish', '3'], ['Choralar', '1 ogohlantirish']]],
  ], toggles: [['Bron qila oladi', ''], ['Turnir ariza bera oladi', ''], ['Chat va sharh yoza oladi', '']], route: '/profile',
  filters: [['all', 'Hammasi'], ['ok', 'Faol'], ['warn', 'Ogohlantirilgan']] },
}

export const DIRECTORY_STATUS = { ok: 's-ok', trial: 's-new', debt: 's-no', rev: 's-rev', warn: 's-info' }

// ---------- To‘lovlar ----------

// [id, who, what, when, where, sum, fee, method, status, kind]
export const PAYMENTS = [
  ['B-88412', 'Bobur O.', 'Stol 3 · 2 soat', 'bugun 19:00', '«Pirat»', '90 000', '900', 'Click', 'paid', 'bron'],
  ['T-0142-03', 'Bobur O. + Sardor N.', 'Turnir kirishi', 'Chilonzor Padel Open', 'tashkilotchi', '200 000', '[%]', 'Payme', 'paid', 'turnir'],
  ['B-88407', 'Jasur K.', 'Kort 2 · 1 soat', 'bugun 18:00', 'Tennis Park', '120 000', '2 400', 'Payme', 'refreq', 'bron'],
  ['L-2210', 'Madina A.', 'Suzish darsi', 'ertaga 09:00', 'Dilnoza S.', '150 000', '7 500', 'Click', 'paid', 'dars'],
  ['B-88390', 'Timur A.', 'PK 12 · 3 soat', 'kecha', 'Cyber Zone', '45 000', '450', 'Click', 'refunded', 'bron'],
  ['S-0310', '«Pirat» klubi', 'Oylik tarif', 'oktabr', 'KiGo', '300 000', '300 000', 'Bank', 'paid', 'obuna'],
  ['B-88377', 'Aziz T.', 'Maydon · 1,5 soat', 'kecha', 'Arena FC', '210 000', '4 200', 'Payme', 'refreq', 'bron'],
]

export const PAYMENT_STATUS = { paid: ['To‘langan', 's-ok'], refreq: ['Qaytarish so‘raldi', 's-info'], refunded: ['Qaytarildi', 's-gray'], denied: ['Qaytarish rad etildi', 's-no'] }

// ---------- Shikoyatlar va sharhlar ----------

// [title, sub, priority, priorityClass, when, kv, text, files, reply, actions]
export const COMPLAINTS = [
  ['Klub bron qilingan stolni bermadi', 'Jasur K. → «Pirat»', 'Shoshilinch', 's-no', '35 daqiqa oldin', [['Bron', 'B-88407 · 120 000 so‘m'], ['Kimdan', 'Jasur K. · @jasur_k'], ['Kimga', '«Pirat» klubi'], ['Avvalgi', 'bu klubga 0 shikoyat']], 'Keldim, stol boshqa odamga berilgan ekan. Pul qaytarilmadi, administrator «tizimda ko‘rinmayapti» dedi.', ['chek.jpg'], 'Pul to‘liq qaytariladi. Klubga ogohlantirish berildi.', ['Pulni qaytarish', 'Klubga ogohlantirish', 'Klub bilan bog‘lanish', 'Asossiz']],
  ['O‘yinchi chatda haqorat qildi', 'Bobur O. → Sardor X.', 'O‘rta', 's-rev', '3 soat oldin', [['O‘yin', 'Padel · 23-okt'], ['Kimdan', 'Bobur O.'], ['Kimga', 'Sardor X.'], ['Avvalgi', '2 ta shikoyat']], 'O‘yin chatida so‘kindi va keyingi o‘yinga kelmadi.', ['skrinshot.png'], 'Foydalanuvchiga ogohlantirish berildi. Takrorlansa 30 kunga bloklanadi.', ['Ogohlantirish', '7 kunga bloklash', 'Butunlay bloklash', 'Asossiz']],
  ['Turnir sovrini berilmadi', 'Rustam M. → Futsal Kubogi', 'O‘rta', 's-rev', 'kecha', [['Turnir', 'Futsal Kubogi · yakunlangan'], ['Kimdan', 'Rustam M.'], ['Kimga', 'Arena FC (tashkilotchi)'], ['Avvalgi', '0']], '2-o‘rin sovrini va’da qilingan edi, 1 haftadan beri javob yo‘q.', [], 'Tashkilotchi bilan bog‘lanildi, 3 kun ichida beriladi.', ['Tashkilotchiga yozish', 'Payout to‘xtatish', 'Tashkilotchini cheklash', 'Asossiz']],
]

export const REVIEWS = [
  ['★ 1 · «Eng yomon klub, ...»', 'Cyber Zone sahifasida', 'Avto-filtr', 's-info', '1 soat oldin', [['Kim', 'Anvar T.'], ['Bron', 'bor, 21-okt'], ['Filtr', 'so‘kinish topildi'], ['Klub javobi', 'yo‘q']], 'Eng yomon klub, kompyuterlar qotadi, ...', [], '', ['Ko‘rsatish', 'So‘zlarni yashirib ko‘rsatish', 'O‘chirish']],
  ['★ 5 · «Zo‘r joy, stollar yangi»', '«Pirat» sahifasida', 'Tekshiruv', 's-rev', '2 soat oldin', [['Kim', 'Aziz T.'], ['Bron', 'bor, 23-okt'], ['Filtr', 'toza'], ['Klub javobi', 'yo‘q']], 'Zo‘r joy, stollar yangi, bar ham yaxshi.', [], '', ['Ko‘rsatish', 'O‘chirish']],
  ['★ 2 · «Murabbiy kechikdi»', 'Otabek K. profilida', 'Klub e’tirozi', 's-no', 'kecha', [['Kim', 'Laylo M.'], ['Dars', 'bor, 22-okt'], ['E’tiroz', 'murabbiy: «mijoz kechikdi»'], ['Klub javobi', 'bor']], 'Murabbiy 20 daqiqa kechikdi, dars qisqardi.', [], '', ['Ko‘rsatish', 'O‘chirish', 'Ikkala tomondan dalil so‘rash']],
]

// ---------- Sozlamalar ----------

export const ROLES = ['Super admin', 'Moderator', 'Kontent menejer', 'Moliya']
export const STAFF = [['BM', '#B9C8FF', 'Bekzod M.', '@bekzod_kigo'], ['AK', '#FFE4D6', 'Aziza K.', '@aziza_mod'], ['JT', '#9EE6C8', 'Javohir T.', '@javohir_content'], ['NS', '#FFD58A', 'Nodira S.', '@nodira_fin'], ['UR', '#ECEFE9', 'Umid R.', '@umid_mod']]
export const STAFF_ROLES = [0, 1, 2, 3, 1]
export const PERMISSIONS = ['Arizalarni ko‘rish', 'Arizani tasdiqlash / rad etish', 'Landing va ilova kontentini tahrirlash', 'Pul qaytarish va payout', 'Shikoyat va sharhlarni hal qilish', 'Tarif va komissiyani o‘zgartirish', 'Foydalanuvchi va klubni bloklash', 'Jamoa va rollarni boshqarish']
export const PERMISSION_MATRIX = [[1, 1, 1, 1], [1, 1, 0, 0], [1, 0, 1, 0], [1, 0, 0, 1], [1, 1, 0, 0], [1, 0, 0, 1], [1, 1, 0, 0], [1, 0, 0, 0]]
export const RULES = [['Yangi arizada adminlarga Telegram xabar', 'har bir yangi ariza bo‘yicha'], ['24 soatda ko‘rilmasa ogohlantirish', 'bosh adminga boradi'], ['Klub KiGo’da bo‘lsa, roziligini avtomatik so‘rash', 'turnir arizalari uchun'], ['Ishonchli tashkilotchini avtomatik tasdiqlash', '3+ turnir, shikoyatsiz'], ['Bron 2 soatdan oldin bekor qilinsa avtomatik qaytarish', '100% pul qaytadi'], ['Sharhlarda so‘kinishni avtomatik filtrlash', 'moderatsiyaga tushadi']]
export const RULES_ON = [1, 1, 1, 0, 1, 1]
