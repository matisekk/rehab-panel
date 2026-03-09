import { Field, Input } from "@chakra-ui/react"

interface IauthFormFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    placeholder: string;
    error?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const AuthFormField = ({ label, name, onChange, placeholder, value, error, required, type }: IauthFormFieldProps) => {
    return (
        <Field.Root required={required} invalid={!!error}>
            <Field.Label>
                {label} {required && <Field.RequiredIndicator />}
            </Field.Label>
            <Input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Field.Root>
    )
}

export default AuthFormField