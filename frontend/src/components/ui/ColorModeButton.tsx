import React from "react"
import { useColorMode } from "../../hooks/useColorMode"
import { ClientOnly, IconButton, Skeleton, type IconButtonProps } from "@chakra-ui/react"
import ColorModeIcon from "./ColorModeIcon"

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> { }

export const ColorModeButton = React.forwardRef<
    HTMLButtonElement,
    ColorModeButtonProps
>(function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    return (
        <ClientOnly fallback={<Skeleton boxSize="9" />}>
            <IconButton
                onClick={toggleColorMode}
                variant="ghost"
                aria-label="Toggle color mode"
                size="sm"
                ref={ref}
                {...props}
                css={{
                    _icon: {
                        width: "5",
                        height: "5",
                    },
                }}
            >
                <ColorModeIcon />
            </IconButton>
        </ClientOnly>
    )
})