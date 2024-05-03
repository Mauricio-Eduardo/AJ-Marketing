import React from "react";
import { App } from "./App.tsx";
import "./index.css";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import Clientes from "./screens/Clientes.tsx";
import Home from "./screens/Home.tsx";
import ErrorPage from "./screens/ErrorPage.tsx";
import Propostas from "./screens/Propostas.tsx";
import Contratos from "./screens/Contratos.tsx";
import Servicos from "./screens/Servicos.tsx";
import Administrador from "./screens/Administrador.tsx";
import FluxoCaixa from "./screens/FluxoCaixa.tsx";
import ContaReceber from "./screens/ContaReceber.tsx";
import ContasPagar from "./screens/ContasPagar.tsx";
import Cronograma from "./screens/Cronograma.tsx";
import Config from "./screens/Config.tsx";
import { Planejamento } from "./screens/Planejamento.tsx";
import { Paises } from "./screens/Paises.tsx";
import { Estados } from "./screens/Estados.tsx";
import { Cidades } from "./screens/Cidades.tsx";

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
        path: "clientes",
        element: <Clientes />,
      },
      {
        path: "propostas",
        element: <Propostas />,
      },
      {
        path: "contratos",
        element: <Contratos />,
      },
      {
        path: "servicos",
        element: <Servicos />,
      },
      {
        path: "planejamento",
        element: <Planejamento />,
      },
      {
        path: "cronograma",
        element: <Cronograma />,
      },
      {
        path: "contasPagar",
        element: <ContasPagar />,
      },
      {
        path: "contasReceber",
        element: <ContaReceber />,
      },
      {
        path: "fluxoCaixa",
        element: <FluxoCaixa />,
      },
      {
        path: "administrador",
        element: <Administrador />,
      },
      {
        path: "config",
        element: <Config />,
      },
      {
        path: "cidades",
        element: <Cidades />,
      },
      {
        path: "estados",
        element: <Estados />,
      },
      {
        path: "paises",
        element: <Paises />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Theme accentColor="violet" grayColor="slate" scaling="95%">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Theme>
);
