using api.Interfaces;
using api.Models.Cliente;
using api.Models.Clientes_interesses;
using api.Models.Clientes_ramos;
using api.Models.Contratos;
using api.Models.Interesse;
using api.Models.Parcelas;
using api.Models.RamosAtividade;
using api.Models.Usuario;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Reflection.PortableExecutable;

namespace api.Services
{
    public class ClientesService: IClientesService
    {
        private readonly SqlConnection Connection;

        public ClientesService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<ClienteModel> GetAllClientes() 
        {
            List<ClienteModel> listaClientes = new List<ClienteModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT " +

                    "cl.id, cl.tipo_pessoa, cl.cpf_cnpj, cl.nome_razaoSocial, cl.apelido_nomeFantasia, cl.rg_inscricaoEstadual, " +
                    "cl.genero, cl.email, cl.celular, cl.cidade_id, c.cidade, e.estado, p.pais, cl.logradouro, cl.numero, cl.bairro, " +
                    "cl.complemento, cl.cep, cl.origem_id, o.origem, cl.ativo, cl.data_cadastro, cl.data_ult_alt " +

                    "FROM clientes cl " +
                    "INNER JOIN cidades c ON cl.cidade_id = c.id " +
                    "INNER JOIN estados e ON c.estado_id = e.id " +
                    "INNER JOIN paises p ON e.pais_id = p.id " +
                    "INNER JOIN origens o ON cl.origem_id = o.id"), Connection);

                    using (SqlDataReader reader = getAllCmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Para cada registro encontrado, cria um objeto e adiciona à lista
                            listaClientes.Add(
                            new ClienteModel
                            {
                                Id = reader.GetInt32("id"),
                                Tipo_pessoa = reader.GetString("tipo_pessoa"),
                                Cpf_cnpj = reader.GetString("cpf_cnpj"),
                                Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                                Apelido_nomeFantasia = reader.GetString("apelido_nomeFantasia"),
                                Rg_inscricaoEstadual = reader.GetString("rg_inscricaoEstadual"),
                                Genero = reader.GetString("genero"),
                                Email = reader.GetString("email"),
                                Celular = reader.GetString("celular"),
                                Cidade_id = reader.GetInt32("cidade_id"),
                                Cidade = reader.GetString("cidade"),
                                Estado = reader.GetString("estado"),
                                Pais = reader.GetString("pais"),
                                Logradouro = reader.GetString("logradouro"),
                                Numero = reader.GetString("numero"),
                                Bairro = reader.GetString("bairro"),
                                Complemento = reader.GetString("complemento"),
                                Cep = reader.GetString("cep"),
                                Origem_id = reader.GetInt32("origem_id"),
                                Origem = reader.GetString("origem"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
                            });
                        }
                    }

