import { Application, Note } from "../models";

export const createNote = async (
  userId: number,
  applicationId: number,
  content: string
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

  const note = await Note.create({
    userId,
    applicationId,
    content,
  });

  return note;
};

export const getNotes = async (
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

  return Note.findAll({
    where: {
      applicationId,
      userId,
    },
    order: [["createdAt", "DESC"]],
  });
};

export const updateNote = async (
  userId: number,
  noteId: number,
  content: string
) => {
  const note = await Note.findOne({
    where: {
      id: noteId,
      userId,
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  await note.update({
    content,
  });

  return note;
};

export const deleteNote = async (
  userId: number,
  noteId: number
) => {
  const note = await Note.findOne({
    where: {
      id: noteId,
      userId,
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  await note.destroy();

  return true;
};