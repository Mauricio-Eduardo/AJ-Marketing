using api.Interfaces;
using api.Models.FormaPagamento;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class FormaPagamentoService: IFormaPagamentoService
    {
        private readonly SqlConnection Connection;

        public FormaPagamentoService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<FormaPagamentoModel> GetAllFormasPagamento()
        {
            List<FormaPagamentoModel> listaFormaPagamentos = new List<FormaPagamentoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT * FROM formasPagamento"), Connection);

                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaFormaPagamentos.Add(
                            new FormaPagamentoModel
                            {
                                Id = reader.GetInt32("id"),
                                FormaPagamento = reader.GetString("formaPagamento"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
                            }
                        );
                    }
                    return listaFormaPagamentos;

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

        public FormaPagamentoModel GetFormaPagamento(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT * FROM formasPagamento WHERE id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new FormaPagamentoModel
                        {
                            Id = reader.GetInt32("id"),
                            FormaPagamento = reader.GetString("formaPagamento"),
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

        public string PostFormaPagamento(FormaPagamentoPostModel formaPagInserida)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand postCmd = new SqlCommand(String.Format(
                    "INSERT INTO formasPagamento (formaPagamento) " +
                    "VALUES (@formaPagamento)"), Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@formaPagamento", SqlDbType.VarChar).Value = formaPagInserida.FormaPagamento;

                    postCmd.ExecuteNonQuery();
                    return "Forma de Pagamento inserida com Sucesso!";

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

        public string PutFormaPagamento(FormaPagamentoPutModel formaPagAlterada)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(String.Format(
                    "UPDATE formasPagamento SET formaPagamento = @formaPagamento, ativo = @ativo, data_ult_alt = @data_ult_alt " +
                    "WHERE id = @id"), Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = formaPagAlterada.Id;
                    putCmd.Parameters.Add("@formaPagamento", SqlDbType.VarChar).Value = formaPagAlterada.FormaPagamento;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = formaPagAlterada.Ativo;
                    putCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

                    putCmd.ExecuteNonQuery();
                    return "Forma de Pagamento alterada com Sucesso!";

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

        public string DeleteFormaPagamento(int origem_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM formasPagamento WHERE id = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = origem_ID;

                    deleteCmd.ExecuteNonQuery();
                    return "Forma de Pagamento deletada com Sucesso!";

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
