import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "others"], {
    message: "Please select a gender",
  }),
  occupation: z.string().trim().min(2, "Current occupation is required"),
  maritalStatus: z.enum(
    [
      "single",
      "married",
      "engaged",
      "divorced",
      "widowed",
      "prefer_not_to_say",
    ],
    {
      message: "Please select marital status",
    },
  ),
  ownedPetsBefore: z.enum(["yes", "no"]).optional(),
  currentPetSpecies: z.string().optional(),
  currentPetBreed: z.string().optional(),
  currentPetAge: z.string().optional(),
  adoptionReason: z.string().trim().optional(),
});

export const step2Schema = z.object({
  phone: z.string().trim().min(10, "Valid phone number is required"),
  email: z.string().trim().email("Valid email is required"),
  step2Password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().trim().min(5, "Address is required"),
  residenceType: z.enum(["apartment", "independent_house", "others"], {
    message: "Please select residence type",
  }),
});

export const step3Schema = z
  .object({
    createPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    governmentId: z
      .any()
      .refine(
        (val) => val && val.length > 0,
        "Government ID upload is required",
      ),
    addressProof: z
      .any()
      .refine(
        (val) => val && val.length > 0,
        "Address proof upload is required",
      ),
    profilePhoto: z.any().optional(),
  })
  .refine((data) => data.createPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const fullFormSchema = step1Schema.and(step2Schema).and(step3Schema);
export type FormValues = z.infer<typeof fullFormSchema>;
