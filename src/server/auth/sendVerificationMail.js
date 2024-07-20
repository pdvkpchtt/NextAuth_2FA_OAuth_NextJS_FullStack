import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import VerifyMail from "../mails/VerifyMail";

export const sendVerificationMail = async (email, token) => {
  const confirmLink = `${process.env.AUTH_URL}/auth/new-verification?token=${token}`;

  const emailHtml = render(<VerifyMail url={confirmLink} />);

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
    subject: `Верификация в SwifHire`,
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
};
