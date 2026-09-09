import type { Prisma } from "../../generated/client";
import prisma from "../../lib/prisma";
import type {
  ICreateSpecialtyPayload,
  ISpecialtyFilterRequest,
  IUpdateSpecialtyPayload,
} from "./specialty.interface";


const createSpecialtyIntoDB = async (payload: ICreateSpecialtyPayload) => {
  const result = await prisma.specialty.create({
    data: payload,
  });
  return result;
};

const getAllSpecialtiesFromDB = async (filters: ISpecialtyFilterRequest = {}) => {
  const { searchTerm, isDeleted } = filters;

  const andConditions: Prisma.SpecialtyWhereInput[] = [];


  if (isDeleted !== undefined) {
    andConditions.push({ isDeleted });
  } else {
    // Default to only non-deleted specialties
    andConditions.push({ isDeleted: false });
  }

  if (searchTerm) {
    andConditions.push({
      title: {
        contains: searchTerm,
        mode: "insensitive" as const,
      },
    });
  }

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.specialty.findMany({
    where: whereConditions,
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSingleSpecialtyFromDB = async (id: string) => {
  const result = await prisma.specialty.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!result) {
    throw new Error("Specialty not found");
  }

  return result;
};

const updateSpecialtyIntoDB = async (
  id: string,
  payload: IUpdateSpecialtyPayload
) => {
  // Check if exists
  await getSingleSpecialtyFromDB(id);

  const result = await prisma.specialty.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteSpecialtyFromDB = async (id: string) => {
  // Check if exists
  await getSingleSpecialtyFromDB(id);

  // Soft delete
  const result = await prisma.specialty.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return result;
};

export const SpecialtyService = {
  createSpecialtyIntoDB,
  getAllSpecialtiesFromDB,
  getSingleSpecialtyFromDB,
  updateSpecialtyIntoDB,
  deleteSpecialtyFromDB,
};
