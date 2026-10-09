import {
  Application,
  Company,
  SavedJob,
} from "../models";

import {
  ApplicationStatus,
} from "../models/Application";

export const getDashboardStats = async (userId: number) => {
  const applications = await Application.findAll({
    where: {
      userId,
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Company,
        as: "company",
        attributes: ["id", "name"],
      },
    ],
  });

  const savedJobsCount = await SavedJob.count({
    where: {
      userId,
    },
  });

  const companiesCount = await Company.count({
    where: {
      userId,
    },
  });

  const totalApplications = applications.length;

  const byStatus: Record<ApplicationStatus, number> = {
  [ApplicationStatus.SAVED]: 0,
  [ApplicationStatus.APPLIED]: 0,
  [ApplicationStatus.SCREENING]: 0,
  [ApplicationStatus.INTERVIEW]: 0,
  [ApplicationStatus.OFFER]: 0,
  [ApplicationStatus.REJECTED]: 0,
  [ApplicationStatus.WITHDRAWN]: 0,
  [ApplicationStatus.ACCEPTED]: 0,
};

  for (const application of applications) {
    byStatus[application.status]++;
  }

  const responses =
    byStatus.SCREENING +
    byStatus.INTERVIEW +
    byStatus.OFFER +
    byStatus.REJECTED +
    byStatus.ACCEPTED;

  const responseRate =
    totalApplications > 0
      ? Number(((responses / totalApplications) * 100).toFixed(2))
      : 0;

  const interviewRate =
    totalApplications > 0
      ? Number(
          ((byStatus.INTERVIEW / totalApplications) * 100).toFixed(2)
        )
      : 0;

  const offerRate =
    totalApplications > 0
      ? Number(
          ((byStatus.OFFER / totalApplications) * 100).toFixed(2)
        )
      : 0;

  const recentApplications = applications
    .slice(0, 5)
    .map((application) => {
        const company = application.get("company") as
        | Company
        | null;

        return {
        id: application.id,
        jobTitle: application.jobTitle,
        status: application.status,
        priority: application.priority,
        applicationDate: application.applicationDate,
        company: company
            ? {
                id: company.id,
                name: company.name,
            }
            : null,
        };
    });

  return {
    totalApplications,
    savedJobs: savedJobsCount,
    totalCompanies: companiesCount,
    byStatus,
    responseRate,
    interviewRate,
    offerRate,
    recentApplications,
  };
};