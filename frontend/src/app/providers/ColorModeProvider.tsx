import { ThemeProvider, type ThemeProviderProps } from "next-themes";

export interface ColorModeProviderProps extends ThemeProviderProps { }

const ColorModeProvider = (props: ColorModeProviderProps) => {
    return (
        <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
    )
}

export default ColorModeProvider