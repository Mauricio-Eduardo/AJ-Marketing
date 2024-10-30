import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  HandArrowUp,
  Wrench,
  House,
  CaretLeft,
  CaretRight,
  Heart,
  GearFine,
  Power,
  Scroll,
  IconContext,
  City,
  Flag,
  GlobeHemisphereEast,
  Globe,
  CreditCard,
  MoneyWavy,
  User,
  Coins,
  Package,
} from "@phosphor-icons/react";
import { Button, Flex } from "@radix-ui/themes";
import style from "./styles.module.css";

type ThemeSwitcherProps = {
  darkMode: boolean;
};

export const MySidebar: React.FC<ThemeSwitcherProps> = ({ darkMode }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  function handleToggle() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={darkMode ? style.darkmode : style.lightmode}>
      <Flex className="flex-row">
        <Sidebar
          rootStyles={{
            borderRight: "2px solid var(--border-color-sidebar)",
            borderTop: "none",
            borderLeft: "none",
            borderBottom: "none",
            overflow: "!hidden",
          }}
          collapsed={!isExpanded}
          collapsedWidth="5vw"
          width="15vw"
          backgroundColor=""
          className={style.sidebar}
        >
          {/* Aqui é setado o styling do phosporicon, as cores sao setadas juntamente com o Menu lá no MenuItemStyles*/}
          <IconContext.Provider
            value={{
              size: 22,
              weight: "light",
            }}
          >
            <Flex
              id="sidebar-top-icons"
              justify={"center"}
              className={style.menuseparator}
            >
              {isExpanded ? (
                <>
                  <Button
                    onClick={() => {
                      handleToggle();
                    }}
                  >
                    <CaretLeft />
                  </Button>

                  <Link to="/">
                    <Button color="green">
                      <House className="sidebar-icons" />
                    </Button>
                  </Link>

                  <Link to="Config">
                    <Button color="gray">
                      <GearFine />
                    </Button>
                  </Link>

                  <Button color="red">
                    <Power />
                  </Button>
                </>
              ) : (
                <Button
                  size={"2"}
                  onClick={() => {
                    handleToggle();
                  }}
                >
                  <CaretRight />
                </Button>
              )}
            </Flex>

            <Flex id="sidebar-menus">
              <Menu
                menuItemStyles={{
                  button: {
                    "&:hover": {
                      backgroundColor: darkMode
                        ? "rgb(243 244 246)"
                        : "#6e6ade",
                      color: darkMode ? "rgb(31 41 55)" : "rgb(243 244 246)",
                    },
                  },
                }}
                className="inline min-w-full justify-center"
              >
                <MenuItem
                  // icon={<User />}
                  component={<Link to="usuarios" />}
                >
                  Usuários
                </MenuItem>
                <MenuItem
                  //  icon={<Wrench />}
                  component={<Link to="servicos" />}
                >
                  Serviços
                </MenuItem>

                <MenuItem
                  component={<Link to="peridiocidades" />}
                  className={style.menuseparator}
                >
                  Peridiocidades
                </MenuItem>

                <MenuItem
                  //  icon={<Heart />}
                  component={<Link to="clientes" />}
                >
                  Clientes
                </MenuItem>
                <MenuItem
                  // icon={<Globe />}
                  component={<Link to="origens" />}
                >
                  Origens
                </MenuItem>
                <MenuItem component={<Link to="interesses" />}>
                  Interesses
                </MenuItem>
                <MenuItem
                  component={<Link to="ramosAtividade" />}
                  className={style.menuseparator}
                >
                  Ramos de Atividade
                </MenuItem>
                <MenuItem
                  // icon={<HandArrowUp />}
                  component={<Link to="propostas" />}
                >
                  Propostas
                </MenuItem>
                <MenuItem
                  // icon={<Scroll />}
                  component={<Link to="contratos" />}
                >
                  Contratos
                </MenuItem>
                <MenuItem
                  // icon={<Coins />}
                  component={<Link to="contasReceber" />}
                >
                  Contas a Receber
                </MenuItem>
                <MenuItem
                  // icon={<Package />}
                  component={<Link to="ordensServico" />}
                  className={style.menuseparator}
                >
                  Ordens de Serviço
                </MenuItem>

                <MenuItem
                  // icon={<CreditCard />}
                  component={<Link to="formasPagamento" />}
                >
                  Formas de Pag.
                </MenuItem>
                <MenuItem
                  // icon={<MoneyWavy />}
                  component={<Link to="condicoesPagamento" />}
                  className={style.menuseparator}
                >
                  Condições de Pag.
                </MenuItem>

                <MenuItem
                  // icon={<City />}
                  component={<Link to="cidades" />}
                >
                  Cidades
                </MenuItem>

                <MenuItem
                  // icon={<Flag />}
                  component={<Link to="estados" />}
                >
                  Estados
                </MenuItem>

                <MenuItem
                  // icon={<GlobeHemisphereEast />}
                  component={<Link to="paises" />}
                >
                  Países
                </MenuItem>
              </Menu>
            </Flex>
          </IconContext.Provider>
        </Sidebar>
      </Flex>
    </div>
  );
};
