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

        public IEnumerable<EstadoModel> GetAllEstados()
        {
            List<EstadoModel> listaEstados = new List<EstadoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                       "SELECT e.id, e.estado, e.uf, e.pais_id, p.pais, e.ativo, e.data_cadastro, e.data_ult_alt " +
                       "FROM estados e INNER JOIN paises p ON e.pais_id = p.id"), Connection);

                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaEstados.Add(
                            new EstadoModel
                            {
                                Id = reader.GetInt32("id"),
                                Estado = reader.GetString("estado"),
                                Uf = reader.GetString("uf"),
                                Pais_id = reader.GetInt32("pais_id"),
                                Pais = reader.GetString("pais"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
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

        public EstadoModel GetEstado(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                        "SELECT e.id, e.estado, e.uf, e.pais_id, p.pais, e.ativo, e.data_cadastro, e.data_ult_alt " +
                        "FROM estados e INNER JOIN paises p ON e.pais_id = p.id " +
                        "WHERE e.id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new EstadoModel
                        {
                            Id = reader.GetInt32("id"),
                            Estado = reader.GetString("estado"),
                            Uf = reader.GetString("uf"),
                            Pais_id = reader.GetInt32("pais_id"),
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

        public string PostEstado(EstadoPostModel estadoInserido)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand postCmd = new SqlCommand(
                    "INSERT INTO estados (estado, uf, pais_id) " +
                    "VALUES (@estado, @uf, @pais_id)", Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = estadoInserido.Estado;
                    postCmd.Parameters.Add("@uf", SqlDbType.VarChar).Value = estadoInserido.Uf;
                    postCmd.Parameters.Add("@pais_id", SqlDbType.Int).Value = estadoInserido.Pais_id;

                    postCmd.ExecuteNonQuery();
                    return "Estado inserido com Sucesso!";

                }
                catch (SqlException ex)
                {
                    throw;
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
                    "UPDATE estados SET estado = @estado, uf = @uf, pais_id = @pais_id, ativo = @ativo, data_ult_alt = @data_ult_alt " +
                    "WHERE id = @id;", Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = estadoAlterado.Id;
                    putCmd.Parameters.Add("@estado", SqlDbType.VarChar).Value = estadoAlterado.Estado;
                    putCmd.Parameters.Add("@uf", SqlDbType.VarChar).Value = estadoAlterado.Uf;
                    putCmd.Parameters.Add("@pais_id", SqlDbType.Int).Value = estadoAlterado.Pais_id;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = estadoAlterado.Ativo;
                    putCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

                    putCmd.ExecuteNonQuery();
                    return "Estado alterado com Sucesso!";

                }
                catch (SqlException ex)
                {
                    throw;
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

        public string DeleteEstado(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM estados WHERE id = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    deleteCmd.ExecuteNonQuery();
                    return "Estado deletado com Sucesso!";

                }
                catch (SqlException ex)
                {
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
