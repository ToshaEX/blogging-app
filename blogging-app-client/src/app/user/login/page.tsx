"use client";
import { AuthTemplate } from "@/components";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <AuthTemplate
      title={"Sign In to your account"}
      body={"to enjoy all of our cool features ✌️"}
      form={<LoginForm />}
    />
  );
}
