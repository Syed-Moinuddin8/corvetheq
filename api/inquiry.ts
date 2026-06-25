import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, mobile, service } = req.body;

  if (!name || !email || !mobile || !service) {
    return res.status(400).json({ error: 'Missing required fields: name, email, mobile, service' });
  }

  // Log the booking inquiry
  console.log("\n" + "=".repeat(50));
  console.log("📋 NEW BOOKING INQUIRY RECEIVED");
  console.log("=".repeat(50));
  console.log(`👤 Name:    ${name}`);
  console.log(`📧 Email:   ${email}`);
  console.log(`📱 Mobile:  ${mobile}`);
  console.log(`🛠  Service: ${service}`);
  console.log(`⏰ Time:    ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} (Kolkata Time)`);
  console.log("=".repeat(50) + "\n");

  const notificationEmail = process.env.NOTIFICATION_EMAIL || "corvetheq@gmail.com";
  const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️  Resend API key not configured");
    return res.status(200).json({
      success: true,
      message: "Booking received (email not configured)"
    });
  }

  try {
    // 1. Send notification email to business owner
    const ownerMailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">New Booking Inquiry</h1>
          <p style="color: #f0f9ff; margin: 8px 0 0 0; font-size: 14px;">You have received a new service inquiry</p>
        </div>
        <div style="padding: 30px 20px;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
            A customer has submitted a booking inquiry with the following details:
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #1f2937; width: 140px;">👤 Name</td>
              <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb; color: #374151;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #1f2937;">📧 Email</td>
              <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #0EA5E9; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #1f2937;">📱 Mobile</td>
              <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;"><a href="tel:${mobile}" style="color: #0EA5E9; text-decoration: none;">${mobile}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #1f2937;">🛠️ Service</td>
              <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb; color: #374151;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background-color: #f9fafb; font-weight: 600; color: #1f2937;">⏰ Submitted</td>
              <td style="padding: 12px; background-color: #ffffff; color: #374151;">${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", dateStyle: "long", timeStyle: "short" })}</td>
            </tr>
          </table>
          <div style="text-align: center; margin: 30px 0 20px 0;">
            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">Reply to Customer</a>
          </div>
        </div>
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 13px; margin: 0;">Corvetheq IT Solutions - Automated Booking Notification</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: `Corvetheq IT Solutions <${fromEmail}>`,
      to: [notificationEmail],
      subject: `New Booking Inquiry - ${name}`,
      html: ownerMailHtml,
      reply_to: email,
    });

    console.log(`✅ Notification email sent to owner: ${notificationEmail}`);

    // 2. Send thank you email to customer
    const customerMailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 600;">Thank You! 🎉</h1>
          <p style="color: #f0f9ff; margin: 12px 0 0 0; font-size: 16px;">We've received your inquiry</p>
        </div>
        <div style="padding: 40px 30px;">
          <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
            Dear <strong>${name}</strong>,
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
            Thank you for reaching out to <strong>Corvetheq IT Solutions</strong>! We're excited about the opportunity to work with you.
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0 0 30px 0;">
            We have received your inquiry for <strong style="color: #0EA5E9;">${service}</strong> and one of our team members will get back to you within 24 hours.
          </p>
          <div style="background-color: #f0f9ff; border-left: 4px solid #38BDF8; padding: 20px; border-radius: 6px; margin: 30px 0;">
            <p style="color: #0c4a6e; font-size: 15px; line-height: 1.6; margin: 0; font-weight: 500;">
              📋 Your inquiry details have been recorded and our team is reviewing them. We'll reach out to discuss your requirements in detail.
            </p>
          </div>
          <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 30px 0 20px 0;">
            In the meantime, if you have any urgent questions, feel free to contact us directly at:
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <p style="margin: 8px 0;">
              <a href="mailto:${notificationEmail}" style="color: #0EA5E9; text-decoration: none; font-weight: 500;">📧 ${notificationEmail}</a>
            </p>
            <p style="margin: 8px 0;">
              <span style="color: #6b7280; font-weight: 500;">📱 +91 98864 81493</span>
            </p>
          </div>
          <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 30px 0 0 0;">
            Best regards,<br>
            <strong style="color: #0EA5E9;">The Corvetheq Team</strong>
          </p>
        </div>
        <div style="background-color: #f9fafb; padding: 25px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">Corvetheq IT Solutions</p>
          <p style="color: #9ca3af; font-size: 13px; margin: 0;">Transforming Ideas Into Scalable Digital Solutions</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: `Corvetheq IT Solutions <${fromEmail}>`,
      to: [email],
      subject: `Thank You for Your Inquiry - Corvetheq IT Solutions`,
      html: customerMailHtml,
      reply_to: notificationEmail,
    });

    console.log(`✅ Thank you email sent to customer: ${email}`);

    return res.status(200).json({
      success: true,
      message: "Booking inquiry received successfully."
    });

  } catch (err: any) {
    console.error("❌ Error sending emails:", err.message || err);
    console.error("Full error details:", err);
    
    return res.status(500).json({
      success: false,
      error: "Failed to send emails",
      details: err.message
    });
  }
}
