import { Button, Field, Group, Icon, Input } from "@chakra-ui/react"
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { COLORS } from "../../constants/colors";

interface IPasswordFieldProps {
    label: string;
    name: string;
    value: string;
    placeholder: string;
    error?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField = ({ label, name, onChange, placeholder, value, error, required }: IPasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Field.Root required={required} invalid={!!error}>
            <Field.Label>
                {label} {required && <Field.RequiredIndicator />}
            </Field.Label>

            <Group attached w="full">
                <Input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <Button
                    type="button"
                    position="absolute"
                    right="0"
                    top="0"
                    bottom="0"
                    variant="plain"
                    size="sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    <Icon as={showPassword ? LuEye : LuEyeOff} color={COLORS.PRIMARY} />
                </Button>
            </Group>

            {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Field.Root>
    )
}

export default PasswordField