import nodemailer from "nodemailer";

export const registerEmail = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { name, email, token } = data;

  // sent email
  await transport.sendMail({
    from: "@noreply.realstate.com",
    to: email,
    subject: "Confirm your account - Real State",
    html: `
      <h1>Confirm your account</h1>
      <p>Hi ${name},</p>
      <p>Thanks for registering!</p>
      <p>Please click the link below to confirm your account.</p>
      <a href="${process.env.APP_URL}/auth/confirm/${token}">Confirm your account</a>
    `,
  });
};
