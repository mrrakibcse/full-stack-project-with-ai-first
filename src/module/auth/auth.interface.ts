import type { BloodGroup, Gender, MaritalStatus } from "../../generated/client";

export interface IPatientProfileData {
  bloodGroup?: BloodGroup | undefined;
  maritalStatus?: MaritalStatus | undefined;
  emergencyContactName?: string | undefined;
  emergencyContactNumber?: string | undefined;
  address?: string | undefined;
  medicalHistory?: string | undefined;
  allergies?: string | undefined;
}

export interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string | undefined;
  gender?: Gender | undefined;
  dateOfBirth?: string | Date | undefined;
  image?: string | undefined;
  bio?: string | undefined;
  patient?: IPatientProfileData | undefined;
}
