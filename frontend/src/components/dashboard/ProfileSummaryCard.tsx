import { Button, Card, Field, Heading, Input, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { COLORS } from "../../constants/colors";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import AuthFormField from "../auth/AuthFormField";
import { profileSchema } from "../../auth/schemas";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { fetchMe } from "../../store/authSlice";
import { changePersonalInfo } from "../../api/meApi";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
};

type ProfileSummaryCardProps = {
  onProfileUpdated: () => Promise<void>;
  onClose: () => void;
}

const ProfileSummaryCard = ({ onProfileUpdated, onClose }: ProfileSummaryCardProps) => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
    },
    enableReinitialize: true,
    validationSchema: profileSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      if (!token) {
        setSubmitting(false);
        return;
      }
      const body = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
      }
      try {
        await changePersonalInfo(token, body)

        await dispatch(fetchMe()).unwrap();
        await onProfileUpdated?.();
        onClose();

        showSuccessToast({ title: "Profile data has been updated" });
      } catch {
        showErrorToast({ title: "Failed to update profile" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);

    const fieldName = e.target.name as keyof ProfileFormValues;
    if (formik.errors[fieldName]) {
      formik.setFieldError(fieldName, undefined);
    }
  };

  return (
    <Card.Root variant="outline" borderRadius="xl" data-testid="profileSummaryCardModal">
      <Card.Body>
        <Stack gap="4">
          <Heading size="md">Personal information</Heading>

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

              <Field.Root>
                <Field.Label>
                  Email
                </Field.Label>
                <Input value={user?.email} readOnly disabled />
                <Field.HelperText>Email address is read-only and cannot be changed</Field.HelperText>
              </Field.Root>

              <Button
                type="submit"
                loading={formik.isSubmitting}
                bg={COLORS.PRIMARY}
                color="white"
                _hover={{ bg: COLORS.PRIMARY_HOVER }}
                _active={{ bg: COLORS.PRIMARY_ACTIVE }}
              >
                Save changes
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default ProfileSummaryCard;