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
                    "SELECT c.id, c.cidade, c.ddd, c.estado_id, e.estado, p.pais, c.ativo, c.data_cadastro, c.data_ult_alt " +
                    "FROM cidades c " +
                    "INNER JOIN estados e ON c.estado_id = e.id " +
                    "INNER JOIN paises p ON e.pais_id = p.id " +
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
                                Id = reader.GetInt32("id"),
                                Cidade = reader.GetString("cidade"),
                                Ddd = reader.GetString("ddd"),
                                Estado_id = reader.GetInt32("estado_id"),
                                Estado = reader.GetString("estado"),
                                Pais = reader.GetString("pais"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
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
                    "SELECT c.id, c.cidade, c.ddd, c.estado_id, e.estado, p.pais, c.ativo, c.data_cadastro, c.data_ult_alt " +
                    "FROM cidades c " +
                    "INNER JOIN estados e ON c.estado_id = e.id " +
                    "INNER JOIN paises p ON e.pais_id = p.id"), Connection);

                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaCidades.Add(
                            new CidadeModel
                            {
                                Id = reader.GetInt32("id"),
                                Cidade = reader.GetString("cidade"),
                                Ddd = reader.GetString("ddd"),
                                Estado_id = reader.GetInt32("estado_id"),
                                Estado = reader.GetString("estado"),
                                Pais = reader.GetString("pais"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
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

        public CidadeModel GetCidade(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT c.id, c.cidade, c.ddd, c.estado_id, e.estado, p.pais, c.ativo, c.data_cadastro, c.data_ult_alt " +
                    "FROM cidades c " +
                    "INNER JOIN estados e ON c.estado_id = e.id " +
                    "INNER JOIN paises p ON e.pais_id = p.id " +
                    "WHERE c.id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new CidadeModel
                        {
                            Id = reader.GetInt32("id"),
                            Cidade = reader.GetString("cidade"),
                            Ddd = reader.GetString("ddd"),
                            Estado_id = reader.GetInt32("estado_id"),
                            Estado = reader.GetString("estado"),
                            Pais = reader.GetString("pais"),
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

        public string PostCidade(CidadePostModel cidadeInserida)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand postCmd = new SqlCommand(
                    "INSERT INTO cidades (cidade, ddd, estado_id) " +
                    "VALUES (@cidade, @ddd, @estado_id)", Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@cidade", SqlDbType.VarChar).Value = cidadeInserida.Cidade;
                    postCmd.Parameters.Add("@ddd", SqlDbType.VarChar).Value = cidadeInserida.Ddd;
                    postCmd.Parameters.Add("@estado_id", SqlDbType.Int).Value = cidadeInserida.Estado_id;

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
                    "UPDATE cidades SET cidade = @cidade, ddd = @ddd, estado_id = @estado_id, " +
                    "ativo = @ativo, data_ult_alt = @data_ult_alt " +
                    "WHERE id = @id;", Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = cidadeAlterada.Id;
                    putCmd.Parameters.Add("@cidade", SqlDbType.VarChar).Value = cidadeAlterada.Cidade;
                    putCmd.Parameters.Add("@ddd", SqlDbType.VarChar).Value = cidadeAlterada.Ddd;
                    putCmd.Parameters.Add("@estado_id", SqlDbType.Int).Value = cidadeAlterada.Estado_id;
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

        public string DeleteCidade(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM cidades WHERE id = @id"), Connection);

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
