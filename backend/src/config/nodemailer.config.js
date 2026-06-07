import nodemailer from "nodemailer";

import {
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
  NODEMAILER_PORT,
  NODEMAILER_SECURE,
  NODEMAILER_SERVICE,
} from "./index.js";

const mailTransporter = nodemailer.createTransport({
  service: NODEMAILER_SERVICE,
  port: parseInt(NODEMAILER_PORT) || 465,
  secure: NODEMAILER_SECURE === "true" || NODEMAILER_SECURE === true,
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});

export default mailTransporter;
