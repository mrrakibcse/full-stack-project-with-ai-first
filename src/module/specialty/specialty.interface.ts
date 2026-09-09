import type { Prisma } from "../../generated/client";

export type ICreateSpecialtyPayload = Prisma.SpecialtyCreateInput;
export type IUpdateSpecialtyPayload = Prisma.SpecialtyUpdateInput;

export interface ISpecialtyFilterRequest {
  searchTerm?: string | undefined;
  isDeleted?: boolean | undefined;
}
