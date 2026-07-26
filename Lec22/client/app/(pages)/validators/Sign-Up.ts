import * as yup from "yup";

export const signUpSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters").required("Password is required"),
});

export type SignUpFormData = yup.InferType<typeof signUpSchema>;