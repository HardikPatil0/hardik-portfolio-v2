import nodemailer from "nodemailer";

const sendMail = async ({ subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject,
      html,
    });

    console.log("Email sent:", info.response);
  } catch (err) {
    console.log("Email error:", err.message);
    throw err;
  }
};

export default sendMail;
