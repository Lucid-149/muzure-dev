import { render } from "@react-email/render";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "mail.muzuretravel.com",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@muzuretravel.com",
    pass: process.env.MAIL_PASSWORD,
  },
});


