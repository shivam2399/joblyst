import { Company, SavedJob } from "../models";

interface SavedJobData {
  companyId?: number;
  title: string;
  description?: string;
  url?: string;
  location?: string;
  employmentType?: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  source?: string;
}

export const createSavedJob = async (
  userId: number,
  data: SavedJobData
) => {
  if (data.companyId) {
    const company = await Company.findOne({
      where: {
        id: data.companyId,
        userId,
      },
    });

    if (!company) {
      throw new Error("Company not found");
    }
  }

  const savedJob = await SavedJob.create({
    userId,
    ...data,
  });

  return SavedJob.findByPk(savedJob.id, {
    include: [
      {
        model: Company,
        as: "company",
      },
    ],
  });
};

export const getSavedJobs = async (
  userId: number
) => {
  return SavedJob.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Company,
        as: "company",
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

export const getSavedJobById = async (
  userId: number,
  savedJobId: number
) => {
  const savedJob = await SavedJob.findOne({
    where: {
      id: savedJobId,
      userId,
    },
    include: [
      {
        model: Company,
        as: "company",
      },
    ],
  });

  if (!savedJob) {
    throw new Error("Saved job not found");
  }

  return savedJob;
};

export const updateSavedJob = async (
  userId: number,
  savedJobId: number,
  data: Partial<SavedJobData>
) => {
  const savedJob = await SavedJob.findOne({
    where: {
      id: savedJobId,
      userId,
    },
  });

  if (!savedJob) {
    throw new Error("Saved job not found");
  }

  if (data.companyId) {
    const company = await Company.findOne({
      where: {
        id: data.companyId,
        userId,
      },
    });

    if (!company) {
      throw new Error("Company not found");
    }
  }

  await savedJob.update(data);

  return SavedJob.findOne({
    where: {
      id: savedJobId,
      userId,
    },
    include: [
      {
        model: Company,
        as: "company",
      },
    ],
  });
};

export const deleteSavedJob = async (
  userId: number,
  savedJobId: number
) => {
  const savedJob = await SavedJob.findOne({
    where: {
      id: savedJobId,
      userId,
    },
  });

  if (!savedJob) {
    throw new Error("Saved job not found");
  }

  await savedJob.destroy();

  return true;
};