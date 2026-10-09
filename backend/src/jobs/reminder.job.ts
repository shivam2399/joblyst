import cron from "node-cron";
import {
  Op,
} from "sequelize";

import {
  Reminder,
  User,
  Application,
  Company,
} from "../models";

import {
  ReminderStatus,
} from "../models/Reminder";

import {
  sendReminderEmail,
} from "../services/email.service";

export const startReminderJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const reminders = await Reminder.findAll({
        where: {
          status: ReminderStatus.PENDING,
          reminderAt: {
            [Op.lte]: now,
          },
        },
        include: [
          {
            model: User,
            as: "user",
          },
          {
            model: Application,
            as: "application",
            include: [
              {
                model: Company,
                as: "company",
              },
            ],
          },
        ],
      });

      for (const reminder of reminders) {
        const user = reminder.get("user") as User;
        const application =
          reminder.get("application") as Application;

        const company =
          application.get("company") as Company;

        try {
          await sendReminderEmail(
            user.email,
            reminder.title,
            reminder.description,
            reminder.reminderAt,
            application.jobTitle,
            company.name
          );

          await reminder.update({
            status: ReminderStatus.SENT,
            sentAt: new Date(),
          });

          console.log(
            `Reminder ${reminder.id} processed`
          );
        } catch (error) {
          console.error(
            `Failed to send reminder ${reminder.id}:`,
            error
          );
        }
      }
    } catch (error) {
      console.error(
        "Reminder job failed:",
        error
      );
    }
  });

  console.log(
    "Reminder scheduler started"
  );
};