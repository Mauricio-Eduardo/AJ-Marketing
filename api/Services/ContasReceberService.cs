using api.Interfaces;
using api.Models.ContaReceber;
using api.Models.Recebimentos;
using Microsoft.AspNetCore.Mvc;
using System.Data;  
using System.Data.SqlClient;

namespace api.Services
{
    public class ContasReceberService: IContasReceberService
    {
        private readonly SqlConnection Connection;

        public ContasReceberService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<ContaReceberModel> GetAllContasReceber() 
        {
            SqlTransaction transaction = null;

            List<ContaReceberModel> listaContas = new List<ContaReceberModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT c.id, c.cliente_id, cl.cpf_cnpj, cl.nome_razaoSocial, c.contrato_id, cp.condicaoPagamento, " +
                    "c.parcela_id, p.numeroParcela, cp.quantidadeParcelas, p.formaPag_id, f.formaPagamento, c.total, cp.juros, " +
                    "cp.multa, cp.desconto, c.data_vencimento, c.situacao " +
                    "FROM contasReceber c " +
                    "INNER JOIN clientes cl ON c.cliente_id = cl.id " +
                    "INNER JOIN contratos co ON c.contrato_id = co.id " +
                    "INNER JOIN parcelas p ON c.parcela_id = p.id " +
                    "INNER JOIN formasPagamento f on p.formaPag_id = f.id " +
                    "INNER JOIN condicoesPagamento cp ON p.condPag_id = cp.id " +
                    "ORDER BY c.data_vencimento ASC"), Connection);

                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaContas.Add(
                            new ContaReceberModel
                            {
                                Id = reader.GetInt32("id"),
                                Cliente_id = reader.GetInt32("cliente_id"),
                                Contrato_id = reader.GetInt32("contrato_id"),
                                Parcela_id = reader.GetInt32("parcela_id"),
                                Cpf_cnpj = reader.GetString("cpf_cnpj"),
                                Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                                NumeroParcela = reader.GetInt32("numeroParcela"),
                                QuantidadeParcelas = reader.GetInt32("quantidadeParcelas"),
                                FormaPag_id = reader.GetInt32("formaPag_id"),
                                FormaPagamento = reader.GetString("formaPagamento"),
                                Total = reader.GetDecimal("total"),
                                Juros = reader.GetDecimal("juros"),
                                Multa = reader.GetDecimal("multa"),
                                Desconto = reader.GetDecimal("desconto"),
                                Data_vencimento = reader.GetDateTime("data_vencimento"),
                                Situacao = reader.GetString("situacao")
                            }
                        );
                    }

                    foreach (var conta in listaContas)
                    {
                        conta.Recebimentos = GetRecebimentosFromContaReceber(Connection, conta.Id);
                    }

                    return listaContas;

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

        public ContaReceberModel GetContaReceber(int id)
        {
             using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT c.id, c.cliente_id, cl.cpf_cnpj, cl.nome_razaoSocial, c.contrato_id, cp.condicaoPagamento, " +
                    "c.parcela_id, p.numeroParcela, cp.quantidadeParcelas, p.formaPag_id, f.formaPagamento, c.total, cp.juros, cp.multa, cp.desconto, " +
                    "c.data_vencimento, c.situacao " +
                    "FROM contasReceber c " +
                    "INNER JOIN clientes cl ON c.cliente_id = cl.id " +
                    "INNER JOIN contratos co ON c.contrato_id = co.id " +
                    "INNER JOIN parcelas p ON c.parcela_id = p.id " +
                    "INNER JOIN condicoesPagamento cp ON p.condPag_id = cp.id " +
                    "INNER JOIN formasPagamento f on p.formaPag_id = f.id " +
                    "WHERE c.id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                    SqlDataReader reader = getCmd.ExecuteReader();

                    List<RecebimentosModel> recebimentos = GetRecebimentosFromContaReceber(Connection, id);

                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new ContaReceberModel
                        {
                            Id = reader.GetInt32("id"),
                            Cliente_id = reader.GetInt32("cliente_id"),
                            Contrato_id = reader.GetInt32("contrato_id"),
                            Parcela_id = reader.GetInt32("parcela_id"),
                            Cpf_cnpj = reader.GetString("cpf_cnpj"),
                            Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                            NumeroParcela = reader.GetInt32("numeroParcela"),
                            QuantidadeParcelas = reader.GetInt32("quantidadeParcelas"),
                            FormaPag_id = reader.GetInt32("formaPag_id"),
                            FormaPagamento = reader.GetString("formaPagamento"),
                            Total = reader.GetDecimal("total"),
                            Juros = reader.GetDecimal("juros"),
                            Multa = reader.GetDecimal("multa"),
                            Desconto = reader.GetDecimal("desconto"),
                            Data_vencimento = reader.GetDateTime("data_vencimento"),
                            Situacao = reader.GetString("situacao"),
                            Recebimentos = recebimentos
                        };
                    }
                    else
                    {
                        return null;
                    }
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

        private List<RecebimentosModel> GetRecebimentosFromContaReceber(SqlConnection connection, int id)
        {
            try
            {
                List<RecebimentosModel> listaRecebimentos = new List<RecebimentosModel>();

                string queryParcelas = @"
                SELECT r.id, r.formaPag_id, f.formaPagamento, r.recebido, r.juros, r.multa, r.desconto, r.total, 
                r.data_recebimento
                FROM recebimentos r
                INNER JOIN formasPagamento f ON r.formaPag_id = f.id
                WHERE r.contaReceber_id = @id";

                using (SqlCommand getAllParcelas = new SqlCommand(queryParcelas, connection))
                {
                    getAllParcelas.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    using (SqlDataReader ParcelaReader = getAllParcelas.ExecuteReader()) 
                    {
                        while (ParcelaReader.Read())
                        {
                            listaRecebimentos.Add(
                                new RecebimentosModel
                                {
                                    Id = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("id")),
                                    FormaPag_id = ParcelaReader.GetInt32(ParcelaReader.GetOrdinal("formaPag_id")),
                                    FormaPagamento = ParcelaReader.GetString(ParcelaReader.GetOrdinal("formaPagamento")),
                                    Recebido = ParcelaReader.GetDecimal(ParcelaReader.GetOrdinal("recebido")),
                                    Juros = ParcelaReader.GetDecimal(ParcelaReader.GetOrdinal("juros")),
                                    Multa = ParcelaReader.GetDecimal(ParcelaReader.GetOrdinal("multa")),
                                    Desconto = ParcelaReader.GetDecimal(ParcelaReader.GetOrdinal("desconto")),
                                    Total = ParcelaReader.GetDecimal(ParcelaReader.GetOrdinal("total")),
                                    Data_recebimento = ParcelaReader.GetDateTime(ParcelaReader.GetOrdinal("data_recebimento")),
                                });
                        }
                    }

                    return listaRecebimentos;
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string ReceberConta([FromBody] RecebimentosPostModel recebimento)
        {
            using (Connection)
            {
                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    string query = @"
                        INSERT INTO recebimentos 
                        (contaReceber_id, formaPag_id, recebido, juros, multa, desconto, total, data_recebimento)
                        VALUES (@contaReceber_id, @formaPag_id, @recebido, @juros, @multa, @desconto, @total, @data_recebimento);";

                    SqlCommand postCmd = new SqlCommand(query, Connection, transaction);
                    postCmd.Parameters.AddWithValue("@contaReceber_id", recebimento.ContaReceber_id);
                    postCmd.Parameters.AddWithValue("@formaPag_id", recebimento.FormaPag_id);
                    postCmd.Parameters.AddWithValue("@recebido", recebimento.Recebido);
                    postCmd.Parameters.AddWithValue("@juros", recebimento.Juros);
                    postCmd.Parameters.AddWithValue("@multa", recebimento.Multa);
                    postCmd.Parameters.AddWithValue("@desconto", recebimento.Desconto);
                    postCmd.Parameters.AddWithValue("@total", recebimento.Total);
                    postCmd.Parameters.AddWithValue("@data_recebimento", recebimento.Data_recebimento);

                    postCmd.ExecuteNonQuery();

                    // Atualizar a situação da conta a receber com base nos recebimentos anteriores
                    string situacao = "";
                    if (recebimento.Receber > 0 )
                    {
                        situacao = "Parcial";
                    } else if (recebimento.Receber == 0)
                    {
                        situacao = "Recebida";
                    }

                    query = @"
                        UPDATE contasReceber SET situacao = @situacao
                        WHERE id = @id";
                    SqlCommand updateCmd = new SqlCommand(query, Connection, transaction);
                    updateCmd.Parameters.AddWithValue("@id", recebimento.ContaReceber_id);
                    updateCmd.Parameters.AddWithValue("@situacao", situacao);

                    updateCmd.ExecuteNonQuery();

                    transaction.Commit();
                    return "Recebido com Sucesso!";
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
