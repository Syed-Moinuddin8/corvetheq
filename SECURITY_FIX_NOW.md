# 🔒 URGENT SECURITY FIX - DO THIS NOW!

## ⚠️ Your Gmail App Password Was Exposed

I've removed it from GitHub, but you MUST change it immediately.

---

## STEP 1: Change Gmail App Password (2 minutes)

1. **Go to:** https://myaccount.google.com/apppasswords

2. **Delete old password:**
   - Find the app password named "Mail" or similar
   - Click it → Delete

3. **Generate NEW password:**
   - Click "Create"
   - App: Mail
   - Click "Generate"
   - **COPY THE NEW PASSWORD** (16 characters)

---

## STEP 2: Update Vercel Environment Variables (2 minutes)

1. **Go to:** https://vercel.com/dashboard
2. **Click** your "corvetheq" project  
3. **Go to:** Settings → Environment Variables
4. **Find** SMTP_PASS
5. **Click Edit** (pencil icon)
6. **Replace with NEW password**
7. **Save**

---

## STEP 3: Update Local .env File

1. Open `.env` file in your project
2. Replace `SMTP_PASS=xoujeofydohzogiw` with your NEW password
3. Save the file

**NEVER commit .env to GitHub!** (it's already in .gitignore)

---

## STEP 4: Redeploy Vercel

1. Go to Vercel → Deployments
2. Click "..." → Redeploy
3. Wait 1-2 minutes

---

## ✅ Why Emails Aren't Working

The issue is likely:

### 1. Environment Variables Not Set on Vercel
- Make sure ALL 7 variables are added
- Verify spellings are exact
- Check all environments are selected

### 2. Gmail SMTP Port Blocked
- Some hosts block port 587
- **Solution:** Use SendGrid instead (see below)

### 3. Vercel Function Issues
- Check Vercel function logs for errors
- Go to: Dashboard → Deployments → Latest → Functions

---

## 💡 RECOMMENDED: Switch to SendGrid

Gmail SMTP often doesn't work on Vercel. Use SendGrid for reliable emails:

### Quick SendGrid Setup:

1. **Sign up:** https://signup.sendgrid.com/
2. **Create API Key:** Settings → API Keys
3. **Verify Sender:** Settings → Sender Authentication  
4. **Update Vercel variables:**
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=SG.your-sendgrid-api-key
   ```

SendGrid is FREE (100 emails/day) and much more reliable!

---

## 🔍 Check If Emails Are Working

### On Vercel:

1. Submit a test booking on your live site
2. Go to: Vercel Dashboard → Functions
3. Check logs for:
   - ✅ "Notification email sent to owner"
   - ✅ "Thank you email sent to customer"
   - ❌ Any error messages

### Common Errors:

**"Missing environment variables"**
→ Add all 7 variables on Vercel

**"Invalid login: 535-5.7.8 Username and Password not accepted"**
→ Gmail app password is wrong, regenerate it

**"Connection timeout"**
→ Port 587 blocked, switch to SendGrid

---

## 📋 Security Checklist

- [ ] Changed Gmail app password
- [ ] Updated Vercel SMTP_PASS with new password
- [ ] Updated local .env file
- [ ] Verified .env is in .gitignore
- [ ] Redeployed on Vercel
- [ ] Tested booking form
- [ ] Emails working

---

## 🆘 Still Not Working?

### Option 1: Debug on Vercel
- Check Function logs for specific errors
- Verify all environment variables
- Test with different email address

### Option 2: Switch to SendGrid (Recommended)
- More reliable than Gmail SMTP
- Works on all hosting platforms
- See `SENDGRID_SETUP.md`

---

## 🎯 DO THIS NOW:

1. ✅ Change Gmail app password: https://myaccount.google.com/apppasswords
2. ✅ Update Vercel environment variable
3. ✅ Redeploy
4. ✅ Test booking form

**Your credentials are now secure, and emails should work!** 🔒
