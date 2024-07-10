using api.Interfaces;
using api.Models.País;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class PaisesService: IPaisesService
    {
        private readonly SqlConnection Connection;

        public PaisesService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<PaisModel> GetAllPaises(int ativo) 
        {
            List<PaisModel> listaPaises = new List<PaisModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT * FROM paises WHERE ativo = @ativo"), Connection);

                    getAllCmd.Parameters.Clear();
                    getAllCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = ativo;


                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaPaises.Add(
                            new PaisModel
                            {
                                Pais_ID = reader.GetInt32("pais_ID"),
                                Pais = reader.GetString("pais"),
                                Sigla = reader.GetString("sigla"),
                                Ddi = reader.GetString("ddi"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
                            }
                        );
                    }
                    return listaPaises;

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

        public PaisModel GetPais(int pais_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT * FROM paises WHERE pais_ID = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = pais_ID;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new PaisModel
                        {
                            Pais_ID = reader.GetInt32("pais_ID"),
                            Pais = reader.GetString("pais"),
                            Sigla = reader.GetString("sigla"),
                            Ddi = reader.GetString("ddi"),
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

        public string PostPais(PaisPostModel paisInserido)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand postCmd = new SqlCommand(String.Format(
                    "INSERT INTO paises (pais, sigla, ddi, ativo, data_cadastro, data_ult_alt) " +
                    "VALUES (@pais, @sigla, @ddi, @ativo, @data_cadastro, @data_ult_alt)"), Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@pais", SqlDbType.VarChar).Value = paisInserido.Pais;
                    postCmd.Parameters.Add("@sigla", SqlDbType.VarChar).Value = paisInserido.Sigla;
                    postCmd.Parameters.Add("@ddi", SqlDbType.VarChar).Value = paisInserido.Ddi;
                    postCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = paisInserido.Ativo;
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

        public string PutPais(PaisPutModel paisAlterado)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(String.Format(
                    "UPDATE paises SET pais = @pais, sigla = @sigla, ddi = @ddi, ativo = @ativo, data_ult_alt = @data_ult_alt " +
                    "WHERE pais_ID = @id"), Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = paisAlterado.Pais_ID;
                    putCmd.Parameters.Add("@pais", SqlDbType.VarChar).Value = paisAlterado.Pais;
                    putCmd.Parameters.Add("@sigla", SqlDbType.VarChar).Value = paisAlterado.Sigla;
                    putCmd.Parameters.Add("@ddi", SqlDbType.VarChar).Value = paisAlterado.Ddi;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = paisAlterado.Ativo;
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

        public string DeletePais(int pais_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM paises WHERE pais_ID = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = pais_ID;

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
