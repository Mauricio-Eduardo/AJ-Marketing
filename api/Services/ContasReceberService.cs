using api.Interfaces;
using api.Models.ContaReceber;
using api.Models.Parcelas;
using api.Models.Proposta;
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
            List<ContaReceberModel> listaContas = new List<ContaReceberModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT c.id, c.cliente_id, cl.cpf_cnpj, cl.nome_razaoSocial, c.contrato_id, cp.condicaoPagamento, " +
                    "c.parcela_id, p.numeroParcela, cp.quantidadeParcelas, c.data_vencimento, c.valor_inicial, c.desconto, c.juros, c.multa, " +
                    "c.total, c.valor_pago, c.valor_aberto, c.data_recebimento, c.situacao " +
                    "FROM contasReceber c " +
                    "INNER JOIN clientes cl ON c.cliente_id = cl.id " +
                    "INNER JOIN contratos co ON c.contrato_id = co.id " +
                    "INNER JOIN parcelas p ON c.parcela_id = p.id " +
                    "INNER JOIN condicoesPagamento cp ON p.condPag_id = cp.id"), Connection);

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
                                Data_vencimento = reader.GetDateTime("data_vencimento"),
                                Valor_inicial = reader.GetDecimal("valor_inicial"),
                                Juros = reader.IsDBNull(reader.GetOrdinal("juros"))
                                    ? (decimal?)null
                                    : reader.GetDecimal(reader.GetOrdinal("juros")),
                                Multa = reader.IsDBNull(reader.GetOrdinal("multa"))
                                    ? (decimal?)null
                                    : reader.GetDecimal(reader.GetOrdinal("multa")),
                                Desconto = reader.IsDBNull(reader.GetOrdinal("desconto"))
                                    ? (decimal?)null
                                    : reader.GetDecimal(reader.GetOrdinal("desconto")),
                                Total = reader.GetDecimal("total"),
                                Valor_pago = reader.IsDBNull(reader.GetOrdinal("valor_pago"))
                                    ? (decimal?)null
                                    : reader.GetDecimal(reader.GetOrdinal("valor_pago")),
                                Valor_aberto = reader.IsDBNull(reader.GetOrdinal("valor_aberto"))
                                    ? (decimal?)null
                                    : reader.GetDecimal(reader.GetOrdinal("valor_aberto")),
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
                    "c.parcela_id, p.numeroParcela, cp.quantidadeParcelas, c.data_vencimento, c.valor_inicial, c.desconto, c.juros, c.multa, " +
                    "c.total, c.valor_pago, c.valor_aberto, c.data_recebimento, c.situacao " +
                    "FROM contasReceber c " +
                    "INNER JOIN clientes cl ON c.cliente_id = cl.id " +
                    "INNER JOIN contratos co ON c.contrato_id = co.id " +
                    "INNER JOIN parcelas p ON c.parcela_id = p.id " +
                    "INNER JOIN condicoesPagamento cp ON p.condPag_id = cp.id " +
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
                            Data_vencimento = reader.GetDateTime("data_vencimento"),
                            Valor_inicial = reader.GetDecimal("valor_inicial"),
                            Juros = reader.IsDBNull(reader.GetOrdinal("juros"))
                                ? (decimal?)null
                                : reader.GetDecimal(reader.GetOrdinal("juros")),
                            Multa = reader.IsDBNull(reader.GetOrdinal("multa"))
                                ? (decimal?)null
                                : reader.GetDecimal(reader.GetOrdinal("multa")),
                            Desconto = reader.IsDBNull(reader.GetOrdinal("desconto"))
                                ? (decimal?)null
                                : reader.GetDecimal(reader.GetOrdinal("desconto")),
                            Total = reader.GetDecimal("total"),
                            Valor_pago = reader.IsDBNull(reader.GetOrdinal("valor_pago"))
                                    ? (decimal?)null
                                    : reader.GetDecimal(reader.GetOrdinal("valor_pago")),
                            Valor_aberto = reader.IsDBNull(reader.GetOrdinal("valor_aberto"))
                                    ? (decimal?)null
                                    : reader.GetDecimal(reader.GetOrdinal("valor_aberto")),
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

        //public string PostContaReceber(ContaReceberPostModel contaInserida)
        //{
        //    using (Connection)
        //    {
        //        try
        //        {
        //            Connection.Open();

        //            string query = @"
        //                INSERT INTO contasReceber 
        //                (cliente_id, contrato_id, parcela_id, data_vencimento, valor_inicial, desconto, total)
        //                VALUES (@cliente_id, @contrato_id, @parcela_id, @data_vencimento, @valor_inicial, @desconto, @total);";

        //            SqlCommand postCmd = new SqlCommand(query, Connection);
        //            postCmd.Parameters.AddWithValue("@cliente_id", contaInserida.Cliente_id);
        //            postCmd.Parameters.AddWithValue("@contrato_id", contaInserida.Contrato_id);
        //            postCmd.Parameters.AddWithValue("@parcela_id", contaInserida.Parcela_id);
        //            postCmd.Parameters.AddWithValue("@dias", parcela.Dias);
        //            postCmd.Parameters.AddWithValue("@data_vencimento", proposta.Data_inicio.AddDays(parcela.Dias));


        //            decimal valorInicial = proposta.Total * (parcela.Porcentagem / 100);
        //            //decimal juros = valorInicial * (jurosPercent / 100);
        //            //decimal multa = valorInicial * (multaPercent / 100);
        //            decimal desconto = valorInicial * (condicao.Desconto / 100);

        //            decimal valor_total = valorInicial - desconto;

        //            postCmd.Parameters.AddWithValue("@valor_inicial", valorInicial);
        //            postCmd.Parameters.AddWithValue("@desconto", desconto);
        //            postCmd.Parameters.AddWithValue("@total", valor_total);

        //            postCmd.ExecuteNonQuery();
        //            return "Inserido com Sucesso!";

        //        }
        //        catch (SqlException ex)
        //        {
        //            throw new Exception(ex.Message);
        //        }
        //        finally
        //        {
        //            Connection.Close();
        //        }
        //    }
        //}

        public string PutContaReceber(ContaReceberPutModel contaAlterada)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(
                    "UPDATE contasReceber SET juros = @juros, multa = @multa, desconto = @desconto, data_vencimento = @data_vencimento, " +
                    "valor_pago = @valor_pago, valor_aberto = @valor_aberto, data_recebimento = @data_recebimento, situacao = @situacao " +
                    "WHERE id = @id;", Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = contaAlterada.Id;
                    putCmd.Parameters.Add("@juros", SqlDbType.Decimal).Value = contaAlterada.Juros;
                    putCmd.Parameters.Add("@multa", SqlDbType.Decimal).Value = contaAlterada.Multa;
                    putCmd.Parameters.Add("@desconto", SqlDbType.Decimal).Value = contaAlterada.Desconto;
                    putCmd.Parameters.Add("@valor_pago", SqlDbType.Decimal).Value = contaAlterada.Valor_pago;
                    putCmd.Parameters.Add("@valor_aberto", SqlDbType.Decimal).Value = contaAlterada.Valor_aberto;
                    putCmd.Parameters.Add("@data_vencimento", SqlDbType.DateTime).Value = contaAlterada.Data_vencimento;
                    putCmd.Parameters.Add("@data_recebimento", SqlDbType.DateTime).Value = contaAlterada.Data_recebimento;
                    putCmd.Parameters.Add("@situacao", SqlDbType.VarChar).Value = contaAlterada.Situacao;

                    putCmd.ExecuteNonQuery();
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

        //public string DeleteCidade(int id)
        //{
        //    using (Connection)
        //    {
        //        try
        //        {
        //            Connection.Open();

        //            SqlCommand deleteCmd = new SqlCommand(String.Format(
        //            "DELETE FROM cidades WHERE id = @id"), Connection);

        //            deleteCmd.Parameters.Clear();
        //            deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

        //            deleteCmd.ExecuteNonQuery();
        //            return "Deletado com Sucesso!";

        //        }
        //        catch (SqlException ex)
        //        {
        //            throw new Exception(ex.Message);
        //        }
        //        finally
        //        {
        //            Connection.Close();
        //        }
        //    }
        //}
    }
}
