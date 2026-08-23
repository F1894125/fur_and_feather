import * as yup from "yup";

export const step1Schema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
  dob: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Please select a gender"),
  occupation: yup.string().required("Please select an occupation"),
  maritalStatus: yup.string().required("Please select marital status"),
  ownedPetsBefore: yup.string().optional(),
  hasCurrentPets: yup
    .string()
    .oneOf(["yes", "no"])
    .required("Please select if you currently have pets"),
  currentPetSpecies: yup.string().when("hasCurrentPets", {
    is: "yes",
    then: (schema) =>
      schema.required("Species is required when you currently own pets"),
    otherwise: (schema) => schema.optional(),
  }),
  currentPetBreed: yup.string().when("hasCurrentPets", {
    is: "yes",
    then: (schema) =>
      schema.required("Breed is required when you currently own pets"),
    otherwise: (schema) => schema.optional(),
  }),
  adoptionReason: yup
    .string()
    .trim()
    .required("Please state your adoption reason"),
});

export const step2Schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
});

export const step3Schema = yup.object({
  idNumber: yup
    .string()
    .required("Government ID / Passport number is required"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the verification terms"),
});

export const fullFormSchema = step1Schema
  .concat(step2Schema)
  .concat(step3Schema);
