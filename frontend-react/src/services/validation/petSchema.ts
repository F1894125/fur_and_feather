import * as yup from "yup";

export const petSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Pet name is required")
    .min(
      2,
      "Pet name must be at least 2 characters",
    ),

  species: yup
    .string()
    .required("Species is required"),

  breed: yup
    .string()
    .trim()
    .required("Breed is required"),

  age: yup
    .string()
    .trim()
    .required("Age is required"),

  gender: yup
    .string()
    .required("Gender is required"),

  weight: yup
    .string()
    .trim()
    .required("Weight is required"),

  intakeDate: yup
    .string()
    .required("Intake date is required"),

  status: yup
    .string()
    .oneOf([
      "Pending",
      "Adopted",
      "Rejected",
      "Available",
    ])
    .required("Status is required"),
});

export type PetFormValues =
  yup.InferType<typeof petSchema>;