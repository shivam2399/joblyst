import nodemailer from "nodemailer";
import env from "../config/env";

const transporter = nodemailer.createTransport({
  host: env.mail.host,
  port: env.mail.port,
  secure: env.mail.port === 465,
  auth: {
    user: env.mail.user,
    pass: env.mail.password,
  },
});

export const sendReminderEmail = async (
  to: string,
  title: string,
  description: string | undefined,
  reminderAt: Date,
  jobTitle: string,
  companyName: string
) => {
  if (!env.mail.user || !env.mail.password) {
    console.log(
      "Email credentials not configured. Skipping email."
    );

    return;
  }

  await transporter.sendMail({
    from: env.mail.from || env.mail.user,
    to,
    subject: `Joblyst Reminder: ${title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Joblyst Reminder</h2>

        <p>You have a reminder for your job application.</p>

        <h3>${jobTitle}</h3>

        <p>
          <strong>Company:</strong> ${companyName}
        </p>

        <p>
          <strong>Reminder:</strong> ${title}
        </p>

        <p>
          <strong>Time:</strong> ${reminderAt.toLocaleString()}
        </p>

        ${
          description
            ? `
              <p>
                <strong>Details:</strong><br />
                ${description}
              </p>
            `
            : ""
        }

        <p>
          — Joblyst
        </p>
      </div>
    `,
  });
};