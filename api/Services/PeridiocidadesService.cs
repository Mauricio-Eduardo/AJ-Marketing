using api.Interfaces;
using api.Models.Peridiocidade;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class PeridiocidadesService : IPeridiocidadesService
    {
        private readonly SqlConnection Connection;

        public PeridiocidadesService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<PeridiocidadeModel> GetAllPeridiocidades() 
        {
            List<PeridiocidadeModel> listaPeridiocidades = new List<PeridiocidadeModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT * FROM peridiocidades"), Connection);

                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaPeridiocidades.Add(
                            new PeridiocidadeModel
                            {
                                Id = reader.GetInt32("id"),
                                Descricao = reader.GetString("descricao"),
                                Dias = reader.GetInt32("dias"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
                            }
                        );
                    }
                    return listaPeridiocidades;

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

        public PeridiocidadeModel GetPeridiocidade(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT * FROM peridiocidades WHERE id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new PeridiocidadeModel
                        {
                            Id = reader.GetInt32("id"),
                            Descricao = reader.GetString("descricao"),
                            Dias = reader.GetInt32("dias"),
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

        public string PostPeridiocidade(PeridiocidadePostModel peridiocidadeInserida)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand postCmd = new SqlCommand(String.Format(
                    "INSERT INTO peridiocidades (descricao, dias) " +
                    "VALUES (@descricao, @dias)"), Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@descricao", SqlDbType.VarChar).Value = peridiocidadeInserida.Descricao;
                    postCmd.Parameters.Add("@dias", SqlDbType.Int).Value = peridiocidadeInserida.Dias;

                    postCmd.ExecuteNonQuery();
                    return "Inserida com Sucesso!";

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

        public string PutPeridiocidade(PeridiocidadePutModel peridiocidadeAlterada)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(String.Format(
                    "UPDATE peridiocidades SET descricao = @descricao, dias = @dias, ativo = @ativo, data_ult_alt = @data_ult_alt " +
                    "WHERE id = @id"), Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = peridiocidadeAlterada.Id;
                    putCmd.Parameters.Add("@descricao", SqlDbType.VarChar).Value = peridiocidadeAlterada.Descricao;
                    putCmd.Parameters.Add("@dias", SqlDbType.VarChar).Value = peridiocidadeAlterada.Dias;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = peridiocidadeAlterada.Ativo;
                    putCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

                    putCmd.ExecuteNonQuery();
                    return "Alterada com Sucesso!";

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

        public string DeletePeridiocidade(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM peridiocidades WHERE id = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    deleteCmd.ExecuteNonQuery();
                    return "Deletada com Sucesso!";

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
