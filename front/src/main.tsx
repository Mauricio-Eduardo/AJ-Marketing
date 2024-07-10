import React from "react";
import { App } from "./App.tsx";
import "./index.css";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

import Home from "./screens/Home.tsx";
import { EstadosScreen } from "./screens/estados/index.tsx";
import { PaisesScreen } from "./screens/paises/index.tsx";
import { CidadesScreen } from "./screens/cidades/index.tsx";
import { OrigensScreen } from "./screens/origens/index.tsx";
import ErrorPage from "./screens/ErrorPage.tsx";
import { UsuariosScreen } from "./screens/usuarios/index.tsx";
import { ClientesScreen } from "./screens/clientes/index.tsx";
import { FormasPagamentoScreen } from "./screens/formasPagamento/index.tsx";
import { CondicoesPagamentoScreen } from "./screens/condicoesPagamento/index.tsx";
import { ServicosScreen } from "./screens/servicos/index.tsx";

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
        element: <ServicosScreen />,
      },
      {
        path: "/origens",
        element: <OrigensScreen />,
      },
      {
        path: "clientes",
        element: <ClientesScreen />,
      },
      {
        path: "formasPagamento",
        element: <FormasPagamentoScreen />,
      },
      {
        path: "condicoesPagamento",
        element: <CondicoesPagamentoScreen />,
      },
      {
        path: "cidades",
        element: <CidadesScreen />,
      },
      {
        path: "estados",
        element: <EstadosScreen />,
      },
      {
        path: "paises",
        element: <PaisesScreen />,
      },
      {
        path: "usuarios",
        element: <UsuariosScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Theme accentColor="violet" grayColor="slate" scaling="95%">
    <ThemePanel defaultOpen={false} />
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Theme>
);
