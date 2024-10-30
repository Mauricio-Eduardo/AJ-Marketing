import { Button, Dialog, Flex, TabNav } from "@radix-ui/themes";
import {
  Eye,
  PaperPlaneTilt,
  Pencil,
  Play,
  ShareFat,
  Stop,
} from "@phosphor-icons/react";
import { useState } from "react";
import { DataTable } from "../../components/datatable";
import { UsuariosController } from "../../controllers/usuarios-controller";
import { OrdensServicoController } from "../../controllers/ordensServico-controller";
import { OrdemServico } from "../../models/ordemServico/entity/OrdemServico";
import { OrdemServicoDialog } from "../../components/dialogs/ordemServico/ordemServico-dialog";
import { OrdensServicoColumns } from "../../components/datatable/columns/ordensServico-columns";
import { AlertOrdemServico } from "../../components/form/Alerts";
import { toast } from "react-toastify";

export const OrdensServicoView = () => {
  const ordensServicoController = new OrdensServicoController();
  const usuariosController = new UsuariosController();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    | "Editar"
    | "Visualizar"
    | "Iniciar"
    | "Pausar"
    | "Retomar"
    | "Entregar"
    | "Postar"
    | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<
    OrdemServico | undefined
  >();
  const handleRowSelectionChange = (selectedRow: OrdemServico) => {
    setSelectedRowData(selectedRow);
  };

  const handleSuccess = () => {
    // Incrementa o refreshKey para forçar o refresh da DataTable
    setRefreshKey((prevKey) => prevKey + 1);
    handleOpenDialog();
  };

  const handleActionChange = (
    action:
      | "Editar"
      | "Visualizar"
      | "Iniciar"
      | "Pausar"
      | "Retomar"
      | "Entregar"
      | "Postar"
      | null
  ) => {
    setDialogAction(action);
  };

  const handleOpenDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  const onConfirm = async (action: string) => {
    let toastId = toast.loading("Processando...");

    if (selectedRowData?.id) {
      try {
        if (
          action === "Iniciar" ||
          action === "Pausar" ||
          action === "Retomar"
        ) {
          let status = "";
          let situacao = "";
          switch (action) {
            case "Iniciar":
              situacao = "Em Andamento";
              status = "iniciada";
              break;
            case "Pausar":
              situacao = "Pausado";
              status = "pausada";
              break;
            case "Retomar":
              situacao = "Em Andamento";
              status = "retomada";
              break;
          }

          const pId = selectedRowData.id;
          await ordensServicoController.iniciarPausar(pId, situacao);
          toast.update(toastId, {
            render: `Ordem de Serviço ${status}!`,
            type: "success",
            isLoading: false,
            draggable: true,
            draggableDirection: "x",
            autoClose: 3000,
          });
          setRefreshKey((prevKey) => prevKey + 1);
        } else if (action === "Entregar") {
          const pId = selectedRowData.id;
          await ordensServicoController.entregar(pId);
          toast.update(toastId, {
            render: "Ordem de Serviço entregue!",
            type: "success",
            isLoading: false,
            draggable: true,
            draggableDirection: "x",
            autoClose: 3000,
          });
          setRefreshKey((prevKey) => prevKey + 1);
        } else if (action === "Postar") {
          const pId = selectedRowData.id;
          await ordensServicoController.postar(pId);
          toast.update(toastId, {
            render: "Ordem de Serviço postada!",
            type: "success",
            isLoading: false,
            draggable: true,
            draggableDirection: "x",
            autoClose: 3000,
          });
          setRefreshKey((prevKey) => prevKey + 1);
        }
      } catch (error) {
        toast.update(toastId, {
          render: "Ocorreu um erro. Tente novamente!",
          type: "error",
          isLoading: false,
          draggable: true,
          draggableDirection: "x",
          autoClose: 3000,
        });
        console.log(error);
      }
    }
  };

  const [type, setType] = useState<string>("ordensPendente");
  const [activeTab, setActiveTab] = useState("Pendentes");

  return (
    <div className="flex flex-col">
      <Flex justify={"between"}>
        <Dialog.Root open={isDialogOpen} onOpenChange={handleOpenDialog}>
          <Flex
            justify={"between"}
            direction={"row"}
            className="pb-2 border-b-2 border-b-gray-200"
          >
            <div className="space-x-3">
              <Dialog.Trigger>
                <Button
                  onClick={() => {
                    handleActionChange("Editar");
                  }}
                  disabled={
                    !selectedRowData?.id ||
                    selectedRowData.situacao === "Concluído" ||
                    selectedRowData.situacao === "Postado"
                  }
                >
                  <Pencil />
                  Editar
                </Button>
              </Dialog.Trigger>

              <Dialog.Trigger>
                <Button
                  onClick={() => {
                    handleActionChange("Visualizar");
                  }}
                  disabled={!selectedRowData?.id}
                  variant="outline"
                >
                  <Eye />
                  Visualizar
                </Button>
              </Dialog.Trigger>
            </div>

            {/* Dialogs */}
            {isDialogOpen && (
              <OrdemServicoDialog
                key={selectedRowData?.id}
                data={selectedRowData as OrdemServico}
                action={dialogAction}
                controller={ordensServicoController}
                usuariosController={usuariosController}
                isOpenModal={isDialogOpen}
                onSuccess={handleSuccess}
              />
            )}
          </Flex>
        </Dialog.Root>

        <div className="space-x-3">
          <AlertOrdemServico
            action={
              selectedRowData?.situacao === "Pausado" ? "Retomar" : "Iniciar"
            }
            permission={
              selectedRowData?.usuario_id && selectedRowData?.tema != ""
                ? true
                : false
            }
            icon={<Play />}
            color="amber"
            onConfirm={() =>
              onConfirm(
                selectedRowData?.situacao === "Pausado" ? "Retomar" : "Iniciar"
              )
            }
            disabled={
              selectedRowData?.situacao != "Pendente" &&
              selectedRowData?.situacao != "Pausado"
            }
          />

          <AlertOrdemServico
            action="Pausar"
            permission={
              selectedRowData?.usuario_id && selectedRowData?.tema != ""
                ? true
                : false
            }
            icon={<Stop />}
            color="gray"
            onConfirm={() => onConfirm("Pausar")}
            disabled={selectedRowData?.situacao != "Em Andamento"}
          />

          <AlertOrdemServico
            action="Entregar"
            permission={
              selectedRowData?.usuario_id && selectedRowData?.tema != ""
                ? true
                : false
            }
            icon={<ShareFat />}
            color={undefined}
            onConfirm={() => onConfirm("Entregar")}
            disabled={selectedRowData?.situacao != "Em Andamento"}
          />

          <AlertOrdemServico
            action="Postar"
            permission={
              selectedRowData?.usuario_id && selectedRowData?.tema != ""
                ? true
                : false
            }
            icon={<PaperPlaneTilt />}
            color="green"
            onConfirm={() => onConfirm("Postar")}
            disabled={
              selectedRowData?.situacao != "Concluído" ||
              selectedRowData?.postado === "Sim"
            }
          />
        </div>
      </Flex>

      <TabNav.Root>
        <TabNav.Link
          href="#"
          active={activeTab === "Pendentes"}
          onClick={() => {
            setActiveTab("Pendentes");
            setType("ordensPendentes");
          }}
        >
          Pendentes
        </TabNav.Link>
        <TabNav.Link
          href="#"
          active={activeTab === "Em Andamento"}
          onClick={() => {
            setActiveTab("Em Andamento");
            setType("ordensEmAndamento");
          }}
        >
          Em Andamento
        </TabNav.Link>
        <TabNav.Link
          href="#"
          active={activeTab === "Pausados"}
          onClick={() => {
            setActiveTab("Pausados");
            setType("ordensPausadas");
          }}
        >
          Pausados
        </TabNav.Link>
        <TabNav.Link
          href="#"
          active={activeTab === "Concluídos"}
          onClick={() => {
            setActiveTab("Concluídos");
            setType("ordensConcluidas");
          }}
        >
          Concluídos
        </TabNav.Link>

        <TabNav.Link
          href="#"
          active={activeTab === "Postados"}
          onClick={() => {
            setActiveTab("Postados");
            setType("ordensPostados");
          }}
        >
          Postados
        </TabNav.Link>
      </TabNav.Root>

      <DataTable
        key={activeTab}
        type={type}
        columns={OrdensServicoColumns}
        onRowSelectionChange={handleRowSelectionChange}
        controller={ordensServicoController}
        refreshKey={refreshKey}
      />
    </div>
  );
};
