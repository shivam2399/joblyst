import { Company } from "../models";

export const createCompany = async (
    userId: number,
    data: {
        name: string,
        website?: string,
        industry?: string,
        companySize?: string,
        location?: string,
        contactName?: string,
        contactEmail?: string,
        contactPhone?: string,
        notes?: string
    }
) => {
    const company = await Company.create({
        userId,
        ...data,
    });

    return company;
};

export const getCompanies = async (userId: number) => {
    const companies = await Company.findAll({
        where: {
            userId
        },
        order: [["createdAt", "DESC"]],
    });

    return companies;
};

export const getCompanyById = async (
    userId: number,
    companyId: number
) => {
    const company = await Company.findOne({
        where: {
            id: companyId,
            userId,
        }
    });

    if(!company) {
        throw new Error("Company not found");
    }

    return company; 
};

export const updateCompany = async (
    userId: number,
    companyId: number,
    data: {
        name?: string;
        website?: string;
        industry?: string;
        companySize?: string;
        location?: string;
        contactName?: string;
        contactEmail?: string;
        contactPhone?: string;
        notes?: string;
    }
) => {
    const company = await Company.findOne({
        where: {
            id: companyId,
            userId
        }
    });

    if(!company) {
        throw new Error("Company not found");
    }

    await company.update(data);
    return company
};

export const deleteCompany = async (
    userId: number,
    companyId: number
) => {
    const company = await Company.findOne({
        where: {
            id: companyId,
            userId
        }
    })

    if(!company) {
        throw new Error("Company not found")
    }

    await company.destroy();
    return true;
}