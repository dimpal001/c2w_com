/* eslint-disable no-undef */
const nodemailer = require('nodemailer')

const registrationEmail = async (email, fullName) => {
  console.log(fullName)
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const mailOptions = {
      from: '"Clothes2Wear" <' + process.env.EMAIL + '>',
      to: email,
      subject: 'Registration successful | Clothes2wear',
      html: `
      
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Clothes2Wear</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        color: white;
        padding: 30px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .header img {
        height: 60px;
      }
      .content {
        margin-top: -20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
      }
      .content h2 {
        color: #f7295d;
        font-size: xx-large;
      }
      .content p {
        font-size: 16px;
        line-height: 1.5;
        margin: 10px 0;
      }
      .content a {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 25px;
        background-color: #f7295d;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .content a:hover {
        background-color: #dd1749;
      }
      .footer {
        text-align: center;
        padding: 15px;
        font-size: 14px;
        color: #666;
        background: #f9f9f9;
      }
      .footer a {
        color: #1e90ff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img
          src="https://cdn.thefashionsalad.com/clothes2wear/img.webp"
          alt="Clothes2Wear Logo"
        />
      </div>
      <div class="content">
        <h2>Hi ${fullName},</h2>
        <p>
          Thank you for registering with <strong>Clothes2Wear</strong>! We're
          thrilled to have you as part of our community. Discover the latest
          trends and exclusive offers tailored just for you.
        </p>
        <p>
          Get started by exploring our curated collections of fashion, designed
          to make you stand out wherever you go.
        </p>
        <a href="https://www.clothes2wear.com" target="_blank"
          >Start Shopping</a
        >
      </div>
      <div class="footer">
        <p>
          Need assistance? Visit our
          <a href="https://www.clothes2wear.com/contact" target="_blank"
            >Help Center</a
          >
          or contact our support team.
        </p>
        <p>&copy; 2024 Clothes2Wear. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

      `,
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { registrationEmail }
