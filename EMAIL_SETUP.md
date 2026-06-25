# 📧 Email Setup Guide

## Quick Setup (5 minutes)

### Using Gmail (Recommended)

#### Step 1: Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com/security
2. Turn on **"2-Step Verification"**

#### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select **"Mail"** → Click **"Generate"**
3. Copy the 16-character password (remove spaces)

#### Step 3: Update .env File
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="abcdefghijklmnop"
SMTP_SENDER_NAME="Corvetheq IT Solutions"
NOTIFICATION_EMAIL="your-email@gmail.com"
```

#### Step 4: Restart Server
1. Press `Ctrl+C` to stop the server
2. Run `npm run dev` to start again
3. Test by filling out the booking form

---

### Using Outlook/Hotmail

```env
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@outlook.com"
SMTP_PASS="your-password"
SMTP_SENDER_NAME="Corvetheq IT Solutions"
NOTIFICATION_EMAIL="your-email@outlook.com"
```

---

## What Happens When Customer Books?

### 1️⃣ Email to You (Business Owner)
- **Subject:** New Booking Inquiry - [Customer Name]
- **Contains:** All booking details in a beautiful table
- **Action:** Quick "Reply to Customer" button

### 2️⃣ Email to Customer (Thank You)
- **Subject:** Thank You for Your Inquiry - Corvetheq IT Solutions
- **Contains:** Personalized thank you message
- **Includes:** Your contact information
- **Promise:** Response within 24 hours

---

## Troubleshooting

### ❌ Emails not sending?
- Make sure 2FA is enabled (for Gmail)
- Use App Password, not your regular Gmail password
- Check that all .env fields are filled
- Restart the server after editing .env

### ❌ Email goes to spam?
- This is normal for the first few emails
- Ask recipient to mark as "Not Spam"
- Gmail may also show a warning initially

---

## Testing

1. Fill out the booking form on your website
2. Check console for: `✅ Notification email sent to owner`
3. Check console for: `✅ Thank you email sent to customer`
4. Check your inbox for the notification email
5. Check customer email's inbox for thank you message

---

## Example Configuration

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="corvetheq@gmail.com"
SMTP_PASS="abcdefghijklmnop"
SMTP_SENDER_NAME="Corvetheq IT Solutions"
NOTIFICATION_EMAIL="corvetheq@gmail.com"
```

**That's it!** Your booking system will now send professional emails automatically. 🚀
