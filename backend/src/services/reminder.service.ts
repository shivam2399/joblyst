import {
  Application,
  Company,
  Reminder,
} from "../models";

import {
  ReminderStatus,
} from "../models/Reminder";

interface CreateReminderData {
  title: string;
  description?: string;
  reminderAt: Date;
}

export const createReminder = async (
  userId: number,
  applicationId: number,
  data: CreateReminderData
) => {
  const application = await Application.findOne({
    where: {
      id: applicationId,
      userId,
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  const reminder = await Reminder.create({
    userId,
    applicationId,
    title: data.title,
    description: data.description,
    reminderAt: data.reminderAt,
    status: ReminderStatus.PENDING,
  });

  return Reminder.findByPk(reminder.id, {
    include: [
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
};

export const getReminders = async (
  userId: number,
  applicationId: number
) => {
  const application = await Application.findOne({
    where: {
      id: applicationId,
      userId,
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  return Reminder.findAll({
    where: {
      userId,
      applicationId,
    },
    order: [["reminderAt", "ASC"]],
  });
};

export const updateReminder = async (
  userId: number,
  reminderId: number,
  data: {
    title?: string;
    description?: string;
    reminderAt?: Date;
    status?: ReminderStatus;
  }
) => {
  const reminder = await Reminder.findOne({
    where: {
      id: reminderId,
      userId,
    },
  });

  if (!reminder) {
    throw new Error("Reminder not found");
  }

  await reminder.update(data);

  return reminder;
};

export const deleteReminder = async (
  userId: number,
  reminderId: number
) => {
  const reminder = await Reminder.findOne({
    where: {
      id: reminderId,
      userId,
    },
  });

  if (!reminder) {
    throw new Error("Reminder not found");
  }

  await reminder.destroy();

  return true;
};