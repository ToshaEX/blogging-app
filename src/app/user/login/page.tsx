"use client";
import dynamic from "next/dynamic";

const AuthTemplate = dynamic(() => import("@/app/components/AuthTemplate"));
const LoginForm = dynamic(() => import("@/app/components/LoginForm"));

export default function Login() {
  return (
    <AuthTemplate
      title={"Sign In to your account"}
      body={"to enjoy all of our cool features ✌️"}
      form={<LoginForm />}
    />
  );
}
