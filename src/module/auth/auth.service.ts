import { auth } from "../../lib/auth";
import prisma from "../../lib/prisma";
import type { IRegisterPatientPayload } from "./auth.interface";

const registerPatient = async (payload: IRegisterPatientPayload) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    gender,
    dateOfBirth,
    image,
    bio,
    patient: patientData,
  } = payload;

  // 1. Create user through Better Auth (handles hashing, account creation, sessions)
  const signUpResponse = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      role: "PATIENT",
      phoneNumber,
      gender,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      image,
      bio,
    },
  });

  if (!signUpResponse || !signUpResponse.user) {
    throw new Error("Failed to register patient user account");
  }

  // 2. Atomically upsert the patient profile linked to the newly created user
  const patient = await prisma.patient.upsert({
    where: { userId: signUpResponse.user.id },
    create: {
      userId: signUpResponse.user.id,
      bloodGroup: patientData?.bloodGroup ?? null,
      maritalStatus: patientData?.maritalStatus ?? null,
      emergencyContactName: patientData?.emergencyContactName ?? null,
      emergencyContactNumber: patientData?.emergencyContactNumber ?? null,
      address: patientData?.address ?? null,
      medicalHistory: patientData?.medicalHistory ?? null,
      allergies: patientData?.allergies ?? null,
    },
    update: {
      bloodGroup: patientData?.bloodGroup ?? null,
      maritalStatus: patientData?.maritalStatus ?? null,
      emergencyContactName: patientData?.emergencyContactName ?? null,
      emergencyContactNumber: patientData?.emergencyContactNumber ?? null,
      address: patientData?.address ?? null,
      medicalHistory: patientData?.medicalHistory ?? null,
      allergies: patientData?.allergies ?? null,
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

  return {
    user: signUpResponse.user,
    token: signUpResponse.token,
    patient,
  };
};

export const AuthService = {
  registerPatient,
};
