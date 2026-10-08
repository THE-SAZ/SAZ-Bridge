# 📡 SAZ Bridge API Reference — v0.0.7

تمام endpoint ها با Cookie `session` احراز هویت می‌شوند (بجز موارد عمومی).

Base URL: `https://your-worker.workers.dev`

---

## 🔐 Authentication

### `POST /login`
ورود با رمز عبور.

**Body (form-data)**: `password=...`

**Response**: `302` → `/admin` با Cookie `session`

### `GET /logout`
خروج و پاک کردن سشن.

---

## 👥 Users

### `GET /api/users`
لیست تمام کاربران.

**Response**:
```json
[
  {
    "token": "a1b2c3...",
    "name": "Ali",
    "quotaGB": 50,
    "usedTraffic": 1073741824,
    "expiry": 1735689600,
    "status": "active",
    "group": "grp_abc",
    "tgId": "123456789",
    "createdAt": 1700000000
  }
]
```

### `POST /api/user`
ساخت کاربر جدید.

**Body**:
```json
{
  "name": "Ali",
  "quotaGB": 50,
  "days": 30,
  "group": "grp_abc",
  "tgId": "123456789",
  "links": "vmess://...\nvless://..."
}
```

### `PUT /api/user/:token`
بروزرسانی کاربر.

### `DELETE /api/user/:token`
حذف کاربر.

---

## 🔗 Sub Links

### `GET /api/subs`
لیست ساب‌لینک‌ها.

### `POST /api/sub`
ساخت ساب جدید.

**Body**:
```json
{
  "name": "Netflix Sub",
  "group": "grp_abc",
  "prefix": "🌉 SAZ",
  "sources": ["token1", "token2"],
  "directLinks": "vmess://...",
  "quotaGB": 0,
  "days": 0
}
```

### `PUT /api/sub/:id`
### `DELETE /api/sub/:id`

---

## 📁 Groups

### `GET /api/groups`
### `POST /api/group`
```json
{ "name": "VIP", "color": "#7FBA00" }
```
### `DELETE /api/group/:id`

---

## ⚙️ Config

### `GET /api/config`
دریافت تنظیمات (بدون رمز).

### `POST /api/config`
بروزرسانی تنظیمات.

```json
{
  "subPath": "sub",
  "defaultLang": "fa",
  "theme": "luna-blue",
  "botToken": "123456:ABC...",
  "announcement": "خبر مهم"
}
```

---

## 🤖 Bot

### `POST /api/bot/set-webhook`
اتصال ربات تلگرام.

**Body**: `{ "token": "123456:ABC..." }`

### `POST /api/bot/unset-webhook`
قطع اتصال.

### `POST /api/bot/broadcast`
ارسال پیام گروهی به کاربران.

**Body**: `{ "text": "سلام به همه!" }`

---

## 💾 Backup / Restore

### `GET /api/backup`
دانلود JSON کامل.

### `POST /api/restore`
بازیابی از JSON.

---

## 📡 Subscription Feed

### `GET /{subPath}/:token`
دریافت ساب به‌صورت Base64.

**Headers پاسخ**:
- `Content-Type`: `text/plain` (یا `text/yaml` برای Clash)
- `Subscription-Userinfo`: `upload=0; download=X; total=Y; expire=Z`
- `Profile-Update-Interval`: `6`

---

## 🔔 Telegram Webhook

### `POST /tg-webhook`
دریافت updates از تلگرام. توسط تلگرام فراخوانی می‌شود.

---

## 📊 Error Codes

| Code | معنی |
|------|------|
| 200 | موفق |
| 201 | ساخته شد |
| 302 | Redirect |
| 400 | درخواست نامعتبر |
| 401 | احراز هویت نشده |
| 403 | دسترسی ممنوع |
| 404 | یافت نشد |
| 500 | خطای سرور |

---

<div align="center">
<img src="https://github.com/THE-SAZ.png" width="50" style="border-radius:50%"/>
<br/>
<b>THE SAZ</b>
</div>