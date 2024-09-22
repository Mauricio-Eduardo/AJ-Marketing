import {
  ContratoControllerMethods,
  ControllerMethods,
  PropostaControllerMethods,
} from "../../controllers/model";

export interface DialogProps {
  data: any;
  action: string | null;
  controller:
    | ControllerMethods
    | PropostaControllerMethods
    | ContratoControllerMethods;
  subController?: ControllerMethods;
  isOpenModal: boolean;
  onSuccess: () => void;
  stepper?: boolean;
}

export interface SubDialogProps {
  onClose: (dto: any) => void;
  controller: ControllerMethods;
}

export interface SubArrayDialogProps {
  index: number;
  onClose: (index: number, dto: any) => void;
  controller: ControllerMethods;
}
