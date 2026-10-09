import User from "./User";
import Profile from "./Profile";
import Company from "./Company";
import Application from "./Application";
import SavedJob from "./SavedJob";
import Note from "./Note";
import Attachment from "./Attachment";
import Reminder from "./Reminder";

// User -> Profile
User.hasOne(Profile, {
  foreignKey: "userId",
  as: "profile",
  onDelete: "CASCADE",
});

Profile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// User -> Companies
User.hasMany(Company, {
  foreignKey: "userId",
  as: "companies",
  onDelete: "CASCADE",
});

Company.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// User -> Applications
User.hasMany(Application, {
  foreignKey: "userId",
  as: "applications",
  onDelete: "CASCADE",
});

Application.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Company -> Applications
Company.hasMany(Application, {
  foreignKey: "companyId",
  as: "applications",
  onDelete: "CASCADE",
});

Application.belongsTo(Company, {
  foreignKey: "companyId",
  as: "company",
});

// User -> Saved Jobs
User.hasMany(SavedJob, {
  foreignKey: "userId",
  as: "savedJobs",
  onDelete: "CASCADE",
});

SavedJob.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Company -> Saved Jobs
Company.hasMany(SavedJob, {
  foreignKey: "companyId",
  as: "savedJobs",
  onDelete: "SET NULL",
});

SavedJob.belongsTo(Company, {
  foreignKey: "companyId",
  as: "company",
});

// Application -> Notes
Application.hasMany(Note, {
  foreignKey: "applicationId",
  as: "notes",
  onDelete: "CASCADE",
});

Note.belongsTo(Application, {
  foreignKey: "applicationId",
  as: "application",
});

// Application -> Attachments
Application.hasMany(Attachment, {
  foreignKey: "applicationId",
  as: "attachments",
  onDelete: "CASCADE",
});

Attachment.belongsTo(Application, {
  foreignKey: "applicationId",
  as: "application",
});

// User -> Reminders
User.hasMany(Reminder, {
  foreignKey: "userId",
  as: "reminders",
  onDelete: "CASCADE",
});

Reminder.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Application -> Reminders
Application.hasMany(Reminder, {
  foreignKey: "applicationId",
  as: "reminders",
  onDelete: "CASCADE",
});

Reminder.belongsTo(Application, {
  foreignKey: "applicationId",
  as: "application",
});

export {
  User,
  Profile,
  Company,
  Application,
  SavedJob,
  Note,
  Attachment,
  Reminder,
};