/**
 * ═══════════════════════════════════════════════════════════════════
 *  🌉 SAZ Bridge v0.0.7 — Windows XP Edition
 *  Cloudflare Worker Subscription Manager
 *  ─────────────────────────────────────────────────────────────────
 *  Developer : THE SAZ
 *  GitHub    : https://github.com/THE-SAZ
 *  License   : MIT
 *  Languages : fa / en / ru / zh
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Required Binding : SUB_KV
 *  Optional Env     : SUB_PATH (default: "sub")
 *
 *  No Secrets required — everything configured via Setup Wizard.
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

const VERSION = '0.0.7';
const APP_NAME = 'SAZ Bridge';
const DEV_NAME = 'THE SAZ';
const DEV_GITHUB = 'https://github.com/THE-SAZ';
const DEV_AVATAR = 'https://github.com/THE-SAZ.png';
const SESSION_TTL = 86400;

// ─────────────────────────────────────────────────────────────────
//  I18N — 4 Languages
// ─────────────────────────────────────────────────────────────────
const I18N = {
  fa: {
    dir: 'rtl',
    app_name: 'پل ساز',
    app_tagline: 'مدیریت ساب‌لینک حرفه‌ای',
    login: 'ورود',
    logout: 'خروج',
    password: 'رمز عبور',
    password_ph: '••••••••',
    enter: 'ورود به پنل',
    wrong_password: 'رمز عبور اشتباه است',
    setup_title: 'راه‌اندازی اولیه',
    setup_welcome: 'به SAZ Bridge خوش آمدید',
    setup_desc: 'لطفاً تنظیمات اولیه را انجام دهید',
    setup_password: 'رمز عبور مدیر',
    setup_subpath: 'مسیر ساب‌لینک',
    setup_lang: 'زبان پیش‌فرض',
    setup_theme: 'تم',
    setup_bot: 'توکن ربات تلگرام (اختیاری)',
    setup_submit: 'راه‌اندازی',
    nav_home: 'خانه',
    nav_users: 'کاربران',
    nav_subs: 'ساب‌منیجر',
    nav_groups: 'گروه‌ها',
    nav_bot: 'ربات',
    nav_stats: 'آمار',
    nav_backup: 'پشتیبان',
    nav_settings: 'تنظیمات',
    total_users: 'کل کاربران',
    active_users: 'فعال',
    expired_users: 'منقضی',
    total_traffic: 'مصرف کل',
    total_subs: 'ساب‌لینک‌ها',
    add_user: 'کاربر جدید',
    edit_user: 'ویرایش کاربر',
    add_sub: 'ساب جدید',
    edit_sub: 'ویرایش ساب',
    add_group: 'گروه جدید',
    name: 'نام',
    quota: 'حجم (GB)',
    days: 'مدت (روز)',
    group: 'گروه',
    links: 'لینک‌ها',
    telegram: 'تلگرام',
    status: 'وضعیت',
    usage: 'مصرف',
    expiry: 'انقضا',
    actions: 'عملیات',
    active: 'فعال',
    disabled: 'غیرفعال',
    expired: 'منقضی',
    unlimited: 'نامحدود',
    save: 'ذخیره',
    cancel: 'انصراف',
    delete: 'حذف',
    edit: 'ویرایش',
    copy: 'کپی',
    close: 'بستن',
    search: 'جستجو...',
    no_data: 'داده‌ای وجود ندارد',
    confirm_delete: 'مطمئن هستید؟',
    saved_ok: 'با موفقیت ذخیره شد',
    deleted_ok: 'با موفقیت حذف شد',
    error_occurred: 'خطایی رخ داد',
    bot_token: 'توکن ربات',
    set_webhook: 'اتصال ربات',
    unset_webhook: 'قطع اتصال',
    bot_connected: 'ربات متصل است',
    theme_luna: 'Luna Blue',
    theme_classic: 'Classic',
    theme_silver: 'Luna Silver',
    backup_export: 'دانلود پشتیبان',
    backup_import: 'بازیابی پشتیبان',
    total_visits: 'کل بازدیدها',
    sources: 'منابع',
    direct_links: 'لینک‌های مستقیم',
    prefix: 'پیشوند نام',
    qr_code: 'کد QR',
    sub_url: 'آدرس ساب‌لینک',
    days_left: 'روز باقی‌مانده',
    created_at: 'تاریخ ساخت',
    ready: 'آماده',
    connected: 'متصل',
    dev_credit: 'ساخته شده با ❤️ توسط',
    welcome: 'خوش آمدید',
    good_day: 'روز خوبی داشته باشید',
  },
  en: {
    dir: 'ltr',
    app_name: 'SAZ Bridge',
    app_tagline: 'Professional Subscription Manager',
    login: 'Login',
    logout: 'Logout',
    password: 'Password',
    password_ph: '••••••••',
    enter: 'Enter Panel',
    wrong_password: 'Wrong password',
    setup_title: 'Setup Wizard',
    setup_welcome: 'Welcome to SAZ Bridge',
    setup_desc: 'Please configure initial settings',
    setup_password: 'Admin Password',
    setup_subpath: 'Subscription Path',
    setup_lang: 'Default Language',
    setup_theme: 'Theme',
    setup_bot: 'Telegram Bot Token (optional)',
    setup_submit: 'Setup',
    nav_home: 'Home',
    nav_users: 'Users',
    nav_subs: 'Sub Manager',
    nav_groups: 'Groups',
    nav_bot: 'Bot',
    nav_stats: 'Stats',
    nav_backup: 'Backup',
    nav_settings: 'Settings',
    total_users: 'Total Users',
    active_users: 'Active',
    expired_users: 'Expired',
    total_traffic: 'Total Traffic',
    total_subs: 'Subscriptions',
    add_user: 'New User',
    edit_user: 'Edit User',
    add_sub: 'New Sub',
    edit_sub: 'Edit Sub',
    add_group: 'New Group',
    name: 'Name',
    quota: 'Quota (GB)',
    days: 'Days',
    group: 'Group',
    links: 'Links',
    telegram: 'Telegram',
    status: 'Status',
    usage: 'Usage',
    expiry: 'Expiry',
    actions: 'Actions',
    active: 'Active',
    disabled: 'Disabled',
    expired: 'Expired',
    unlimited: 'Unlimited',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    copy: 'Copy',
    close: 'Close',
    search: 'Search...',
    no_data: 'No data',
    confirm_delete: 'Are you sure?',
    saved_ok: 'Saved successfully',
    deleted_ok: 'Deleted successfully',
    error_occurred: 'An error occurred',
    bot_token: 'Bot Token',
    set_webhook: 'Connect Bot',
    unset_webhook: 'Disconnect',
    bot_connected: 'Bot connected',
    theme_luna: 'Luna Blue',
    theme_classic: 'Classic',
    theme_silver: 'Luna Silver',
    backup_export: 'Export Backup',
    backup_import: 'Import Backup',
    total_visits: 'Total Visits',
    sources: 'Sources',
    direct_links: 'Direct Links',
    prefix: 'Name Prefix',
    qr_code: 'QR Code',
    sub_url: 'Sub URL',
    days_left: 'days left',
    created_at: 'Created',
    ready: 'Ready',
    connected: 'Connected',
    dev_credit: 'Built with ❤️ by',
    welcome: 'Welcome',
    good_day: 'Have a nice day',
  },
  ru: {
    dir: 'ltr',
    app_name: 'SAZ Bridge',
    app_tagline: 'Профессиональный менеджер подписок',
    login: 'Вход',
    logout: 'Выход',
    password: 'Пароль',
    password_ph: '••••••••',
    enter: 'Войти в панель',
    wrong_password: 'Неверный пароль',
    setup_title: 'Мастер настройки',
    setup_welcome: 'Добро пожаловать в SAZ Bridge',
    setup_desc: 'Пожалуйста, настройте основные параметры',
    setup_password: 'Пароль администратора',
    setup_subpath: 'Путь подписки',
    setup_lang: 'Язык по умолчанию',
    setup_theme: 'Тема',
    setup_bot: 'Токен Telegram бота (необязательно)',
    setup_submit: 'Настроить',
    nav_home: 'Главная',
    nav_users: 'Пользователи',
    nav_subs: 'Подписки',
    nav_groups: 'Группы',
    nav_bot: 'Бот',
    nav_stats: 'Статистика',
    nav_backup: 'Резервная копия',
    nav_settings: 'Настройки',
    total_users: 'Всего пользователей',
    active_users: 'Активные',
    expired_users: 'Истёкшие',
    total_traffic: 'Общий трафик',
    total_subs: 'Подписки',
    add_user: 'Новый пользователь',
    edit_user: 'Редактировать',
    add_sub: 'Новая подписка',
    edit_sub: 'Редактировать подписку',
    add_group: 'Новая группа',
    name: 'Имя',
    quota: 'Объём (ГБ)',
    days: 'Дней',
    group: 'Группа',
    links: 'Ссылки',
    telegram: 'Telegram',
    status: 'Статус',
    usage: 'Использовано',
    expiry: 'Истекает',
    actions: 'Действия',
    active: 'Активен',
    disabled: 'Отключён',
    expired: 'Истёк',
    unlimited: 'Безлимит',
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Изменить',
    copy: 'Копировать',
    close: 'Закрыть',
    search: 'Поиск...',
    no_data: 'Нет данных',
    confirm_delete: 'Вы уверены?',
    saved_ok: 'Успешно сохранено',
    deleted_ok: 'Успешно удалено',
    error_occurred: 'Произошла ошибка',
    bot_token: 'Токен бота',
    set_webhook: 'Подключить бота',
    unset_webhook: 'Отключить',
    bot_connected: 'Бот подключён',
    theme_luna: 'Luna Blue',
    theme_classic: 'Классическая',
    theme_silver: 'Luna Silver',
    backup_export: 'Экспорт резервной копии',
    backup_import: 'Импорт резервной копии',
    total_visits: 'Всего посещений',
    sources: 'Источники',
    direct_links: 'Прямые ссылки',
    prefix: 'Префикс',
    qr_code: 'QR-код',
    sub_url: 'URL подписки',
    days_left: 'дней осталось',
    created_at: 'Создано',
    ready: 'Готов',
    connected: 'Подключено',
    dev_credit: 'Сделано с ❤️ от',
    welcome: 'Добро пожаловать',
    good_day: 'Хорошего дня',
  },
  zh: {
    dir: 'ltr',
    app_name: 'SAZ Bridge',
    app_tagline: '专业订阅管理器',
    login: '登录',
    logout: '退出',
    password: '密码',
    password_ph: '••••••••',
    enter: '进入面板',
    wrong_password: '密码错误',
    setup_title: '设置向导',
    setup_welcome: '欢迎使用 SAZ Bridge',
    setup_desc: '请配置初始设置',
    setup_password: '管理员密码',
    setup_subpath: '订阅路径',
    setup_lang: '默认语言',
    setup_theme: '主题',
    setup_bot: 'Telegram 机器人令牌（可选）',
    setup_submit: '设置',
    nav_home: '首页',
    nav_users: '用户',
    nav_subs: '订阅管理',
    nav_groups: '分组',
    nav_bot: '机器人',
    nav_stats: '统计',
    nav_backup: '备份',
    nav_settings: '设置',
    total_users: '用户总数',
    active_users: '活跃',
    expired_users: '已过期',
    total_traffic: '总流量',
    total_subs: '订阅数',
    add_user: '新用户',
    edit_user: '编辑用户',
    add_sub: '新订阅',
    edit_sub: '编辑订阅',
    add_group: '新分组',
    name: '名称',
    quota: '流量 (GB)',
    days: '天数',
    group: '分组',
    links: '链接',
    telegram: 'Telegram',
    status: '状态',
    usage: '使用量',
    expiry: '到期',
    actions: '操作',
    active: '活跃',
    disabled: '已禁用',
    expired: '已过期',
    unlimited: '无限制',
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    copy: '复制',
    close: '关闭',
    search: '搜索...',
    no_data: '无数据',
    confirm_delete: '确定吗？',
    saved_ok: '保存成功',
    deleted_ok: '删除成功',
    error_occurred: '发生错误',
    bot_token: '机器人令牌',
    set_webhook: '连接机器人',
    unset_webhook: '断开连接',
    bot_connected: '机器人已连接',
    theme_luna: 'Luna Blue',
    theme_classic: '经典',
    theme_silver: 'Luna Silver',
    backup_export: '导出备份',
    backup_import: '导入备份',
    total_visits: '总访问量',
    sources: '来源',
    direct_links: '直接链接',
    prefix: '名称前缀',
    qr_code: '二维码',
    sub_url: '订阅链接',
    days_left: '天剩余',
    created_at: '创建于',
    ready: '就绪',
    connected: '已连接',
    dev_credit: '用心制作 ❤️ 由',
    welcome: '欢迎',
    good_day: '祝您愉快',
  }
};

function t(lang, key) {
  const l = I18N[lang] || I18N.fa;
  return l[key] || I18N.fa[key] || key;
}

function getLang(request, config) {
  // 1. Cookie
  const cookies = parseCookies(request.headers.get('Cookie'));
  if (cookies.lang && I18N[cookies.lang]) return cookies.lang;
  // 2. Accept-Language
  const accept = request.headers.get('Accept-Language') || '';
  for (const code of ['fa','en','ru','zh']) {
    if (accept.toLowerCase().includes(code)) return code;
  }
  // 3. Config default
  if (config && config.defaultLang && I18N[config.defaultLang]) return config.defaultLang;
  // 4. Fallback
  return 'fa';
}

// ─────────────────────────────────────────────────────────────────
//  WINDOWS XP CSS (Luna Blue Theme)
// ─────────────────────────────────────────────────────────────────
const XP_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --xp-blue-1:#0058E6;
  --xp-blue-2:#3A93FF;
  --xp-blue-3:#0054E3;
  --xp-blue-4:#0046CA;
  --xp-blue-5:#003DB8;
  --xp-green-1:#B6E664;
  --xp-green-2:#7FBA00;
  --xp-green-3:#4C8B00;
  --xp-silver:#ECE9D8;
  --xp-silver-d:#D5D2CA;
  --xp-silver-l:#FAF9F5;
  --xp-border:#003C74;
  --xp-border-l:#7F9DB9;
  --xp-text:#000;
  --xp-text2:#333;
  --xp-title-text:#003C74;
}

html,body{height:100%}
body{
  font-family:'Vazirmatn','Inter',Tahoma,system-ui,sans-serif;
  font-size:11px;
  background:#3A6EA5 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%235A8DCA"/><stop offset="100%" stop-color="%2320528C"/></linearGradient></defs><rect width="400" height="400" fill="url(%23g)"/><ellipse cx="100" cy="500" rx="400" ry="200" fill="%236BA83B" opacity="0.4"/><ellipse cx="350" cy="480" rx="500" ry="220" fill="%238AC04A" opacity="0.3"/></svg>');
  background-size:cover;
  min-height:100vh;
  padding:20px 20px 60px;
  overflow-x:hidden;
}

body[dir="rtl"]{font-family:'Vazirmatn',Tahoma,sans-serif}
body[dir="ltr"]{font-family:'Inter',Tahoma,sans-serif}

a{color:var(--xp-blue-3);text-decoration:none}
a:hover{text-decoration:underline}

::-webkit-scrollbar{width:16px;height:16px}
::-webkit-scrollbar-track{background:#F1EFE2;border:1px solid #D5D2CA}
::-webkit-scrollbar-thumb{
  background:linear-gradient(to right,#FFFFFF,#D5D2CA);
  border:1px solid #ACA899;
  border-radius:2px;
}
::-webkit-scrollbar-thumb:hover{background:linear-gradient(to right,#FFF8D6,#E8D678)}

/* ═══ XP Window ═══ */
.xp-window{
  background:var(--xp-silver);
  border:1px solid var(--xp-blue-5);
  border-radius:8px 8px 0 0;
  box-shadow:0 8px 32px rgba(0,0,0,.5);
  overflow:hidden;
  max-width:1240px;
  margin:0 auto;
  animation:winOpen .3s cubic-bezier(.16,1,.3,1);
}
@keyframes winOpen{
  from{opacity:0;transform:scale(.96) translateY(20px)}
  to{opacity:1;transform:scale(1) translateY(0)}
}

