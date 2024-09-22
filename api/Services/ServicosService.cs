using api.Interfaces;
using api.Models.Serviços;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class ServicosService: IServicosService
    {
        private readonly SqlConnection Connection;

        public ServicosService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<ServicoModel> GetAllServicosAtivos()
        {
            List<ServicoModel> listaServicos = new List<ServicoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT * FROM servicos WHERE ativo = @ativo"), Connection);

                    getAllCmd.Parameters.Clear();
                    getAllCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = 1;


                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaServicos.Add(
                            new ServicoModel
                            {
                                Id = reader.GetInt32("id"),
                                Servico = reader.GetString("servico"),
                                Valor = reader.GetDecimal("valor"),
                                Descricao = reader.GetString("descricao"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
                            }
                        );
                    }
                    return listaServicos;

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

        public IEnumerable<ServicoModel> GetAllServicos()
        {
            List<ServicoModel> listaServicos = new List<ServicoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT * FROM servicos"), Connection);

                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaServicos.Add(
                            new ServicoModel
                            {
                                Id = reader.GetInt32("id"),
                                Servico = reader.GetString("servico"),
                                Valor = reader.GetDecimal("valor"),
                                Descricao = reader.GetString("descricao"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
                            }
                        );
                    }
                    return listaServicos;

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

        public ServicoModel GetServico(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT * FROM servicos WHERE id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new ServicoModel
                        {
                            Id = reader.GetInt32("id"),
                            Servico = reader.GetString("servico"),
                            Valor = reader.GetDecimal("valor"),
                            Descricao = reader.GetString("descricao"),
                            Ativo = reader.GetBoolean("ativo"),
                            Data_cadastro = reader.GetDateTime("data_cadastro"),
                            Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
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

        public string PostServico(ServicoPostModel servicoInserido)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand postCmd = new SqlCommand(String.Format(
                    "INSERT INTO servicos (servico, valor, descricao) " +
                    "VALUES (@servico, @valor, @descricao)"), Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@servico", SqlDbType.VarChar).Value = servicoInserido.Servico;
                    postCmd.Parameters.Add("@valor", SqlDbType.Decimal).Value = servicoInserido.Valor;
                    postCmd.Parameters.Add("@descricao", SqlDbType.VarChar).Value = servicoInserido.Descricao;

                    postCmd.ExecuteNonQuery();
                    return "Inserido com Sucesso!";

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

        public string PutServico(ServicoPutModel servicoAlterado)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(String.Format(
                    "UPDATE servicos SET servico = @servico, valor = @valor, descricao = @descricao, ativo = @ativo, " +
                    "data_ult_alt = @data_ult_alt " +
                    "WHERE id = @id"), Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = servicoAlterado.Id;
                    putCmd.Parameters.Add("@servico", SqlDbType.VarChar).Value = servicoAlterado.Servico;
                    putCmd.Parameters.Add("@valor", SqlDbType.Decimal).Value = servicoAlterado.Valor;
                    putCmd.Parameters.Add("@descricao", SqlDbType.VarChar).Value = servicoAlterado.Descricao;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = servicoAlterado.Ativo;
                    putCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

                    putCmd.ExecuteNonQuery();
                    return "Alterado com Sucesso!";

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

        public string DeleteServico(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM servicos WHERE id = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    deleteCmd.ExecuteNonQuery();
                    return "Deletado com Sucesso!";

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
    }
}
