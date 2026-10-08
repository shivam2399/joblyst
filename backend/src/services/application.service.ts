import { Op } from "sequelize";
import { Application, Company } from "../models";
import {
  ApplicationPriority,
  ApplicationStatus,
} from "../models/Application";

interface CreateApplicationData {
  companyId: number;
  jobTitle: string;
  jobUrl?: string;
  applicationDate?: Date;
  status?: ApplicationStatus;
  priority?: ApplicationPriority;
  location?: string;
  employmentType?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  source?: string;
}

interface UpdateApplicationData {
  companyId?: number;
  jobTitle?: string;
  jobUrl?: string;
  applicationDate?: Date;
  status?: ApplicationStatus;
  priority?: ApplicationPriority;
  location?: string;
  employmentType?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  source?: string;
}

export const createApplication = async (
  userId: number,
  data: CreateApplicationData
) => {
  // Make sure the company belongs to this user
  const company = await Company.findOne({
    where: {
      id: data.companyId,
      userId,
    },
  });

  if (!company) {
    throw new Error("Company not found");
  }

  const application = await Application.create({
  userId,
  companyId: data.companyId,
  jobTitle: data.jobTitle,
  jobUrl: data.jobUrl,
  applicationDate: data.applicationDate,
  status: data.status ?? ApplicationStatus.APPLIED,
  priority: data.priority ?? ApplicationPriority.MEDIUM,
  location: data.location,
  employmentType: data.employmentType,
  salaryMin: data.salaryMin,
  salaryMax: data.salaryMax,
  salaryCurrency: data.salaryCurrency ?? "INR",
  source: data.source,
});

  return Application.findByPk(application.id, {
    include: [
      {
        model: Company,
        as: "company",
      },
    ],
  });
};

export const getApplications = async (
  userId: number,
  options: {
    search?: string;
    status?: ApplicationStatus;
    priority?: ApplicationPriority;
    fromDate?: Date;
    toDate?: Date;
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: "ASC" | "DESC";
  }
) => {
  const {
    search,
    status,
    priority,
    fromDate,
    toDate,
    page,
    limit,
    sortBy,
    sortOrder,
  } = options;

  const where: any = {
    userId,
  };

  if (status) {
    where.status = status;
  }

  if (priority) {
    where.priority = priority;
  }

  if (fromDate || toDate) {
    where.applicationDate = {};

    if (fromDate) {
      where.applicationDate[Op.gte] = fromDate;
    }

    if (toDate) {
      where.applicationDate[Op.lte] = toDate;
    }
  }

  if (search) {
    where[Op.or] = [
      {
        jobTitle: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        location: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        source: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        "$company.name$": {
          [Op.like]: `%${search}%`,
        },
      },
    ];
  }

  const offset = (page - 1) * limit;

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "applicationDate",
    "jobTitle",
    "priority",
    "status",
  ];

  const finalSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const { rows, count } = await Application.findAndCountAll({
    where,
    include: [
      {
        model: Company,
        as: "company",
        attributes: [
          "id",
          "name",
          "website",
          "industry",
          "location",
        ],
      },
    ],
    order: [[finalSortBy, sortOrder]],
    limit,
    offset,
    distinct: true,
  });

  return {
    applications: rows,
    pagination: {
      page,
      limit,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};

export const getApplicationById = async (
  userId: number,
  applicationId: number
) => {
  const application = await Application.findOne({
    where: {
      id: applicationId,
      userId,
    },
    include: [
      {
        model: Company,
        as: "company",
      },
    ],
  });

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};

export const updateApplication = async (
  userId: number,
  applicationId: number,
  data: UpdateApplicationData
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

  // If changing company, verify that company belongs to user
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

  await application.update(data);

  return Application.findOne({
    where: {
      id: applicationId,
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

export const deleteApplication = async (
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

  await application.destroy();

  return true;
};