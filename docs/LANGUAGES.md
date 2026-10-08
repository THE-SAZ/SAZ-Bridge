# 🌍 Languages — SAZ Bridge v0.0.7

SAZ Bridge از ۴ زبان کامل پشتیبانی می‌کند.

## زبان‌های موجود

| زبان | کد | نام بومی | جهت |
|------|----|---------|-----|
| Persian | `fa` | فارسی | RTL |
| English | `en` | English | LTR |
| Russian | `ru` | Русский | LTR |
| Chinese | `zh` | 中文 | LTR |

## مکانیزم تشخیص زبان

1. **Cookie `lang`** — اگر کاربر قبلاً انتخاب کرده
2. **Accept-Language Header** — بر اساس مرورگر
3. **Config پیش‌فرض** — از تنظیمات پنل
4. **Fallback** — `fa`

## تغییر زبان

### از پنل
Start Menu → Settings → Language → انتخاب زبان

### از URL
```
https://your-worker.workers.dev/?lang=en
```

### از Cookie (JS)
```js
document.cookie = 'lang=ru; path=/; max-age=31536000';
```

## افزودن زبان جدید

فایل `_worker.js` را باز کنید و به آبجکت `I18N` زبان جدید اضافه کنید:

```js
const I18N = {
  // ...
  de: {
    app_name: 'SAZ Bridge',
    login: 'Anmelden',
    password: 'Passwort',
    // ...
  }
};
```

## ساختار کلیدها

کلیدها به‌صورت دسته‌بندی‌شده هستند:
- `app_*` — نام برنامه
- `nav_*` — ناوبری
- `user_*` — کاربران
- `sub_*` — ساب‌لینک‌ها
- `group_*` — گروه‌ها
- `bot_*` — ربات
- `msg_*` — پیام‌ها
- `btn_*` — دکمه‌ها

---

<div align="center">
<b>THE SAZ</b> · <a href="https://github.com/THE-SAZ">GitHub</a>
</div>