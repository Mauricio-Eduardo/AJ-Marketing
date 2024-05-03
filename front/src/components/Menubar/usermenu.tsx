import { DropdownMenu } from "@radix-ui/themes";
import { Avatar } from "./avatar";
import style from "./styles.module.css";

type ThemeSwitcherProps = {
  darkMode: boolean;
};

export const UserMenu: React.FC<ThemeSwitcherProps> = ({ darkMode }) => {
  return (
    <div className={darkMode ? style.darkmode : style.lightmode}>
      <div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button>
              <Avatar darkMode={darkMode} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item shortcut="⌘ E">Editar</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Sair
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};
