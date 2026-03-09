import { useTheme } from "next-themes"

export interface UseColorModeReturn {
    colorMode: ColorMode
    setColorMode: (colorMode: ColorMode) => void
    toggleColorMode: () => void
}
export type ColorMode = "light" | "dark"

export function useColorMode(): UseColorModeReturn {
    const { resolvedTheme, setTheme, forcedTheme } = useTheme()
    const colorMode = forcedTheme || resolvedTheme
    const toggleColorMode = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }
    return {
        colorMode: colorMode as ColorMode,
        setColorMode: setTheme,
        toggleColorMode,
    }
}