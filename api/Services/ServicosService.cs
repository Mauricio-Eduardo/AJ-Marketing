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

        public IEnumerable<ServicoModel> GetAllServicos(int ativo) 
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
                    getAllCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = ativo;


                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaServicos.Add(
                            new ServicoModel
                            {
                                Servico_ID = reader.GetInt32("servico_ID"),
                                Servico = reader.GetString("servico"),
                                Valor = reader.GetDecimal("valor"),
                                Descricao = reader.GetString("descricao"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
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

        public ServicoModel GetServico(int servico_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT * FROM servicos WHERE servico_ID = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = servico_ID;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new ServicoModel
                        {
                            Servico_ID = reader.GetInt32("servico_ID"),
                            Servico = reader.GetString("servico"),
                            Valor = reader.GetDecimal("valor"),
                            Descricao = reader.GetString("descricao"),
                            Ativo = reader.GetBoolean("ativo"),
                            Data_cadastro = reader.GetDateTime("data_cadastro"),
                            Data_ult_alt = reader.GetDateTime("data_ult_alt")
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
                    "INSERT INTO servicos (servico, valor, descricao, ativo, data_cadastro, data_ult_alt) " +
                    "VALUES (@servico, @valor, @descricao, @ativo, @data_cadastro, @data_ult_alt)"), Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@servico", SqlDbType.VarChar).Value = servicoInserido.Servico;
                    postCmd.Parameters.Add("@valor", SqlDbType.Decimal).Value = servicoInserido.Valor;
                    postCmd.Parameters.Add("@descricao", SqlDbType.VarChar).Value = servicoInserido.Descricao;
                    postCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = servicoInserido.Ativo;
                    postCmd.Parameters.Add("@data_cadastro", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();
                    postCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

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
                    "WHERE servico_ID = @id"), Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = servicoAlterado.Servico_ID;
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

        public string DeleteServico(int servico_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM servicos WHERE servico_ID = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = servico_ID;

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
