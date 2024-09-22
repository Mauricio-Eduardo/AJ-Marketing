import React from "react";
import { App } from "./App.tsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import Home from "./views/Home.tsx";
import { EstadosView } from "./views/estados/index.tsx";
import { PaisesView } from "./views/paises/index.tsx";
import { CidadesView } from "./views/cidades/index.tsx";
import { OrigensView } from "./views/origens/index.tsx";
import ErrorPage from "./views/ErrorPage.tsx";
import { UsuariosView } from "./views/usuarios/index.tsx";
import { FormasPagamentoView } from "./views/formasPagamento/index.tsx";
import { CondicoesPagamentoView } from "./views/condicoesPagamento/index.tsx";
import { ServicosView } from "./views/servicos/index.tsx";
import { ToastContainer } from "react-toastify";
import { createPortal } from "react-dom";
import { PropostasView } from "./views/propostas/index.tsx";
import { InteressesView } from "./views/interesses/index.tsx";
import { RamosAtividadeView } from "./views/ramosAtividade/index.tsx";
import { ClientesView } from "./views/clientes/index.tsx";
import { PeridiocidadesView } from "./views/peridiocidades/index.tsx";
import { ContratosView } from "./views/contratos/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "servicos",
        element: <ServicosView />,
      },
      {
        path: "origens",
        element: <OrigensView />,
      },
      {
        path: "clientes",
        element: <ClientesView />,
      },
      {
        path: "formasPagamento",
        element: <FormasPagamentoView />,
      },
      {
        path: "condicoesPagamento",
        element: <CondicoesPagamentoView />,
      },
      {
        path: "cidades",
        element: <CidadesView />,
      },
      {
        path: "estados",
        element: <EstadosView />,
      },
      {
        path: "paises",
        element: <PaisesView />,
      },
      {
        path: "usuarios",
        element: <UsuariosView />,
      },
      {
        path: "propostas",
        element: <PropostasView />,
      },
      {
        path: "interesses",
        element: <InteressesView />,
      },
      {
        path: "ramosAtividade",
        element: <RamosAtividadeView />,
      },
      {
        path: "peridiocidades",
        element: <PeridiocidadesView />,
      },
      {
        path: "contratos",
        element: <ContratosView />,
      },
    ],
  },
]);

const ToastContainerPortal = () => {
  return createPortal(
    <ToastContainer
      position="top-right"
      style={{
        zIndex: 9999,
      }}
    />,
    document.body
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Theme accentColor="violet" grayColor="slate" scaling="95%">
    <ThemePanel defaultOpen={false} />
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainerPortal />
    </React.StrictMode>
  </Theme>
);
