import { LuMoon, LuSun } from "react-icons/lu"
import { useColorMode } from "../../hooks/useColorMode"

const ColorModeIcon = () => {
    const { colorMode } = useColorMode()
    return colorMode === "dark" ? <LuMoon /> : <LuSun />
}

export default ColorModeIcon