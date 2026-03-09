import { Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../auth/schemas";
import type { RegisterCredentials } from "../types/authTypes";
import type { ApiError } from "../api/client";
import { COLORS } from "../constants/colors";
import AuthPageShell from "../components/auth/AuthPageShell";
import AuthFormField from "../components/auth/AuthFormField";
import PasswordField from "../components/auth/PasswordField";
import { useAppDispatch } from "../store/reduxHooks";
import { registerUser } from "../store/authSlice";
import { showErrorToast } from "../utils/toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<RegisterCredentials>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: registerSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(registerUser(values)).unwrap();
        navigate("/app/dashboard");
      } catch (e) {
        const err = e as ApiError | string;
        const description =
          typeof err === "string"
            ? err
            : err.message || "Invalid credentials";
        showErrorToast({ title: "Failed to register", description })
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (formik.errors[e.target.name as keyof RegisterCredentials]) {
      formik.setFieldError(
        e.target.name as keyof RegisterCredentials,
        undefined,
      );
    }
  };

  return (
    <AuthPageShell
      title="Create account"
      subtitle="Fill in the form to create a new account"
      footerText="Have an account?"
      footerLinkText="Log in"
      footerLinkTo="/login"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <Stack gap="4">
          <AuthFormField
            label="Name"
            name="firstName"
            value={formik.values.firstName}
            placeholder="Enter your name..."
            error={formik.errors.firstName}
            required
            onChange={handleFieldChange}
          />

          <AuthFormField
            label="Surname"
            name="lastName"
            value={formik.values.lastName}
            placeholder="Enter your surname..."
            error={formik.errors.lastName}
            required
            onChange={handleFieldChange}
          />

          <AuthFormField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            placeholder="Enter your email..."
            error={formik.errors.email}
            required
            onChange={handleFieldChange}
          />

          <PasswordField
            label="Password"
            name="password"
            value={formik.values.password}
            placeholder="Enter your password..."
            error={formik.errors.password}
            required
            onChange={handleFieldChange}
          />

          <PasswordField
            label="Confirm password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            placeholder="Confirm your password..."
            error={formik.errors.confirmPassword}
            required
            onChange={handleFieldChange}
          />

          <Button
            type="submit"
            loading={formik.isSubmitting}
            bg={COLORS.PRIMARY}
            color="white"
            _hover={{ bg: COLORS.PRIMARY_HOVER }}
            _active={{ bg: COLORS.PRIMARY_ACTIVE }}
            disabled={!(formik.values.email && formik.values.password && formik.values.confirmPassword && formik.values.firstName && formik.values.lastName)}
          >
            Create account
          </Button>
        </Stack>
      </form>
    </AuthPageShell>
  );
};

export default RegisterPage;