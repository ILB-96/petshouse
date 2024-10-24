"use server";
import nodemailer from "nodemailer";
export const contactAction = async (
  name: string,
  email: string,
  info: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
    subject: "Contact Form Submission to IBar",
    text: `Name: ${name}\nEmail: ${email}\n\n${info}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return {
      message: `Thank you for your message, ${name}. I'll get back to you as soon as possible.`,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      message:
        "There was an error sending your message. Please try again later.",
    };
  }
};
