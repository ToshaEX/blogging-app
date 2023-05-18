"use client";
import dynamic from "next/dynamic";

const SignUpForm = dynamic(() => import("./SignUpForm"));
const AuthTemplate = dynamic(() => import("@/app/components/AuthTemplate"));

export default function SignUp() {
  return (
    <AuthTemplate
      title={"Sign Up to Blogger App"}
      body={"to enjoy all of our cool features ✌️"}
      form={<SignUpForm />}
    />
  );
}
