import { Avatar as RadixAvatar } from "@radix-ui/themes";
import style from "./styles.module.css";

type ThemeSwitcherProps = {
  darkMode: boolean;
};

export const Avatar: React.FC<ThemeSwitcherProps> = ({ darkMode }) => {
  return (
    <div className={darkMode ? style.darkmode : style.lightmode}>
      <RadixAvatar
        src="https://avatars.githubusercontent.com/u/90938375?s=400&u=cfec1149dbb4c4d7eb2f0ea3251e7ccecbf909d1&v=4"
        fallback="MS"
        size="3"
        radius="full"
        variant="solid"
        color="red"
        highContrast
        className={style.components}
      />
    </div>
  );
};
