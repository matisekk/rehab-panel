import { Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../auth/schemas";
import type { LoginCredentials } from "../types/authTypes";
import type { ApiError } from "../api/client";
import { COLORS } from "../constants/colors";
import AuthPageShell from "../components/auth/AuthPageShell";
import AuthFormField from "../components/auth/AuthFormField";
import PasswordField from "../components/auth/PasswordField";
import { useAppDispatch } from "../store/reduxHooks";
import { loginUser } from "../store/authSlice";
import { showErrorToast } from "../utils/toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<LoginCredentials>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(loginUser(values)).unwrap();
        navigate("/app/dashboard");
      } catch (e) {
        const err = e as ApiError | string;
        const description =
          typeof err === "string"
            ? err
            : err.message || "Invalid email or password";

        showErrorToast({ title: "Failed to login", description })
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (formik.errors[e.target.name as keyof LoginCredentials]) {
      formik.setFieldError(
        e.target.name as keyof LoginCredentials,
        undefined,
      );
    }
  };

  return (
    <AuthPageShell
      title="Rehabilitation Panel"
      subtitle="Login to view your plan and start exercising"
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkTo="/register"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <Stack gap="4">
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

          <Button
            type="submit"
            loading={formik.isSubmitting}
            bg={COLORS.PRIMARY}
            color="white"
            _hover={{ bg: COLORS.PRIMARY_HOVER }}
            _active={{ bg: COLORS.PRIMARY_ACTIVE }}
            disabled={!(formik.values.email && formik.values.password)}
          >
            Login
          </Button>
        </Stack>
      </form>
    </AuthPageShell>
  );
};

export default LoginPage;