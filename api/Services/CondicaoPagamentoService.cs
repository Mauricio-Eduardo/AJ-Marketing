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
                                Id = reader.GetInt32("id"),
                                CondicaoPagamento = reader.GetString("condicaoPagamento"),
                                QuantidadeParcelas = reader.GetInt32("quantidadeParcelas"),
                                Desconto = reader.GetDecimal("desconto"),
                                Juros = reader.GetDecimal("juros"),
                                Multa = reader.GetDecimal("multa"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
                            });
                        }
                    }

                    foreach (var condicaoPagamento in listaCondicaoPagamentos)
                    {
                        condicaoPagamento.Parcelas = GetParcelasFromCondicaoPagamento(Connection, condicaoPagamento.Id);
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
                                Id = reader.GetInt32("id"),
                                CondicaoPagamento = reader.GetString("condicaoPagamento"),
                                QuantidadeParcelas = reader.GetInt32("quantidadeParcelas"),
                                Desconto = reader.GetDecimal("desconto"),
                                Juros = reader.GetDecimal("juros"),
                                Multa = reader.GetDecimal("multa"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
                            });
                        }
                    }

                    foreach (var condicaoPagamento in listaCondicaoPagamentos)
                    {
                        condicaoPagamento.Parcelas = GetParcelasFromCondicaoPagamento(Connection, condicaoPagamento.Id);
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

        public CondicaoPagamentoModel GetCondicaoPagamento(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT * FROM condicoesPagamento WHERE id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    List<ParcelasModel> parcelas = GetParcelasFromCondicaoPagamento(Connection, id);

                    SqlDataReader reader = getCmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new CondicaoPagamentoModel
                        {
                            Id = reader.GetInt32("id"),
                            CondicaoPagamento = reader.GetString("condicaoPagamento"),
                            QuantidadeParcelas = reader.GetInt32("quantidadeParcelas"),
                            Desconto = reader.GetDecimal("desconto"),
                            Juros = reader.GetDecimal("juros"),
                            Multa = reader.GetDecimal("multa"),
                            Parcelas = parcelas,
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

        private List<ParcelasModel> GetParcelasFromCondicaoPagamento(SqlConnection connection, int id)
        {
            List<ParcelasModel> listaParcelas = new List<ParcelasModel>();

            string queryParcelas = @"
            SELECT p.id, p.numeroParcela, p.dias, p.porcentagem, 
                   p.condPag_id, p.formaPag_id, f.formaPagamento
            FROM parcelas p
            INNER JOIN formasPagamento f ON p.formaPag_id = f.id
            WHERE p.condPag_id = @condPag_id";

            using (SqlCommand getAllParcelas = new SqlCommand(queryParcelas, connection))
            {
                getAllParcelas.Parameters.Add("@condPag_id", SqlDbType.Int).Value = id;

                using (SqlDataReader ParcelaReader = getAllParcelas.ExecuteReader())
                {
                    while (ParcelaReader.Read())
                    {
                        listaParcelas.Add(
                            new ParcelasModel
                            {
                                Id = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("id")),
                                NumeroParcela = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("numeroParcela")),
                                Dias = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("dias")),
                                Porcentagem = ParcelaReader.GetDecimal(ParcelaReader.GetOrdinal("porcentagem")),
                                CondPag_id = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("condPag_id")),
                                FormaPag_id = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("formaPag_id")),
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
                    INSERT INTO condicoesPagamento (condicaoPagamento, quantidadeParcelas, desconto, juros, multa)
                    VALUES (@condicaoPagamento, @quantidadeParcelas, @desconto, @juros, @multa);
                    SELECT SCOPE_IDENTITY();";

                    SqlCommand postCmd = new SqlCommand(postQuery, Connection, transaction);
                    postCmd.Parameters.AddWithValue("@condicaoPagamento", condicaoPagInserida.CondicaoPagamento);
                    postCmd.Parameters.AddWithValue("@quantidadeParcelas", condicaoPagInserida.QuantidadeParcelas);
                    postCmd.Parameters.AddWithValue("@desconto", condicaoPagInserida.Desconto);
                    postCmd.Parameters.AddWithValue("@juros", condicaoPagInserida.Juros);
                    postCmd.Parameters.AddWithValue("@multa", condicaoPagInserida.Multa);
           
                    int condPagID = Convert.ToInt32(postCmd.ExecuteScalar());

                    // Inserir as parcelas
                    foreach (var parcela in condicaoPagInserida.Parcelas)
                    {
                        string postParcelaQuery = @"
                        INSERT INTO parcelas (numeroParcela, dias, porcentagem, condPag_id, formaPag_id)
                        VALUES (@numeroParcela, @dias, @porcentagem, @condPag_id, @formaPag_id)";

                        SqlCommand insertParcelaCmd = new SqlCommand(postParcelaQuery, Connection, transaction);
                        insertParcelaCmd.Parameters.AddWithValue("@numeroParcela", parcela.NumeroParcela);
                        insertParcelaCmd.Parameters.AddWithValue("@dias", parcela.Dias);
                        insertParcelaCmd.Parameters.AddWithValue("@porcentagem", parcela.Porcentagem);
                        insertParcelaCmd.Parameters.AddWithValue("@condPag_id", condPagID);
                        insertParcelaCmd.Parameters.AddWithValue("@formaPag_id", parcela.FormaPag_id);

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
                    SET condicaoPagamento = @condicaoPagamento, quantidadeParcelas = @quantidadeParcelas, 
                    desconto = @desconto, juros = @juros, multa = @multa, ativo = @ativo, data_ult_alt = @data_ult_alt 
                    WHERE id = @id";

                    SqlCommand putCmd = new SqlCommand(putQuery, Connection, transaction);
                    putCmd.Parameters.AddWithValue("@id", condicaoPagAlterada.Id);
                    putCmd.Parameters.AddWithValue("@condicaoPagamento", condicaoPagAlterada.CondicaoPagamento);
                    putCmd.Parameters.AddWithValue("@quantidadeParcelas", condicaoPagAlterada.QuantidadeParcelas);
                    putCmd.Parameters.AddWithValue("@desconto", condicaoPagAlterada.Desconto);
                    putCmd.Parameters.AddWithValue("@juros", condicaoPagAlterada.Juros);
                    putCmd.Parameters.AddWithValue("@multa", condicaoPagAlterada.Multa);
                    putCmd.Parameters.AddWithValue("@ativo", condicaoPagAlterada.Ativo);
                    putCmd.Parameters.AddWithValue("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();
                    
                    putCmd.ExecuteNonQuery();

                    // Deletar as parcelas existentes
                    string deleteParcelasQuery = "DELETE FROM parcelas WHERE condPag_id = @id";
                    SqlCommand deleteParcelasCmd = new SqlCommand(deleteParcelasQuery, Connection, transaction);
                    deleteParcelasCmd.Parameters.AddWithValue("@id", condicaoPagAlterada.Id);

                    deleteParcelasCmd.ExecuteNonQuery();

                    // Inserir as novas parcelas
                    foreach (var parcela in condicaoPagAlterada.Parcelas)
                    {
                        string insertParcelaQuery = @"
                        INSERT INTO parcelas (numeroParcela, dias, porcentagem, condPag_id, formaPag_id)
                        VALUES (@numeroParcela, @dias, @porcentagem, @condPag_id, @formaPag_id)";

                        SqlCommand insertParcelaCmd = new SqlCommand(insertParcelaQuery, Connection, transaction);
                        insertParcelaCmd.Parameters.AddWithValue("@numeroParcela", parcela.NumeroParcela);
                        insertParcelaCmd.Parameters.AddWithValue("@dias", parcela.Dias);
                        insertParcelaCmd.Parameters.AddWithValue("@porcentagem", parcela.Porcentagem);
                        insertParcelaCmd.Parameters.AddWithValue("@condPag_id", condicaoPagAlterada.Id);
                        insertParcelaCmd.Parameters.AddWithValue("@formaPag_id", parcela.FormaPag_id);

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

        public string DeleteCondicaoPagamento(int id)
        {
            using (Connection)
            {
                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    // Deletar as parcelas
                    string deleteParcelasQuery = "DELETE FROM parcelas WHERE condPag_id = @id";
                    SqlCommand deleteParcelasCmd = new SqlCommand(deleteParcelasQuery, Connection, transaction);
                    deleteParcelasCmd.Parameters.AddWithValue("@id", id);

                    deleteParcelasCmd.ExecuteNonQuery();

                    // Deletar a condição de pagamento
                    string deleteCondicaoPagamentoQuery = "DELETE FROM condicoesPagamento WHERE id = @id";
                    SqlCommand deleteCondicaoPagamentoCmd = new SqlCommand(deleteCondicaoPagamentoQuery, Connection, transaction);
                    deleteCondicaoPagamentoCmd.Parameters.AddWithValue("@id", id);

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
