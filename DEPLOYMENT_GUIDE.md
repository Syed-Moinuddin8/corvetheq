# 🚀 GitHub & Vercel Deployment Guide

This guide will help you upload your project to GitHub and deploy it on Vercel.

---

## Part 1: Upload to GitHub (10 minutes)

### Step 1: Initialize Git Repository

Open terminal in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: Corvetheq IT Solutions website"
```

### Step 2: Create GitHub Repository

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name**: `corvetheq-website`
   - **Description**: `Corvetheq IT Solutions - Professional website`
   - **Visibility**: Choose **Private** or **Public**
   - ❌ **DO NOT** initialize with README, .gitignore, or license (already exists)
3. Click **"Create repository"**

### Step 3: Push to GitHub

After creating the repo, GitHub will show commands. Run these in your terminal:

```bash
git remote add origin https://github.com/YOUR-USERNAME/corvetheq-website.git
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME`** with your actual GitHub username.

### Step 4: Verify Upload

- Go to your GitHub repository URL
- You should see all your project files
- ✅ Verify `.env` is **NOT** uploaded (it's in .gitignore)

---

## Part 2: Deploy on Vercel (5 minutes)

### Step 1: Sign Up/Login to Vercel

1. Go to: https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account

### Step 2: Import Project

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find your `corvetheq-website` repository
3. Click **"Import"**

### Step 3: Configure Project

**Framework Preset**: Select **"Vite"**

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Root Directory**: `.` (leave as is)

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=corvetheq@gmail.com
SMTP_PASS=YOUR-NEW-APP-PASSWORD-HERE
SMTP_SENDER_NAME=Corvetheq IT Solutions
NOTIFICATION_EMAIL=corvetheq@gmail.com
```

**Important**: Add these for all environments (Production, Preview, Development)

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. ✅ Your site will be live!

### Step 6: Get Your Live URL

After deployment completes:
- Vercel will show your live URL: `https://corvetheq-website.vercel.app`
- Click **"Visit"** to see your live website!

---

## Part 3: Custom Domain (Optional)

### If you have a custom domain (e.g., corvetheq.com):

1. In Vercel project, go to **Settings** → **Domains**
2. Add your domain: `corvetheq.com`
3. Vercel will show DNS records to add
4. Go to your domain registrar (GoDaddy, Namecheap, etc.)
5. Add the DNS records provided by Vercel
6. Wait 24-48 hours for DNS propagation
7. ✅ Your site will be live on your custom domain!

---

## 📋 Quick Command Reference

### Git Commands:
```bash
# Initialize repository
git init

# Stage all files
git add .

# Commit changes
git commit -m "Your commit message"

# Add remote
git remote add origin YOUR_GITHUB_URL

# Push to GitHub
git push -u origin main

# Future updates
git add .
git commit -m "Update description"
git push
```

### Check Git Status:
```bash
git status
```

---

## 🔄 Making Updates After Deployment

### When you make changes to your code:

1. **Save your changes**
2. **Commit to GitHub**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Automatic Deployment**: Vercel automatically detects the push and redeploys!
4. **Wait 1-2 minutes** for the new version to go live

---

## ✅ Deployment Checklist

- [ ] Git initialized
- [ ] Code committed locally
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables added
- [ ] First deployment successful
- [ ] Live URL obtained
- [ ] Website tested on live URL

---

## 🆘 Troubleshooting

### Build Fails on Vercel

**Error: "Cannot find module"**
- Check that all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: "Build command failed"**
- Check that `npm run build` works locally
- Verify all files are committed to GitHub

### Environment Variables Not Working

- Make sure variables are added for **Production** environment
- Redeploy the project after adding variables
- Check variable names match exactly (case-sensitive)

### Email Not Sending on Vercel

- Verify all SMTP environment variables are set
- Check Vercel deployment logs for errors
- Test with SendGrid for better reliability

---

## 🎯 Your Deployment URLs

After deployment, you'll have:

**Vercel URL**: `https://corvetheq-website.vercel.app`
- Free HTTPS
- Global CDN
- Automatic deployments

**Custom Domain** (if configured): `https://corvetheq.com`
- Professional domain
- Free SSL certificate
- Better branding

---

## 🚀 Next Steps After Deployment

1. **Test Everything**:
   - Submit a booking form
   - Check email notifications
   - Test on mobile devices
   - Try all navigation links

2. **Monitor**:
   - Check Vercel dashboard for analytics
   - Monitor error logs
   - Track visitor numbers

3. **Share**:
   - Share your live URL with customers
   - Add to social media profiles
   - Update business cards

---

## 💡 Pro Tips

1. **Free Plan**: Vercel free plan is perfect for this project
2. **Auto Deploy**: Every push to GitHub auto-deploys to Vercel
3. **Preview Deploys**: Each pull request gets its own preview URL
4. **Rollback**: Can rollback to any previous deployment in Vercel dashboard
5. **Analytics**: Vercel provides free analytics (pageviews, visitors)

---

## 📊 Costs

**GitHub**:
- ✅ Free for public repos
- ✅ Free for private repos (unlimited)

**Vercel**:
- ✅ Free tier includes:
  - 100 GB bandwidth/month
  - Unlimited websites
  - Automatic HTTPS
  - Global CDN
  - Custom domains

**Perfect for your website!** 🎉

---

## 🎉 You're Done!

Once deployed, your website will be:
- ✅ Live 24/7
- ✅ Globally accessible
- ✅ Automatically backed up
- ✅ Fast (CDN)
- ✅ Secure (HTTPS)
- ✅ Auto-updating (on git push)

**Start with Step 1 and follow along!** 🚀
