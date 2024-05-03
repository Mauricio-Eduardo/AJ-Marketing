import { Flex } from "@radix-ui/themes";
import { EstadosDataTable } from "../components/DataTable/EstadosDataTable";

export const Estados = () => {
  return (
    <Flex justify={"center"} direction={"column"}>
      <EstadosDataTable />
    </Flex>
  );
};
