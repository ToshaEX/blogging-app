"use client";
import { AuthTemplate } from "@/components";
import SignUpForm from "./SignUpForm";
export default function SignUp() {
  return (
    <AuthTemplate
      title={"Sign Up to Blogger App"}
      body={"to enjoy all of our cool features ✌️"}
      form={<SignUpForm />}
    />
  );
}
