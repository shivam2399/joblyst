import { Profile } from "../models";

export const getProfile = async (userId: number) => {
  const profile = await Profile.findOne({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};

export const updateProfile = async (
  userId: number,
  data: {
    phone?: string;
    location?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
    headline?: string;
    careerGoal?: string;
  }
) => {
  const profile = await Profile.findOne({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  await profile.update(data);

  return profile;
};