                    foreach (var cliente in listaClientes)
                    {
                        cliente.Contratos = GetContratosFromCliente(Connection, cliente.Id);
                        cliente.Interesses = GetInteressesFromCliente(Connection, cliente.Id);
                        cliente.Ramos = GetRamosFromCliente(Connection, cliente.Id);
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

        public ClienteModel GetCliente(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT " +

                    "cl.id, cl.tipo_pessoa, cl.cpf_cnpj, cl.nome_razaoSocial, cl.apelido_nomeFantasia, cl.rg_inscricaoEstadual, " +
                    "cl.genero, cl.email, cl.celular, cl.cidade_id, c.cidade, e.estado, p.pais, cl.logradouro, cl.numero, cl.bairro, " +
                    "cl.complemento, cl.cep, cl.origem_id, o.origem, cl.ativo, cl.data_cadastro, cl.data_ult_alt " +

                    "FROM clientes cl " +
                    "INNER JOIN cidades c ON cl.cidade_id = c.id " +
                    "INNER JOIN estados e ON c.estado_id = e.id " +
                    "INNER JOIN paises p ON e.pais_id = p.id " +
                    "INNER JOIN origens o ON cl.origem_id = o.id " +

                    "WHERE cl.id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    List<ContratosClienteModel> contratos = GetContratosFromCliente(Connection, id);
                    List<ClienteInteresseModel> interesses = GetInteressesFromCliente(Connection, id);
                    List<ClienteRamoModel> ramos = GetRamosFromCliente(Connection, id);

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new ClienteModel
                        {
                            Id = reader.GetInt32("id"),
                            Tipo_pessoa = reader.GetString("tipo_pessoa"),
                            Cpf_cnpj = reader.GetString("cpf_cnpj"),
                            Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                            Apelido_nomeFantasia = reader.GetString("apelido_nomeFantasia"),
                            Rg_inscricaoEstadual = reader.GetString("rg_inscricaoEstadual"),
                            Genero = reader.GetString("genero"),
                            Email = reader.GetString("email"),
                            Celular = reader.GetString("celular"),
                            Cidade_id = reader.GetInt32("cidade_id"),
                            Cidade = reader.GetString("cidade"),
                            Estado = reader.GetString("estado"),
                            Pais = reader.GetString("pais"),
                            Logradouro = reader.GetString("logradouro"),
                            Numero = reader.GetString("numero"),
                            Bairro = reader.GetString("bairro"),
                            Complemento = reader.GetString("complemento"),
                            Cep = reader.GetString("cep"),
                            Origem_id = reader.GetInt32("origem_id"),
                            Origem = reader.GetString("origem"),
                            Ativo = reader.GetBoolean("ativo"),
                            Data_cadastro = reader.GetDateTime("data_cadastro"),
                            Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt")),
                            Contratos = contratos,
                            Interesses = interesses,
                            Ramos = ramos,
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

        private List<ContratosClienteModel> GetContratosFromCliente(SqlConnection connection, int id)
        {
            List<ContratosClienteModel> listaContratos = new List<ContratosClienteModel>();

            string query = @"
                SELECT * FROM contratos c
                WHERE c.cliente_id = @id";

            using (SqlCommand getAllContratos = new SqlCommand(query, connection))
            {
                getAllContratos.Parameters.Add("@id", SqlDbType.Int).Value = id;

                using (SqlDataReader ContratosReader = getAllContratos.ExecuteReader())
                {
                    while (ContratosReader.Read())
                    {
                        listaContratos.Add(
                            new ContratosClienteModel
                            {
                                Contrato_id = ContratosReader.GetInt32(ContratosReader.GetOrdinal("id")),
                                Data_contrato = ContratosReader.GetDateTime(ContratosReader.GetOrdinal("data_contrato")),
                                Data_vencimento = ContratosReader.GetDateTime(ContratosReader.GetOrdinal("data_vencimento")),
                                Situacao = ContratosReader.GetString(ContratosReader.GetOrdinal("situacao"))
                            });
                    }
                }
            }

            return listaContratos;
        }

        private List<ClienteInteresseModel> GetInteressesFromCliente(SqlConnection connection, int id)
        {
            List<ClienteInteresseModel> listaInteresses = new List<ClienteInteresseModel>();

            string query = @"
            SELECT ci.interesse_id, i.interesse
            FROM clientes_interesses ci
            INNER JOIN interesses i ON ci.interesse_id = i.id
            WHERE ci.cliente_id = @id";

            using (SqlCommand getAll = new SqlCommand(query, connection))
            {
                getAll.Parameters.Add("@id", SqlDbType.Int).Value = id;

                using (SqlDataReader InteressesReader = getAll.ExecuteReader())
                {
                    while (InteressesReader.Read())
                    {
                        listaInteresses.Add(
                            new ClienteInteresseModel
                            {
                                Interesse_id = InteressesReader.GetInt32(InteressesReader.GetOrdinal("interesse_id")),
                                Interesse = InteressesReader.GetString(InteressesReader.GetOrdinal("interesse")),
                            });
                    }
                }
            }

            return listaInteresses;
        }

        private List<ClienteRamoModel> GetRamosFromCliente(SqlConnection connection, int id)
        {
            List<ClienteRamoModel> listaRamos = new List<ClienteRamoModel>();

            string query = @"
            SELECT cr.ramo_id, r.ramo
            FROM clientes_ramosAtividade cr
            INNER JOIN ramosAtividade r ON cr.ramo_id = r.id
            WHERE cr.cliente_id = @id";

            using (SqlCommand getAll = new SqlCommand(query, connection))
            {
                getAll.Parameters.Add("@id", SqlDbType.Int).Value = id;

                using (SqlDataReader ramosReader = getAll.ExecuteReader())
                {
                    while (ramosReader.Read())
                    {
                        listaRamos.Add(
                            new ClienteRamoModel
                            {
                                Ramo_id = ramosReader.GetInt32(ramosReader.GetOrdinal("ramo_id")),
                                Ramo = ramosReader.GetString(ramosReader.GetOrdinal("ramo")),
                            });
                    }
                }
            }

            return listaRamos;
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
                        genero, email, celular, cidade_id, logradouro, numero, bairro, complemento, cep, origem_id)
                        VALUES
                        (@tipo_pessoa, @cpf_cnpj, @nome_razaoSocial, @apelido_nomeFantasia, @rg_inscricaoEstadual,
                        @genero, @email, @celular, @cidade_id, @logradouro, @numero, @bairro, @complemento, @cep, @origem_id);
                        SELECT SCOPE_IDENTITY();";

                    SqlCommand postCmd = new SqlCommand(postQuery, Connection, transaction);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@tipo_pessoa", SqlDbType.VarChar).Value = clienteInserido.Tipo_pessoa;
                    postCmd.Parameters.Add("@cpf_cnpj", SqlDbType.VarChar).Value = clienteInserido.Cpf_cnpj;
                    postCmd.Parameters.Add("@nome_razaoSocial", SqlDbType.VarChar).Value = clienteInserido.Nome_razaoSocial;
                    postCmd.Parameters.Add("@apelido_nomeFantasia", SqlDbType.VarChar).Value = clienteInserido.Apelido_nomeFantasia;
                    postCmd.Parameters.Add("@rg_inscricaoEstadual", SqlDbType.VarChar).Value = clienteInserido.Rg_inscricaoEstadual;
                    postCmd.Parameters.Add("@genero", SqlDbType.VarChar).Value = clienteInserido.Genero;
                    postCmd.Parameters.Add("@email", SqlDbType.VarChar).Value = clienteInserido.Email;
                    postCmd.Parameters.Add("@celular", SqlDbType.VarChar).Value = clienteInserido.Celular;
                    postCmd.Parameters.Add("@cidade_id", SqlDbType.VarChar).Value = clienteInserido.Cidade_id;
                    postCmd.Parameters.Add("@logradouro", SqlDbType.VarChar).Value = clienteInserido.Logradouro;
                    postCmd.Parameters.Add("@numero", SqlDbType.VarChar).Value = clienteInserido.Numero;
                    postCmd.Parameters.Add("@bairro", SqlDbType.VarChar).Value = clienteInserido.Bairro;
                    postCmd.Parameters.Add("@complemento", SqlDbType.VarChar).Value = clienteInserido.Complemento;
                    postCmd.Parameters.Add("@cep", SqlDbType.VarChar).Value = clienteInserido.Cep;
                    postCmd.Parameters.Add("@origem_id", SqlDbType.VarChar).Value = clienteInserido.Origem_id;

                    int clienteID = Convert.ToInt32(postCmd.ExecuteScalar());

                    // Inserir os IDs na associativa de interesses
                    foreach (var interesse in clienteInserido.Interesses)
                    {
                        string query = @"
                        INSERT INTO clientes_interesses (cliente_id, interesse_id)
                        VALUES (@cliente_id, @interesse_id);";

                        SqlCommand cmd = new SqlCommand(query, Connection, transaction);
                        cmd.Parameters.AddWithValue("@cliente_id", clienteID);
                        cmd.Parameters.AddWithValue("@interesse_id", interesse.Interesse_id);

                        cmd.ExecuteNonQuery();
                    }

                    // Inserir os IDs na associativa de ramos
                    foreach (var ramo in clienteInserido.Ramos)
                    {
                        string query = @"
                        INSERT INTO clientes_ramosAtividade (cliente_id, ramo_id)
                        VALUES (@cliente_id, @ramo_id);";

                        SqlCommand cmd = new SqlCommand(query, Connection, transaction);
                        cmd.Parameters.AddWithValue("@cliente_id", clienteID);
                        cmd.Parameters.AddWithValue("@ramo_id", ramo.Ramo_id);

                        cmd.ExecuteNonQuery();
                    }

                    transaction.Commit();
                    return "Cliente inserido com Sucesso!";

                }
                catch (SqlException ex)
                {
                    if (transaction != null)
                    {
                        transaction.Rollback();
                    }
                    throw;
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
                    rg_inscricaoEstadual = @rg_inscricaoEstadual, genero = @genero, email = @email, celular = @celular,
                    cidade_id = @cidade_id, logradouro = @logradouro, numero = @numero, bairro = @bairro,
                    complemento = @complemento, cep = @cep, origem_id = @origem_id, ativo = @ativo, data_ult_alt = @data_ult_alt
                    WHERE id = @id";

                    SqlCommand putCmd = new SqlCommand(putQuery, Connection, transaction);

                    putCmd.Parameters.Add("@id", SqlDbType.VarChar).Value = clienteAlterado.Id;
                    putCmd.Parameters.Add("@nome_razaoSocial", SqlDbType.VarChar).Value = clienteAlterado.Nome_razaoSocial;
                    putCmd.Parameters.Add("@apelido_nomeFantasia", SqlDbType.VarChar).Value = clienteAlterado.Apelido_nomeFantasia;
                    putCmd.Parameters.Add("@rg_inscricaoEstadual", SqlDbType.VarChar).Value = clienteAlterado.Rg_inscricaoEstadual;
                    putCmd.Parameters.Add("@genero", SqlDbType.VarChar).Value = clienteAlterado.Genero;
                    putCmd.Parameters.Add("@email", SqlDbType.VarChar).Value = clienteAlterado.Email;
                    putCmd.Parameters.Add("@celular", SqlDbType.VarChar).Value = clienteAlterado.Celular;
                    putCmd.Parameters.Add("@cidade_id", SqlDbType.VarChar).Value = clienteAlterado.Cidade_id;
                    putCmd.Parameters.Add("@logradouro", SqlDbType.VarChar).Value = clienteAlterado.Logradouro;
                    putCmd.Parameters.Add("@numero", SqlDbType.VarChar).Value = clienteAlterado.Numero;
                    putCmd.Parameters.Add("@bairro", SqlDbType.VarChar).Value = clienteAlterado.Bairro;
                    putCmd.Parameters.Add("@complemento", SqlDbType.VarChar).Value = clienteAlterado.Complemento;
                    putCmd.Parameters.Add("@cep", SqlDbType.VarChar).Value = clienteAlterado.Cep;
                    putCmd.Parameters.Add("@origem_id", SqlDbType.VarChar).Value = clienteAlterado.Origem_id;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = clienteAlterado.Ativo;
                    putCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

                    putCmd.ExecuteNonQuery();

                    // Deletar as ligações da associativa de interesses
                    string delete = "DELETE FROM clientes_interesses WHERE cliente_id = @id";
                    SqlCommand deleteCmd = new SqlCommand(delete, Connection, transaction);
                    deleteCmd = new SqlCommand(delete, Connection, transaction);
                    deleteCmd.Parameters.AddWithValue("@id", clienteAlterado.Id);

                    deleteCmd.ExecuteNonQuery();

                    // Deletar as ligações da associativa de ramos
                    delete = "DELETE FROM clientes_ramosAtividade WHERE cliente_id = @id";
                    deleteCmd = new SqlCommand(delete, Connection, transaction);
                    deleteCmd.Parameters.AddWithValue("@id", clienteAlterado.Id);

                    deleteCmd.ExecuteNonQuery();

                    // Inserir os IDs na associativa de interesses
                    foreach (var interesse in clienteAlterado.Interesses)
                    {
                        string query = @"
                        INSERT INTO clientes_interesses (cliente_id, interesse_id)
                        VALUES (@cliente_id, @interesse_id);";

                        SqlCommand cmd = new SqlCommand(query, Connection, transaction);
                        cmd.Parameters.AddWithValue("@cliente_id", clienteAlterado.Id);
                        cmd.Parameters.AddWithValue("@interesse_id", interesse.Interesse_id);

                        cmd.ExecuteNonQuery();
                    }

                    // Inserir os IDs na associativa de ramos
                    foreach (var ramo in clienteAlterado.Ramos)
                    {
                        string query = @"
                        INSERT INTO clientes_ramosAtividade (cliente_id, ramo_id)
                        VALUES (@cliente_id, @ramo_id);";

                        SqlCommand cmd = new SqlCommand(query, Connection, transaction);
                        cmd.Parameters.AddWithValue("@cliente_id", clienteAlterado.Id);
                        cmd.Parameters.AddWithValue("@ramo_id", ramo.Ramo_id);

                        cmd.ExecuteNonQuery();
                    }

                    transaction.Commit();
                    return "Cliente alterado com sucesso!";

                }
                catch (SqlException ex)
                {
                    if (transaction != null)
                    {
                        transaction.Rollback();
                    }
                    throw;
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

        public string DeleteCliente(int id)
        {
            using (Connection)
            {

                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    // Deletar as ligações da associativa de interesses
                    string delete = "DELETE FROM clientes_interesses WHERE cliente_id = @id";
                    SqlCommand deleteCmd = new SqlCommand(delete, Connection, transaction);
                    deleteCmd.Parameters.AddWithValue("@id", id);
                    deleteCmd.ExecuteNonQuery();

                    // Deletar as ligações da associativa de ramos
                    delete = "DELETE FROM clientes_ramosAtividade WHERE cliente_id = @id";
                    deleteCmd = new SqlCommand(delete, Connection, transaction);
                    deleteCmd.Parameters.AddWithValue("@id", id);
                    deleteCmd.ExecuteNonQuery();

                    // Deletar as ligações da tabela de propostas
                    delete = "DELETE FROM propostas WHERE cliente_id = @id";
                    deleteCmd = new SqlCommand(delete, Connection, transaction);
                    deleteCmd.Parameters.AddWithValue("@id", id);
                    deleteCmd.ExecuteNonQuery();

                    // Deletar o cliente
                    delete = "DELETE FROM clientes WHERE id = @id";
                    deleteCmd = new SqlCommand(delete, Connection, transaction);
                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    deleteCmd.ExecuteNonQuery();

                    transaction.Commit();
                    return "Cliente deletado com Sucesso!";
                }
                catch (SqlException ex)
                {
                    if (transaction != null)
                    {
                        transaction.Rollback();
                    }
                    throw;

                }
                finally
                {
                    Connection.Close();
                }
            }
        }
    }
}
