import type { Prisma } from "../../generated/client";
import prisma from "../../lib/prisma";
import type {
  ICreatePatientPayload,
  IPatientFilterRequest,
  IUpdatePatientPayload,
} from "./patient.interface";

const createPatientIntoDB = async (payload: ICreatePatientPayload) => {
  const result = await prisma.patient.create({
    data: payload,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          gender: true,
          phoneNumber: true,
          image: true,
          dateOfBirth: true,
        },
      },
    },
  });
  return result;
};

const getAllPatientsFromDB = async (filters: IPatientFilterRequest = {}) => {
  const { searchTerm, bloodGroup, maritalStatus, isDeleted } = filters;

  const andConditions: Prisma.PatientWhereInput[] = [];

  if (isDeleted !== undefined) {
    andConditions.push({ isDeleted });
  } else {
    andConditions.push({ isDeleted: false });
  }

  if (bloodGroup) {
    andConditions.push({ bloodGroup });
  }

  if (maritalStatus) {
    andConditions.push({ maritalStatus });
  }

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          user: {
            name: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
        },
        {
          user: {
            email: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
        },
        {
          user: {
            phoneNumber: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
        },
        {
          address: {
            contains: searchTerm,
            mode: "insensitive" as const,
          },
        },
      ],
    });
  }

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.patient.findMany({
    where: whereConditions,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          gender: true,
          phoneNumber: true,
          image: true,
          dateOfBirth: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSinglePatientFromDB = async (id: string) => {
  const result = await prisma.patient.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          gender: true,
          phoneNumber: true,
          image: true,
          dateOfBirth: true,
        },
      },
    },
  });

  if (!result) {
    throw new Error("Patient not found");
  }

  return result;
};

const getMyPatientProfileFromDB = async (userId: string) => {
  const result = await prisma.patient.findFirst({
    where: {
      userId,
      isDeleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          gender: true,
          phoneNumber: true,
          image: true,
          dateOfBirth: true,
        },
      },
    },
  });

  if (!result) {
    throw new Error("Patient profile not found for this user");
  }

  return result;
};

const updatePatientIntoDB = async (
  id: string,
  payload: IUpdatePatientPayload
) => {
  await getSinglePatientFromDB(id);

  const result = await prisma.patient.update({
    where: { id },
    data: payload,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          gender: true,
          phoneNumber: true,
          image: true,
          dateOfBirth: true,
        },
      },
    },
  });

  return result;
};

const deletePatientFromDB = async (id: string) => {
  await getSinglePatientFromDB(id);

  const result = await prisma.patient.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return result;
};

export const PatientService = {
  createPatientIntoDB,
  getAllPatientsFromDB,
  getSinglePatientFromDB,
  getMyPatientProfileFromDB,
  updatePatientIntoDB,
  deletePatientFromDB,
};
