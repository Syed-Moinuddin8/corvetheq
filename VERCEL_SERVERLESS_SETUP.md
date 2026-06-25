# Vercel Serverless Function Setup - COMPLETE ✅

## What Was Done

### 1. Created Serverless Function
- Created `api/inquiry.ts` - Vercel serverless function for handling booking emails
- Uses Resend API for reliable email delivery
- Sends notification to owner + thank you email to customer

### 2. Installed Dependencies
- Installed `@vercel/node` types for TypeScript support
- Already have `resend` package installed

### 3. Updated Configuration
- Simplified `vercel.json` to work with Vercel's API routes pattern
- Frontend already configured to call `/api/inquiry`

### 4. Pushed to GitHub
- All changes committed and pushed to: https://github.com/Syed-Moinuddin8/corvetheq

---

## What You Need to Do on Vercel

### Step 1: Wait for Automatic Redeployment
Vercel should automatically redeploy when you pushed to GitHub. Wait 2-3 minutes.

### Step 2: Verify Environment Variables
Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Make sure these are set (you already added them):
```
RESEND_API_KEY = re_4VvuDkeJ_Eg7sLB94BY7eTZSxWL1Ju35j
FROM_EMAIL = onboarding@resend.dev
NOTIFICATION_EMAIL = corvetheq@gmail.com
```

### Step 3: Check Functions Tab
1. Go to **Vercel Dashboard → Your Project**
2. Look for the **"Functions"** tab in the navigation
3. You should now see: `/api/inquiry` listed as a serverless function

**If you don't see the Functions tab:**
- Wait a few more minutes for the deployment to complete
- Check the "Deployments" tab to see if build is still in progress

### Step 4: Test the Booking Form
1. Go to your live website
2. Fill out the booking form
3. Click "Send Message"
4. You should see a success message

### Step 5: Verify Emails Sent
**Check Resend Dashboard:**
- Go to: https://resend.com/emails
- Login with your Resend account
- You should see 2 emails sent:
  1. Notification to `corvetheq@gmail.com`
  2. Thank you email to the customer's email

**Check Your Inbox:**
- Check `corvetheq@gmail.com` inbox for the notification email
- Customer should receive thank you email
- If in spam, mark as "Not Spam" to train email filters

---

## Troubleshooting

### Issue: Still No "Functions" Tab
**Solution:** Manually trigger a redeploy
1. Go to: **Vercel Dashboard → Deployments**
2. Click on the latest deployment
3. Click the three dots menu → "Redeploy"

### Issue: Emails Not Sending
**Check Vercel Function Logs:**
1. Go to: **Vercel Dashboard → Deployments**
2. Click on latest deployment
3. Click "Functions" tab
4. Click on `/api/inquiry` function
5. Check logs for errors

**Verify Environment Variables:**
- Make sure all 3 variables are set in Vercel
- No extra spaces in values
- API key is correct

### Issue: 500 Error When Testing
**Check Resend API Key:**
- Login to https://resend.com
- Go to: **API Keys**
- Verify key is active and not rate-limited

---

## How It Works

### Architecture:
```
User Fills Form → Frontend React App → /api/inquiry (Serverless Function) → Resend API → Emails Sent
```

### File Structure:
```
/api/inquiry.ts          # Vercel serverless function (auto-detected)
/src/App.tsx             # Frontend calls /api/inquiry
/vercel.json             # Simplified config
```

### Why This Works Better:
1. **Vercel API Routes**: Files in `/api/` folder are automatically deployed as serverless functions
2. **No Express Server**: Vercel handles routing, we just export a handler function
3. **Resend Integration**: Fast, reliable email delivery (no Gmail SMTP issues)
4. **Auto-scaling**: Serverless functions scale automatically with traffic

---

## Expected Result

✅ **Functions tab visible in Vercel dashboard**
✅ **Booking form works on live site**
✅ **Owner receives notification emails**
✅ **Customers receive thank you emails**
✅ **Emails land in inbox (not spam)**

---

## Next Steps

1. Test the booking form on your live site
2. Check if emails arrive in inbox
3. If emails still go to spam, we can discuss domain verification with Resend
4. Consider upgrading Resend plan if you need custom domain emails

---

**Questions? Let me know if:**
- Functions tab still doesn't appear
- Emails not sending
- Any errors in Vercel logs
