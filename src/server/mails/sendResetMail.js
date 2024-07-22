import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import ResetMail from "./ResetMail";

export const sendResetMail = async (email, token) => {
  const confirmLink = `${process.env.AUTH_URL}/auth/new-password?token=${token}`;

  const emailHtml = render(<ResetMail url={confirmLink} />);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Сброс пароля в SwifHire`,
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
};
