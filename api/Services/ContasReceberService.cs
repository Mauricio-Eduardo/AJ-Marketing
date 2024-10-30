using api.Interfaces;
using api.Models.ContaReceber;
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
                    "c.parcela_id, p.numeroParcela, cp.quantidadeParcelas, p.formaPag_id, f.formaPagamento, c.total, " +
                    "c.data_vencimento, cp.juros, c.jurosRecebido, cp.multa, c.multaRecebida, cp.desconto, c.descontoConcedido, " +
                    "c.totalRecebido, c.data_recebimento, c.situacao " +

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
                                Data_vencimento = reader.GetDateTime("data_vencimento"),
                                PercentJuros = reader.GetDecimal("juros"),
                                JurosRecebido = reader.GetDecimal("jurosRecebido"),
                                PercentMulta = reader.GetDecimal("multa"),
                                MultaRecebida = reader.GetDecimal("multaRecebida"),
                                PercentDesconto = reader.GetDecimal("desconto"),
                                DescontoConcedido = reader.GetDecimal("descontoConcedido"),
                                TotalRecebido = reader.GetDecimal("totalRecebido"),
                                Data_recebimento = reader.IsDBNull(reader.GetOrdinal("data_recebimento"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_recebimento")),
                                Situacao = reader.GetString("situacao")
                            }
                        );
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
                    "c.parcela_id, p.numeroParcela, cp.quantidadeParcelas, p.formaPag_id, f.formaPagamento, c.total, " +
                    "c.data_vencimento, cp.juros, c.jurosRecebido, cp.multa, c.multaRecebida, cp.desconto, c.descontoConcedido, " +
                    "c.totalRecebido, c.data_recebimento, c.situacao " +

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
                            Data_vencimento = reader.GetDateTime("data_vencimento"),
                            PercentJuros = reader.GetDecimal("juros"),
                            JurosRecebido = reader.GetDecimal("jurosRecebido"),
                            PercentMulta = reader.GetDecimal("multa"),
                            MultaRecebida = reader.GetDecimal("multaRecebida"),
                            PercentDesconto = reader.GetDecimal("desconto"),
                            DescontoConcedido = reader.GetDecimal("descontoConcedido"),
                            TotalRecebido = reader.GetDecimal("totalRecebido"),
                            Data_recebimento = reader.IsDBNull(reader.GetOrdinal("data_recebimento"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_recebimento")),
                            Situacao = reader.GetString("situacao")
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

        public string ReceberConta([FromBody] ContaReceberPutModel contaRecebida)
        {
            using (Connection)
            {

                try
                {
                    Connection.Open();

                    string query = @"
                        UPDATE contasReceber
                        SET data_vencimento = @data_vencimento, jurosRecebido = @jurosRecebido, multaRecebida = @multaRecebida, 
                        descontoConcedido = @descontoConcedido, totalRecebido = @totalRecebido, data_recebimento = @data_recebimento, 
                        situacao = @situacao
                        WHERE id = @id;";

                    SqlCommand postCmd = new SqlCommand(query, Connection);
                    postCmd.Parameters.AddWithValue("@id", contaRecebida.Id);
                    postCmd.Parameters.AddWithValue("@data_vencimento", contaRecebida.Data_recebimento);
                    postCmd.Parameters.AddWithValue("@jurosRecebido", contaRecebida.JurosRecebido);
                    postCmd.Parameters.AddWithValue("@multaRecebida", contaRecebida.MultaRecebida);
                    postCmd.Parameters.AddWithValue("@descontoConcedido", contaRecebida.DescontoConcedido);
                    postCmd.Parameters.AddWithValue("@totalRecebido", contaRecebida.TotalRecebido);
                    postCmd.Parameters.AddWithValue("@data_recebimento", contaRecebida.Data_recebimento);
                    postCmd.Parameters.AddWithValue("@situacao", "Recebida");

                    postCmd.ExecuteNonQuery();

                    return "Recebida com Sucesso!";
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

        public string ReabrirConta(int id)
        {
            using (Connection)
            {

                try
                {
                    Connection.Open();

                    string query = @"
                        UPDATE contasReceber
                        SET jurosRecebido = @jurosRecebido, multaRecebida = @multaRecebida, descontoConcedido = @descontoConcedido, 
                        totalRecebido = @totalRecebido, data_recebimento = @data_recebimento, 
                        situacao = @situacao
                        WHERE id = @id;";

                    SqlCommand postCmd = new SqlCommand(query, Connection);
                    postCmd.Parameters.AddWithValue("@id", id);
                    postCmd.Parameters.AddWithValue("@jurosRecebido", 0);
                    postCmd.Parameters.AddWithValue("@multaRecebida", 0);
                    postCmd.Parameters.AddWithValue("@descontoConcedido", 0);
                    postCmd.Parameters.AddWithValue("@totalRecebido", 0);
                    postCmd.Parameters.AddWithValue("@data_recebimento", DBNull.Value);
                    postCmd.Parameters.AddWithValue("@situacao", "Pendente");

                    postCmd.ExecuteNonQuery();

                    return "Conta reaberta com Sucesso!";
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
