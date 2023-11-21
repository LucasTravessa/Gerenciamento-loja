//dropdown
import { Button } from "@nextui-org/react";

//hook
import { useTheme } from "next-themes";

//icons
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();

  function handleToggle() {
    if (theme == "light") return setTheme("dark");
    return setTheme("light");
  }

  return (
    <Button onClick={handleToggle}>
      <BsSunFill className="flex text-lg dark:hidden" />
      <BsFillMoonFill className="hidden text-lg dark:flex" />
    </Button>
  );
}
