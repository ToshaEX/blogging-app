import React from "react";
import {
  Box,
  Checkbox,
  Stack,
  Link,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PrimaryButton, TextField } from "@/app/components";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { authService } from "@/service";
import routes from "@/app/constant/routes";
import { useAppDispatch } from "@/hooks/hooks";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { LoginType, loggedIn } from "@/features/user/userSlice";
import jwt_decode from "jwt-decode";

type InitialValueType = {
  email: string;
  password: string;
};

const initialValue: InitialValueType = {
  email: "",
  password: "",
};

const schema = Yup.object().shape({
  email: Yup.string().required().email("required valid email address"),
  password: Yup.string().required().min(8, "Password should be greater than 8"),
});

const submitHandle = async (
  values: any,
  actions: any,
  toast: any,
  router: AppRouterInstance,
  dispatch: Dispatch<AnyAction>
) => {
  const { password, email } = values;
  actions.setSubmitting(true);
  await authService
    .signIn({ password, email })
    .then((res) => {
      const token = res?.data.accessToken;
      const { username, email } = jwt_decode<LoginType>(token);
      localStorage.setItem("token", token);

      dispatch(loggedIn({ username, email }));
      toast({
        title: "Sign In",
        variant: "subtle",
        status: "success",
        id: "signIn-success",
      });
      router.push("/");
      return;
    })
    .catch((err) => {
      if (!toast.isActive("signIn-error"))
        toast({
          title: err.response.data.message,
          variant: "subtle",
          status: "error",
          id: "signIn-error",
        });
    });
};

const LoginForm = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      <Stack spacing={4} align={"center"}>
        <Formik
          initialValues={initialValue}
          validateOnMount={false}
          validateOnChange={false}
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            submitHandle(values, actions, toast, router, dispatch);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <TextField
                id="email"
                isRequired={true}
                name="email"
                type="email"
                label="Email address"
                size="lg"
                error={errors.email && touched.email}
                errorMessage={errors.email}
              />
              <TextField
                id="password"
                isRequired={true}
                name="password"
                type="password"
                label="Password"
                error={errors.password && touched.password}
                errorMessage={errors.password}
              />
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>

                  <Link color={"blue.400"} href={routes.signUp}>
                    Create account?
                  </Link>
                </Stack>
                <PrimaryButton label="Login" type="submit" />
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
};

export default LoginForm;
