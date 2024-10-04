import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useFormContext } from "react-hook-form";

interface AlertProps {
  title: string;
  type: string;
  onSubmit: (data: any) => void;
}

export const AlertConfirm = ({ title, type, onSubmit }: AlertProps) => {
  const { handleSubmit } = useFormContext();

  const onConfirm = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>{title}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>
          {title} {type}
        </AlertDialog.Title>
        <AlertDialog.Description size="3">
          Tem certeza que deseja continuar?
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
