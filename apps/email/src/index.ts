import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event: any) => {
  try {
    const body: any = JSON.parse(event.body);
    const { to, type, data } = body;

    console.log("to", to, type, data);

    const result = await resend.emails.send({
      from: "Webflexrr <no-reply@yourdomain.com>",
      to,
      subject: "Test Email",
      html: "Hello World",
    });

    return {
      statusCode: 200,
      // body: JSON.stringify({ id: result, message: "Email sent" }),
      body: JSON.stringify({
        message: "Email sent",
        to,
        type,
        data,
        id: process.env.RESEND_API_KEY,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
