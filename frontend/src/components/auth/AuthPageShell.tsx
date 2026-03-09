import { Heading, Stack, Text } from "@chakra-ui/react"
import { AuthLayout } from "../layouts/AuthLayout"
import { Link } from "react-router-dom"
import { COLORS } from "../../constants/colors"
import type { ReactNode } from "react";

interface IAuthPageShellProps {
    title: string;
    subtitle: string;
    footerText: string;
    footerLinkText: string;
    footerLinkTo: string;
    children: ReactNode;
}

const AuthPageShell = ({ title,
    subtitle,
    footerText,
    footerLinkText,
    footerLinkTo,
    children }: IAuthPageShellProps) => {
    return (
        <AuthLayout>
            <Stack gap="6">
                <Stack>
                    <Heading size="lg">{title}</Heading>
                    <Text color="fg.muted">{subtitle}</Text>
                </Stack>

                {children}

                <Text textAlign="center" color="fg.muted">
                    {footerText}
                    <Link
                        to={footerLinkTo}
                        style={{ color: COLORS.PRIMARY, marginLeft: "4px" }}
                    >
                        {footerLinkText}
                    </Link>
                </Text>
            </Stack>
        </AuthLayout>
    )
}

export default AuthPageShell