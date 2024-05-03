import { Flex } from "@radix-ui/themes";
import { CidadesDataTable } from "../components/DataTable/CidadesDataTable";

export const Cidades = () => {
  return (
    <Flex justify={"center"} direction={"column"}>
      <CidadesDataTable />
    </Flex>
  );
};
