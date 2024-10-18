export interface DialogProps {
  data: any;
  action: string | null;
  controller: any;
  subController?: any;
  isOpenModal: boolean;
  onSuccess: () => void;
  stepper?: boolean;
}

export interface SubDialogProps {
  onClose: (dto: any) => void;
  controller: any;
  disabled?: boolean;
}

export interface SubArrayDialogProps {
  index: number;
  onClose: (index: number, dto: any) => void;
  controller: any;
  disabled?: boolean;
}

export interface UsuarioSubArrayDialogProps {
  index?: number;
  onClose: (index: number, dto: any) => void;
  controller: any;
  disabled?: boolean;
}
