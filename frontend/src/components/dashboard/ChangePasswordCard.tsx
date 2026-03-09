import { Button, Card, Heading, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useAppSelector } from "../../store/reduxHooks";
import { type ApiError } from "../../api/client";
import { COLORS } from "../../constants/colors";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import PasswordField from "../auth/PasswordField";
import { changePasswordSchema } from "../../auth/schemas";
import { changePassword } from "../../api/meApi";

type ChangePasswordValues = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

type ChangePasswordCardProps = {
    onClose: () => void;
}

const ChangePasswordCard = ({ onClose }: ChangePasswordCardProps) => {
    const token = useAppSelector((state) => state.auth.token);

    const formik = useFormik<ChangePasswordValues>({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: changePasswordSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            if (!token) {
                setSubmitting(false);
                return;
            }
            const body = {
                oldPassword: values.currentPassword,
                newPassword: values.newPassword,
            }
            try {
                await changePassword(token, body)

                showSuccessToast({ title: "Password has been changed" });
                resetForm();
                onClose();

            } catch (e) {
                const err = e as ApiError
                showErrorToast({ title: "Failed to change password", description: err.message || '' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);

        const fieldName = e.target.name as keyof ChangePasswordValues;

        if (formik.errors[fieldName]) {
            formik.setFieldError(fieldName, undefined);
        }
    };

    return (
        <Card.Root variant="outline" borderRadius="xl">
            <Card.Body>
                <Stack gap="4">
                    <Heading size="md">Change password</Heading>

                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Stack gap="4">
                            <PasswordField
                                label="Current password"
                                name="currentPassword"
                                value={formik.values.currentPassword}
                                placeholder="Enter current password..."
                                error={formik.errors.currentPassword}
                                required
                                onChange={handleFieldChange}
                            />

                            <PasswordField
                                label="New password"
                                name="newPassword"
                                value={formik.values.newPassword}
                                placeholder="Enter new password..."
                                error={formik.errors.newPassword}
                                required
                                onChange={handleFieldChange}
                            />

                            <PasswordField
                                label="Confirm password"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                placeholder="Confirm new password..."
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
                            >
                                Change password
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

export default ChangePasswordCard;