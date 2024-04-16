import { TabNav } from '@radix-ui/themes';

const Clientes = () => {
  return (
    
    <TabNav.Root>
      <TabNav.Link href="clientes" active>
        Consulta
      </TabNav.Link>
      <TabNav.Link href="clientes/cadastro">Cadastro</TabNav.Link>
    </TabNav.Root>

  )
}

export default Clientes
