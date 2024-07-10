using api.Interfaces;
using api.Models.Cidade;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class CidadesService: ICidadesService
    {
        private readonly SqlConnection Connection;

        public CidadesService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<CidadeModel> GetAllCidadesAtivas()
        {
            List<CidadeModel> listaCidades = new List<CidadeModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT c.cidade_ID, c.cidade, c.ddd, c.estado_ID, e.estado, p.pais, c.ativo, c.data_cadastro, c.data_ult_alt " +
                    "FROM cidades c " +
                    "INNER JOIN estados e ON c.estado_ID = e.estado_ID " +
                    "INNER JOIN paises p ON e.pais_ID = p.pais_ID " +
                    "WHERE c.ativo = @ativo"), Connection);

                    getAllCmd.Parameters.Clear();
                    getAllCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = 1;


                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaCidades.Add(
                            new CidadeModel
                            {
                                Cidade_ID = reader.GetInt32("cidade_ID"),
                                Cidade = reader.GetString("cidade"),
                                Ddd = reader.GetString("ddd"),
                                Estado_ID = reader.GetInt32("estado_ID"),
                                Estado = reader.GetString("estado"),
                                Pais = reader.GetString("pais"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
                            }
                        );
                    }
                    return listaCidades;

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

        public IEnumerable<CidadeModel> GetAllCidades() 
        {
            List<CidadeModel> listaCidades = new List<CidadeModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT c.cidade_ID, c.cidade, c.ddd, c.estado_ID, e.estado, p.pais, c.ativo, c.data_cadastro, c.data_ult_alt " +
                    "FROM cidades c " +
                    "INNER JOIN estados e ON c.estado_ID = e.estado_ID " +
                    "INNER JOIN paises p ON e.pais_ID = p.pais_ID"), Connection);

                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaCidades.Add(
                            new CidadeModel
                            {
                                Cidade_ID = reader.GetInt32("cidade_ID"),
                                Cidade = reader.GetString("cidade"),
                                Ddd = reader.GetString("ddd"),
                                Estado_ID = reader.GetInt32("estado_ID"),
                                Estado = reader.GetString("estado"),
                                Pais = reader.GetString("pais"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
                            }
                        );
                    }
                    return listaCidades;

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

        public CidadeModel GetCidade(int cidade_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT c.cidade_ID, c.cidade, c.ddd, c.estado_ID, e.estado, p.pais, c.ativo, c.data_cadastro, c.data_ult_alt " +
                    "FROM cidades c " +
                    "INNER JOIN estados e ON c.estado_ID = e.estado_ID " +
                    "INNER JOIN paises p ON e.pais_ID = p.pais_ID " +
                    "WHERE c.cidade_ID = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = cidade_ID;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new CidadeModel
                        {
                            Cidade_ID = reader.GetInt32("cidade_ID"),
                            Cidade = reader.GetString("cidade"),
                            Ddd = reader.GetString("ddd"),
                            Estado_ID = reader.GetInt32("estado_ID"),
                            Estado = reader.GetString("estado"),
                            Pais = reader.GetString("pais"),
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

        public string PostCidade(CidadePostModel cidadeInserida)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand postCmd = new SqlCommand(
                    "INSERT INTO cidades (cidade, ddd, estado_ID) " +
                    "VALUES (@cidade, @ddd, @estado_ID)", Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@cidade", SqlDbType.VarChar).Value = cidadeInserida.Cidade;
                    postCmd.Parameters.Add("@ddd", SqlDbType.VarChar).Value = cidadeInserida.Ddd;
                    postCmd.Parameters.Add("@estado_ID", SqlDbType.Int).Value = cidadeInserida.Estado_ID;

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

        public string PutCidade(CidadePutModel cidadeAlterada)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(
                    "UPDATE cidades SET cidade = @cidade, ddd = @ddd, estado_ID = @estado_ID, " +
                    "ativo = @ativo, data_ult_alt = @data_ult_alt " +
                    "WHERE cidade_ID = @id;", Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = cidadeAlterada.Cidade_ID;
                    putCmd.Parameters.Add("@cidade", SqlDbType.VarChar).Value = cidadeAlterada.Cidade;
                    putCmd.Parameters.Add("@ddd", SqlDbType.VarChar).Value = cidadeAlterada.Ddd;
                    putCmd.Parameters.Add("@estado_ID", SqlDbType.Int).Value = cidadeAlterada.Estado_ID;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = cidadeAlterada.Ativo;
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

        public string DeleteCidade(int cidade_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM cidades WHERE cidade_ID = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = cidade_ID;

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
