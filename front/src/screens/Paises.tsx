import { Flex } from "@radix-ui/themes";
import { PaisesDataTable } from "../components/DataTable/PaisesDataTable";

export const Paises = () => {
  return (
    <Flex justify={"center"} direction={"column"}>
      <PaisesDataTable />
    </Flex>
  );
};
