using api.Interfaces;
using api.Models.Origem;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class OrigensService: IOrigensService
    {
        private readonly SqlConnection Connection;

        public OrigensService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<OrigemModel> GetAllOrigens(int ativo) 
        {
            List<OrigemModel> listaOrigens = new List<OrigemModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT * FROM origens WHERE ativo = @ativo"), Connection);

                    getAllCmd.Parameters.Clear();
                    getAllCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = ativo;


                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaOrigens.Add(
                            new OrigemModel
                            {
                                Origem_ID = reader.GetInt32("origem_ID"),
                                Origem = reader.GetString("origem"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
                            }
                        );
                    }
                    return listaOrigens;

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

        public OrigemModel GetOrigem(int origem_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT * FROM origens WHERE origem_ID = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = origem_ID;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new OrigemModel
                        {
                            Origem_ID = reader.GetInt32("origem_ID"),
                            Origem = reader.GetString("origem"),
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

        public string PostOrigem(OrigemPostModel origemInserido)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand postCmd = new SqlCommand(String.Format(
                    "INSERT INTO origens (origem, ativo, data_cadastro, data_ult_alt) " +
                    "VALUES (@origem, @ativo, @data_cadastro, @data_ult_alt)"), Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@origem", SqlDbType.VarChar).Value = origemInserido.Origem;
                    postCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = origemInserido.Ativo;
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

        public string PutOrigem(OrigemPutModel origemAlterado)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(String.Format(
                    "UPDATE origens SET origem = @origem, ativo = @ativo, data_ult_alt = @data_ult_alt " +
                    "WHERE origem_ID = @id"), Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = origemAlterado.Origem_ID;
                    putCmd.Parameters.Add("@origem", SqlDbType.VarChar).Value = origemAlterado.Origem;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = origemAlterado.Ativo;
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

        public string DeleteOrigem(int origem_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM origens WHERE origem_ID = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = origem_ID;

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
