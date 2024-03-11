"use server";

import nodemailer from "nodemailer";
const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

export const generateEmailBody = async (product: any, type: any) => {
  const THRESHOLD_PERCENTAGE = 40;

  const shortenedTitle =
    product.name.length > 20
      ? `${product.name.substring(0, 20)}...`
      : product.name;

  let subject = "";
  let body = "";

  switch (type) {
    case Notification.WELCOME:
      subject = "Welcome to PriceTracker";
      body = `
      <div>
        <h2>Welcome to PriceWise 🚀</h2>
        <p>You are now tracking ${product.name}.</p>
        <p>Here's an example of how you'll receive updates:</p>
        <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
          <h3>${product.name} is back in stock!</h3>
          <p>We're excited to let you know that ${product.name} is now back in stock.</p>
          <p>Don't miss out - <a href="${product.name}" target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
          <img src="https://i.ibb.co/pwFBRMC/Screenshot-2023-09-26-at-1-47-50-AM.png" alt="Product Image" style="max-width: 100%;" />
        </div>
        <p>Stay tuned for more updates on ${product.name} and other products you're tracking.</p>
      </div>
    `;
      break;

    case Notification.CHANGE_OF_STOCK:
      subject = `${shortenedTitle} is now back in stock!`;
      body = `
          <div>
            <h4>Hey, ${product.name} is now restocked! Grab yours before they run out again!</h4>
            <p>See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
          </div>
        `;
      break;

    case Notification.LOWEST_PRICE:
      subject = `Lowest Price Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hey, ${product.name} has reached its lowest price ever!!</h4>
          <p>Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
        </div>
      `;
      break;

    case Notification.THRESHOLD_MET:
      subject = `Discount Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hey, ${product.name} is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
          <p>Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      `;
      break;

    default:
      throw new Error("Invalid notification type.");
  }

  return { body, subject };
};

const transporter = nodemailer.createTransport({
  pool: true,
  service: "hotmail",
  port: 2525,
  auth: {
    user: "himanshuhim1230@outlook.com",
    pass: "Pintuhunmai@1",
  },
  maxConnections: 1,
});

export const sendEmail = async (emailContent: any, sendTo: string[]) => {
  const mailOptions = {
    from: "himanshuhim1230@outlook.com",
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) return console.log(error);

    console.log(info);
  });
};
