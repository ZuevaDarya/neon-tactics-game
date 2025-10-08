import { useTheme } from "../../hooks/use-theme";
import cn from "../../utils/functions/cn";
import Button from "../button/button";
import st from "./theme-toggle.module.css";

type TThemeToggleProps = {
  classes?: string;
};

function ThemeToggle({ classes }: TThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={cn(st["theme-toggle"], classes)}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <Button type="button" variant={theme === "light" ? "darkTheme" : "lightTheme"} />
    </div>
  );
}

export default ThemeToggle;
