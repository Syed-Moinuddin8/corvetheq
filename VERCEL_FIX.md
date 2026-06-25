# 🔧 Vercel Issues - Quick Fix Guide

## Issue 1: Logo Not Visible ✅ FIXED

**Problem**: Logo wasn't showing on deployed site
**Solution**: Moved logo to `public` folder

This is now fixed in the code. Just push the update (see below).

---

## Issue 2: Email Not Sending ⚠️ NEEDS FIX

**Problem**: Environment variables not configured on Vercel

### Fix Steps (2 minutes):

1. **Go to your Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Click on your "corvetheq" project

2. **Go to Settings:**
   - Click "Settings" tab at the top
   - Click "Environment Variables" in the left sidebar

3. **Add These Variables:**

Click "Add New" for each variable:

```
Name: SMTP_HOST
Value: smtp.gmail.com
Environment: Production, Preview, Development
```

```
Name: SMTP_PORT
Value: 587
Environment: Production, Preview, Development
```

```
Name: SMTP_SECURE
Value: false
Environment: Production, Preview, Development
```

```
Name: SMTP_USER
Value: corvetheq@gmail.com
Environment: Production, Preview, Development
```

```
Name: SMTP_PASS
Value: xoujeofydohzogiw
Environment: Production, Preview, Development
```

```
Name: SMTP_SENDER_NAME
Value: Corvetheq IT Solutions
Environment: Production, Preview, Development
```

```
Name: NOTIFICATION_EMAIL
Value: corvetheq@gmail.com
Environment: Production, Preview, Development
```

4. **Redeploy:**
   - Go to "Deployments" tab
   - Click the "..." menu on the latest deployment
   - Click "Redeploy"
   - Wait 1-2 minutes

5. **Test:**
   - Go to your live website
   - Submit a booking
   - Check if email is received

---

## Quick Push Update (Logo Fix)

Run these commands to push the logo fix:

```bash
git add .
git commit -m "Fix logo visibility on Vercel"
git push
```

Vercel will automatically redeploy (1-2 minutes).

---

## ✅ After Fixes

Your website will have:
- ✅ Logo visible
- ✅ Emails working
- ✅ Fully functional booking system

---

## 🆘 If Emails Still Don't Work

### Check Vercel Logs:

1. Go to Vercel Dashboard → Your Project
2. Click "Deployments"
3. Click on the latest deployment
4. Click "Functions" tab
5. Look for errors in the logs

### Common Issues:

**"Missing environment variables"**
- Double-check all variables are added
- Make sure there are no extra spaces
- Redeploy after adding variables

**"Authentication failed"**
- Verify SMTP_PASS is correct
- Try regenerating Gmail App Password
- Check SMTP_USER email is correct

**"Connection timeout"**
- Vercel might block port 587
- Switch to SendGrid (see SENDGRID_SETUP.md)

---

## 💡 Recommended: Switch to SendGrid

Gmail SMTP might have issues on Vercel. For reliable email delivery:

1. Follow `SENDGRID_SETUP.md`
2. Update Vercel environment variables with SendGrid credentials
3. Much more reliable for production

---

## 📊 Current Status

- ✅ Code updated (logo fixed)
- ⏳ Need to push to GitHub
- ⏳ Need to add environment variables on Vercel
- ⏳ Need to redeploy

**Follow the steps above to complete the fixes!** 🚀
