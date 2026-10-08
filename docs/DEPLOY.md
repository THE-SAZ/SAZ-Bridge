# 🚀 راهنمای Deploy کامل — SAZ Bridge v0.0.7

این سند شامل تمام روش‌های Deploy SAZ Bridge است.

## روش ۱: Dashboard Cloudflare (ساده‌ترین)

### ۱.۱) ساخت Worker
1. وارد [Cloudflare Dashboard](https://dash.cloudflare.com) شوید
2. **Workers & Pages** → **Create** → **Worker**
3. نام: `saz-bridge`
4. Create

### ۱.۲) چسباندن کد
کد کامل `_worker.js` را کپی کرده و در ویرایشگر Worker جای‌گذاری کنید.

### ۱.۳) ساخت KV Namespace
1. به **Workers & Pages → KV** بروید
2. **Create namespace** → نام: `SUB_KV`
3. در **Worker → Settings → Variables → KV Namespace Bindings**:
   - Variable name: `SUB_KV`
   - KV namespace: `SUB_KV`

### ۱.۴) Deploy
روی **Save and Deploy** کلیک کنید.

---

## روش ۲: Wrangler CLI (پیشنهادی)

### ۲.۱) نصب
```bash
npm install -g wrangler
wrangler login
```

### ۲.۲) کلون
```bash
git clone https://github.com/THE-SAZ/saz-bridge.git
cd saz-bridge
npm install
```

### ۲.۳) ساخت KV
```bash
wrangler kv:namespace create "SUB_KV"
wrangler kv:namespace create "SUB_KV" --preview
```

خروجی را در `wrangler.toml` بگذارید.

### ۲.۴) Deploy
```bash
wrangler deploy
```

---

## روش ۳: GitHub Actions (خودکار)

فایل `.github/workflows/deploy.yml` را بسازید:

```yaml
name: Deploy SAZ Bridge
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
```

---

## تنظیم اولیه (Setup Wizard)

پس از Deploy، اولین بار که آدرس Worker را باز کنید، Setup Wizard نمایش داده می‌شود:

1. **رمز عبور مدیر** — یک رمز قوی
2. **مسیر ساب‌لینک** — مثلاً `sub` یا تصادفی
3. **زبان پیش‌فرض** — fa/en/ru/zh
4. **تم** — Luna Blue / Classic / Silver
5. **توکن ربات** (اختیاری)

> ⚠️ **مهم**: پس از تنظیم، دیگر نیازی به ویرایش کد نیست. همه چیز در KV ذخیره می‌شود.

---

## اتصال دامنه اختصاصی

1. **Workers & Pages → Worker → Settings → Domains & Routes**
2. **Add Custom Domain**
3. دامنه را وارد کنید (باید در Cloudflare باشد)
4. SSL به‌صورت خودکار فعال می‌شود

---

## عیب‌یابی

### مشکل: صفحه سفید می‌آید
- کش مرورگر را پاک کنید
- Console (F12) را بررسی کنید
- مطمئن شوید KV Binding صحیح است

### مشکل: Base64 کار نمی‌کند
- بررسی کنید که کاربر حداقل یک لینک معتبر داشته باشد
- پروتکل‌های پشتیبانی: `vmess://`, `vless://`, `trojan://`, `ss://`

### مشکل: ربات پاسخ نمی‌دهد
- Webhook را در پنل بازتنظیم کنید
- در [@BotFather](https://t.me/BotFather) مطمئن شوید ربات فعال است

### مشکل: KV Write Limit
- پلن رایگان: 1000 نوشتن در روز
- کاهش بازدید ساب با Cache-Control
- ارتقا به پلن Pro

---

## بروزرسانی

```bash
git pull origin main
wrangler deploy
```

اطلاعات شما در KV محفوظ می‌ماند.

---

<div align="center">
<img src="https://github.com/THE-SAZ.png" width="50" style="border-radius:50%"/>
<br/>
<b>THE SAZ</b> · <a href="https://github.com/THE-SAZ">GitHub</a>
</div>