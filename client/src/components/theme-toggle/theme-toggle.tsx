import { useTheme } from "../../hooks/use-theme";
import { TThemeToggleProps } from "../../types/components-types";
import Button from "../button/button";
import ToggleWrapper from "../toggle-wrapper/toggle-wrapper";

function ThemeToggle({ classes }: TThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleWrapper
      classes={classes}
      handleClick={toggleTheme}
      ariaLabel={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <Button type="button" variant={theme === "light" ? "darkTheme" : "lightTheme"} />
    </ToggleWrapper>
  );
}

export default ThemeToggle;
