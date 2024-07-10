import { MagnifyingGlass } from "@phosphor-icons/react";
import { InputHTMLAttributes } from "react";
import { Button, Dialog } from "@radix-ui/themes";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  ChildModal: any;
}

export function SearchButton({ ChildModal }: SearchProps) {
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <MagnifyingGlass size={20} className="hover:cursor-pointer" />
        </Dialog.Trigger>
        <Dialog.Content maxWidth={"1000px"}>
          <ChildModal />

          <div className="flex w-full justify-end gap-3">
            <Dialog.Close>
              <Button variant="outline">Cancelar</Button>
            </Dialog.Close>
            <Button>Selecionar</Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
