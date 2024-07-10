import { Flex } from "@radix-ui/themes";
import { UserMenu } from "./usermenu";
import style from "./styles.module.css";

type ThemeSwitcherProps = {
  darkMode: boolean;
};

export const Navbar: React.FC<ThemeSwitcherProps> = ({ darkMode }) => {
  return (
    <div className={darkMode ? style.darkmode : style.lightmode}>
      <Flex justify={"end"} className={style.navbar}>
        <button className="p-2 mr-6">
          <UserMenu darkMode={darkMode} />
        </button>
      </Flex>
    </div>
  );
};
