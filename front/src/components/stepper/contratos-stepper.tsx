import { useState } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { Check, X } from "@phosphor-icons/react";
import "./stepper.css";
import { DialogProps } from "../dialogs/DialogProps";
import { CondicoesPagamentoController } from "../../controllers/condicoesPagamento-controller";
import { ContratoDialog } from "../dialogs/contrato/contrato-dialog";
import { PropostaDialog } from "../dialogs/proposta/proposta-dialog";
import { PeridiocidadesController } from "../../controllers/peridiocidades-controller";
import { ServicosController } from "../../controllers/servicos-controller";
import { PropostasController } from "../../controllers/propostas-controller";
import { ClienteDialog } from "../dialogs/cliente/cliente-dialog";
import { InteressesController } from "../../controllers/interesses-controller";
import { RamosAtividadeController } from "../../controllers/ramosAtividade-controller";
import { UsuariosController } from "../../controllers/usuarios-controller";
import { CidadesController } from "../../controllers/cidades-controller";
import { ClientesController } from "../../controllers/clientes-controller";
import { OrigensController } from "../../controllers/origens-controller";

interface StepperProps extends DialogProps {
  propostasController: PropostasController;
  condicoesPagamentoController: CondicoesPagamentoController;
  peridiocidadesController: PeridiocidadesController;
  servicosController: ServicosController;
  clientesController: ClientesController;
  interessesController: InteressesController;
  origensController: OrigensController;
  ramosAtividadeController: RamosAtividadeController;
  usuariosController: UsuariosController;
  cidadesController: CidadesController;
}

export const ContratosStepper = ({
  data,
  action,
  controller,
  isOpenModal,
  onSuccess,
  propostasController,
  condicoesPagamentoController,
  peridiocidadesController,
  servicosController,
  clientesController,
  interessesController,
  origensController,
  ramosAtividadeController,
  usuariosController,
  cidadesController,
}: StepperProps) => {
  const steps = ["Proposta", "Cliente", "Contrato", "Resumo"];

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PropostaDialog
            data={data}
            action={action}
            controller={propostasController}
            isOpenModal={isOpenModal}
            onSuccess={onSuccess}
            peridiocidadesController={peridiocidadesController}
            servicosController={servicosController}
            stepper={true}
          />
        );
      case 2:
        return (
          <ClienteDialog
            data={data}
            action={action}
            controller={clientesController}
            interessesController={interessesController}
            ramosAtividadeController={ramosAtividadeController}
            cidadesController={cidadesController}
            origensController={origensController}
            usuariosController={usuariosController}
            isOpenModal={isOpenModal}
            onSuccess={onSuccess}
            stepper={true}
          />
        );
      case 3:
        return (
          <ContratoDialog
            data={data}
            action={action}
            controller={controller}
            isOpenModal={isOpenModal}
            onSuccess={onSuccess}
            condicoesPagamentoController={condicoesPagamentoController}
          />
        );
      case 4:
        return <></>;
      default:
        return null;
    }
  };

  return (
    <Dialog.Content
      maxWidth={"900px"}
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
      onEscapeKeyDown={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col gap-3"
    >
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            }`}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? (
                <Check size={24} color="white" />
              ) : (
                i + 1
              )}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
        <div className="absolute right-6">
          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>
      </div>

      <div className="mb-8">{renderForm()}</div>

      <div className="flex justify-between">
        <Button
          onClick={() => {
            setComplete(false);
            setCurrentStep((prev) => prev - 1);
          }}
          disabled={currentStep === 1}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
          color="green"
          disabled={complete}
        >
          {currentStep === steps.length ? "Finalizar" : "Avançar"}
        </Button>
      </div>
    </Dialog.Content>
  );
};
