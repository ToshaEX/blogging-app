import React from "react";
import {
  Box,
  Stack,
  Button,
  useColorModeValue,
  Link,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { authService } from "@/service";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import routes from "@/app/constant/routes";
import dynamic from "next/dynamic";
import { PrimaryButton } from "@/app/components";

const TextField = dynamic(() => import("@/app/components/TextField"));

const submitHandle = async (
  values: any,
  actions: any,
  toast: any,
  router: AppRouterInstance
) => {
  //**User creation */
  const { confirmPassword, password, username, email } = values;
  actions.setSubmitting(true);

  if (confirmPassword !== password && !toast.isActive("password-not-match")) {
    toast({
      title: "Password not matched",
      variant: "subtle",
      status: "warning",
      id: "password-not-match",
    });
    return;
  }

  await authService
    .signUp({
      username,
      email,
      password,
    })
    .then((res) => {
      toast({
        title: "Sign up Complete",
        variant: "subtle",
        status: "success",
        id: "sign-up",
      });
      localStorage.setItem("token", res?.data.accessToken);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    })
    .catch((err) => {
      if (!toast.isActive("error"))
        toast({
          title: err.response.data.message,
          variant: "subtle",
          status: "error",
          id: "error",
        });
    });
};

type InitialValueType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const initialValue: InitialValueType = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  username: Yup.string()
    .required()
    .min(5, "Username is too short")
    .max(20, "Username is too long"),
  password: Yup.string().required().min(8, "Password is too short"),
  confirmPassword: Yup.string().required().min(8, "Password is too short"),
});

const SignUpForm = () => {
  const toast = useToast();
  const router = useRouter();
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
          onSubmit={(value, action) =>
            submitHandle(value, action, toast, router)
          }
        >
          {({ errors, touched }) => (
            <Form>
              <TextField
                id="username"
                isRequired={true}
                name="username"
                type="text"
                label="Username"
                error={errors.username && touched.username}
                errorMessage={errors.username}
              />
              <TextField
                id="email"
                isRequired={true}
                name="email"
                type=" email"
                label="Email address"
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
              <TextField
                id="confirmPassword"
                isRequired={true}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                error={errors.confirmPassword && touched.confirmPassword}
                errorMessage={errors.confirmPassword}
              />
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Text fontSize={"lg"} color={"gray.600"}>
                    Have an account?
                  </Text>
                  <Link color={"blue.400"} href={routes.signIn}>
                    Sign In Here
                  </Link>
                </Stack>
                <PrimaryButton label="Sign Up" type="submit" />
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
};

export default SignUpForm;
