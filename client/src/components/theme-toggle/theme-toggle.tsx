import { useTheme } from "../../hooks/use-theme";
import Button from "../button/button";
import st from "./theme-toggle.module.css";

type TThemeToggleProps = {
  classes?: string;
};

function ThemeToggle({ classes }: TThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={st["theme-toggle"]}>
      <Button
        className={classes}
        type="button"
        variant={theme === "light" ? "darkTheme" : "lightTheme"}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      />
    </div>
  );
}

export default ThemeToggle;
