import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters").required("Password is required"),
});

export type SignInFormData = yup.InferType<typeof signInSchema>;