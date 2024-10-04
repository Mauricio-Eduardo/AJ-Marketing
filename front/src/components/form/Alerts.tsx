import { Warning, X } from "@phosphor-icons/react";
import { AlertDialog, Button, Dialog, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface AlertSubmitProps {
  title: string;
  type: string;
  color?: "red" | "orange" | "green";
  onSubmit: (data: any) => void;
}

export const AlertSubmit = ({
  title,
  type,
  color,
  onSubmit,
}: AlertSubmitProps) => {
  const { handleSubmit } = useFormContext();

  const onConfirm = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color={color ? color : undefined}>{title}</Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>
          {title} {type}
        </AlertDialog.Title>
        <AlertDialog.Description size="3">
          Tem certeza que deseja prosseguir?
        </AlertDialog.Description>

        <Flex gap="3" mt="6" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" onClick={onConfirm}>
              Confirmar
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

interface AlertConfirmProps {
  title: string | ReactNode;
  description: string;
  color?: "red" | "green" | undefined;
  icon?: ReactNode;
  disabled?: boolean;
  onConfirm: () => void;
}

export const AlertConfirm = ({
  title,
  description,
  color,
  icon,
  disabled,
  onConfirm,
}: AlertConfirmProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color={color ? color : undefined} disabled={disabled}>
          {icon}
          {title}
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title className="flex gap-4 text-amber-600 items-center">
          <Warning />
          Atenção
        </AlertDialog.Title>
        <AlertDialog.Description size="3">
          {description}
          <br />
          <br />
          Deseja Prosseguir?
        </AlertDialog.Description>

        <Flex gap="3" mt="6" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" onClick={onConfirm}>
              Sim
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export const AlertCancel = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="outline">Cancelar</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Sair</AlertDialog.Title>
        <AlertDialog.Description size="3">
          Tem certeza que deseja sair? Todos os dados preenchidos serão
          perdidos!
        </AlertDialog.Description>

        <Flex gap="3" mt="6" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <Dialog.Close>
            <Button variant="solid">Sim</Button>
          </Dialog.Close>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export const AlertCancelX = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <X />
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Sair</AlertDialog.Title>
        <AlertDialog.Description size="3">
          Tem certeza que deseja sair? Todos os dados preenchidos serão
          perdidos!
        </AlertDialog.Description>

        <Flex gap="3" mt="6" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <Dialog.Close>
            <Button variant="solid">Sim</Button>
          </Dialog.Close>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
