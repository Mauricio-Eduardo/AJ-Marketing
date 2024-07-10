using api.Interfaces;
using api.Models.Estado;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class EstadosService: IEstadosService
    {
        private readonly SqlConnection Connection;

        public EstadosService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<EstadoModel> GetAllEstadosAtivos() 
        {
            List<EstadoModel> listaEstados = new List<EstadoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                       "SELECT e.estado_ID, e.estado, e.uf, e.pais_ID, p.pais, e.ativo, e.data_cadastro, e.data_ult_alt " +
                       "FROM estados e INNER JOIN paises p ON e.pais_ID = p.pais_ID WHERE e.ativo = @ativo"), Connection);

                    getAllCmd.Parameters.Clear();
                    getAllCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = 1;


                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaEstados.Add(
                            new EstadoModel
                            {
                                Estado_ID = reader.GetInt32("estado_ID"),
                                Estado = reader.GetString("estado"),
                                Uf = reader.GetString("uf"),
                                Pais_ID = reader.GetInt32("pais_ID"),
                                Pais = reader.GetString("pais"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
                            }
                        );
                    }
                    return listaEstados;

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

        public IEnumerable<EstadoModel> GetAllEstados()
        {
            List<EstadoModel> listaEstados = new List<EstadoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                       "SELECT e.estado_ID, e.estado, e.uf, e.pais_ID, p.pais, e.ativo, e.data_cadastro, e.data_ult_alt " +
                       "FROM estados e INNER JOIN paises p ON e.pais_ID = p.pais_ID"), Connection);

                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaEstados.Add(
                            new EstadoModel
                            {
                                Estado_ID = reader.GetInt32("estado_ID"),
                                Estado = reader.GetString("estado"),
                                Uf = reader.GetString("uf"),
                                Pais_ID = reader.GetInt32("pais_ID"),
                                Pais = reader.GetString("pais"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
                            }
                        );
                    }
                    return listaEstados;

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

        public EstadoModel GetEstado(int estado_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                        "SELECT e.estado_ID, e.estado, e.uf, e.pais_ID, p.pais, e.ativo, e.data_cadastro, e.data_ult_alt " +
                        "FROM estados e INNER JOIN paises p ON e.pais_ID = p.pais_ID " +
                        "WHERE e.estado_ID = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = estado_ID;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new EstadoModel
                        {
                            Estado_ID = reader.GetInt32("estado_ID"),
                            Estado = reader.GetString("estado"),
                            Uf = reader.GetString("uf"),
                            Pais_ID = reader.GetInt32("pais_ID"),
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

        public string PostEstado(EstadoPostModel estadoInserido)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand postCmd = new SqlCommand(
                    "INSERT INTO estados (estado, uf, pais_ID) " +
                    "VALUES (@estado, @uf, @pais_ID)", Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = estadoInserido.Estado;
                    postCmd.Parameters.Add("@uf", SqlDbType.VarChar).Value = estadoInserido.Uf;
                    postCmd.Parameters.Add("@pais_ID", SqlDbType.Int).Value = estadoInserido.Pais_ID;

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

        public string PutEstado(EstadoPutModel estadoAlterado)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(
                    "UPDATE estados SET estado = @estado, uf = @uf, pais_ID = @pais_ID, ativo = @ativo, data_ult_alt = @data_ult_alt " +
                    "WHERE estado_ID = @id;", Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = estadoAlterado.Estado_ID;
                    putCmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = estadoAlterado.Estado;
                    putCmd.Parameters.Add("@uf", SqlDbType.VarChar).Value = estadoAlterado.Uf;
                    putCmd.Parameters.Add("@pais_ID", SqlDbType.Int).Value = estadoAlterado.Pais_ID;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = estadoAlterado.Ativo;
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

        public string DeleteEstado(int estado_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM estados WHERE estado_ID = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = estado_ID;

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
