import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import MailTwoFactor from "./MailTwoFactor";

export const sendTwoFactorMail = async (email, token) => {
  const emailHtml = render(<MailTwoFactor token={token} />);

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
    subject: `Двухфакторная аутентификация в SwifHire`,
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
};
