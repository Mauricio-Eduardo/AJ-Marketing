using api.Interfaces;
using api.Models.OrdemServico;
using System.Data;
using System.Data.SqlClient;
using System.Xml;

namespace api.Services
{
    public class OrdemServicoService: IOrdensServicoService
    {
        private readonly SqlConnection Connection;

        public OrdemServicoService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<OrdemServicoModel> GetAllOrdensServico() 
        {
            List<OrdemServicoModel> listaOrdens = new List<OrdemServicoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT o.id, o.cliente_id, c.nome_razaoSocial, o.contrato_id, o.usuario_id, u.nome, o.servico_id, s.servico, " +
                    "o.data_prazo, o.data_entrega, o.tema, o.referencia, o.situacao, o.postado " +
                    "FROM ordensServico o " +
                    "INNER JOIN clientes c ON o.cliente_id = c.id " +
                    "INNER JOIN servicos s ON o.servico_id = s.id " +
                    "LEFT JOIN usuarios u ON o.usuario_id = u.id"), Connection);

                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaOrdens.Add(
                            new OrdemServicoModel
                            {
                                Id = reader.GetInt32("id"),
                                Cliente_id = reader.GetInt32("cliente_id"),
                                Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                                Contrato_id = reader.GetInt32("contrato_id"),
                                Usuario_id = reader.IsDBNull(reader.GetOrdinal("usuario_id"))
                                    ? (int?)null
                                    : reader.GetInt32(reader.GetOrdinal("usuario_id")),
                                Nome = reader.IsDBNull(reader.GetOrdinal("nome"))
                                    ? (string?)null
                                    : reader.GetString(reader.GetOrdinal("nome")),
                                Servico_id = reader.GetInt32("servico_id"),
                                Servico = reader.GetString("servico"),
                                Data_prazo = reader.GetDateTime("data_prazo"),
                                Data_entrega = reader.IsDBNull(reader.GetOrdinal("data_entrega"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_entrega")),
                                Tema = reader.GetString("tema"),
                                Referencia = reader.GetString("referencia"),
                                Situacao = reader.GetString("situacao"),
                                Postado = reader.GetString("postado")
                            }
                        );
                    }
                    return listaOrdens;

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

        public OrdemServicoModel GetOrdemServico(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT o.id, o.cliente_id, c.nome_razaoSocial, o.contrato_id, o.usuario_id, u.nome, o.servico_id, s.servico, " +
                    "o.data_prazo, o.data_entrega, o.tema, o.referencia, o.situacao, o.postado " +
                    "FROM ordensServico o " +
                    "INNER JOIN clientes c ON o.cliente_id = c.id " +
                    "INNER JOIN servicos s ON o.servico_id = s.id " +
                    "LEFT JOIN usuarios u ON o.usuario_id = u.id " +
                    "WHERE o.id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                    SqlDataReader reader = getCmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new OrdemServicoModel
                        {
                            Id = reader.GetInt32("id"),
                            Cliente_id = reader.GetInt32("cliente_id"),
                            Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                            Contrato_id = reader.GetInt32("contrato_id"),
                            Usuario_id = reader.IsDBNull(reader.GetOrdinal("usuario_id"))
                                    ? (int?)null
                                    : reader.GetInt32(reader.GetOrdinal("usuario_id")),
                            Nome = reader.IsDBNull(reader.GetOrdinal("nome"))
                                    ? (string?)null
                                    : reader.GetString(reader.GetOrdinal("nome")),
                            Servico_id = reader.GetInt32("servico_id"),
                            Servico = reader.GetString("servico"),
                            Data_prazo = reader.GetDateTime("data_prazo"),
                            Data_entrega = reader.IsDBNull(reader.GetOrdinal("data_entrega"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_entrega")),
                            Tema = reader.GetString("tema"),
                            Referencia = reader.GetString("referencia"),
                            Situacao = reader.GetString("situacao"),
                            Postado = reader.GetString("postado")
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

        public string PutOrdemServico(OrdemServicoPutModel ordemAlterada)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(
                    "UPDATE ordensServico SET usuario_id = @usuario_id, data_prazo = @data_prazo, data_entrega = @data_entrega, tema = @tema, " +
                    "referencia = @referencia, situacao = @situacao, postado = @postado " +
                    "WHERE id = @id;", Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = ordemAlterada.Id;
                    putCmd.Parameters.Add("@usuario_id", SqlDbType.Int).Value = ordemAlterada.Usuario_id;
                    putCmd.Parameters.Add("@data_prazo", SqlDbType.DateTime).Value = ordemAlterada.Data_prazo;

                    // Verificando se data_entrega é nula
                    if (ordemAlterada.Data_entrega == null)
                    {
                        putCmd.Parameters.Add("@data_entrega", SqlDbType.DateTime).Value = DBNull.Value;
                    }
                    else
                    {
                        putCmd.Parameters.Add("@data_entrega", SqlDbType.DateTime).Value = ordemAlterada.Data_entrega;
                    }

                    putCmd.Parameters.Add("@tema", SqlDbType.VarChar).Value = ordemAlterada.Tema;
                    putCmd.Parameters.Add("@referencia", SqlDbType.VarChar).Value = ordemAlterada.Referencia;
                    putCmd.Parameters.Add("@situacao", SqlDbType.VarChar).Value = ordemAlterada.Situacao;
                    putCmd.Parameters.Add("@postado", SqlDbType.VarChar).Value = ordemAlterada.Postado;

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
