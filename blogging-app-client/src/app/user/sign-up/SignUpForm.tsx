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
  username: Yup.string().required().min(5).max(20),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string().required().min(8),
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
      <Stack spacing={4}>
        <Formik
          initialValues={initialValue}
          validationSchema={schema}
          onSubmit={(value, action) =>
            submitHandle(value, action, toast, router)
          }
        >
          {({ isSubmitting }) => (
            <Form>
              <TextField
                id="username"
                isRequired={true}
                name="username"
                type="text"
                label="Username"
              />
              <TextField
                id="email"
                isRequired={true}
                name="email"
                type=" email"
                label="Email address"
              />
              <TextField
                id="password"
                isRequired={true}
                name="password"
                type="password"
                label="Password"
              />
              <TextField
                id="confirmPassword"
                isRequired={true}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
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
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={isSubmitting}
                >
                  Sign Up
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
};

export default SignUpForm;