.xp-titlebar{
  height:30px;
  background:linear-gradient(to bottom,
    var(--xp-blue-1) 0%,
    var(--xp-blue-2) 8%,
    var(--xp-blue-3) 40%,
    var(--xp-blue-4) 88%,
    var(--xp-blue-5) 100%);
  display:flex;
  align-items:center;
  padding:0 5px 0 6px;
  color:#fff;
  font-weight:700;
  font-size:12px;
  text-shadow:1px 1px 0 rgba(0,0,0,.5);
  border-radius:7px 7px 0 0;
  user-select:none;
  position:relative;
}
.xp-titlebar::after{
  content:'';
  position:absolute;
  left:0;right:0;top:0;height:50%;
  background:linear-gradient(to bottom,rgba(255,255,255,.4),rgba(255,255,255,0));
  border-radius:7px 7px 0 0;
  pointer-events:none;
}
.xp-titlebar .tb-icon{
  width:16px;height:16px;margin-inline-end:5px;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;
}
.xp-titlebar .tb-title{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;position:relative;z-index:2}
.xp-controls{display:flex;gap:2px;position:relative;z-index:2}
.xp-controls button{
  width:22px;height:20px;
  border:1px solid rgba(255,255,255,.5);
  border-radius:3px;
  background:linear-gradient(to bottom,
    var(--xp-blue-2) 0%,
    var(--xp-blue-3) 50%,
    var(--xp-blue-5) 100%);
  color:#fff;
  font-size:10px;
  font-weight:900;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0;
  font-family:Tahoma,sans-serif;
  transition:filter .15s;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.5);
}
.xp-controls button:hover{filter:brightness(1.15)}
.xp-controls button:active{filter:brightness(.9)}
.xp-controls button.close{
  background:linear-gradient(to bottom,#E67A6A 0%,#CB2D1C 50%,#A41E0E 100%);
  width:24px;
  font-size:11px;
}

/* ═══ Menu bar ═══ */
.xp-menubar{
  background:var(--xp-silver);
  border-bottom:1px solid var(--xp-silver-d);
  padding:3px 4px;
  display:flex;
  gap:0;
  font-size:11px;
  user-select:none;
}
.xp-menubar .menu-item{
  padding:3px 9px;
  color:var(--xp-text);
  cursor:pointer;
  border-radius:2px;
  font-weight:400;
}
.xp-menubar .menu-item:hover{
  background:#316AC5;
  color:#fff;
}
.xp-menubar .menu-item u{text-decoration:underline}

/* ═══ Toolbar ═══ */
.xp-toolbar{
  background:linear-gradient(to bottom,var(--xp-silver-l) 0%,var(--xp-silver) 100%);
  border-bottom:1px solid var(--xp-silver-d);
  padding:5px 6px;
  display:flex;
  gap:4px;
  align-items:center;
  flex-wrap:wrap;
}
.xp-toolbar .sep{
  width:1px;height:22px;
  background:linear-gradient(to bottom,transparent,#ACA899,transparent);
  margin:0 4px;
}

/* ═══ XP Buttons ═══ */
.xp-btn{
  display:inline-flex;align-items:center;gap:5px;
  padding:4px 12px;
  background:linear-gradient(to bottom,
    #FFFFFF 0%,
    #F1EFE2 45%,
    #E1DFD2 46%,
    #F5F4EA 100%);
  border:1px solid var(--xp-border);
  border-radius:3px;
  color:var(--xp-text);
  font-family:inherit;
  font-size:11px;
  cursor:pointer;
  transition:all .08s;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9);
  white-space:nowrap;
  user-select:none;
  text-shadow:0 1px 0 rgba(255,255,255,.5);
}
.xp-btn:hover{
  background:linear-gradient(to bottom,
    #FFF8D6 0%,
    #F5E9A8 45%,
    #E8D678 46%,
    #FFF8D6 100%);
  border-color:#003C74;
}
.xp-btn:active{
  background:linear-gradient(to bottom,#E1DFD2 0%,#D5D2CA 100%);
  box-shadow:inset 0 2px 3px rgba(0,0,0,.15);
}
.xp-btn.primary{
  background:linear-gradient(to bottom,
    #7FBA00 0%,
    #5CA300 50%,
    #488B00 100%);
  border-color:#3A6B00;
  color:#fff;
  font-weight:700;
  text-shadow:0 1px 0 rgba(0,0,0,.3);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.4);
}
.xp-btn.primary:hover{
  background:linear-gradient(to bottom,#8FCC42 0%,#6AB300 50%,#508B00 100%);
}
.xp-btn.danger{
  background:linear-gradient(to bottom,#F0A090 0%,#D64A38 50%,#A41E0E 100%);
  border-color:#8B1A0A;
  color:#fff;
  font-weight:700;
  text-shadow:0 1px 0 rgba(0,0,0,.4);
}
.xp-btn.danger:hover{
  background:linear-gradient(to bottom,#F5B5A5 0%,#E25848 50%,#B42818 100%);
}
.xp-btn.sm{padding:2px 8px;font-size:10px;gap:3px}

.xp-icon-btn{
  width:26px;height:24px;
  display:inline-flex;align-items:center;justify-content:center;
  background:transparent;
  border:1px solid transparent;
  border-radius:3px;
  cursor:pointer;
  font-size:13px;
  transition:all .1s;
  padding:0;
}
.xp-icon-btn:hover{
  background:linear-gradient(to bottom,#FFF8D6,#E8D678);
  border-color:#003C74;
}
.xp-icon-btn:active{
  background:#D5D2CA;
  box-shadow:inset 0 1px 2px rgba(0,0,0,.2);
}

/* ═══ Content area ═══ */
.xp-content{
  background:#fff;
  padding:14px;
  min-height:420px;
  max-height:calc(100vh - 200px);
  overflow-y:auto;
}

/* ═══ XP Panel ═══ */
.xp-panel{
  background:var(--xp-silver-l);
  border:1px solid #ACA899;
  border-radius:3px;
  margin-bottom:10px;
}
.xp-panel-head{
  background:linear-gradient(to right,#FFFFFF 0%,#D6DFF7 100%);
  padding:5px 10px;
  font-weight:700;
  font-size:11px;
  color:var(--xp-title-text);
  border-bottom:1px solid #ACA899;
  border-radius:3px 3px 0 0;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:8px;
}
.xp-panel-head .ico{
  margin-inline-end:5px;
  font-size:13px;
}
.xp-panel-body{
  padding:12px;
  background:#fff;
}

/* ═══ XP Form fields ═══ */
.xp-input, .xp-select, .xp-textarea{
  width:100%;
  padding:3px 6px;
  border:1px solid var(--xp-border-l);
  background:#fff;
  font-family:inherit;
  font-size:11px;
  outline:none;
  border-radius:2px;
  transition:border .15s;
  color:var(--xp-text);
}
.xp-input:focus, .xp-select:focus, .xp-textarea:focus{
  border-color:#0054E3;
}
.xp-textarea{
  resize:vertical;
  min-height:90px;
  font-family:'Consolas','Courier New',monospace;
  font-size:11px;
  line-height:1.6;
  direction:ltr;
  text-align:left;
}
.xp-label{
  display:block;
  font-size:11px;
  font-weight:700;
  color:var(--xp-text);
  margin-bottom:3px;
}
.xp-field{margin-bottom:10px}
.xp-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:640px){.xp-row{grid-template-columns:1fr}}

/* ═══ XP Table ═══ */
.xp-table-wrap{overflow-x:auto;border:1px solid #ACA899;background:#fff}
.xp-table{
  width:100%;
  border-collapse:collapse;
  font-size:11px;
}
.xp-table th{
  background:linear-gradient(to bottom,#FFFFFF 0%,#ECE9D8 100%);
  border:1px solid #ACA899;
  padding:5px 8px;
  text-align:start;
  font-weight:700;
  color:var(--xp-text);
  white-space:nowrap;
  user-select:none;
}
.xp-table td{
  border:1px solid #E0DDD4;
  padding:5px 8px;
  vertical-align:middle;
  color:var(--xp-text2);
}
.xp-table tbody tr:hover{background:#EAF2FD}
.xp-table tbody tr:nth-child(even){background:#F7F6F0}
.xp-table tbody tr:nth-child(even):hover{background:#EAF2FD}

/* ═══ XP Progress bar ═══ */
.xp-progress{
  height:14px;
  border:1px solid #7F9DB9;
  background:#fff;
  border-radius:2px;
  overflow:hidden;
  position:relative;
  padding:2px;
}
.xp-progress > div{
  height:100%;
  background:linear-gradient(to bottom,#B6E664 0%,#7FBA00 50%,#4C8B00 100%);
  border-radius:1px;
  transition:width .5s ease;
  position:relative;
}
.xp-progress > div::after{
  content:'';
  position:absolute;
  inset:0;
  background:repeating-linear-gradient(90deg,transparent 0,transparent 6px,rgba(255,255,255,.3) 6px,rgba(255,255,255,.3) 8px);
}
.xp-progress.warn > div{background:linear-gradient(to bottom,#FCD34D 0%,#F59E0B 50%,#B45309 100%)}
.xp-progress.danger > div{background:linear-gradient(to bottom,#FCA5A5 0%,#EF4444 50%,#991B1B 100%)}

/* ═══ XP Status bar ═══ */
.xp-statusbar{
  background:var(--xp-silver);
  border-top:1px solid #fff;
  padding:3px 8px;
  font-size:10px;
  display:flex;
  align-items:center;
  gap:6px;
  color:var(--xp-text2);
  border-radius:0 0 3px 3px;
}
.xp-statusbar .sep{
  flex:1;
  border-top:1px solid #ACA899;
  border-bottom:1px solid #fff;
  height:0;
  margin:0 6px;
}
.xp-statusbar .status-item{
  display:flex;
  align-items:center;
  gap:4px;
  padding:1px 6px;
  border:1px solid #ACA899;
  background:var(--xp-silver-l);
  border-radius:2px;
  white-space:nowrap;
}
.xp-statusbar .dot{
  width:7px;height:7px;border-radius:50%;
  background:#7FBA00;
  box-shadow:0 0 4px rgba(127,186,0,.8);
  animation:pulse 2s infinite;
}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}

/* ═══ XP Badges ═══ */
.xp-badge{
  display:inline-flex;
  align-items:center;
  gap:3px;
  padding:1px 7px;
  border-radius:9px;
  font-size:10px;
  font-weight:700;
  border:1px solid;
}
.xp-badge.ok{background:#E8F7DD;color:#4C8B00;border-color:#7FBA00}
.xp-badge.err{background:#FEE9E7;color:#A41E0E;border-color:#D64A38}
.xp-badge.warn{background:#FEF3C7;color:#92400E;border-color:#F59E0B}
.xp-badge.info{background:#DBEAFE;color:#003C74;border-color:#3A93FF}

/* ═══ Tabs (XP style) ═══ */
.xp-tabs{
  display:flex;
  gap:2px;
  border-bottom:1px solid #ACA899;
  padding:0 4px;
  background:var(--xp-silver-l);
  margin-bottom:0;
  position:relative;
  z-index:2;
}
.xp-tab{
  padding:6px 14px;
  background:linear-gradient(to bottom,#ECE9D8 0%,#D5D2CA 100%);
  border:1px solid #ACA899;
  border-bottom:none;
  border-radius:4px 4px 0 0;
  color:var(--xp-text2);
  font-size:11px;
  font-weight:600;
  cursor:pointer;
  transition:all .12s;
  position:relative;
  top:1px;
  font-family:inherit;
}
.xp-tab:hover{
  background:linear-gradient(to bottom,#FFF8D6 0%,#E8D678 100%);
  color:var(--xp-text);
}
.xp-tab.on{
  background:linear-gradient(to bottom,#fff 0%,#fff 100%);
  color:var(--xp-title-text);
  font-weight:800;
  top:1px;
  padding-bottom:7px;
  border-bottom:1px solid #fff;
  z-index:3;
}
.xp-tab .count{
  display:inline-block;
  background:var(--xp-blue-3);
  color:#fff;
  padding:0 5px;
  border-radius:8px;
  font-size:9px;
  font-weight:700;
  margin-inline-start:4px;
  vertical-align:middle;
  min-width:16px;
  text-align:center;
}
.xp-tab.on .count{background:var(--xp-green-2)}

.xp-tab-content{
  background:#fff;
  border:1px solid #ACA899;
  border-top:none;
  padding:12px;
  border-radius:0 0 3px 3px;
}

/* ═══ XP Modal ═══ */
.xp-modal-bg{
  position:fixed;inset:0;
  background:rgba(0,0,0,.5);
  z-index:999;
  display:none;
  align-items:center;
  justify-content:center;
  padding:20px;
  animation:fadeIn .15s;
}
.xp-modal-bg.show{display:flex}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.xp-modal{
  background:var(--xp-silver);
  border:1px solid var(--xp-blue-5);
  border-radius:8px 8px 0 0;
  width:100%;
  max-width:560px;
  max-height:92vh;
  overflow:hidden;
  box-shadow:0 20px 60px rgba(0,0,0,.7);
  animation:scaleIn .25s cubic-bezier(.16,1,.3,1);
  display:flex;
  flex-direction:column;
}
@keyframes scaleIn{from{opacity:0;transform:scale(.94) translateY(15px)}to{opacity:1;transform:scale(1) translateY(0)}}
.xp-modal .xp-content{
  max-height:none;
  flex:1;
  overflow-y:auto;
  padding:14px;
}
.xp-modal-foot{
  padding:10px 14px;
  background:var(--xp-silver-l);
  border-top:1px solid var(--xp-silver-d);
  display:flex;
  justify-content:flex-end;
  gap:6px;
}

/* ═══ XP Toast ═══ */
.xp-toast{
  position:fixed;
  bottom:20px;
  inset-inline-end:20px;
  background:var(--xp-silver-l);
  border:1px solid var(--xp-blue-5);
  border-radius:4px;
  padding:0;
  box-shadow:0 8px 24px rgba(0,0,0,.4);
  transform:translateY(200%);
  transition:transform .35s cubic-bezier(.16,1,.3,1);
  z-index:9999;
  min-width:240px;
  max-width:340px;
  overflow:hidden;
}
.xp-toast.show{transform:translateY(0)}
.xp-toast .t-title{
  background:linear-gradient(to bottom,var(--xp-blue-1) 0%,var(--xp-blue-2) 8%,var(--xp-blue-3) 40%,var(--xp-blue-4) 88%,var(--xp-blue-5) 100%);
  color:#fff;
  padding:3px 8px;
  font-size:11px;
  font-weight:700;
  text-shadow:1px 1px 0 rgba(0,0,0,.4);
}
.xp-toast .t-body{
  padding:10px 12px;
  font-size:11px;
  color:var(--xp-text);
  background:var(--xp-silver-l);
}
.xp-toast.ok .t-title{background:linear-gradient(to bottom,#7FBA00 0%,#4C8B00 100%)}
.xp-toast.err .t-title{background:linear-gradient(to bottom,#D64A38 0%,#A41E0E 100%)}

/* ═══ XP Start Button (in toolbar) ═══ */
.xp-start{
  display:inline-flex;
  align-items:center;
  gap:5px;
  padding:4px 14px 4px 10px;
  background:linear-gradient(to bottom,#8FCC42 0%,#5CA300 45%,#488B00 50%,#7FBA00 100%);
  border:1px solid #3A6B00;
  border-radius:3px 3px 3px 0;
  color:#fff;
  font-weight:900;
  font-style:italic;
  font-size:12px;
  text-shadow:1px 1px 0 rgba(0,0,0,.4);
  cursor:pointer;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.4);
  user-select:none;
}
.xp-start:hover{filter:brightness(1.08)}
.xp-start:active{box-shadow:inset 0 2px 3px rgba(0,0,0,.25)}

/* ═══ XP Menu (dropdown) ═══ */
.xp-menu{
  position:absolute;
  background:var(--xp-silver-l);
  border:1px solid #ACA899;
  box-shadow:3px 3px 8px rgba(0,0,0,.35);
  padding:3px;
  z-index:1000;
  min-width:200px;
  border-radius:2px;
  animation:fadeIn .12s;
}
.xp-menu.hidden{display:none}
.xp-menu-item{
  display:flex;
  align-items:center;
  gap:8px;
  padding:5px 10px;
  cursor:pointer;
  font-size:11px;
  color:var(--xp-text);
  border-radius:2px;
  white-space:nowrap;
}
.xp-menu-item:hover{
  background:#316AC5;
  color:#fff;
}
.xp-menu-item .ico{width:18px;text-align:center;font-size:13px}
.xp-menu-item .kbd{margin-inline-start:auto;font-size:10px;color:#888;padding-inline-start:16px}
.xp-menu-item:hover .kbd{color:#fff}
.xp-menu-sep{
  height:1px;
  background:#ACA899;
  border-bottom:1px solid #fff;
  margin:3px 6px;
}

/* ═══ XP Avatar ═══ */
.xp-avatar{
  width:34px;height:34px;
  border-radius:4px;
  border:1px solid #ACA899;
  background:linear-gradient(135deg,var(--xp-blue-3),var(--xp-blue-5));
  display:inline-flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-weight:800;
  font-size:14px;
  text-shadow:1px 1px 0 rgba(0,0,0,.3);
  flex-shrink:0;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.3);
}

/* ═══ Misc ═══ */
.muted{color:#888}
.tiny{font-size:10px}
.small{font-size:11px}
.mono{font-family:'Consolas','Courier New',monospace;direction:ltr;text-align:left}
.flex{display:flex;align-items:center;gap:8px}
.flex-between{display:flex;align-items:center;justify-content:space-between;gap:8px}
.flex-wrap{flex-wrap:wrap}
.gap-sm{gap:6px}
.gap-md{gap:12px}
.mt-sm{margin-top:6px}
.mt-md{margin-top:12px}
.mb-md{margin-bottom:12px}
.hidden{display:none!important}
.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* ═══ Login / Setup layout ═══ */
.xp-login-wrap{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
}
.xp-login-window{
  width:100%;
  max-width:420px;
}
.xp-login-body{
  padding:28px 24px 20px;
  text-align:center;
  background:linear-gradient(to bottom,#F5F3E7 0%,#ECE9D8 100%);
}
.xp-login-logo{
  width:72px;
  height:72px;
  margin:0 auto 12px;
  filter:drop-shadow(0 4px 12px rgba(0,84,227,.35));
}
.xp-login-brand{
  font-size:22px;
  font-weight:900;
  color:var(--xp-title-text);
  margin-bottom:3px;
  text-shadow:0 1px 0 rgba(255,255,255,.7);
}
.xp-login-sub{
  font-size:11px;
  color:var(--xp-blue-3);
  font-weight:700;
  letter-spacing:2px;
  text-transform:uppercase;
  margin-bottom:3px;
}
.xp-login-dev{
  font-size:10px;
  color:#666;
  margin-bottom:16px;
}
.xp-login-sep{
  height:1px;
  background:linear-gradient(to right,transparent,#ACA899,transparent);
  margin-bottom:16px;
}
.xp-login-error{
  background:#FEE9E7;
  border:1px solid #D64A38;
  color:#A41E0E;
  padding:6px 10px;
  border-radius:2px;
  font-size:11px;
  margin-bottom:12px;
  font-weight:600;
  animation:shake .4s;
}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.xp-login-input{
  width:100%;
  padding:8px 12px;
  border:1px solid var(--xp-border-l);
  border-radius:2px;
  font-family:inherit;
  font-size:14px;
  text-align:center;
  letter-spacing:3px;
  direction:ltr;
  outline:none;
  background:#fff;
  transition:border .15s;
}
.xp-login-input:focus{
  border-color:var(--xp-blue-3);
  box-shadow:0 0 0 2px rgba(0,84,227,.15);
}
.xp-login-btn{
  width:100%;
  padding:9px;
  margin-top:10px;
  background:linear-gradient(to bottom,#8FCC42 0%,#5CA300 45%,#488B00 50%,#7FBA00 100%);
  border:1px solid #3A6B00;
  border-radius:3px;
  color:#fff;
  font-weight:800;
  font-size:13px;
  cursor:pointer;
  text-shadow:1px 1px 0 rgba(0,0,0,.3);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.4);
  font-family:inherit;
}
.xp-login-btn:hover{filter:brightness(1.08)}
.xp-login-btn:active{box-shadow:inset 0 2px 3px rgba(0,0,0,.25)}
.xp-login-credit{
  margin-top:16px;
  padding-top:12px;
  border-top:1px solid #D5D2CA;
  font-size:10px;
  color:#666;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  flex-wrap:wrap;
}
.xp-login-credit img{
  width:20px;height:20px;
  border-radius:2px;
  border:1px solid var(--xp-blue-3);
}
.xp-login-credit a{color:var(--xp-blue-3);font-weight:700}

/* ═══ Stats cards ═══ */
.xp-stats{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
  gap:8px;
  margin-bottom:12px;
}
.xp-stat{
  background:linear-gradient(to bottom,#FFFFFF 0%,#F5F3E7 100%);
  border:1px solid #ACA899;
  border-radius:3px;
  padding:10px 12px;
  position:relative;
  overflow:hidden;
  transition:all .15s;
}
.xp-stat:hover{
  border-color:var(--xp-blue-3);
  box-shadow:0 2px 8px rgba(0,84,227,.15);
}
.xp-stat .s-ico{
  font-size:22px;
  margin-bottom:3px;
  display:block;
}
.xp-stat .s-lbl{
  font-size:10px;
  color:#666;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.4px;
}
.xp-stat .s-val{
  font-size:20px;
  font-weight:900;
  color:var(--xp-title-text);
  letter-spacing:-.5px;
  margin-top:2px;
  line-height:1.1;
}
.xp-stat .s-sub{
  font-size:10px;
  color:#888;
  margin-top:2px;
}

/* ═══ Sub cards ═══ */
.xp-sub-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
  gap:8px;
}
.xp-sub-card{
  background:linear-gradient(to bottom,#FFFFFF 0%,#F5F3E7 100%);
  border:1px solid #ACA899;
  border-radius:3px;
  padding:10px;
  transition:all .15s;
}
.xp-sub-card:hover{
  border-color:var(--xp-blue-3);
  box-shadow:0 2px 10px rgba(0,84,227,.2);
}
.xp-sub-card h4{
  font-size:12px;
  font-weight:800;
  color:var(--xp-title-text);
  margin-bottom:4px;
  display:flex;
  align-items:center;
  gap:5px;
}
.xp-sub-url{
  background:#fff;
  border:1px solid var(--xp-border-l);
  border-radius:2px;
  padding:5px 8px;
  font-family:'Consolas',monospace;
  font-size:10px;
  color:var(--xp-blue-3);
  direction:ltr;
  text-align:left;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  cursor:pointer;
  margin:6px 0;
  transition:all .15s;
}
.xp-sub-url:hover{
  background:#EAF2FD;
  border-color:var(--xp-blue-3);
}
.xp-sub-stats{
  display:flex;
  gap:10px;
  font-size:10px;
  color:#666;
  margin-bottom:6px;
}

/* ═══ Taskbar ═══ */
.xp-taskbar{
  position:fixed;
  bottom:0;
  inset-inline:0;
  height:36px;
  background:linear-gradient(to bottom,#3A93FF 0%,#0054E3 8%,#0046CA 88%,#003075 100%);
  border-top:2px solid #0054E3;
  display:flex;
  align-items:center;
  padding:0 4px;
  gap:4px;
  z-index:500;
  box-shadow:0 -2px 8px rgba(0,0,0,.3);
}
.xp-taskbar::before{
  content:'';
  position:absolute;
  inset:0;
  background:linear-gradient(to bottom,rgba(255,255,255,.25),rgba(255,255,255,0) 50%);
  pointer-events:none;
}
.xp-taskbar-start{
  display:flex;
  align-items:center;
  gap:5px;
  padding:3px 14px 3px 10px;
  background:linear-gradient(to bottom,#8FCC42 0%,#5CA300 45%,#488B00 50%,#7FBA00 100%);
  border:1px solid #3A6B00;
  border-radius:4px 8px 8px 4px;
  color:#fff;
  font-weight:900;
  font-style:italic;
  font-size:12px;
  text-shadow:1px 1px 0 rgba(0,0,0,.4);
  cursor:pointer;
  height:30px;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.4);
  user-select:none;
  position:relative;
  z-index:2;
}
.xp-taskbar-start:hover{filter:brightness(1.08)}
.xp-taskbar-apps{
  display:flex;
  gap:3px;
  flex:1;
  overflow-x:auto;
  height:100%;
  align-items:center;
  position:relative;
  z-index:2;
}
.xp-taskbar-apps::-webkit-scrollbar{height:0}
.xp-taskbar-app{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:0 10px;
  height:26px;
  background:linear-gradient(to bottom,rgba(255,255,255,.15),rgba(0,0,0,.05));
  border:1px solid rgba(255,255,255,.2);
  border-radius:3px;
  color:#fff;
  font-size:11px;
  cursor:pointer;
  white-space:nowrap;
  transition:all .15s;
  font-weight:600;
}
.xp-taskbar-app:hover{background:rgba(255,255,255,.25)}
.xp-taskbar-app.active{
  background:linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.05));
  box-shadow:inset 0 2px 3px rgba(0,0,0,.3);
}
.xp-taskbar-tray{
  display:flex;
  align-items:center;
  gap:6px;
  padding:0 10px;
  height:26px;
  background:linear-gradient(to bottom,rgba(0,0,0,.2),rgba(255,255,255,.08));
  border:1px solid rgba(0,0,0,.3);
  border-radius:3px;
  color:#fff;
  font-size:11px;
  font-weight:600;
  position:relative;
  z-index:2;
}
.xp-taskbar-tray .lang-btn{
  cursor:pointer;
  padding:1px 5px;
  border-radius:2px;
  font-size:10px;
}
.xp-taskbar-tray .lang-btn:hover{background:rgba(255,255,255,.2)}
.xp-taskbar-tray .lang-btn.on{background:rgba(255,255,255,.3);font-weight:800}

/* Responsive */
@media(max-width:768px){
  body{padding:8px 8px 50px}
  .xp-titlebar{height:26px;font-size:11px}
  .xp-controls button{width:20px;height:18px;font-size:9px}
  .xp-menubar{font-size:10px;padding:2px}
  .xp-menubar .menu-item{padding:3px 6px}
  .xp-content{padding:8px;max-height:none}
  .xp-panel-head{padding:4px 8px;font-size:10px}
  .xp-panel-body{padding:8px}
  .xp-stats{grid-template-columns:repeat(2,1fr);gap:6px}
  .xp-stat{padding:8px}
  .xp-stat .s-val{font-size:16px}
  .xp-tab{padding:5px 10px;font-size:10px}
  .xp-taskbar{height:32px}
  .xp-taskbar-start{padding:2px 10px;font-size:11px;height:26px}
  .xp-login-body{padding:20px 16px}
}
@media(max-width:420px){
  .xp-stats{grid-template-columns:1fr}
  .xp-tab .label{display:none}
}
`;

// ─────────────────────────────────────────────────────────────────
//  UTILITIES (shared)
// ─────────────────────────────────────────────────────────────────
function b64Encode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
function b64Decode(str) {
  try {
    const bin = atob(str);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch { return ''; }
}
function randomToken(len = 32) {
  const arr = new Uint8Array(len / 2);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}
async function hashPassword(pass) {
  const data = new TextEncoder().encode('saz-bridge-salt::' + pass);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, '0')).join('');
}
function isValidProxyLink(line) {
  const p = ['vmess://','vless://','trojan://','ss://','ssr://',
             'hysteria://','hysteria2://','hy2://','tuic://',
             'socks://','socks5://','wireguard://','wg://'];
  return p.some(x => line.toLowerCase().startsWith(x));
}
function formatBytes(b) {
  if (!b || b === 0) return '0 B';
  const k = 1024, s = ['B','KB','MB','GB','TB'];
  const i = Math.floor(Math.log(b) / Math.log(k));
  return (b / Math.pow(k, i)).toFixed(2) + ' ' + s[i];
}
function formatDate(ts) {
  if (!ts) return '∞';
  return new Date(ts * 1000).toISOString().replace('T',' ').substring(0,19);
}
function daysLeft(ts) {
  if (!ts) return null;
  const diff = ts - Math.floor(Date.now() / 1000);
  return Math.max(0, Math.ceil(diff / 86400));
}
function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}
function parseCookies(header) {
  const c = {};
  if (!header) return c;
  header.split(';').forEach(x => {
    const i = x.indexOf('=');
    if (i > 0) c[x.slice(0, i).trim()] = x.slice(i + 1).trim();
  });
  return c;
}
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
  });
}

// ─────────────────────────────────────────────────────────────────
//  CONFIG & KV LAYER
// ─────────────────────────────────────────────────────────────────
async function getConfig(env) {
  const c = await env.SUB_KV.get('config', 'json');
  return c || null;
}
async function saveConfig(env, config) {
  await env.SUB_KV.put('config', JSON.stringify(config));
}

async function getUsers(env) { return (await env.SUB_KV.get('users', 'json')) || []; }
async function saveUsers(env, u) { await env.SUB_KV.put('users', JSON.stringify(u)); }
async function getUserByToken(env, token) {
  const users = await getUsers(env);
  return users.find(u => u.token === token);
}
async function getUserByTgId(env, tgId) {
  const users = await getUsers(env);
  return users.find(u => u.tgId === String(tgId));
}
async function updateUser(env, token, patch) {
  const users = await getUsers(env);
  const i = users.findIndex(u => u.token === token);
  if (i === -1) return false;
  users[i] = { ...users[i], ...patch };
  await saveUsers(env, users);
  return true;
}
async function deleteUserKV(env, token) {
  const users = await getUsers(env);
  const f = users.filter(u => u.token !== token);
  if (f.length === users.length) return false;
  await saveUsers(env, f);
  return true;
}
async function getGroups(env) { return (await env.SUB_KV.get('groups', 'json')) || []; }
async function saveGroups(env, g) { await env.SUB_KV.put('groups', JSON.stringify(g)); }
async function getSubLinks(env) { return (await env.SUB_KV.get('sub_links', 'json')) || []; }
async function saveSubLinks(env, s) { await env.SUB_KV.put('sub_links', JSON.stringify(s)); }

// ─────────────────────────────────────────────────────────────────
//  AUTH
// ─────────────────────────────────────────────────────────────────
async function verifySession(request, env) {
  const c = parseCookies(request.headers.get('Cookie'));
  if (!c.session) return false;
  return !!(await env.SUB_KV.get('session:' + c.session));
}
async function createSession(env) {
  const t = randomToken(48);
  await env.SUB_KV.put('session:' + t, '1', { expirationTtl: SESSION_TTL });
  return t;
}
async function destroySession(request, env) {
  const c = parseCookies(request.headers.get('Cookie'));
  if (c.session) await env.SUB_KV.delete('session:' + c.session);
}

// ─────────────────────────────────────────────────────────────────
//  TELEGRAM API
// ─────────────────────────────────────────────────────────────────
async function tgApi(env, method, payload) {
  const token = env.BOT_TOKEN;
  if (!token) return { ok: false, description: 'BOT_TOKEN not set' };
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await r.json();
  } catch (e) { return { ok: false, description: String(e) }; }
}
async function tgSend(env, chatId, text, keyboard) {
  const p = { chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true };
  if (keyboard) p.reply_markup = keyboard;
  return tgApi(env, 'sendMessage', p);
}

// ─────────────────────────────────────────────────────────────────
//  TELEGRAM BOT LOGIC
// ─────────────────────────────────────────────────────────────────
async function handleTelegramUpdate(env, update, workerUrl, subPath, config) {
  if (update.callback_query) {
    const cq = update.callback_query;
    const chatId = cq.message.chat.id;
    const data = cq.data;
    const user = await getUserByTgId(env, chatId);
    await tgApi(env, 'answerCallbackQuery', { callback_query_id: cq.id });

    if (data === 'my_sub') {
      if (!user) return tgSend(env, chatId, '❌ حساب کاربری یافت نشد.');
      const subUrl = `${workerUrl}/${subPath}/${user.token}`;
      const qb = (user.quotaGB || 0) * 1024 * 1024 * 1024;
      const pct = qb > 0 ? ((user.usedTraffic / qb) * 100).toFixed(1) : 0;
      const dl = daysLeft(user.expiry);
      return tgSend(env, chatId,
        `🌉 <b>${APP_NAME}</b>\n━━━━━━━━━━━━━━━━━━━\n` +
        `📛 نام: <b>${escapeHtml(user.name)}</b>\n` +
        `🔗 لینک:\n<code>${subUrl}</code>\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `📊 مصرف: ${formatBytes(user.usedTraffic)} / ${user.quotaGB > 0 ? user.quotaGB + ' GB' : '∞'}\n` +
        `📈 درصد: ${pct}%\n` +
        (dl !== null ? `⏳ ${dl} روز باقی‌مانده\n` : '♾️ نامحدود\n'),
        { inline_keyboard: [[{ text: '📋 کپی لینک', callback_data: 'copy_sub' }]] }
      );
    }
    if (data === 'usage') {
      if (!user) return tgSend(env, chatId, '❌ یافت نشد.');
      const qb = (user.quotaGB || 0) * 1024 * 1024 * 1024;
      const pct = qb > 0 ? Math.min(100, (user.usedTraffic / qb) * 100) : 0;
      const filled = Math.min(20, Math.floor(pct / 5));
      const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
      return tgSend(env, chatId,
        `📊 <b>مصرف شما</b>\n\n<code>${bar}</code> ${pct.toFixed(1)}%\n\n` +
        `📥 ${formatBytes(user.usedTraffic)}\n📦 ${user.quotaGB > 0 ? user.quotaGB + ' GB' : '∞'}\n📅 ${formatDate(user.expiry)}`
      );
    }
    if (data === 'help') {
      return tgSend(env, chatId,
        `🌉 <b>راهنمای ${APP_NAME}</b>\n\n` +
        `🔹 /start\n🔹 /mysub\n🔹 /usage\n🔹 /help\n\n` +
        `👨‍💻 <a href="${DEV_GITHUB}">${DEV_NAME}</a>`
      );
    }
    if (data === 'copy_sub' && user) {
      const subUrl = `${workerUrl}/${subPath}/${user.token}`;
      return tgSend(env, chatId, `📋 <code>${subUrl}</code>`);
    }
    return;
  }

  if (update.message && update.message.text) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text.trim();
    const user = await getUserByTgId(env, chatId);

    if (text === '/start') {
      const kb = {
        inline_keyboard: [
          [{ text: '🔗 ساب‌لینک من', callback_data: 'my_sub' }],
          [{ text: '📊 مصرف', callback_data: 'usage' }, { text: '❓ راهنما', callback_data: 'help' }]
        ]
      };
      return tgSend(env, chatId,
        `🌉 <b>${APP_NAME}</b>\n\nسلام <b>${escapeHtml(msg.from.first_name || 'کاربر')}</b> 👋\n\n` +
        `به پنل مدیریت ساب‌لینک خوش آمدید.`,
        kb
      );
    }
    if (text === '/mysub' || text === '/sub') {
      if (!user) return tgSend(env, chatId, '❌ یافت نشد.');
      return tgSend(env, chatId, `🔗 <code>${workerUrl}/${subPath}/${user.token}</code>`);
    }
    if (text === '/usage') {
      if (!user) return tgSend(env, chatId, '❌ یافت نشد.');
      const qb = (user.quotaGB || 0) * 1024 * 1024 * 1024;
      const pct = qb > 0 ? ((user.usedTraffic / qb) * 100).toFixed(1) : 0;
      return tgSend(env, chatId,
        `📊 ${formatBytes(user.usedTraffic)} / ${user.quotaGB > 0 ? user.quotaGB + ' GB' : '∞'} (${pct}%)\n📅 ${formatDate(user.expiry)}`
      );
    }
    if (text === '/help') {
      return tgSend(env, chatId, `🌉 ${APP_NAME}\n\n/start /mysub /usage /help\n\n${DEV_GITHUB}`);
    }
    return tgSend(env, chatId, '❓ دستور نامعتبر.');
  }
}
// ─────────────────────────────────────────────────────────────────
//  UI: SETUP WIZARD (first run)
// ─────────────────────────────────────────────────────────────────
function renderSetup(workerUrl, lang, error = '') {
  const L = I18N[lang] || I18N.fa;
  const dir = L.dir;
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0054E3">
<title>${L.setup_title} — ${APP_NAME}</title>
<style>${XP_CSS}</style>
</head>
<body dir="${dir}">
<div class="xp-login-wrap">
  <div class="xp-login-window xp-window">
    <div class="xp-titlebar">
      <span class="tb-icon">🌉</span>
      <span class="tb-title">${L.setup_title} — ${APP_NAME} v${VERSION}</span>
      <div class="xp-controls">
        <button title="Minimize">_</button>
        <button title="Maximize">□</button>
        <button class="close" title="Close">✕</button>
      </div>
    </div>
    <div class="xp-menubar">
      <div class="menu-item"><u>F</u>ile</div>
      <div class="menu-item"><u>H</u>elp</div>
    </div>
    <div class="xp-login-body">
      <div class="xp-login-logo">${LOGO_SVG_INLINE}</div>
      <div class="xp-login-brand">${L.setup_welcome}</div>
      <div class="xp-login-sub">${L.setup_title}</div>
      <div class="xp-login-dev">${L.setup_desc}</div>
      <div class="xp-login-sep"></div>

      ${error ? `<div class="xp-login-error">❌ ${escapeHtml(error)}</div>` : ''}

      <form method="POST" action="${workerUrl}/setup" style="text-align:${dir === 'rtl' ? 'right' : 'left'}">
        <div class="xp-field">
          <label class="xp-label">🔑 ${L.setup_password}</label>
          <input type="password" name="password" class="xp-input" required minlength="6"
                 placeholder="${L.password_ph}" autofocus autocomplete="new-password"
                 style="letter-spacing:1px;font-size:13px;direction:ltr;text-align:${dir === 'rtl' ? 'right' : 'left'}"/>
        </div>

        <div class="xp-field">
          <label class="xp-label">🛣️ ${L.setup_subpath}</label>
          <input type="text" name="subPath" class="xp-input mono" value="sub"
                 required pattern="[a-zA-Z0-9_-]{1,32}" style="direction:ltr;text-align:left"/>
        </div>

        <div class="xp-row">
          <div class="xp-field">
            <label class="xp-label">🌍 ${L.setup_lang}</label>
            <select name="defaultLang" class="xp-select">
              <option value="fa" ${lang==='fa'?'selected':''}>🇮🇷 فارسی</option>
              <option value="en" ${lang==='en'?'selected':''}>🇬🇧 English</option>
              <option value="ru" ${lang==='ru'?'selected':''}>🇷🇺 Русский</option>
              <option value="zh" ${lang==='zh'?'selected':''}>🇨🇳 中文</option>
            </select>
          </div>
          <div class="xp-field">
            <label class="xp-label">🎨 ${L.setup_theme}</label>
            <select name="theme" class="xp-select">
              <option value="luna">${L.theme_luna}</option>
              <option value="classic">${L.theme_classic}</option>
              <option value="silver">${L.theme_silver}</option>
            </select>
          </div>
        </div>

        <div class="xp-field">
          <label class="xp-label">🤖 ${L.setup_bot}</label>
          <input type="text" name="botToken" class="xp-input mono"
                 placeholder="123456:ABC-DEF..." style="direction:ltr;text-align:left"/>
        </div>

        <button type="submit" class="xp-login-btn" style="margin-top:8px">✨ ${L.setup_submit}</button>
      </form>

      <div class="xp-login-credit">
        <img src="${DEV_AVATAR}" alt="${DEV_NAME}"/>
        ${L.dev_credit} <a href="${DEV_GITHUB}" target="_blank" rel="noopener">${DEV_NAME}</a>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────
//  UI: LOGIN PAGE
// ─────────────────────────────────────────────────────────────────
function renderLogin(workerUrl, lang, error = '') {
  const L = I18N[lang] || I18N.fa;
  const dir = L.dir;
  const langNames = { fa: '🇮🇷', en: '🇬🇧', ru: '🇷🇺', zh: '🇨🇳' };
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0054E3">
<title>${L.login} — ${APP_NAME}</title>
<style>${XP_CSS}</style>
</head>
<body dir="${dir}">
<div class="xp-login-wrap">
  <div class="xp-login-window xp-window">
    <div class="xp-titlebar">
      <span class="tb-icon">🌉</span>
      <span class="tb-title">${APP_NAME} — ${L.login}</span>
      <div class="xp-controls">
        <button title="Minimize">_</button>
        <button title="Maximize">□</button>
        <button class="close" title="Close">✕</button>
      </div>
    </div>
    <div class="xp-menubar">
      <div class="menu-item"><u>F</u>ile</div>
      <div class="menu-item"><u>V</u>iew</div>
      <div class="menu-item"><u>H</u>elp</div>
    </div>
    <div class="xp-login-body">
      <div class="xp-login-logo">${LOGO_SVG_INLINE}</div>
      <div class="xp-login-brand">${APP_NAME}</div>
      <div class="xp-login-sub">${L.app_tagline}</div>
      <div class="xp-login-dev">v${VERSION} · ${DEV_NAME}</div>
      <div class="xp-login-sep"></div>

      ${error ? `<div class="xp-login-error">❌ ${escapeHtml(error)}</div>` : ''}

      <form method="POST" action="${workerUrl}/login">
        <div class="xp-field">
          <label class="xp-label" style="text-align:${dir === 'rtl' ? 'right' : 'left'}">🔑 ${L.password}</label>
          <input type="password" name="password" class="xp-login-input"
                 placeholder="${L.password_ph}" autofocus required
                 autocomplete="current-password"/>
        </div>
        <button type="submit" class="xp-login-btn">${L.enter} →</button>
      </form>

      <div style="margin-top:14px;display:flex;justify-content:center;gap:6px">
        ${['fa','en','ru','zh'].map(c => `
          <a href="?lang=${c}" class="xp-btn sm" style="text-decoration:none"
             title="${c}">${langNames[c]}</a>
        `).join('')}
      </div>

      <div class="xp-login-credit">
        <img src="${DEV_AVATAR}" alt="${DEV_NAME}"/>
        ${L.dev_credit} <a href="${DEV_GITHUB}" target="_blank" rel="noopener">${DEV_NAME}</a>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────
//  UI: DASHBOARD (Main Panel)
// ─────────────────────────────────────────────────────────────────
function renderDashboard({ users, groups, subLinks, config, workerUrl, subPath, botInfo, stats, activeTab = 'home', lang }) {
  const L = I18N[lang] || I18N.fa;
  const dir = L.dir;
  const now = Math.floor(Date.now() / 1000);

  const totalUsers = users.length;
  const activeUsers = users.filter(u => (!u.expiry || u.expiry > now) && u.status !== 'disabled').length;
  const disabledUsers = users.filter(u => u.status === 'disabled').length;
  const expiredUsers = totalUsers - activeUsers - disabledUsers;
  const totalTraffic = users.reduce((s, u) => s + (u.usedTraffic || 0), 0);
  const totalQuotaGB = users.reduce((s, u) => s + (u.quotaGB || 0), 0);
  const totalVisits = subLinks.reduce((s, x) => s + (x.visits || 0), 0);

  const langNames = { fa: 'FA', en: 'EN', ru: 'RU', zh: 'ZH' };

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0054E3">
<title>${APP_NAME} — ${L.nav_home}</title>
<style>${XP_CSS}</style>
</head>
<body dir="${dir}">

<div class="xp-window" style="margin-bottom:50px">

  <!-- Title bar -->
  <div class="xp-titlebar">
    <span class="tb-icon">🌉</span>
    <span class="tb-title">${APP_NAME} v${VERSION} — ${L.app_tagline}</span>
    <div class="xp-controls">
      <button title="Minimize" onclick="toast('📥 Minimized','info')">_</button>
      <button title="Maximize" onclick="toggleFullscreen()">□</button>
      <button class="close" title="Close" onclick="if(confirm('${L.logout}?')) location.href='/logout'">✕</button>
    </div>
  </div>

  <!-- Menu bar -->
  <div class="xp-menubar">
    <div class="menu-item" data-menu="file"><u>F</u>ile</div>
    <div class="menu-item" data-menu="view"><u>V</u>iew</div>
    <div class="menu-item" data-menu="tools"><u>T</u>ools</div>
    <div class="menu-item" data-menu="lang"><u>L</u>anguage</div>
    <div class="menu-item" data-menu="help"><u>H</u>elp</div>
  </div>

  <!-- Toolbar -->
  <div class="xp-toolbar">
    <div class="xp-start" onclick="showStartMenu(event)">
      <span>🪟</span> start
    </div>
    <div class="sep"></div>
    <button class="xp-btn" onclick="openUserModal()">➕ ${L.add_user}</button>
    <button class="xp-btn" onclick="openSubModal()">🔗 ${L.add_sub}</button>
    <button class="xp-btn" onclick="openGroupModal()">📁 ${L.add_group}</button>
    <div class="sep"></div>
    <button class="xp-btn" onclick="location.reload()">🔄 Refresh</button>
    <button class="xp-btn" onclick="window.print()">🖨️ Print</button>
    <div class="sep"></div>
    <div style="flex:1"></div>
    <button class="xp-btn danger sm" onclick="if(confirm('${L.logout}?')) location.href='/logout'">🚪 ${L.logout}</button>
  </div>

  <!-- Tabs -->
  <div class="xp-tabs" style="padding:6px 8px 0;background:var(--xp-silver-l)">
    ${renderTab('home',   '🏠', L.nav_home,     activeTab, '')}
    ${renderTab('users',  '👥', L.nav_users,    activeTab, totalUsers)}
    ${renderTab('subs',   '🔗', L.nav_subs,     activeTab, subLinks.length)}
    ${renderTab('groups', '📁', L.nav_groups,   activeTab, groups.length)}
    ${renderTab('bot',    '🤖', L.nav_bot,      activeTab, botInfo.ok ? '●' : '')}
    ${renderTab('stats',  '📊', L.nav_stats,    activeTab, '')}
    ${renderTab('backup', '💾', L.nav_backup,   activeTab, '')}
    ${renderTab('settings','⚙️', L.nav_settings,activeTab, '')}
  </div>

  <!-- Content -->
  <div class="xp-tab-content" id="tabContent">

    <!-- ═══════ HOME ═══════ -->
    <div class="xp-tab-pane ${activeTab==='home'?'':'hidden'}" data-pane="home">
      <div class="xp-stats">
        <div class="xp-stat">
          <span class="s-ico">👥</span>
          <div class="s-lbl">${L.total_users}</div>
          <div class="s-val">${totalUsers}</div>
          <div class="s-sub">${activeUsers} ${L.active} · ${expiredUsers} ${L.expired}</div>
        </div>
        <div class="xp-stat">
          <span class="s-ico">✅</span>
          <div class="s-lbl">${L.active_users}</div>
          <div class="s-val" style="color:#4C8B00">${activeUsers}</div>
          <div class="s-sub">${disabledUsers} ${L.disabled}</div>
        </div>
        <div class="xp-stat">
          <span class="s-ico">📊</span>
          <div class="s-lbl">${L.total_traffic}</div>
          <div class="s-val" style="font-size:15px">${formatBytes(totalTraffic)}</div>
          <div class="s-sub">${totalQuotaGB.toFixed(0)} GB</div>
        </div>
        <div class="xp-stat">
          <span class="s-ico">🔗</span>
          <div class="s-lbl">${L.total_subs}</div>
          <div class="s-val">${subLinks.length}</div>
          <div class="s-sub">${totalVisits} ${L.total_visits}</div>
        </div>
      </div>

      <div class="xp-panel">
        <div class="xp-panel-head">
          <span><span class="ico">⚡</span>Quick Actions</span>
        </div>
        <div class="xp-panel-body">
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="xp-btn primary" onclick="openUserModal()">➕ ${L.add_user}</button>
            <button class="xp-btn primary" onclick="openSubModal()">🔗 ${L.add_sub}</button>
            <button class="xp-btn" onclick="openGroupModal()">📁 ${L.add_group}</button>
            <button class="xp-btn" onclick="switchTab('bot')">🤖 ${L.set_webhook}</button>
            <button class="xp-btn" onclick="switchTab('backup')">💾 ${L.backup_export}</button>
          </div>
        </div>
      </div>

      ${config.announcement ? `
      <div class="xp-panel">
        <div class="xp-panel-head"><span><span class="ico">📢</span>Announcement</span></div>
        <div class="xp-panel-body">
          <div style="padding:8px 12px;background:#FFF8D6;border:1px solid #E8D678;border-radius:3px;font-size:11px">
            ${escapeHtml(config.announcement)}
          </div>
        </div>
      </div>` : ''}

      <div class="xp-panel">
        <div class="xp-panel-head">
          <span><span class="ico">💡</span>Info</span>
        </div>
        <div class="xp-panel-body">
          <table style="width:100%;font-size:11px;border-collapse:collapse">
            <tr><td style="padding:4px 8px;color:#666;width:180px">🌉 ${L.app_name}</td><td style="padding:4px 8px"><b>${APP_NAME}</b> v${VERSION}</td></tr>
            <tr><td style="padding:4px 8px;color:#666">🛣️ ${L.setup_subpath}</td><td style="padding:4px 8px" class="mono">/${escapeHtml(subPath)}/:token</td></tr>
            <tr><td style="padding:4px 8px;color:#666">👨‍💻 Developer</td><td style="padding:4px 8px"><a href="${DEV_GITHUB}" target="_blank">${DEV_NAME}</a></td></tr>
            <tr><td style="padding:4px 8px;color:#666">🌍 Language</td><td style="padding:4px 8px">${lang.toUpperCase()}</td></tr>
            <tr><td style="padding:4px 8px;color:#666">🎨 Theme</td><td style="padding:4px 8px">${config.theme || 'luna'}</td></tr>
          </table>
        </div>
      </div>
    </div>

    <!-- ═══════ USERS ═══════ -->
    <div class="xp-tab-pane ${activeTab==='users'?'':'hidden'}" data-pane="users">
      <div class="xp-panel">
        <div class="xp-panel-head">
          <span><span class="ico">👥</span>${L.nav_users} (${users.length})</span>
          <div style="display:flex;gap:4px">
            <input type="text" id="userSearch" class="xp-input" placeholder="${L.search}"
                   style="width:180px;font-size:11px" oninput="filterUsers(this.value)"/>
            <button class="xp-btn primary sm" onclick="openUserModal()">➕ ${L.add_user}</button>
          </div>
        </div>
        <div class="xp-panel-body" style="padding:0">
          ${users.length === 0 ? `
            <div style="text-align:center;padding:40px 20px;color:#888;font-size:12px">
              <div style="font-size:44px;opacity:.5;margin-bottom:10px">📭</div>
              ${L.no_data}
            </div>
          ` : `
          <div class="xp-table-wrap">
            <table class="xp-table" id="usersTable">
              <thead>
                <tr>
                  <th>${L.name}</th>
                  <th>${L.status}</th>
                  <th>${L.usage}</th>
                  <th>${L.expiry}</th>
                  <th>${L.group}</th>
                  <th style="text-align:center">${L.actions}</th>
                </tr>
              </thead>
              <tbody>
                ${users.map(u => renderUserRow(u, workerUrl, subPath, groups, lang)).join('')}
              </tbody>
            </table>
          </div>`}
        </div>
      </div>
    </div>

    <!-- ═══════ SUBS ═══════ -->
    <div class="xp-tab-pane ${activeTab==='subs'?'':'hidden'}" data-pane="subs">
      <div class="xp-panel">
        <div class="xp-panel-head">
          <span><span class="ico">🔗</span>${L.nav_subs} (${subLinks.length})</span>
          <button class="xp-btn primary sm" onclick="openSubModal()">➕ ${L.add_sub}</button>
        </div>
        <div class="xp-panel-body">
          ${subLinks.length === 0 ? `
            <div style="text-align:center;padding:40px 20px;color:#888;font-size:12px">
              <div style="font-size:44px;opacity:.5;margin-bottom:10px">🔗</div>
              ${L.no_data}
            </div>
          ` : `
          <div class="xp-sub-grid">
            ${subLinks.map(s => renderSubCard(s, workerUrl, subPath, groups, users, lang)).join('')}
          </div>`}
        </div>
      </div>
    </div>

    <!-- ═══════ GROUPS ═══════ -->
    <div class="xp-tab-pane ${activeTab==='groups'?'':'hidden'}" data-pane="groups">
      <div class="xp-panel">
        <div class="xp-panel-head">
          <span><span class="ico">📁</span>${L.nav_groups} (${groups.length})</span>
          <button class="xp-btn primary sm" onclick="openGroupModal()">➕ ${L.add_group}</button>
        </div>
        <div class="xp-panel-body">
          ${groups.length === 0 ? `
            <div style="text-align:center;padding:40px 20px;color:#888;font-size:12px">
              <div style="font-size:44px;opacity:.5;margin-bottom:10px">📁</div>
              ${L.no_data}
            </div>
          ` : `
          <div class="xp-sub-grid">
            ${groups.map(g => {
              const cnt = users.filter(u => u.group === g.id).length;
              const scnt = subLinks.filter(s => s.group === g.id).length;
              return `
              <div class="xp-sub-card">
                <h4>
                  <span style="width:12px;height:12px;border-radius:3px;background:${g.color || '#0054E3'};display:inline-block;border:1px solid rgba(0,0,0,.2)"></span>
                  ${escapeHtml(g.name)}
                </h4>
                <div class="xp-sub-stats">
                  <span>👥 ${cnt}</span>
                  <span>🔗 ${scnt}</span>
                </div>
                <div style="display:flex;justify-content:flex-end;gap:4px">
                  <button class="xp-icon-btn" onclick="openGroupEdit('${g.id}')" title="${L.edit}">✏️</button>
                  <button class="xp-icon-btn" onclick="deleteGroup('${g.id}')" title="${L.delete}">🗑️</button>
                </div>
              </div>`;
            }).join('')}
          </div>`}
        </div>
      </div>
    </div>

    <!-- ═══════ BOT ═══════ -->
    <div class="xp-tab-pane ${activeTab==='bot'?'':'hidden'}" data-pane="bot">
      <div class="xp-panel">
        <div class="xp-panel-head">
          <span><span class="ico">🤖</span>${L.nav_bot}</span>
          ${botInfo.ok ? `<span class="xp-badge ok">● ${L.bot_connected}</span>` : `<span class="xp-badge warn">○ Offline</span>`}
        </div>
        <div class="xp-panel-body">
          ${botInfo.ok ? `
            <table class="xp-table" style="margin-bottom:10px">
              <tr><th style="width:180px">Username</th><td>@${escapeHtml(botInfo.username || '—')}</td></tr>
              <tr><th>Name</th><td>${escapeHtml(botInfo.first_name || '—')}</td></tr>
              <tr><th>Webhook</th><td class="mono tiny" style="word-break:break-all">${escapeHtml(botInfo.webhook || '—')}</td></tr>
            </table>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button class="xp-btn" onclick="botAction('set-webhook')">🔄 ${L.set_webhook}</button>
              <button class="xp-btn danger" onclick="botAction('unset-webhook')">🔌 ${L.unset_webhook}</button>
              <button class="xp-btn" onclick="openBroadcastModal()">📢 Broadcast</button>
            </div>
          ` : `
            <div class="xp-field">
              <label class="xp-label">${L.bot_token}</label>
              <input type="password" id="botTokenInput" class="xp-input mono"
                     placeholder="123456:ABC-DEF..." style="direction:ltr;text-align:left"/>
            </div>
            <div style="display:flex;gap:6px">
              <button class="xp-btn primary" onclick="botAction('set-webhook')">🔗 ${L.set_webhook}</button>
            </div>
            <p class="tiny muted mt-sm">💡 توکن را از @BotFather دریافت کنید. پس از اتصال، ربات به‌طور خودکار Webhook را تنظیم می‌کند.</p>
          `}
        </div>
      </div>

      <div class="xp-panel">
        <div class="xp-panel-head"><span><span class="ico">📖</span>Commands</span></div>
        <div class="xp-panel-body">
          <table class="xp-table">
            <tr><th style="width:100px">/start</th><td>نمایش منوی اصلی</td></tr>
            <tr><th>/mysub</th><td>دریافت لینک ساب شخصی</td></tr>
            <tr><th>/usage</th><td>نمایش مصرف و انقضا</td></tr>
            <tr><th>/help</th><td>راهنمای دستورات</td></tr>
          </table>
        </div>
      </div>
    </div>

    <!-- ═══════ STATS ═══════ -->
    <div class="xp-tab-pane ${activeTab==='stats'?'':'hidden'}" data-pane="stats">
      <div class="xp-stats">
        <div class="xp-stat">
          <span class="s-ico">👥</span>
          <div class="s-lbl">${L.total_users}</div>
          <div class="s-val">${totalUsers}</div>
        </div>
        <div class="xp-stat">
          <span class="s-ico">🔗</span>
          <div class="s-lbl">${L.total_subs}</div>
          <div class="s-val">${subLinks.length}</div>
        </div>
        <div class="xp-stat">
          <span class="s-ico">📁</span>
          <div class="s-lbl">${L.nav_groups}</div>
          <div class="s-val">${groups.length}</div>
        </div>
        <div class="xp-stat">
          <span class="s-ico">👁️</span>
          <div class="s-lbl">${L.total_visits}</div>
          <div class="s-val">${totalVisits}</div>
        </div>
      </div>

      <div class="xp-panel">
        <div class="xp-panel-head"><span><span class="ico">📊</span>Top Users by Traffic</span></div>
        <div class="xp-panel-body" style="padding:0">
          <table class="xp-table">
            <thead>
              <tr><th>#</th><th>${L.name}</th><th>${L.usage}</th><th>%</th></tr>
            </thead>
            <tbody>
              ${users
                .slice()
                .sort((a,b) => (b.usedTraffic||0) - (a.usedTraffic||0))
                .slice(0, 10)
                .map((u, i) => {
                  const qb = (u.quotaGB||0) * 1024 * 1024 * 1024;
                  const pct = qb > 0 ? ((u.usedTraffic/qb)*100).toFixed(1) : '0';
                  return `<tr>
                    <td style="width:30px;text-align:center">${i+1}</td>
                    <td>${escapeHtml(u.name)}</td>
                    <td>${formatBytes(u.usedTraffic)}</td>
                    <td>${pct}%</td>
                  </tr>`;
                }).join('') || `<tr><td colspan="4" style="text-align:center;color:#888;padding:20px">${L.no_data}</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ═══════ BACKUP ═══════ -->
    <div class="xp-tab-pane ${activeTab==='backup'?'':'hidden'}" data-pane="backup">
      <div class="xp-panel">
        <div class="xp-panel-head"><span><span class="ico">💾</span>${L.nav_backup}</span></div>
        <div class="xp-panel-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div style="border:1px solid #ACA899;padding:14px;border-radius:3px;background:#FAF9F5;text-align:center">
              <div style="font-size:44px;margin-bottom:8px">📤</div>
              <h4 style="font-size:13px;margin-bottom:6px;color:var(--xp-title-text)">${L.backup_export}</h4>
              <p class="tiny muted" style="margin-bottom:10px">تمام داده‌ها را در فایل JSON ذخیره کنید</p>
              <button class="xp-btn primary" onclick="exportBackup()">⬇️ Download</button>
            </div>
            <div style="border:1px solid #ACA899;padding:14px;border-radius:3px;background:#FAF9F5;text-align:center">
              <div style="font-size:44px;margin-bottom:8px">📥</div>
              <h4 style="font-size:13px;margin-bottom:6px;color:var(--xp-title-text)">${L.backup_import}</h4>
              <p class="tiny muted" style="margin-bottom:10px">بازیابی از فایل JSON</p>
              <input type="file" id="restoreFile" accept=".json" style="display:none" onchange="importBackup(this)"/>
              <button class="xp-btn" onclick="document.getElementById('restoreFile').click()">⬆️ Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════ SETTINGS ═══════ -->
    <div class="xp-tab-pane ${activeTab==='settings'?'':'hidden'}" data-pane="settings">
      <div class="xp-panel">
        <div class="xp-panel-head"><span><span class="ico">⚙️</span>${L.nav_settings}</span></div>
        <div class="xp-panel-body">
          <form onsubmit="saveSettings(event)">
            <div class="xp-row">
              <div class="xp-field">
                <label class="xp-label">🌍 ${L.setup_lang}</label>
                <select name="defaultLang" class="xp-select">
                  <option value="fa" ${config.defaultLang==='fa'?'selected':''}>🇮🇷 فارسی</option>
                  <option value="en" ${config.defaultLang==='en'?'selected':''}>🇬🇧 English</option>
                  <option value="ru" ${config.defaultLang==='ru'?'selected':''}>🇷🇺 Русский</option>
                  <option value="zh" ${config.defaultLang==='zh'?'selected':''}>🇨🇳 中文</option>
                </select>
              </div>
              <div class="xp-field">
                <label class="xp-label">🛣️ ${L.setup_subpath}</label>
                <input type="text" name="subPath" class="xp-input mono" value="${escapeHtml(subPath)}"
                       pattern="[a-zA-Z0-9_-]{1,32}" style="direction:ltr;text-align:left"/>
              </div>
            </div>

            <div class="xp-field">
              <label class="xp-label">📢 Announcement</label>
              <textarea name="announcement" class="xp-textarea" style="min-height:60px;direction:inherit;text-align:inherit"
                        placeholder="پیام اطلاع‌رسانی به کاربران...">${escapeHtml(config.announcement || '')}</textarea>
            </div>

            <div class="xp-field">
              <label class="xp-label">🔑 ${L.password} (خالی = بدون تغییر)</label>
              <input type="password" name="newPassword" class="xp-input"
                     placeholder="••••••••" autocomplete="new-password"/>
            </div>

            <div style="display:flex;gap:6px;justify-content:flex-end">
              <button type="submit" class="xp-btn primary">💾 ${L.save}</button>
            </div>
          </form>
        </div>
      </div>

      <div class="xp-panel">
        <div class="xp-panel-head"><span><span class="ico">ℹ️</span>About</span></div>
        <div class="xp-panel-body">
          <div style="display:flex;align-items:center;gap:12px">
            <img src="${DEV_AVATAR}" style="width:48px;height:48px;border-radius:4px;border:2px solid var(--xp-blue-3)"/>
            <div>
              <div style="font-weight:800;color:var(--xp-title-text);font-size:13px">${DEV_NAME}</div>
              <div class="tiny muted">${DEV_GITHUB}</div>
            </div>
            <div style="flex:1"></div>
            <a href="${DEV_GITHUB}" target="_blank" class="xp-btn">🌐 GitHub</a>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Status bar -->
  <div class="xp-statusbar">
    <span class="status-item"><span class="dot"></span>${L.connected}</span>
    <span class="status-item">👥 ${totalUsers}</span>
    <span class="status-item">🔗 ${subLinks.length}</span>
    <span class="sep"></span>
    <span class="status-item">${L.ready}</span>
  </div>
</div>

<!-- ═══════════════ Taskbar ═══════════════ -->
<div class="xp-taskbar">
  <div class="xp-taskbar-start" onclick="showStartMenu(event)">
    <span>🪟</span> start
  </div>
  <div class="xp-taskbar-apps">
    <div class="xp-taskbar-app active" onclick="switchTab('home')">🌉 ${APP_NAME}</div>
    <div class="xp-taskbar-app" onclick="switchTab('users')">👥 ${totalUsers}</div>
    <div class="xp-taskbar-app" onclick="switchTab('subs')">🔗 ${subLinks.length}</div>
  </div>
  <div class="xp-taskbar-tray">
    <div style="display:flex;gap:2px">
      ${['fa','en','ru','zh'].map(c => `
        <span class="lang-btn ${c===lang?'on':''}" onclick="switchLang('${c}')" title="${c}">
          ${langNames[c]}
        </span>
      `).join('')}
    </div>
    <span class="dot" style="width:8px;height:8px;background:#7FBA00;border-radius:50%;display:inline-block"></span>
    <span>🔊</span>
    <span id="clock">${new Date().toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit'})}</span>
  </div>
</div>

<!-- ═══════════════ Start Menu ═══════════════ -->
<div id="startMenu" class="xp-menu hidden" style="bottom:40px;${dir==='rtl'?'right':'left'}:4px;top:auto;width:240px">
  <div class="xp-menu-item" onclick="openUserModal();hideStartMenu()">
    <span class="ico">➕</span>${L.add_user}
  </div>
  <div class="xp-menu-item" onclick="openSubModal();hideStartMenu()">
    <span class="ico">🔗</span>${L.add_sub}
  </div>
  <div class="xp-menu-item" onclick="openGroupModal();hideStartMenu()">
    <span class="ico">📁</span>${L.add_group}
  </div>
  <div class="xp-menu-sep"></div>
  <div class="xp-menu-item" onclick="switchTab('home');hideStartMenu()">
    <span class="ico">🏠</span>${L.nav_home}
  </div>
  <div class="xp-menu-item" onclick="switchTab('users');hideStartMenu()">
    <span class="ico">👥</span>${L.nav_users}
  </div>
  <div class="xp-menu-item" onclick="switchTab('subs');hideStartMenu()">
    <span class="ico">🔗</span>${L.nav_subs}
  </div>
  <div class="xp-menu-item" onclick="switchTab('groups');hideStartMenu()">
    <span class="ico">📁</span>${L.nav_groups}
  </div>
  <div class="xp-menu-item" onclick="switchTab('bot');hideStartMenu()">
    <span class="ico">🤖</span>${L.nav_bot}
  </div>
  <div class="xp-menu-item" onclick="switchTab('stats');hideStartMenu()">
    <span class="ico">📊</span>${L.nav_stats}
  </div>
  <div class="xp-menu-item" onclick="switchTab('backup');hideStartMenu()">
    <span class="ico">💾</span>${L.nav_backup}
  </div>
  <div class="xp-menu-item" onclick="switchTab('settings');hideStartMenu()">
    <span class="ico">⚙️</span>${L.nav_settings}
  </div>
  <div class="xp-menu-sep"></div>
  <div class="xp-menu-item" onclick="location.reload()">
    <span class="ico">🔄</span>Refresh
  </div>
  <div class="xp-menu-item" onclick="if(confirm('${L.logout}?')) location.href='/logout'">
    <span class="ico">🚪</span>${L.logout}
  </div>
</div>

<!-- ═══════════════ User Modal ═══════════════ -->
<div class="xp-modal-bg" id="userModal">
  <div class="xp-modal">
    <div class="xp-titlebar">
      <span class="tb-icon">👤</span>
      <span class="tb-title" id="userModalTitle">${L.add_user}</span>
      <div class="xp-controls">
        <button class="close" onclick="closeModal('userModal')">✕</button>
      </div>
    </div>
    <div class="xp-content">
      <form onsubmit="saveUser(event)">
        <input type="hidden" id="uEditToken" value=""/>
        <div class="xp-field">
          <label class="xp-label">${L.name}</label>
          <input type="text" id="uName" class="xp-input" required/>
        </div>
        <div class="xp-row">
          <div class="xp-field">
            <label class="xp-label">${L.quota} (0 = ${L.unlimited})</label>
            <input type="number" id="uQuota" class="xp-input" value="50" min="0" step="1"/>
          </div>
          <div class="xp-field">
            <label class="xp-label">${L.days} (0 = ${L.unlimited})</label>
            <input type="number" id="uDays" class="xp-input" value="30" min="0" step="1"/>
          </div>
        </div>
        <div class="xp-row">
          <div class="xp-field">
            <label class="xp-label">${L.group}</label>
            <select id="uGroup" class="xp-select">
              <option value="">—</option>
              ${groups.map(g => `<option value="${g.id}">${escapeHtml(g.name)}</option>`).join('')}
            </select>
          </div>
          <div class="xp-field">
            <label class="xp-label">${L.telegram} (Chat ID)</label>
            <input type="text" id="uTgId" class="xp-input mono" placeholder="123456789"
                   style="direction:ltr;text-align:left"/>
          </div>
        </div>
        <div class="xp-field">
          <label class="xp-label">${L.links}</label>
          <textarea id="uLinks" class="xp-textarea" placeholder="vmess://...&#10;vless://...&#10;trojan://..."></textarea>
        </div>
        <div style="display:flex;gap:6px;justify-content:flex-end;margin-top:8px">
          <button type="button" class="xp-btn" onclick="closeModal('userModal')">${L.cancel}</button>
          <button type="submit" class="xp-btn primary">💾 ${L.save}</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ═══════════════ Sub Modal ═══════════════ -->
<div class="xp-modal-bg" id="subModal">
  <div class="xp-modal">
    <div class="xp-titlebar">
      <span class="tb-icon">🔗</span>
      <span class="tb-title" id="subModalTitle">${L.add_sub}</span>
      <div class="xp-controls">
        <button class="close" onclick="closeModal('subModal')">✕</button>
      </div>
    </div>
    <div class="xp-content">
      <form onsubmit="saveSub(event)">
        <input type="hidden" id="sEditId" value=""/>
        <div class="xp-field">
          <label class="xp-label">${L.name}</label>
          <input type="text" id="sName" class="xp-input" required/>
        </div>
        <div class="xp-row">
          <div class="xp-field">
            <label class="xp-label">${L.group}</label>
            <select id="sGroup" class="xp-select">
              <option value="">—</option>
              ${groups.map(g => `<option value="${g.id}">${escapeHtml(g.name)}</option>`).join('')}
            </select>
          </div>
          <div class="xp-field">
            <label class="xp-label">${L.prefix}</label>
            <input type="text" id="sPrefix" class="xp-input" value="🌉 SAZ"/>
          </div>
        </div>
        <div class="xp-field">
          <label class="xp-label">${L.sources} — کاربران</label>
          <select id="sSources" class="xp-select" multiple style="height:110px">
            ${users.map(u => `<option value="${u.token}">${escapeHtml(u.name)} · ${u.token.substring(0,10)}...</option>`).join('')}
          </select>
          <p class="tiny muted" style="margin-top:3px">Ctrl+Click برای انتخاب چندگانه</p>
        </div>
        <div class="xp-field">
          <label class="xp-label">${L.direct_links}</label>
          <textarea id="sDirect" class="xp-textarea" placeholder="vmess://...&#10;vless://..."></textarea>
        </div>
        <div class="xp-row">
          <div class="xp-field">
            <label class="xp-label">${L.quota} (0 = ${L.unlimited})</label>
            <input type="number" id="sQuota" class="xp-input" value="0" min="0"/>
          </div>
          <div class="xp-field">
            <label class="xp-label">${L.days} (0 = ${L.unlimited})</label>
            <input type="number" id="sDays" class="xp-input" value="0" min="0"/>
          </div>
        </div>
        <div style="display:flex;gap:6px;justify-content:flex-end;margin-top:8px">
          <button type="button" class="xp-btn" onclick="closeModal('subModal')">${L.cancel}</button>
          <button type="submit" class="xp-btn primary">💾 ${L.save}</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ═══════════════ Group Modal ═══════════════ -->
<div class="xp-modal-bg" id="groupModal">
  <div class="xp-modal" style="max-width:420px">
    <div class="xp-titlebar">
      <span class="tb-icon">📁</span>
      <span class="tb-title" id="groupModalTitle">${L.add_group}</span>
      <div class="xp-controls">
        <button class="close" onclick="closeModal('groupModal')">✕</button>
      </div>
    </div>
    <div class="xp-content">
      <form onsubmit="saveGroup(event)">
        <input type="hidden" id="gEditId" value=""/>
        <div class="xp-field">
          <label class="xp-label">${L.name}</label>
          <input type="text" id="gName" class="xp-input" required/>
        </div>
        <div class="xp-field">
          <label class="xp-label">Color</label>
          <input type="color" id="gColor" class="xp-input" value="#0054E3" style="height:34px;padding:2px"/>
        </div>
        <div style="display:flex;gap:6px;justify-content:flex-end;margin-top:8px">
          <button type="button" class="xp-btn" onclick="closeModal('groupModal')">${L.cancel}</button>
          <button type="submit" class="xp-btn primary">💾 ${L.save}</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ═══════════════ QR Modal ═══════════════ -->
<div class="xp-modal-bg" id="qrModal">
  <div class="xp-modal" style="max-width:380px">
    <div class="xp-titlebar">
      <span class="tb-icon">📱</span>
      <span class="tb-title">${L.qr_code}</span>
      <div class="xp-controls">
        <button class="close" onclick="closeModal('qrModal')">✕</button>
      </div>
    </div>
    <div class="xp-content" style="text-align:center">
      <div id="qrImage" style="padding:14px;background:#fff;display:inline-block;border:1px solid #ACA899;border-radius:3px"></div>
      <div class="mono tiny mt-sm" id="qrUrl" style="word-break:break-all;padding:6px;background:#F7F6F0;border-radius:2px"></div>
      <div style="margin-top:10px">
        <button class="xp-btn primary" onclick="copyText(document.getElementById('qrUrl').textContent)">📋 ${L.copy}</button>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ Broadcast Modal ═══════════════ -->
<div class="xp-modal-bg" id="broadcastModal">
  <div class="xp-modal" style="max-width:500px">
    <div class="xp-titlebar">
      <span class="tb-icon">📢</span>
      <span class="tb-title">Broadcast</span>
      <div class="xp-controls">
        <button class="close" onclick="closeModal('broadcastModal')">✕</button>
      </div>
    </div>
    <div class="xp-content">
      <div class="xp-field">
        <label class="xp-label">پیام</label>
        <textarea id="broadcastText" class="xp-textarea" placeholder="متن پیام گروهی..."></textarea>
      </div>
      <div style="display:flex;gap:6px;justify-content:flex-end">
        <button class="xp-btn" onclick="closeModal('broadcastModal')">${L.cancel}</button>
        <button class="xp-btn primary" onclick="sendBroadcast()">📤 ارسال</button>
      </div>
    </div>
  </div>
</div>

<!-- Toast -->
<div class="xp-toast" id="toast">
  <div class="t-title" id="toastTitle">${APP_NAME}</div>
  <div class="t-body" id="toastBody"></div>
</div>

<script>
'use strict';
const WORKER = ${JSON.stringify(workerUrl)};
const SUB_PATH = ${JSON.stringify(subPath)};
const LANG = ${JSON.stringify(lang)};
const USERS_DATA = ${JSON.stringify(users.map(u => ({...u, links: undefined})))};
const USERS_FULL = ${JSON.stringify(users)};
const GROUPS = ${JSON.stringify(groups)};
const SUBS = ${JSON.stringify(subLinks)};

// ── Tabs ──
function switchTab(id){
  document.querySelectorAll('.xp-tab').forEach(t => t.classList.toggle('on', t.dataset.tab === id));
  document.querySelectorAll('.xp-tab-pane').forEach(p => p.classList.toggle('hidden', p.dataset.pane !== id));
  history.replaceState(null, '', '/admin?tab=' + id);
}
document.querySelectorAll('.xp-tab').forEach(t => {
  t.addEventListener('click', () => switchTab(t.dataset.tab));
});

// ── Start menu ──
function showStartMenu(e){
  e.stopPropagation();
  document.getElementById('startMenu').classList.toggle('hidden');
}
function hideStartMenu(){ document.getElementById('startMenu').classList.add('hidden'); }
document.addEventListener('click', e => {
  const sm = document.getElementById('startMenu');
  if (!sm.classList.contains('hidden') && !sm.contains(e.target)) sm.classList.add('hidden');
});

// ── Modal helpers ──
function openModal(id){ document.getElementById(id).classList.add('show'); }
function closeModal(id){ document.getElementById(id).classList.remove('show'); }
document.querySelectorAll('.xp-modal-bg').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('show'); });
});

// ── Toast ──
let toastTimer;
function toast(msg, type){
  const t = document.getElementById('toast');
  document.getElementById('toastTitle').textContent = type === 'err' ? '❌ Error' : type === 'ok' ? '✅ ' + '${APP_NAME}' : '🌉 ${APP_NAME}';
  document.getElementById('toastBody').textContent = msg;
  t.className = 'xp-toast show ' + (type || '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'xp-toast ' + (type || ''); }, 3000);
}

// ── Copy ──
function copyText(text){
  if (navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(text).then(() => toast('📋 Copied','ok')).catch(() => fallbackCopy(text));
  } else fallbackCopy(text);
}
function fallbackCopy(text){
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); toast('📋 Copied','ok'); } catch { toast('Copy failed','err'); }
  document.body.removeChild(ta);
}

// ── API helper ──
async function api(path, opts = {}){
  const r = await fetch(WORKER + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  });
  const txt = await r.text();
  let data = null;
  try { data = txt ? JSON.parse(txt) : null; } catch { data = { raw: txt }; }
  if (!r.ok) throw new Error((data && (data.error || data.raw)) || ('HTTP ' + r.status));
  return data;
}

// ── Language ──
function switchLang(l){
  document.cookie = 'lang=' + l + '; path=/; max-age=31536000';
  location.reload();
}

// ── Users ──
function openUserModal(token){
  document.getElementById('userModalTitle').textContent = token ? '${L.edit_user}' : '${L.add_user}';
  document.getElementById('uEditToken').value = token || '';
  if (token){
    const u = USERS_FULL.find(x => x.token === token);
    if (u){
      document.getElementById('uName').value = u.name || '';
      document.getElementById('uQuota').value = u.quotaGB || 0;
      document.getElementById('uDays').value = u.days || 0;
      document.getElementById('uGroup').value = u.group || '';
      document.getElementById('uTgId').value = u.tgId || '';
      document.getElementById('uLinks').value = u.links || '';
    }
  } else {
    document.getElementById('uName').value = '';
    document.getElementById('uQuota').value = 50;
    document.getElementById('uDays').value = 30;
    document.getElementById('uGroup').value = '';
    document.getElementById('uTgId').value = '';
    document.getElementById('uLinks').value = '';
  }
  openModal('userModal');
}
async function saveUser(e){
  e.preventDefault();
  const token = document.getElementById('uEditToken').value;
  const payload = {
    name: document.getElementById('uName').value.trim(),
    quotaGB: parseFloat(document.getElementById('uQuota').value) || 0,
    days: parseInt(document.getElementById('uDays').value) || 0,
    group: document.getElementById('uGroup').value || '',
    tgId: document.getElementById('uTgId').value.trim(),
    links: document.getElementById('uLinks').value.trim()
  };
  try {
    if (token) await api('/api/user/' + token, { method: 'PUT', body: JSON.stringify(payload) });
    else await api('/api/user', { method: 'POST', body: JSON.stringify(payload) });
    toast('${L.saved_ok}', 'ok');
    setTimeout(() => location.reload(), 500);
  } catch (e) { toast(e.message, 'err'); }
}
async function deleteUser(token){
  if (!confirm('${L.confirm_delete}')) return;
  try {
    await api('/api/user/' + token, { method: 'DELETE' });
    toast('${L.deleted_ok}', 'ok');
    setTimeout(() => location.reload(), 500);
  } catch (e) { toast(e.message, 'err'); }
}
function filterUsers(q){
  q = (q || '').toLowerCase();
  document.querySelectorAll('#usersTable tbody tr').forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ── Subs ──
function openSubModal(id){
  document.getElementById('subModalTitle').textContent = id ? '${L.edit_sub}' : '${L.add_sub}';
  document.getElementById('sEditId').value = id || '';
  if (id){
    const s = SUBS.find(x => x.id === id);
    if (s){
      document.getElementById('sName').value = s.name || '';
      document.getElementById('sGroup').value = s.group || '';
      document.getElementById('sPrefix').value = s.prefix || '';
      document.getElementById('sDirect').value = s.directLinks || '';
      document.getElementById('sQuota').value = s.quotaGB || 0;
      document.getElementById('sDays').value = s.days || 0;
      Array.from(document.getElementById('sSources').options).forEach(o => {
        o.selected = (s.sources || []).includes(o.value);
      });
    }
  } else {
    document.getElementById('sName').value = '';
    document.getElementById('sGroup').value = '';
    document.getElementById('sPrefix').value = '🌉 SAZ';
    document.getElementById('sDirect').value = '';
    document.getElementById('sQuota').value = 0;
    document.getElementById('sDays').value = 0;
    Array.from(document.getElementById('sSources').options).forEach(o => o.selected = false);
  }
  openModal('subModal');
}
async function saveSub(e){
  e.preventDefault();
  const id = document.getElementById('sEditId').value;
  const sources = Array.from(document.getElementById('sSources').selectedOptions).map(o => o.value);
  const payload = {
    name: document.getElementById('sName').value.trim(),
    group: document.getElementById('sGroup').value || '',
    prefix: document.getElementById('sPrefix').value.trim(),
    sources,
    directLinks: document.getElementById('sDirect').value.trim(),
    quotaGB: parseFloat(document.getElementById('sQuota').value) || 0,
    days: parseInt(document.getElementById('sDays').value) || 0
  };
  try {
    if (id) await api('/api/sub/' + id, { method: 'PUT', body: JSON.stringify(payload) });
    else await api('/api/sub', { method: 'POST', body: JSON.stringify(payload) });
    toast('${L.saved_ok}', 'ok');
    setTimeout(() => location.reload(), 500);
  } catch (e) { toast(e.message, 'err'); }
}
async function deleteSub(id){
  if (!confirm('${L.confirm_delete}')) return;
  try {
    await api('/api/sub/' + id, { method: 'DELETE' });
    toast('${L.deleted_ok}', 'ok');
    setTimeout(() => location.reload(), 500);
  } catch (e) { toast(e.message, 'err'); }
}

// ── Groups ──
function openGroupModal(){
  document.getElementById('groupModalTitle').textContent = '${L.add_group}';
  document.getElementById('gEditId').value = '';
  document.getElementById('gName').value = '';
  document.getElementById('gColor').value = '#0054E3';
  openModal('groupModal');
}
function openGroupEdit(id){
  const g = GROUPS.find(x => x.id === id);
  if (!g) return;
  document.getElementById('groupModalTitle').textContent = '${L.edit}';
  document.getElementById('gEditId').value = g.id;
  document.getElementById('gName').value = g.name || '';
  document.getElementById('gColor').value = g.color || '#0054E3';
  openModal('groupModal');
}
async function saveGroup(e){
  e.preventDefault();
  const id = document.getElementById('gEditId').value;
  const payload = {
    name: document.getElementById('gName').value.trim(),
    color: document.getElementById('gColor').value
  };
  try {
    if (id) await api('/api/group/' + id, { method: 'PUT', body: JSON.stringify(payload) });
    else await api('/api/group', { method: 'POST', body: JSON.stringify(payload) });
    toast('${L.saved_ok}', 'ok');
    setTimeout(() => location.reload(), 500);
  } catch (e) { toast(e.message, 'err'); }
}
async function deleteGroup(id){
  if (!confirm('${L.confirm_delete}')) return;
  try {
    await api('/api/group/' + id, { method: 'DELETE' });
    toast('${L.deleted_ok}', 'ok');
    setTimeout(() => location.reload(), 500);
  } catch (e) { toast(e.message, 'err'); }
}

// ── Bot ──
async function botAction(action){
  const input = document.getElementById('botTokenInput');
  const token = input ? input.value.trim() : '';
  try {
    await api('/api/bot/' + action, {
      method: 'POST',
      body: JSON.stringify(token ? { token } : {})
    });
    toast('${L.saved_ok}', 'ok');
    setTimeout(() => location.reload(), 700);
  } catch (e) { toast(e.message, 'err'); }
}
function openBroadcastModal(){ openModal('broadcastModal'); }
async function sendBroadcast(){
  const text = document.getElementById('broadcastText').value.trim();
  if (!text) return toast('Empty message', 'err');
  try {
    const r = await api('/api/bot/broadcast', { method:'POST', body: JSON.stringify({ text }) });
    toast('Sent to ' + (r.sent || 0) + ' users', 'ok');
    closeModal('broadcastModal');
  } catch (e) { toast(e.message, 'err'); }
}

// ── Settings ──
async function saveSettings(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const payload = {};
  for (const [k, v] of fd.entries()) if (v) payload[k] = v;
  try {
    await api('/api/config', { method: 'POST', body: JSON.stringify(payload) });
    toast('${L.saved_ok}', 'ok');
    setTimeout(() => location.reload(), 800);
  } catch (err) { toast(err.message, 'err'); }
}

// ── QR ──
function showQR(url){
  const img = document.getElementById('qrImage');
  const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=' + encodeURIComponent(url);
  img.innerHTML = '<img src="' + qrUrl + '" width="240" height="240" alt="QR"/>';
  document.getElementById('qrUrl').textContent = url;
  openModal('qrModal');
}

// ── Backup ──
async function exportBackup(){
  try {
    const data = await api('/api/backup', { method: 'GET' });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'saz-bridge-backup-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('${L.saved_ok}', 'ok');
  } catch (e) { toast(e.message, 'err'); }
}
async function importBackup(input){
  const file = input.files && input.files[0];
  if (!file) return;
  if (!confirm('${L.confirm_delete}')) { input.value = ''; return; }
  const text = await file.text();
  try {
    const json = JSON.parse(text);
    await api('/api/restore', { method: 'POST', body: JSON.stringify(json) });
    toast('${L.saved_ok}', 'ok');
    setTimeout(() => location.reload(), 800);
  } catch (e) { toast(e.message, 'err'); }
  input.value = '';
}

// ── Misc ──
function toggleFullscreen(){
  if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
  else document.exitFullscreen && document.exitFullscreen();
}

// ── Clock ──
setInterval(() => {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit'});
}, 30000);

// ── Keyboard ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.xp-modal-bg.show').forEach(m => m.classList.remove('show'));
  if (e.key === 'F5' && e.ctrlKey) { e.preventDefault(); location.reload(); }
});

// ── Menu items (visual) ──
document.querySelectorAll('.menu-item').forEach(m => {
  m.addEventListener('click', () => {
    const k = m.dataset.menu;
    if (k === 'lang') switchLang(LANG === 'fa' ? 'en' : LANG === 'en' ? 'ru' : LANG === 'ru' ? 'zh' : 'fa');
    else if (k === 'file' || k === 'view' || k === 'tools' || k === 'help')
      toast('Menu: ' + k, 'info');
  });
});
</script>
</body>
</html>`;
}

// Helpers for dashboard
function renderTab(id, ico, label, active, badge){
  const on = active === id ? 'on' : '';
  const b = (badge !== '' && badge !== undefined && badge !== null)
    ? `<span class="count">${badge}</span>` : '';
  return `<button class="xp-tab ${on}" data-tab="${id}"><span>${ico}</span> <span class="label">${label}</span> ${b}</button>`;
}

function renderUserRow(u, workerUrl, subPath, groups, lang) {
  const L = I18N[lang] || I18N.fa;
  const now = Math.floor(Date.now() / 1000);
  const disabled = u.status === 'disabled';
  const expired = u.expiry > 0 && u.expiry < now;
  const qb = (u.quotaGB || 0) * 1024 * 1024 * 1024;
  const used = u.usedTraffic || 0;
  const pct = qb > 0 ? Math.min(100, (used / qb) * 100) : 0;
  const cls = pct > 85 ? 'danger' : pct > 60 ? 'warn' : '';
  const grp = groups.find(g => g.id === u.group);
  const subUrl = `${workerUrl}/${subPath}/${u.token}`;
  const dl = daysLeft(u.expiry);

  let badge = `<span class="xp-badge ok">● ${L.active}</span>`;
  if (disabled) badge = `<span class="xp-badge err">● ${L.disabled}</span>`;
  else if (expired) badge = `<span class="xp-badge warn">● ${L.expired}</span>`;

  const grpChip = grp
    ? `<span class="xp-badge info" style="background:${grp.color}20;border-color:${grp.color};color:${grp.color}">
         <span style="width:7px;height:7px;border-radius:50%;background:${grp.color};display:inline-block"></span>
         ${escapeHtml(grp.name)}
       </span>`
    : '<span class="muted tiny">—</span>';

  return `<tr>
    <td>
      <div style="display:flex;align-items:center;gap:8px;min-width:0">
        <div class="xp-avatar">${escapeHtml((u.name||'U')[0]).toUpperCase()}</div>
        <div style="min-width:0">
          <div style="font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(u.name)}</div>
          <div class="mono tiny muted">${u.token.substring(0,14)}...</div>
        </div>
      </div>
    </td>
    <td>${badge}</td>
    <td style="min-width:130px">
      <div class="xp-progress ${cls}"><div style="width:${pct}%"></div></div>
      <div class="tiny mono" style="margin-top:3px">${formatBytes(used)} / ${u.quotaGB > 0 ? u.quotaGB + ' GB' : '∞'}</div>
    </td>
    <td>
      <div class="small">${formatDate(u.expiry)}</div>
      ${dl !== null ? `<div class="tiny muted">${dl} ${L.days_left}</div>` : ''}
    </td>
    <td>${grpChip}</td>
    <td>
      <div style="display:flex;gap:3px;justify-content:center">
        <button class="xp-icon-btn" title="${L.copy}" onclick="copyText('${subUrl}')">📋</button>
        <button class="xp-icon-btn" title="${L.qr_code}" onclick="showQR('${subUrl}')">📱</button>
        <button class="xp-icon-btn" title="${L.edit}" onclick="openUserModal('${u.token}')">✏️</button>
        <button class="xp-icon-btn" title="${L.delete}" onclick="deleteUser('${u.token}')">🗑️</button>
      </div>
    </td>
  </tr>`;
}

function renderSubCard(s, workerUrl, subPath, groups, users, lang) {
  const L = I18N[lang] || I18N.fa;
  const now = Math.floor(Date.now() / 1000);
  const expired = s.expiry > 0 && s.expiry < now;
  const grp = groups.find(g => g.id === s.group);
  const subUrl = `${workerUrl}/${subPath}/${s.token}`;
  const srcCount = (s.sources || []).length;
  const directCount = (s.directLinks || '').split('\n').filter(l => l.trim()).length;
  const total = srcCount + directCount;
  const visits = s.visits || 0;

  return `<div class="xp-sub-card">
    <h4>
      <span>${escapeHtml(s.prefix || '🔗')}</span>
      <span>${escapeHtml(s.name)}</span>
      <span style="flex:1"></span>
      ${expired
        ? `<span class="xp-badge err">${L.expired}</span>`
        : `<span class="xp-badge ok">${L.active}</span>`}
    </h4>
    ${grp ? `<div class="tiny muted" style="margin-bottom:3px">${escapeHtml(grp.name)}</div>` : ''}
    <div class="xp-sub-url" onclick="copyText('${subUrl}')" title="${L.copy}">${subUrl}</div>
    <div class="xp-sub-stats">
      <span>📦 ${total}</span>
      <span>👁️ ${visits}</span>
      ${s.quotaGB > 0 ? `<span>💾 ${s.quotaGB} GB</span>` : ''}
    </div>
    <div style="display:flex;gap:3px;justify-content:flex-end">
      <button class="xp-icon-btn" title="${L.copy}" onclick="copyText('${subUrl}')">📋</button>
      <button class="xp-icon-btn" title="${L.qr_code}" onclick="showQR('${subUrl}')">📱</button>
      <button class="xp-icon-btn" title="${L.edit}" onclick="openSubModal('${s.id}')">✏️</button>
      <button class="xp-icon-btn" title="${L.delete}" onclick="deleteSub('${s.id}')">🗑️</button>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────────────
//  LOGO INLINE (small, for pages)
// ─────────────────────────────────────────────────────────────────
const LOGO_SVG_INLINE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
<defs>
<linearGradient id="lgb" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="#0058E6"/><stop offset="8%" stop-color="#3A93FF"/>
<stop offset="40%" stop-color="#0054E3"/><stop offset="88%" stop-color="#0046CA"/>
<stop offset="100%" stop-color="#003DB8"/>
</linearGradient>
<linearGradient id="lgg" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="#fff" stop-opacity=".7"/><stop offset="50%" stop-color="#fff" stop-opacity=".05"/>
<stop offset="51%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".15"/>
</linearGradient>
</defs>
<rect x="4" y="10" width="120" height="108" rx="6" fill="url(#lgb)"/>
<rect x="4" y="10" width="120" height="16" fill="url(#lgg)" rx="6"/>
<circle cx="12" cy="18" r="3" fill="#7FBA00"/>
<text x="20" y="21" font-family="Tahoma,sans-serif" font-size="6" font-weight="bold" fill="#fff">SAZ Bridge</text>
<rect x="5" y="26" width="118" height="91" fill="#ECE9D8"/>
<g fill="none" stroke="#0054E3" stroke-linecap="round" stroke-width="3">
<path d="M24 92 Q64 46 104 92"/>
<path d="M20 102 L108 102"/>
<line x1="42" y1="72" x2="42" y2="102" stroke-width="2"/>
<line x1="64" y1="46" x2="64" y2="102" stroke-width="2"/>
<line x1="86" y1="72" x2="86" y2="102" stroke-width="2"/>
</g>
<circle cx="64" cy="46" r="4" fill="#7FBA00" stroke="#fff" stroke-width="1.5"/>
</svg>`;

// ─────────────────────────────────────────────────────────────────
//  MAIN FETCH HANDLER
// ─────────────────────────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const method = request.method;
      const workerUrl = url.origin;

      // ── Config ──
      const config = await getConfig(env);
      const isSetup = !config;

      // ── Language ──
      const lang = getLang(request, config);

      // ── Sub path ──
      const subPath = (config && config.subPath)
        ? config.subPath
        : (env.SUB_PATH || DEFAULT_SUB_PATH);

      // ── CORS preflight ──
      if (method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400'
          }
        });
      }

      // ═══════════════════════════════════════════
      //  SETUP (first run)
      // ═══════════════════════════════════════════
      if (isSetup && path !== '/setup' && !path.startsWith('/api/')) {
        return new Response(renderSetup(workerUrl, lang), {
          status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      if (path === '/setup' && method === 'POST') {
        try {
          const fd = await request.formData();
          const password = String(fd.get('password') || '');
          const subPathNew = String(fd.get('subPath') || 'sub').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32) || 'sub';
          const defaultLang = String(fd.get('defaultLang') || 'fa');
          const theme = String(fd.get('theme') || 'luna');
          const botToken = String(fd.get('botToken') || '').trim();

          if (password.length < 6) {
            return new Response(renderSetup(workerUrl, lang, 'رمز عبور حداقل ۶ کاراکتر'), {
              status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          }

          const passwordHash = await hashPassword(password);
          const newConfig = {
            passwordHash,
            subPath: subPathNew,
            defaultLang: ['fa','en','ru','zh'].includes(defaultLang) ? defaultLang : 'fa',
            theme: ['luna','classic','silver'].includes(theme) ? theme : 'luna',
            botToken: botToken || '',
            announcement: '',
            createdAt: Math.floor(Date.now() / 1000)
          };
          await saveConfig(env, newConfig);

          const sessionToken = await createSession(env);
          return new Response(null, {
            status: 302,
            headers: {
              'Location': '/admin',
              'Set-Cookie': `session=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL}`
            }
          });
        } catch (e) {
          return new Response(renderSetup(workerUrl, lang, 'خطا: ' + e.message), {
            status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }
      }

      // ═══════════════════════════════════════════
      //  LOGIN
      // ═══════════════════════════════════════════
      if (path === '/login' && method === 'POST') {
        if (!config) return new Response(null, { status: 302, headers: { 'Location': '/setup' } });
        try {
          const fd = await request.formData();
          const password = String(fd.get('password') || '');
          const hash = await hashPassword(password);
          if (hash === config.passwordHash) {
            const sessionToken = await createSession(env);
            return new Response(null, {
              status: 302,
              headers: {
                'Location': '/admin',
                'Set-Cookie': `session=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL}`
              }
            });
          }
          return new Response(renderLogin(workerUrl, lang, I18N[lang].wrong_password), {
            status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        } catch (e) {
          return new Response(renderLogin(workerUrl, lang, 'Error'), {
            status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }
      }

      if (path === '/logout') {
        await destroySession(request, env);
        return new Response(null, {
          status: 302,
          headers: {
            'Location': '/',
            'Set-Cookie': 'session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
          }
        });
      }

      // ═══════════════════════════════════════════
      //  ADMIN PANEL
      // ═══════════════════════════════════════════
      if (path === '/admin' || path === '/admin/') {
        if (!await verifySession(request, env)) {
          return new Response(renderLogin(workerUrl, lang), {
            status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }

        const users = await getUsers(env);
        const groups = await getGroups(env);
        const subLinks = await getSubLinks(env);

        let botInfo = { ok: false };
        const botToken = (config && config.botToken) || env.BOT_TOKEN;
        if (botToken) {
          try {
            const envWithToken = { ...env, BOT_TOKEN: botToken };
            const me = await tgApi(envWithToken, 'getMe', {});
            if (me.ok) {
              const wh = await tgApi(envWithToken, 'getWebhookInfo', {});
              botInfo = {
                ok: true,
                username: me.result.username,
                first_name: me.result.first_name,
                webhook: (wh.ok && wh.result.url) || ''
              };
            }
          } catch {}
        }

        const activeTab = url.searchParams.get('tab') || 'home';

        return new Response(renderDashboard({
          users, groups, subLinks, config, workerUrl, subPath, botInfo, activeTab, lang
        }), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }

      // ═══════════════════════════════════════════
      //  API ROUTES
      // ═══════════════════════════════════════════
      const authOk = await verifySession(request, env);

      // ── GET /api/config ──
      if (path === '/api/config' && method === 'GET') {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        const safe = { ...config };
        delete safe.passwordHash;
        delete safe.botToken;
        return json(safe);
      }

      // ── POST /api/config ──
      if (path === '/api/config' && method === 'POST') {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        try {
          const b = await request.json();
          const next = { ...config };
          if (b.subPath) {
            const sp = String(b.subPath).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
            if (sp) next.subPath = sp;
          }
          if (b.defaultLang && ['fa','en','ru','zh'].includes(b.defaultLang)) next.defaultLang = b.defaultLang;
          if (b.theme && ['luna','classic','silver'].includes(b.theme)) next.theme = b.theme;
          if (typeof b.announcement === 'string') next.announcement = b.announcement.slice(0, 500);
          if (b.botToken !== undefined) next.botToken = String(b.botToken).trim();
          if (b.newPassword && String(b.newPassword).length >= 6) {
            next.passwordHash = await hashPassword(String(b.newPassword));
          }
          await saveConfig(env, next);
          return json({ ok: true });
        } catch (e) { return json({ error: e.message }, 400); }
      }

      // ── POST /api/user (create) ──
      if (path === '/api/user' && method === 'POST') {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        try {
          const b = await request.json();
          if (!b.name || !b.name.trim()) return json({ error: 'Name required' }, 400);
          const token = randomToken(24);
          const now = Math.floor(Date.now() / 1000);
          const expiry = b.days > 0 ? now + (b.days * 86400) : 0;
          const newUser = {
            token,
            name: b.name.trim().slice(0, 64),
            quotaGB: Math.max(0, Number(b.quotaGB) || 0),
            days: Math.max(0, Number(b.days) || 0),
            usedTraffic: 0,
            expiry,
            links: String(b.links || '').slice(0, 20000),
            group: b.group || '',
            tgId: String(b.tgId || '').trim(),
            status: 'active',
            createdAt: now
          };
          const users = await getUsers(env);
          users.push(newUser);
          await saveUsers(env, users);
          return json({ ok: true, token }, 201);
        } catch (e) { return json({ error: e.message }, 400); }
      }

      // ── PUT/DELETE /api/user/:token ──
      if (path.startsWith('/api/user/')) {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        const token = path.slice('/api/user/'.length);

        if (method === 'PUT') {
          try {
            const b = await request.json();
            const users = await getUsers(env);
            const i = users.findIndex(u => u.token === token);
            if (i === -1) return json({ error: 'Not found' }, 404);
            const u = users[i];
            const now = Math.floor(Date.now() / 1000);
            const days = b.days !== undefined ? Math.max(0, Number(b.days) || 0) : u.days;
            users[i] = {
              ...u,
              name: b.name !== undefined ? String(b.name).trim().slice(0, 64) : u.name,
              quotaGB: b.quotaGB !== undefined ? Math.max(0, Number(b.quotaGB) || 0) : u.quotaGB,
              days,
              links: b.links !== undefined ? String(b.links).slice(0, 20000) : u.links,
              group: b.group !== undefined ? b.group : u.group,
              tgId: b.tgId !== undefined ? String(b.tgId).trim() : u.tgId,
              expiry: b.days !== undefined ? (days > 0 ? now + (days * 86400) : 0) : u.expiry
            };
            await saveUsers(env, users);
            return json({ ok: true });
          } catch (e) { return json({ error: e.message }, 400); }
        }

        if (method === 'DELETE') {
          const ok = await deleteUserKV(env, token);
          return json({ ok }, ok ? 200 : 404);
        }
      }

      // ── POST /api/sub ──
      if (path === '/api/sub' && method === 'POST') {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        try {
          const b = await request.json();
          if (!b.name || !b.name.trim()) return json({ error: 'Name required' }, 400);
          const now = Math.floor(Date.now() / 1000);
          const newSub = {
            id: randomToken(16),
            token: randomToken(20),
            name: b.name.trim().slice(0, 64),
            group: b.group || '',
            prefix: String(b.prefix || '').slice(0, 32),
            sources: Array.isArray(b.sources) ? b.sources.filter(x => typeof x === 'string').slice(0, 500) : [],
            directLinks: String(b.directLinks || '').slice(0, 40000),
            quotaGB: Math.max(0, Number(b.quotaGB) || 0),
            days: Math.max(0, Number(b.days) || 0),
            usedTraffic: 0,
            visits: 0,
            expiry: b.days > 0 ? now + (b.days * 86400) : 0,
            createdAt: now
          };
          const subs = await getSubLinks(env);
          subs.push(newSub);
          await saveSubLinks(env, subs);
          return json({ ok: true, id: newSub.id }, 201);
        } catch (e) { return json({ error: e.message }, 400); }
      }

      // ── PUT/DELETE /api/sub/:id ──
      if (path.startsWith('/api/sub/')) {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        const id = path.slice('/api/sub/'.length);

        if (method === 'PUT') {
          try {
            const b = await request.json();
            const subs = await getSubLinks(env);
            const i = subs.findIndex(s => s.id === id);
            if (i === -1) return json({ error: 'Not found' }, 404);
            const s = subs[i];
            const now = Math.floor(Date.now() / 1000);
            const days = b.days !== undefined ? Math.max(0, Number(b.days) || 0) : s.days;
            subs[i] = {
              ...s,
              name: b.name !== undefined ? String(b.name).trim().slice(0, 64) : s.name,
              group: b.group !== undefined ? b.group : s.group,
              prefix: b.prefix !== undefined ? String(b.prefix).slice(0, 32) : s.prefix,
              sources: Array.isArray(b.sources) ? b.sources.filter(x => typeof x === 'string').slice(0, 500) : s.sources,
              directLinks: b.directLinks !== undefined ? String(b.directLinks).slice(0, 40000) : s.directLinks,
              quotaGB: b.quotaGB !== undefined ? Math.max(0, Number(b.quotaGB) || 0) : s.quotaGB,
              days,
              expiry: b.days !== undefined ? (days > 0 ? now + (days * 86400) : 0) : s.expiry
            };
            await saveSubLinks(env, subs);
            return json({ ok: true });
          } catch (e) { return json({ error: e.message }, 400); }
        }

        if (method === 'DELETE') {
          const subs = await getSubLinks(env);
          const f = subs.filter(s => s.id !== id);
          if (f.length === subs.length) return json({ error: 'Not found' }, 404);
          await saveSubLinks(env, f);
          return json({ ok: true });
        }
      }

      // ── POST /api/group ──
      if (path === '/api/group' && method === 'POST') {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        try {
          const b = await request.json();
          if (!b.name || !b.name.trim()) return json({ error: 'Name required' }, 400);
          const g = {
            id: randomToken(12),
            name: b.name.trim().slice(0, 32),
            color: /^#[0-9a-fA-F]{6}$/.test(b.color) ? b.color : '#0054E3',
            createdAt: Math.floor(Date.now() / 1000)
          };
          const groups = await getGroups(env);
          groups.push(g);
          await saveGroups(env, groups);
          return json({ ok: true, id: g.id }, 201);
        } catch (e) { return json({ error: e.message }, 400); }
      }

      // ── PUT/DELETE /api/group/:id ──
      if (path.startsWith('/api/group/')) {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        const id = path.slice('/api/group/'.length);

        if (method === 'PUT') {
          try {
            const b = await request.json();
            const groups = await getGroups(env);
            const i = groups.findIndex(g => g.id === id);
            if (i === -1) return json({ error: 'Not found' }, 404);
            groups[i] = {
              ...groups[i],
              name: b.name !== undefined ? String(b.name).trim().slice(0, 32) : groups[i].name,
              color: /^#[0-9a-fA-F]{6}$/.test(b.color) ? b.color : groups[i].color
            };
            await saveGroups(env, groups);
            return json({ ok: true });
          } catch (e) { return json({ error: e.message }, 400); }
        }

        if (method === 'DELETE') {
          const groups = await getGroups(env);
          const f = groups.filter(g => g.id !== id);
          if (f.length === groups.length) return json({ error: 'Not found' }, 404);
          await saveGroups(env, f);
          // Detach
          const users = await getUsers(env);
          let userChanged = false;
          users.forEach(u => { if (u.group === id) { u.group = ''; userChanged = true; } });
          if (userChanged) await saveUsers(env, users);
          const subs = await getSubLinks(env);
          let subChanged = false;
          subs.forEach(s => { if (s.group === id) { s.group = ''; subChanged = true; } });
          if (subChanged) await saveSubLinks(env, subs);
          return json({ ok: true });
        }
      }

      // ── POST /api/bot/set-webhook ──
      if (path === '/api/bot/set-webhook' && method === 'POST') {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        try {
          const b = await request.json().catch(() => ({}));
          let botToken = (b.token && b.token.trim()) || (config && config.botToken) || env.BOT_TOKEN;
          if (!botToken) return json({ error: 'BOT_TOKEN not set' }, 400);

          // Save to config if provided
          if (b.token && b.token.trim()) {
            const next = { ...config, botToken: b.token.trim() };
            await saveConfig(env, next);
          }

          const webhookUrl = `${workerUrl}/tg-webhook`;
          const r = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url: webhookUrl,
              allowed_updates: ['message', 'callback_query'],
              drop_pending_updates: true
            })
          });
          const data = await r.json();
          if (!data.ok) return json({ error: data.description || 'Failed' }, 400);
          return json({ ok: true, webhook: webhookUrl });
        } catch (e) { return json({ error: e.message }, 500); }
      }

      // ── POST /api/bot/unset-webhook ──
      if (path === '/api/bot/unset-webhook' && method === 'POST') {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        const botToken = (config && config.botToken) || env.BOT_TOKEN;
        if (!botToken) return json({ error: 'BOT_TOKEN not set' }, 400);
        await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook`, { method: 'POST' });
        return json({ ok: true });
      }

      // ── POST /api/bot/broadcast ──
      if (path === '/api/bot/broadcast' && method === 'POST') {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        try {
          const b = await request.json();
          const text = String(b.text || '').trim();
          if (!text) return json({ error: 'Empty text' }, 400);
          const botToken = (config && config.botToken) || env.BOT_TOKEN;
          if (!botToken) return json({ error: 'BOT_TOKEN not set' }, 400);
          const envWithToken = { ...env, BOT_TOKEN: botToken };
          const users = await getUsers(env);
          let sent = 0, failed = 0;
          for (const u of users) {
            if (!u.tgId) continue;
            try {
              const r = await tgSend(envWithToken, u.tgId, text);
              if (r.ok) sent++; else failed++;
            } catch { failed++; }
          }
          return json({ ok: true, sent, failed });
        } catch (e) { return json({ error: e.message }, 500); }
      }

      // ── GET /api/backup ──
      if (path === '/api/backup' && method === 'GET') {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        const users = await getUsers(env);
        const groups = await getGroups(env);
        const subLinks = await getSubLinks(env);
        const safeConfig = { ...config };
        delete safeConfig.passwordHash;
        return json({
          version: VERSION,
          app: APP_NAME,
          exportedAt: new Date().toISOString(),
          config: safeConfig,
          users,
          groups,
          subLinks
        });
      }

      // ── POST /api/restore ──
      if (path === '/api/restore' && method === 'POST') {
        if (!authOk) return json({ error: 'Unauthorized' }, 401);
        try {
          const b = await request.json();
          if (Array.isArray(b.users)) await saveUsers(env, b.users);
          if (Array.isArray(b.groups)) await saveGroups(env, b.groups);
          if (Array.isArray(b.subLinks)) await saveSubLinks(env, b.subLinks);
          if (b.config && typeof b.config === 'object') {
            const merged = { ...config };
            if (b.config.subPath) merged.subPath = String(b.config.subPath).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
            if (b.config.defaultLang && ['fa','en','ru','zh'].includes(b.config.defaultLang)) merged.defaultLang = b.config.defaultLang;
            if (b.config.theme && ['luna','classic','silver'].includes(b.config.theme)) merged.theme = b.config.theme;
            if (typeof b.config.announcement === 'string') merged.announcement = b.config.announcement.slice(0, 500);
            if (typeof b.config.botToken === 'string') merged.botToken = b.config.botToken;
            await saveConfig(env, merged);
          }
          return json({ ok: true });
        } catch (e) { return json({ error: e.message }, 400); }
      }

      // ═══════════════════════════════════════════
      //  TELEGRAM WEBHOOK
      // ═══════════════════════════════════════════
      if (path === '/tg-webhook' && method === 'POST') {
        try {
          const botToken = (config && config.botToken) || env.BOT_TOKEN;
          if (!botToken) return json({ ok: false, error: 'No bot token' });
          const envWithToken = { ...env, BOT_TOKEN: botToken };
          const update = await request.json();
          ctx.waitUntil(handleTelegramUpdate(envWithToken, update, workerUrl, subPath, config));
          return json({ ok: true });
        } catch (e) {
          return json({ ok: false, error: e.message });
        }
      }

      // ═══════════════════════════════════════════
      //  SUBSCRIPTION FEED
      // ═══════════════════════════════════════════
      if (path.startsWith('/' + subPath + '/') && method === 'GET') {
        const token = path.split('/').pop();
        if (!token) {
          return new Response(renderSimplePage(lang, '404', I18N[lang].no_data), {
            status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }

        const users = await getUsers(env);
        const subs = await getSubLinks(env);

        const user = users.find(u => u.token === token);
        const sub = !user ? subs.find(s => s.token === token) : null;

        if (!user && !sub) {
          return new Response(renderSimplePage(lang, '404', I18N[lang].no_data), {
            status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }

        const now = Math.floor(Date.now() / 1000);
        let allLinks = [];

        if (user) {
          if (user.status === 'disabled') {
            return new Response(renderSimplePage(lang, '🚫', I18N[lang].disabled), {
              status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          }
          if (user.expiry > 0 && user.expiry < now) {
            return new Response(renderSimplePage(lang, '⏰', I18N[lang].expired), {
              status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          }
          const qb = (user.quotaGB || 0) * 1024 * 1024 * 1024;
          if (qb > 0 && (user.usedTraffic || 0) >= qb) {
            return new Response(renderSimplePage(lang, '📵', I18N[lang].expired), {
              status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          }
          allLinks = (user.links || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        } else if (sub) {
          if (sub.expiry > 0 && sub.expiry < now) {
            return new Response(renderSimplePage(lang, '⏰', I18N[lang].expired), {
              status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          }
          (sub.sources || []).forEach(tok => {
            const u = users.find(x => x.token === tok);
            if (!u || u.status === 'disabled') return;
            if (u.expiry > 0 && u.expiry < now) return;
            const links = (u.links || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
            allLinks.push(...links);
          });
          const direct = (sub.directLinks || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
          allLinks.push(...direct);

          // Increment visits
          sub.visits = (sub.visits || 0) + 1;
          const si = subs.findIndex(x => x.id === sub.id);
          if (si !== -1) { subs[si] = sub; await saveSubLinks(env, subs); }
        }

        const validLinks = allLinks.filter(isValidProxyLink);

        if (validLinks.length === 0) {
          return new Response('', {
            status: 200,
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Cache-Control': 'no-store'
            }
          });
        }

        // Encode
        const b64 = b64Encode(validLinks.join('\n'));

        // Update traffic
        if (user) {
          const newUsed = (user.usedTraffic || 0) + (validLinks.length * 512);
          await updateUser(env, user.token, { usedTraffic: newUsed });
        }

        // User-Agent
        const ua = (request.headers.get('User-Agent') || '').toLowerCase();
        const ct = (ua.includes('clash') || ua.includes('mihomo'))
          ? 'text/yaml; charset=utf-8'
          : 'text/plain; charset=utf-8';

        const qb = (user ? (user.quotaGB || 0) : (sub.quotaGB || 0)) * 1024 * 1024 * 1024;
        const used = user ? (user.usedTraffic || 0) + (validLinks.length * 512) : 0;
        const exp = (user ? user.expiry : sub.expiry) || 0;

        return new Response(b64, {
          status: 200,
          headers: {
            'Content-Type': ct,
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Profile-Update-Interval': '6',
            'Subscription-Userinfo': `upload=0; download=${used}; total=${qb}; expire=${exp}`,
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // ═══════════════════════════════════════════
      //  ROOT
      // ═══════════════════════════════════════════
      if (path === '/' || path === '') {
        if (await verifySession(request, env)) {
          return new Response(null, { status: 302, headers: { 'Location': '/admin' } });
        }
        return new Response(renderLogin(workerUrl, lang), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // ═══════════════════════════════════════════
      //  404
      // ═══════════════════════════════════════════
      return new Response(renderSimplePage(lang, '🔍', I18N[lang].no_data), {
        status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });

    } catch (err) {
      return new Response(renderSimplePage(lang || 'fa', '⚠️', 'Error: ' + (err && err.message || err)), {
        status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
  }
};

// ─────────────────────────────────────────────────────────────────
//  SIMPLE PAGE (errors, expired)
// ─────────────────────────────────────────────────────────────────
function renderSimplePage(lang, icon, msg) {
  const L = I18N[lang] || I18N.fa;
  const dir = L.dir;
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${APP_NAME}</title>
<style>${XP_CSS}
body{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
.xp-simple{
  background:#ECE9D8;border:1px solid var(--xp-blue-5);border-radius:8px 8px 0 0;
  max-width:420px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,.5);
  animation:winOpen .3s cubic-bezier(.16,1,.3,1);
}
.xp-simple-body{padding:30px 24px;text-align:center;background:#fff;border-top:1px solid #ACA899}
.xp-simple .ico{font-size:56px;margin-bottom:12px}
.xp-simple h2{font-size:16px;color:var(--xp-title-text);margin-bottom:6px}
.xp-simple p{font-size:12px;color:#666;line-height:1.8}
.xp-simple .cred{
  margin-top:18px;padding-top:14px;border-top:1px solid #E0DDD4;
  font-size:10px;color:#888;display:flex;align-items:center;justify-content:center;gap:5px;
}
.xp-simple .cred img{width:20px;height:20px;border-radius:3px;border:1px solid var(--xp-blue-3)}
.xp-simple .cred a{color:var(--xp-blue-3);font-weight:700}
</style>
</head>
<body>
<div class="xp-simple">
  <div class="xp-titlebar">
    <span class="tb-icon">🌉</span>
    <span class="tb-title">${APP_NAME}</span>
    <div class="xp-controls">
      <button title="Close" class="close" onclick="window.close()">✕</button>
    </div>
  </div>
  <div class="xp-simple-body">
    <div class="ico">${icon}</div>
    <h2>${escapeHtml(msg)}</h2>
    <div class="cred">
      <img src="${DEV_AVATAR}" alt="${DEV_NAME}"/>
      ${L.dev_credit}
      <a href="${DEV_GITHUB}" target="_blank">${DEV_NAME}</a>
    </div>
  </div>
</div>
</body>
</html>`;
}