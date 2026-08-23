import * as yup from "yup";

export const adopterSchema =
  yup.object({
    name: yup
      .string()
      .trim()
      .required("Full name is required")
      .min(
        2,
        "Name must be at least 2 characters",
      ),

    dateOfBirth: yup
      .string()
      .required(
        "Date of birth is required",
      ),

    gender: yup
      .string()
      .required("Gender is required"),

    occupation: yup
      .string()
      .trim()
      .required(
        "Occupation is required",
      ),

    maritalStatus: yup
      .string()
      .required(
        "Marital status is required",
      ),

    ownedPetsBefore: yup
      .string()
      .required(
        "Please select an option",
      ),

    currentPet: yup
      .string()
      .required(
        "Current pet is required",
      ),

    currentPets: yup
      .string()
      .required(
        "Current pets is required",
      ),

    phone: yup
      .string()
      .trim()
      .required(
        "Phone number is required",
      )
      .min(
        10,
        "Enter a valid phone number",
      ),

    email: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .required(
        "Email is required",
      ),

    address: yup
      .string()
      .trim()
      .required(
        "Address is required",
      ),

    residenceType: yup
      .string()
      .required(
        "Residence type is required",
      ),

    livingWithFamily: yup
      .string()
      .required(
        "Please select an option",
      ),

    householdSupport: yup
      .string()
      .required(
        "Please select an option",
      ),

    financiallyPrepared: yup
      .string()
      .required(
        "Please select an option",
      ),

    hoursAlone: yup
      .string()
      .required(
        "Please enter hours",
      ),

    caretakerDuringTravel: yup
      .string()
      .required(
        "Caretaker is required",
      ),

    adoptionReason: yup
      .string()
      .trim()
      .required(
        "Adoption reason is required",
      ),
  });

export type AdopterFormValues =
  yup.InferType<
    typeof adopterSchema
  >;