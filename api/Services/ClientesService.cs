using api.Interfaces;
using api.Models.Cliente;
using api.Models.Parcelas;
using api.Models.Usuario;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class ClientesService: IClientesService
    {
        private readonly SqlConnection Connection;

        public ClientesService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<ClienteModel> GetAllClientes(int ativo) 
        {
            List<ClienteModel> listaClientes = new List<ClienteModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT " +

                    "cl.cliente_ID, cl.tipo_pessoa, cl.cpf_cnpj, cl.nome_razaoSocial, cl.apelido_nomeFantasia, cl.rg_inscricaoEstadual, " +
                    "cl.dataNascimento_dataAbertura, cl.genero, cl.email, cl.celular, cl.ramo_atividade, " +
                    "cl.cidade_ID, c.cidade, e.estado, p.pais, cl.logradouro, cl.numero, cl.bairro, cl.complemento, cl.cep, " +
                    "cl.origem_ID, o.origem, cl.interesses, " +
                    "cl.ativo, cl.data_cadastro, cl.data_ult_alt " +

                    "FROM clientes cl " +
                    "INNER JOIN cidades c ON cl.cidade_ID = c.cidade_ID " +
                    "INNER JOIN estados e ON c.estado_ID = e.estado_ID " +
                    "INNER JOIN paises p ON e.pais_ID = p.pais_ID " +
                    "INNER JOIN origens o ON cl.origem_ID = o.origem_ID " +

                    "WHERE cl.ativo = @ativo"), Connection);

                    getAllCmd.Parameters.AddWithValue("@ativo", ativo);

                    getAllCmd.Parameters.Clear();
                    getAllCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = ativo;


                    using (SqlDataReader reader = getAllCmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Para cada registro encontrado, cria um objeto e adiciona à lista
                            listaClientes.Add(
                            new ClienteModel
                            {
                                Cliente_ID = reader.GetInt32("cliente_ID"),
                                Tipo_pessoa = reader.GetString("tipo_pessoa"),
                                Cpf_cnpj = reader.GetString("cpf_cnpj"),
                                Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                                Apelido_nomeFantasia = reader.GetString("apelido_nomeFantasia"),
                                Rg_inscricaoEstadual = reader.GetString("rg_inscricaoEstadual"),
                                DataNascimento_dataAbertura = reader.GetDateTime("dataNascimento_dataAbertura"),
                                Genero = reader.GetString("genero"),
                                Email = reader.GetString("email"),
                                Celular = reader.GetString("celular"),
                                Ramo_atividade = reader.GetString("ramo_atividade"),
                                Cidade_ID = reader.GetInt32("cidade_ID"),
                                Cidade = reader.GetString("cidade"),
                                Estado = reader.GetString("estado"),
                                Pais = reader.GetString("pais"),
                                Logradouro = reader.GetString("logradouro"),
                                Numero = reader.GetString("numero"),
                                Bairro = reader.GetString("bairro"),
                                Complemento = reader.GetString("complemento"),
                                Cep = reader.GetString("cep"),
                                Origem_ID = reader.GetInt32("origem_ID"),
                                Origem = reader.GetString("origem"),
                                Interesses = reader.GetString("interesses"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
                            }
                        ) ;
                            }
                    }

                    foreach (var cliente in listaClientes)
                    {
                        cliente.Usuarios = GetUsuariosFromCliente(Connection, cliente.Cliente_ID);
                    }

                    return listaClientes;

                }
                catch (SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    Connection.Close();
                }

            }
        }

        public ClienteModel GetCliente(int cliente_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT " +

                    "cl.cliente_ID, cl.tipo_pessoa, cl.cpf_cnpj, cl.nome_razaoSocial, cl.apelido_nomeFantasia, cl.rg_inscricaoEstadual, " +
                    "cl.dataNascimento_dataAbertura, cl.genero, cl.email, cl.celular, cl.ramo_atividade, " +
                    "cl.cidade_ID, c.cidade, e.estado, p.pais, cl.logradouro, cl.numero, cl.bairro, cl.complemento, cl.cep, " +
                    "cl.origem_ID, o.origem, cl.interesses, " +
                    "cl.ativo, cl.data_cadastro, cl.data_ult_alt " +

                    "FROM clientes cl " +
                    "INNER JOIN cidades c ON cl.cidade_ID = c.cidade_ID " +
                    "INNER JOIN estados e ON c.estado_ID = e.estado_ID " +
                    "INNER JOIN paises p ON e.pais_ID = p.pais_ID " +
                    "INNER JOIN origens o ON cl.origem_ID = o.origem_ID " +

                    "WHERE cl.cliente_ID = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = cliente_ID;

                    List<UsuarioModel> usuarios = GetUsuariosFromCliente(Connection, cliente_ID);

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new ClienteModel
                        {
                            Cliente_ID = reader.GetInt32("cliente_ID"),
                            Tipo_pessoa = reader.GetString("tipo_pessoa"),
                            Cpf_cnpj = reader.GetString("cpf_cnpj"),
                            Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                            Apelido_nomeFantasia = reader.GetString("apelido_nomeFantasia"),
                            Rg_inscricaoEstadual = reader.GetString("rg_inscricaoEstadual"),
                            DataNascimento_dataAbertura = reader.GetDateTime("dataNascimento_dataAbertura"),
                            Genero = reader.GetString("genero"),
                            Email = reader.GetString("email"),
                            Celular = reader.GetString("celular"),
                            Ramo_atividade = reader.GetString("ramo_atividade"),
                            Cidade_ID = reader.GetInt32("cidade_ID"),
                            Cidade = reader.GetString("cidade"),
                            Estado = reader.GetString("estado"),
                            Pais = reader.GetString("pais"),
                            Logradouro = reader.GetString("logradouro"),
                            Numero = reader.GetString("numero"),
                            Bairro = reader.GetString("bairro"),
                            Complemento = reader.GetString("complemento"),
                            Cep = reader.GetString("cep"),
                            Origem_ID = reader.GetInt32("origem_ID"),
                            Origem = reader.GetString("origem"),
                            Interesses = reader.GetString("interesses"),
                            Ativo = reader.GetBoolean("ativo"),
                            Data_cadastro = reader.GetDateTime("data_cadastro"),
                            Data_ult_alt = reader.GetDateTime("data_ult_alt"),
                            Usuarios = usuarios,
                        };
                    }
                    else
                        return null;

                }
                catch (SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

        private List<UsuarioModel> GetUsuariosFromCliente(SqlConnection connection, int cliente_ID)
        {
            List<UsuarioModel> listaParcelas = new List<UsuarioModel>();

            string queryParcelas = @"
            SELECT u.usuario_ID, u.cpf, u.nome, u.email, u.senha, u.ativo, u.data_cadastro, u.data_ult_alt
            FROM clientes_usuarios cu
            INNER JOIN usuarios u ON cu.usuario_ID = u.usuario_ID
            INNER JOIN clientes c ON cu.cliente_ID = c.cliente_ID
            WHERE cu.cliente_ID = @cliente_ID";

            using (SqlCommand getAllUsuarios = new SqlCommand(queryParcelas, connection))
            {
                getAllUsuarios.Parameters.Add("@cliente_ID", SqlDbType.Int).Value = cliente_ID;

                using (SqlDataReader UsuarioReader = getAllUsuarios.ExecuteReader())
                {
                    while (UsuarioReader.Read())
                    {
                        listaParcelas.Add(
                            new UsuarioModel
                            {
                                Usuario_ID = UsuarioReader.GetInt32(UsuarioReader.GetOrdinal("usuario_ID")),
                                Cpf = UsuarioReader.GetString(UsuarioReader.GetOrdinal("cpf")),
                                Nome = UsuarioReader.GetString(UsuarioReader.GetOrdinal("nome")),
                                Email = UsuarioReader.GetString(UsuarioReader.GetOrdinal("email")),
                                Senha = UsuarioReader.GetString(UsuarioReader.GetOrdinal("senha")),
                                Ativo = UsuarioReader.GetBoolean(UsuarioReader.GetOrdinal("ativo")),
                                Data_cadastro = UsuarioReader.GetDateTime(UsuarioReader.GetOrdinal("data_cadastro")),
                                Data_ult_alt = UsuarioReader.GetDateTime(UsuarioReader.GetOrdinal("data_ult_alt")),
                            });
                    }
                }
            }

            return listaParcelas;
        }

        public IEnumerable<UsuarioGetFromClienteModel> GetAllUsuariosFromCliente(int cliente_ID)
        {
            List<UsuarioGetFromClienteModel> listaUsuarios = new List<UsuarioGetFromClienteModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT cu.usuario_ID, u.nome, u.cpf " +
                    "FROM usuarios u, clientes c, clientes_usuarios cu " +
                    "WHERE cu.usuario_ID = u.usuario_ID " +
                    "AND cu.cliente_ID = c.cliente_ID " +
                    "AND cu.cliente_ID = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = cliente_ID;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaUsuarios.Add(
                            new UsuarioGetFromClienteModel
                            {
                                Usuario_ID = reader.GetInt32("usuario_ID"),
                                Cpf = reader.GetString("cpf"),
                                Nome = reader.GetString("nome"),
                            }
                        );
                    }
                    return listaUsuarios;
                }
                catch (SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

        public string PostCliente(ClientePostModel clienteInserido)
        {
            SqlTransaction transaction = null;

            using (Connection)
            {
                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    // Inserir a condição de pagamento
                    string postQuery = @"
                        INSERT INTO clientes
                        (tipo_pessoa, cpf_cnpj, nome_razaoSocial, apelido_nomeFantasia, rg_inscricaoEstadual,
                        dataNascimento_dataAbertura, genero, email, celular, ramo_atividade,
                        cidade_ID, logradouro, numero, bairro, complemento, cep, origem_ID, interesses,
                        ativo, data_cadastro, data_ult_alt)
                        VALUES
                        (@tipo_pessoa, @cpf_cnpj, @nome_razaoSocial, @apelido_nomeFantasia, @rg_inscricaoEstadual,
                        @dataNascimento_dataAbertura, @genero, @email, @celular, @ramo_atividade,
                        @cidade_ID, @logradouro, @numero, @bairro, @complemento, @cep, @origem_ID, @interesses,
                        @ativo, @data_cadastro, @data_ult_alt);
                        SELECT SCOPE_IDENTITY();";

                    SqlCommand postCmd = new SqlCommand(postQuery, Connection, transaction);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@tipo_pessoa", SqlDbType.VarChar).Value = clienteInserido.Tipo_pessoa;
                    postCmd.Parameters.Add("@cpf_cnpj", SqlDbType.VarChar).Value = clienteInserido.Cpf_cnpj;
                    postCmd.Parameters.Add("@nome_razaoSocial", SqlDbType.VarChar).Value = clienteInserido.Nome_razaoSocial;
                    postCmd.Parameters.Add("@apelido_nomeFantasia", SqlDbType.VarChar).Value = clienteInserido.Apelido_nomeFantasia;
                    postCmd.Parameters.Add("@rg_inscricaoEstadual", SqlDbType.VarChar).Value = clienteInserido.Rg_inscricaoEstadual;
                    postCmd.Parameters.Add("@dataNascimento_dataAbertura", SqlDbType.Date).Value = clienteInserido.DataNascimento_dataAbertura;
                    postCmd.Parameters.Add("@genero", SqlDbType.VarChar).Value = clienteInserido.Genero;
                    postCmd.Parameters.Add("@email", SqlDbType.VarChar).Value = clienteInserido.Email;
                    postCmd.Parameters.Add("@celular", SqlDbType.VarChar).Value = clienteInserido.Celular;
                    postCmd.Parameters.Add("@ramo_atividade", SqlDbType.VarChar).Value = clienteInserido.Ramo_atividade;
                    postCmd.Parameters.Add("@cidade_ID", SqlDbType.VarChar).Value = clienteInserido.Cidade_ID;
                    postCmd.Parameters.Add("@logradouro", SqlDbType.VarChar).Value = clienteInserido.Logradouro;
                    postCmd.Parameters.Add("@numero", SqlDbType.VarChar).Value = clienteInserido.Numero;
                    postCmd.Parameters.Add("@bairro", SqlDbType.VarChar).Value = clienteInserido.Bairro;
                    postCmd.Parameters.Add("@complemento", SqlDbType.VarChar).Value = clienteInserido.Complemento;
                    postCmd.Parameters.Add("@cep", SqlDbType.VarChar).Value = clienteInserido.Cep;
                    postCmd.Parameters.Add("@origem_ID", SqlDbType.VarChar).Value = clienteInserido.Origem_ID;
                    postCmd.Parameters.Add("@interesses", SqlDbType.VarChar).Value = clienteInserido.Interesses;

                    postCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = clienteInserido.Ativo;
                    postCmd.Parameters.Add("@data_cadastro", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();
                    postCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

                    int clienteID = Convert.ToInt32(postCmd.ExecuteScalar());

                    // Inserir os IDs na associativa
                    foreach (var usuario in clienteInserido.Usuarios)
                    {
                        string postUsuarioQuery = @"
                        INSERT INTO clientes_usuarios (cliente_ID, usuario_ID)
                        VALUES (@cliente_ID, @usuario_ID);";

                        SqlCommand insertUsuarioCmd = new SqlCommand(postUsuarioQuery, Connection, transaction);
                        insertUsuarioCmd.Parameters.AddWithValue("@cliente_ID", clienteID);
                        insertUsuarioCmd.Parameters.AddWithValue("@usuario_ID", usuario.Usuario_ID);

                        insertUsuarioCmd.ExecuteNonQuery();
                    }

                    transaction.Commit();
                    return "Inserido com Sucesso!";

                }
                catch (SqlException ex)
                {
                    if (transaction != null)
                    {
                        transaction.Rollback();
                    }
                    throw new Exception(ex.Message);
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

        public string PutCliente(ClientePutModel clienteAlterado)
        {

            SqlTransaction transaction = null;

            using (Connection)
            {
                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    // Atualizar o cliente

                    string putQuery = @"
                    UPDATE clientes SET
                    nome_razaoSocial = @nome_razaoSocial, apelido_nomeFantasia = @apelido_nomeFantasia,
                    rg_inscricaoEstadual = @rg_inscricaoEstadual, dataNascimento_dataAbertura = @dataNascimento_dataAbertura,
                    genero = @genero, email = @email, celular = @celular, ramo_atividade = @ramo_atividade,
                    cidade_ID = @cidade_ID, logradouro = @logradouro, numero = @numero, bairro = @bairro,
                    complemento = @complemento, cep = @cep, origem_ID = @origem_ID, interesses = @interesses,
                    ativo = @ativo, data_ult_alt = @data_ult_alt
                    WHERE cliente_ID = @id";

                    SqlCommand putCmd = new SqlCommand(putQuery, Connection, transaction);

                    putCmd.Parameters.Add("@id", SqlDbType.VarChar).Value = clienteAlterado.Cliente_ID;
                    putCmd.Parameters.Add("@nome_razaoSocial", SqlDbType.VarChar).Value = clienteAlterado.Nome_razaoSocial;
                    putCmd.Parameters.Add("@apelido_nomeFantasia", SqlDbType.VarChar).Value = clienteAlterado.Apelido_nomeFantasia;
                    putCmd.Parameters.Add("@rg_inscricaoEstadual", SqlDbType.VarChar).Value = clienteAlterado.Rg_inscricaoEstadual;
                    putCmd.Parameters.Add("@dataNascimento_dataAbertura", SqlDbType.Date).Value = clienteAlterado.DataNascimento_dataAbertura;
                    putCmd.Parameters.Add("@genero", SqlDbType.VarChar).Value = clienteAlterado.Genero;
                    putCmd.Parameters.Add("@email", SqlDbType.VarChar).Value = clienteAlterado.Email;
                    putCmd.Parameters.Add("@celular", SqlDbType.VarChar).Value = clienteAlterado.Celular;
                    putCmd.Parameters.Add("@ramo_atividade", SqlDbType.VarChar).Value = clienteAlterado.Ramo_atividade;
                    putCmd.Parameters.Add("@cidade_ID", SqlDbType.VarChar).Value = clienteAlterado.Cidade_ID;
                    putCmd.Parameters.Add("@logradouro", SqlDbType.VarChar).Value = clienteAlterado.Logradouro;
                    putCmd.Parameters.Add("@numero", SqlDbType.VarChar).Value = clienteAlterado.Numero;
                    putCmd.Parameters.Add("@bairro", SqlDbType.VarChar).Value = clienteAlterado.Bairro;
                    putCmd.Parameters.Add("@complemento", SqlDbType.VarChar).Value = clienteAlterado.Complemento;
                    putCmd.Parameters.Add("@cep", SqlDbType.VarChar).Value = clienteAlterado.Cep;
                    putCmd.Parameters.Add("@origem_ID", SqlDbType.VarChar).Value = clienteAlterado.Origem_ID;
                    putCmd.Parameters.Add("@interesses", SqlDbType.VarChar).Value = clienteAlterado.Interesses;

                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = clienteAlterado.Ativo;
                    putCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

                    putCmd.ExecuteNonQuery();

                    // Deletar as ligações da associativa
                    string deleteAssociativaQuery = "DELETE FROM clientes_usuarios WHERE cliente_ID = @id";
                    SqlCommand deleteUsuariosCmd = new SqlCommand(deleteAssociativaQuery, Connection, transaction);
                    deleteUsuariosCmd.Parameters.AddWithValue("@id", clienteAlterado.Cliente_ID);

                    deleteUsuariosCmd.ExecuteNonQuery();

                    // Inserir na associativa
                    foreach (var usuario in clienteAlterado.Usuarios)
                    {
                        string insertAssociativaQuery = @"
                        INSERT INTO clientes_usuarios (cliente_ID, usuario_ID)
                        VALUES (@cliente_ID, @usuario_ID);";

                        SqlCommand insertAssociativaCmd = new SqlCommand(insertAssociativaQuery, Connection, transaction);
                        insertAssociativaCmd.Parameters.AddWithValue("@cliente_ID", clienteAlterado.Cliente_ID);
                        insertAssociativaCmd.Parameters.AddWithValue("@usuario_ID", usuario.Usuario_ID);

                        insertAssociativaCmd.ExecuteNonQuery();
                    }

                    transaction.Commit();
                    return "Alterado com sucesso!";

                }
                catch (SqlException ex)
                {
                    if (transaction != null)
                    {
                        transaction.Rollback();
                    }
                    throw new Exception(ex.Message);
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

        public string DeleteCliente(int cliente_ID)
        {
            using (Connection)
            {

                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    // Deletar da associativa
                    string deleteAssociativaQuery = "DELETE FROM clientes_usuarios WHERE cliente_ID = @id";
                    SqlCommand deleteAssociativaCmd = new SqlCommand(deleteAssociativaQuery, Connection, transaction);
                    deleteAssociativaCmd.Parameters.AddWithValue("@id", cliente_ID);

                    deleteAssociativaCmd.ExecuteNonQuery();

                    // Deletar o cliente
                    string deleteCmdQuery = "DELETE FROM clientes WHERE cliente_ID = @id";
                    SqlCommand deleteCmd = new SqlCommand(deleteCmdQuery, Connection, transaction);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = cliente_ID;

                    deleteCmd.ExecuteNonQuery();

                    transaction.Commit();
                    return "Deletado com Sucesso!";

                }
                catch (SqlException ex)
                {
                    if (transaction != null)
                    {
                        transaction.Rollback();
                    }
                    throw new Exception(ex.Message);
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

    }
}
