# Corvetheq IT Solutions - Official Website

![Corvetheq IT Solutions](./logo1.png)

Professional website for Corvetheq IT Solutions - a technology-driven digital solutions company specializing in web development, mobile applications, software development, UI/UX design, and more.

## 🌟 Features

- ✅ Modern, responsive design
- ✅ Smooth animations and transitions
- ✅ Interactive booking form with email notifications
- ✅ Professional services showcase
- ✅ Mobile-friendly navigation
- ✅ Custom logo integration
- ✅ Email integration (Gmail/SendGrid)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/corvetheq-website.git
cd corvetheq-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your SMTP credentials (see `EMAIL_SETUP.md`)

4. Run development server:
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 📧 Email Configuration

The website includes automated email notifications for booking inquiries.

**Setup guides:**
- `EMAIL_SETUP.md` - Gmail/Outlook setup
- `SENDGRID_SETUP.md` - Professional solution (recommended)

## 🌐 Deployment

### Deploy on Vercel (Recommended)

See `DEPLOYMENT_GUIDE.md` for complete instructions.

Quick deploy:
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## 📂 Project Structure

```
corvetheq-website/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── server.ts            # Express server with API routes
├── logo1.png           # Company logo
├── index.html          # HTML template
├── package.json        # Dependencies
├── vercel.json         # Vercel deployment config
└── .env               # Environment variables (not in git)
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Backend**: Express.js, Node.js
- **Email**: Nodemailer (Gmail/SendGrid)
- **Animations**: Motion (Framer Motion)
- **Build**: Vite 6
- **Deployment**: Vercel

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check TypeScript errors
```

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SENDER_NAME=Corvetheq IT Solutions
NOTIFICATION_EMAIL=your-email@gmail.com
```

## 📚 Documentation

- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `EMAIL_SETUP.md` - Email configuration guide
- `SENDGRID_SETUP.md` - Professional email setup
- `GITHUB_SETUP.md` - GitHub upload guide
- `LOADING_ISSUE_SOLUTION.md` - Performance optimization
- `INBOX_TIPS.md` - Email deliverability tips

## 🤝 Contributing

This is a private project for Corvetheq IT Solutions.

## 📄 License

© 2024 Corvetheq IT Solutions. All rights reserved.

## 📞 Contact

- **Email**: corvetheq@gmail.com
- **Phone**: +91 98864 81493
- **Location**: London, UK

---

Built with ❤️ by Corvetheq IT Solutions
