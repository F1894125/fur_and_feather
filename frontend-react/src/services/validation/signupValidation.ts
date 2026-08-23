import * as Yup from "yup";

export const signupSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  // phone: Yup.string().matches(
  //   /^[0-9]{10}$/,
  //   "Phone number must be exactly 10 digits",
  // ),
  // .required("Please enter Phone number"),
  password1: Yup.string()
    .min(8, "password must be alteast 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character")
    .required("Password is required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password1"), "Password must match"])
    .required("Please confirm your password"),
});
