import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email, message } = await req.json();
    console.log('Request body:', { email, message });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Use 465 for SSL
      secure: false, // Set true for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true, // Enable detailed logging
      debug: true,  // Enable debug logs
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Message',
      text: `Email: ${email}\n\nMessage: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', {
      message: error.message,
      stack: error.stack,
    });
    return new Response(JSON.stringify({ error: 'Failed to send email. Please try again later.' }), { status: 500 });
  }
}
