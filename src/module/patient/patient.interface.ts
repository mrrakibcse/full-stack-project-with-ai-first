import type { BloodGroup, MaritalStatus, Prisma } from "../../generated/client";

export type ICreatePatientPayload = Prisma.PatientUncheckedCreateInput;
export type IUpdatePatientPayload = Prisma.PatientUncheckedUpdateInput;

export interface IPatientFilterRequest {
  searchTerm?: string | undefined;
  bloodGroup?: BloodGroup | undefined;
  maritalStatus?: MaritalStatus | undefined;
  isDeleted?: boolean | undefined;
}
