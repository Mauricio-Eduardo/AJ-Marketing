using api.Interfaces;
using api.Models.CondicaoPagamento;
using api.Models.Parcelas;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class CondicaoPagamentoService: ICondicaoPagamentoService
    {
        private readonly SqlConnection Connection;

        public CondicaoPagamentoService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<CondicaoPagamentoModel> GetAllCondicoesPagamentoAtivas()
        {
            List<CondicaoPagamentoModel> listaCondicaoPagamentos = new List<CondicaoPagamentoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT * FROM condicoesPagamento WHERE ativo = @ativo"), Connection);

                    getAllCmd.Parameters.Clear();
                    getAllCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = 1;


                    using (SqlDataReader reader = getAllCmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            listaCondicaoPagamentos.Add(
                            new CondicaoPagamentoModel
                            {
                                CondPag_ID = reader.GetInt32("condPag_ID"),
                                CondicaoPagamento = reader.GetString("condicaoPagamento"),
                                Desconto = reader.GetDecimal("desconto"),
                                Juros = reader.GetDecimal("juros"),
                                Multa = reader.GetDecimal("multa"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
                            });
                        }
                    }

                    foreach (var condicaoPagamento in listaCondicaoPagamentos)
                    {
                        condicaoPagamento.Parcelas = GetParcelasFromCondicaoPagamento(Connection, condicaoPagamento.CondPag_ID);
                    }

                    return listaCondicaoPagamentos;

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

        public IEnumerable<CondicaoPagamentoModel> GetAllCondicoesPagamento() 
        {
            List<CondicaoPagamentoModel> listaCondicaoPagamentos = new List<CondicaoPagamentoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT * FROM condicoesPagamento"), Connection);

                    using (SqlDataReader reader = getAllCmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            listaCondicaoPagamentos.Add(
                            new CondicaoPagamentoModel
                            {
                                CondPag_ID = reader.GetInt32("condPag_ID"),
                                CondicaoPagamento = reader.GetString("condicaoPagamento"),
                                Desconto = reader.GetDecimal("desconto"),
                                Juros = reader.GetDecimal("juros"),
                                Multa = reader.GetDecimal("multa"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
                            });
                        }
                    }

                    foreach (var condicaoPagamento in listaCondicaoPagamentos)
                    {
                        condicaoPagamento.Parcelas = GetParcelasFromCondicaoPagamento(Connection, condicaoPagamento.CondPag_ID);
                    }

                    return listaCondicaoPagamentos;

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

        public CondicaoPagamentoModel GetCondicaoPagamento(int condPag_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT * FROM condicoesPagamento WHERE condPag_ID = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = condPag_ID;

                    List<ParcelasModel> parcelas = GetParcelasFromCondicaoPagamento(Connection, condPag_ID);

                    SqlDataReader reader = getCmd.ExecuteReader();
                    
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new CondicaoPagamentoModel
                        {
                            CondPag_ID = reader.GetInt32("condPag_ID"),
                            CondicaoPagamento = reader.GetString("condicaoPagamento"),
                            Desconto = reader.GetDecimal("desconto"),
                            Juros = reader.GetDecimal("juros"),
                            Multa = reader.GetDecimal("multa"),
                            Parcelas = parcelas,
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

        private List<ParcelasModel> GetParcelasFromCondicaoPagamento(SqlConnection connection, int condPag_ID)
        {
            List<ParcelasModel> listaParcelas = new List<ParcelasModel>();

            string queryParcelas = @"
            SELECT p.parcela_ID, p.numeroParcela, p.dias, p.porcentagem, 
                   p.condPag_ID, p.formaPag_ID, f.formaPagamento
            FROM parcelas p
            INNER JOIN formasPagamento f ON p.formaPag_ID = f.formaPag_ID
            WHERE p.condPag_ID = @condPag_ID";

            using (SqlCommand getAllParcelas = new SqlCommand(queryParcelas, connection))
            {
                getAllParcelas.Parameters.Add("@condPag_ID", SqlDbType.Int).Value = condPag_ID;

                using (SqlDataReader ParcelaReader = getAllParcelas.ExecuteReader())
                {
                    while (ParcelaReader.Read())
                    {
                        listaParcelas.Add(
                            new ParcelasModel
                            {
                                Parcela_ID = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("parcela_ID")),
                                NumeroParcela = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("numeroParcela")),
                                Dias = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("dias")),
                                Porcentagem = ParcelaReader.GetDecimal(ParcelaReader.GetOrdinal("porcentagem")),
                                CondPag_ID = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("condPag_ID")),
                                FormaPag_ID = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("formaPag_ID")),
                                FormaPagamento = ParcelaReader.GetString(ParcelaReader.GetOrdinal("formaPagamento")),
                            });
                    }
                }
            }

            return listaParcelas;
        }

        public string PostCondicaoPagamento(CondicaoPagamentoPostModel condicaoPagInserida)
        {
            using (Connection)
            {
                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    // Inserir a condição de pagamento
                    string postQuery = @"
                    INSERT INTO condicoesPagamento (condicaoPagamento, desconto, juros, multa)
                    VALUES (@condicaoPagamento, @desconto, @juros, @multa);
                    SELECT SCOPE_IDENTITY();";

                    SqlCommand postCmd = new SqlCommand(postQuery, Connection, transaction);
                    postCmd.Parameters.AddWithValue("@condicaoPagamento", condicaoPagInserida.CondicaoPagamento);
                    postCmd.Parameters.AddWithValue("@desconto", condicaoPagInserida.Desconto);
                    postCmd.Parameters.AddWithValue("@juros", condicaoPagInserida.Juros);
                    postCmd.Parameters.AddWithValue("@multa", condicaoPagInserida.Multa);
           
                    int condPagID = Convert.ToInt32(postCmd.ExecuteScalar());

                    // Inserir as parcelas
                    foreach (var parcela in condicaoPagInserida.Parcelas)
                    {
                        string postParcelaQuery = @"
                        INSERT INTO parcelas (numeroParcela, dias, porcentagem, condPag_ID, formaPag_ID)
                        VALUES (@numeroParcela, @dias, @porcentagem, @condPag_ID, @formaPag_ID)";

                        SqlCommand insertParcelaCmd = new SqlCommand(postParcelaQuery, Connection, transaction);
                        insertParcelaCmd.Parameters.AddWithValue("@numeroParcela", parcela.NumeroParcela);
                        insertParcelaCmd.Parameters.AddWithValue("@dias", parcela.Dias);
                        insertParcelaCmd.Parameters.AddWithValue("@porcentagem", parcela.Porcentagem);
                        insertParcelaCmd.Parameters.AddWithValue("@condPag_ID", condPagID);
                        insertParcelaCmd.Parameters.AddWithValue("@formaPag_ID", parcela.FormaPag_ID);

                        insertParcelaCmd.ExecuteNonQuery();
                    }

                    transaction.Commit();
                    return "Inserido com Sucesso!";
                }
                catch (SqlException ex)
                {
                    if (transaction != null)
                    {
                        transaction.Rollback();
                    }
                    throw new Exception(ex.Message);
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

        public string PutCondicaoPagamento(CondicaoPagamentoPutModel condicaoPagAlterada)
        {
            using (Connection)
            {
                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    // Atualizar a condição de pagamento
                    string putQuery = @"
                    UPDATE condicoesPagamento
                    SET condicaoPagamento = @condicaoPagamento, desconto = @desconto, juros = @juros, multa = @multa, 
                    ativo = @ativo, data_ult_alt = @data_ult_alt
                    WHERE condPag_ID = @id";

                    SqlCommand putCmd = new SqlCommand(putQuery, Connection, transaction);
                    putCmd.Parameters.AddWithValue("@id", condicaoPagAlterada.CondPag_ID);
                    putCmd.Parameters.AddWithValue("@condicaoPagamento", condicaoPagAlterada.CondicaoPagamento);
                    putCmd.Parameters.AddWithValue("@desconto", condicaoPagAlterada.Desconto);
                    putCmd.Parameters.AddWithValue("@juros", condicaoPagAlterada.Juros);
                    putCmd.Parameters.AddWithValue("@multa", condicaoPagAlterada.Multa);
                    putCmd.Parameters.AddWithValue("@ativo", condicaoPagAlterada.Ativo);
                    putCmd.Parameters.AddWithValue("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

                    putCmd.ExecuteNonQuery();

                    // Deletar as parcelas existentes
                    string deleteParcelasQuery = "DELETE FROM parcelas WHERE condPag_ID = @id";
                    SqlCommand deleteParcelasCmd = new SqlCommand(deleteParcelasQuery, Connection, transaction);
                    deleteParcelasCmd.Parameters.AddWithValue("@id", condicaoPagAlterada.CondPag_ID);

                    deleteParcelasCmd.ExecuteNonQuery();

                    // Inserir as novas parcelas
                    foreach (var parcela in condicaoPagAlterada.Parcelas)
                    {
                        string insertParcelaQuery = @"
                        INSERT INTO parcelas (numeroParcela, dias, porcentagem, condPag_ID, formaPag_ID)
                        VALUES (@numeroParcela, @dias, @porcentagem, @condPag_ID, @formaPag_ID)";

                        SqlCommand insertParcelaCmd = new SqlCommand(insertParcelaQuery, Connection, transaction);
                        insertParcelaCmd.Parameters.AddWithValue("@numeroParcela", parcela.NumeroParcela);
                        insertParcelaCmd.Parameters.AddWithValue("@dias", parcela.Dias);
                        insertParcelaCmd.Parameters.AddWithValue("@porcentagem", parcela.Porcentagem);
                        insertParcelaCmd.Parameters.AddWithValue("@condPag_ID", condicaoPagAlterada.CondPag_ID);
                        insertParcelaCmd.Parameters.AddWithValue("@formaPag_ID", parcela.FormaPag_ID);

                        insertParcelaCmd.ExecuteNonQuery();
                    }

                    transaction.Commit();
                    return "Alterado com sucesso!";
                }
                    catch (SqlException ex)
                    {
                        if (transaction != null)
                        {
                            transaction.Rollback();
                        }
                        throw new Exception(ex.Message);
                    }
                    finally
                    {
                        Connection.Close();
                    }
            }
        }

        public string DeleteCondicaoPagamento(int condPag_ID)
        {
            using (Connection)
            {
                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    // Deletar as parcelas
                    string deleteParcelasQuery = "DELETE FROM parcelas WHERE condPag_ID = @condPag_ID";
                    SqlCommand deleteParcelasCmd = new SqlCommand(deleteParcelasQuery, Connection, transaction);
                    deleteParcelasCmd.Parameters.AddWithValue("@condPag_ID", condPag_ID);

                    deleteParcelasCmd.ExecuteNonQuery();

                    // Deletar a condição de pagamento
                    string deleteCondicaoPagamentoQuery = "DELETE FROM condicoesPagamento WHERE condPag_ID = @condPag_ID";
                    SqlCommand deleteCondicaoPagamentoCmd = new SqlCommand(deleteCondicaoPagamentoQuery, Connection, transaction);
                    deleteCondicaoPagamentoCmd.Parameters.AddWithValue("@condPag_ID", condPag_ID);

                    deleteCondicaoPagamentoCmd.ExecuteNonQuery();

                    transaction.Commit();
                    return "Deletado com sucesso!";
                }
                catch (SqlException ex)
                {
                    if (transaction != null)    
                    {
                        transaction.Rollback();
                    }
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
