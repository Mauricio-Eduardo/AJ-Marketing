using api.Interfaces;
using api.Models.Proposta;
using api.Models.PropostaServico;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class PropostaService: IPropostasService
    {
        private readonly SqlConnection Connection;

        public PropostaService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<PropostaModel> GetAllPropostas() 
        {
            List<PropostaModel> listaPropostas = new List<PropostaModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT p.id, p.cliente_id, c.tipo_pessoa, c.cpf_cnpj, c.nome_razaoSocial, p.condPag_id, co.condicaoPagamento, " +
                        "p.prazo_final, p.data_aprovacao, p.data_inicio, p.total, p.situacao, p.data_cadastro, p.data_ult_alt " +
                        "FROM propostas p " +
                        "INNER JOIN clientes c ON p.cliente_id = c.id " +
                        "INNER JOIN condicoesPagamento co ON p.condPag_id = co.id"), Connection);

                    using (SqlDataReader reader = getAllCmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            listaPropostas.Add(
                            new PropostaModel
                            {
                                Id = reader.GetInt32("id"),
                                Cliente_id = reader.GetInt32(reader.GetOrdinal("cliente_id")),
                                Tipo_pessoa = reader.GetString("tipo_pessoa"),
                                Cpf_cnpj = reader.GetString("cpf_cnpj"),
                                Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                                CondPag_id = reader.GetInt32("condPag_id"),
                                CondicaoPagamento = reader.GetString("condicaoPagamento"),
                                Prazo_final = reader.GetDateTime("prazo_final"),
                                Data_aprovacao = reader.IsDBNull(reader.GetOrdinal("data_aprovacao"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_aprovacao")),
                                Data_inicio = reader.IsDBNull(reader.GetOrdinal("data_inicio"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_inicio")),
                                Total = reader.GetDecimal("total"),
                                Situacao = reader.GetString("situacao"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
                            });
                        }
                    }

                    foreach (var proposta in listaPropostas)
                    {
                        proposta.Servicos = GetServicosFromProposta(Connection, proposta.Id);
                    }

                    return listaPropostas;

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

        public PropostaModel GetProposta(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT p.id, p.cliente_id, c.tipo_pessoa, c.cpf_cnpj, c.nome_razaoSocial, p.condPag_id, co.condicaoPagamento, " +
                    "p.prazo_final, p.data_aprovacao, p.data_inicio, p.total, p.situacao, p.data_cadastro, p.data_ult_alt " +
                    "FROM propostas p " +
                    "INNER JOIN clientes c ON p.cliente_id = c.id " +
                    "INNER JOIN condicoesPagamento co ON p.condPag_id = co.id " +
                    "WHERE p.id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    List<PropostaServicoModel> servicos = GetServicosFromProposta(Connection, id);

                    SqlDataReader reader = getCmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new PropostaModel
                        {
                            Id = reader.GetInt32("id"),
                            Cliente_id = reader.GetInt32(reader.GetOrdinal("cliente_id")),
                            Tipo_pessoa = reader.GetString("tipo_pessoa"),
                            Cpf_cnpj = reader.GetString("cpf_cnpj"),
                            Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                            CondPag_id = reader.GetInt32("condPag_id"),
                            CondicaoPagamento = reader.GetString("condicaoPagamento"),
                            Prazo_final = reader.GetDateTime("prazo_final"),
                            Data_aprovacao = reader.IsDBNull(reader.GetOrdinal("data_aprovacao"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_aprovacao")),
                            Data_inicio = reader.IsDBNull(reader.GetOrdinal("data_inicio"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_inicio")),
                            Total = reader.GetDecimal("total"),
                            Situacao = reader.GetString("situacao"),
                            Data_cadastro = reader.GetDateTime("data_cadastro"),
                            Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt")),
                            Servicos = servicos
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

        private List<PropostaServicoModel> GetServicosFromProposta(SqlConnection connection, int id)
        {
            List<PropostaServicoModel> listaServicos = new List<PropostaServicoModel>();

            string queryServicos = @"
            SELECT ps.id, ps.servico_id, s.servico, ps.peridiocidade_id, p.descricao, p.dias, ps.quantidade, ps.valor_unitario, 
            ps.desconto, ps.valor_total 
            FROM propostas_servicos ps 
            INNER JOIN servicos s ON ps.servico_id = s.id 
            INNER JOIN peridiocidades p ON ps.peridiocidade_id = p.id
            WHERE ps.proposta_id = @id";

            using (SqlCommand getAllServicos = new SqlCommand(queryServicos, connection))
            {
                getAllServicos.Parameters.Add("@id", SqlDbType.Int).Value = id;

                using (SqlDataReader ServicosReader = getAllServicos.ExecuteReader())
                {
                    while (ServicosReader.Read())
                    {
                        listaServicos.Add(
                            new PropostaServicoModel
                            {
                                Id = ServicosReader.GetInt32(ServicosReader.GetOrdinal("id")),
                                Servico_id = ServicosReader.GetInt32(ServicosReader.GetOrdinal("servico_id")),
                                Servico = ServicosReader.GetString(ServicosReader.GetOrdinal("servico")),
                                Peridiocidade_id = ServicosReader.GetInt32(ServicosReader.GetOrdinal("peridiocidade_id")),
                                Descricao = ServicosReader.GetString(ServicosReader.GetOrdinal("descricao")),
                                Dias = ServicosReader.GetInt32(ServicosReader.GetOrdinal("dias")),
                                Quantidade = ServicosReader.GetInt32(ServicosReader.GetOrdinal("quantidade")),
                                Valor_unitario = ServicosReader.GetDecimal(ServicosReader.GetOrdinal("valor_unitario")),
                                Desconto = ServicosReader.GetDecimal(ServicosReader.GetOrdinal("desconto")),
                                Valor_total = ServicosReader.GetDecimal(ServicosReader.GetOrdinal("valor_total")),
                            });
                    }
                }
            }

            return listaServicos;
        }

        public List<PropostaServicoModel> GetServicosFromProposta(int id)
        {
            using (Connection)
            {
                Connection.Open();
                return GetServicosFromProposta(Connection, id);
            }
        }

        public string PostProposta(PropostaPostModel propostaInserida)
        {
            using (Connection)
            {
                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    //Inserir a proposta
                    string postQuery = @"
                    INSERT INTO propostas (cliente_id, condPag_id, prazo_final, total) 
                    VALUES (@cliente_id, @condPag_id, @prazo_final, @total); 
                    SELECT SCOPE_IDENTITY();";

                    SqlCommand postCmd = new SqlCommand(postQuery, Connection, transaction);
                    postCmd.Parameters.AddWithValue("@cliente_id", propostaInserida.Cliente_id);
                    postCmd.Parameters.AddWithValue("@condPag_id", propostaInserida.CondPag_id);
                    postCmd.Parameters.AddWithValue("@prazo_final", propostaInserida.Prazo_final);
                    postCmd.Parameters.AddWithValue("@total", propostaInserida.Total);

                    int propostaId = Convert.ToInt32(postCmd.ExecuteScalar());

                    //Inserir os serivocs
                    foreach (var servico in propostaInserida.Servicos)
                    {
                        string postServicoQuery = @"
                        INSERT INTO propostas_servicos (proposta_id, servico_id, peridiocidade_id, quantidade, valor_unitario, desconto, valor_total) 
                        VALUES (@proposta_id, @servico_id, @peridiocidade_id, @quantidade, @valor_unitario, @desconto, @valor_total)";

                        SqlCommand insertServicoCmd = new SqlCommand(postServicoQuery, Connection, transaction);
                        insertServicoCmd.Parameters.AddWithValue("@proposta_id", propostaId);
                        insertServicoCmd.Parameters.AddWithValue("@servico_id", servico.Servico_id);
                        insertServicoCmd.Parameters.AddWithValue("@peridiocidade_id", servico.Peridiocidade_id);
                        insertServicoCmd.Parameters.AddWithValue("@quantidade", servico.Quantidade);
                        insertServicoCmd.Parameters.AddWithValue("@valor_unitario", servico.Valor_unitario);
                        insertServicoCmd.Parameters.AddWithValue("@desconto", servico.Desconto);
                        insertServicoCmd.Parameters.AddWithValue("@valor_total", servico.Valor_total);

                        insertServicoCmd.ExecuteNonQuery();
                    }

                    transaction.Commit();
                    return "Inserida com Sucesso!";
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

        public string PutProposta(PropostaPutModel propostaAlterada)
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
                    UPDATE propostas
                    SET condPag_id = @condPag_id, prazo_final = @prazo_final, total = @total, situacao = @situacao, data_ult_alt = @data_ult_alt 
                    WHERE id = @id";

                    SqlCommand putCmd = new SqlCommand(putQuery, Connection, transaction);
                    putCmd.Parameters.AddWithValue("@id", propostaAlterada.Id);
                    putCmd.Parameters.AddWithValue("@condPag_id", propostaAlterada.CondPag_id);
                    putCmd.Parameters.AddWithValue("@prazo_final", propostaAlterada.Prazo_final);
                    putCmd.Parameters.AddWithValue("@total", propostaAlterada.Total);
                    putCmd.Parameters.AddWithValue("@situacao", propostaAlterada.Situacao);
                    putCmd.Parameters.AddWithValue("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

                    putCmd.ExecuteNonQuery();

                    // Deletar os servicos vinculados
                    string deleteServicosQuery = "DELETE FROM propostas_servicos WHERE proposta_id = @id";
                    SqlCommand deleteServicosCmd = new SqlCommand(deleteServicosQuery, Connection, transaction);
                    deleteServicosCmd.Parameters.AddWithValue("@id", propostaAlterada.Id);

                    deleteServicosCmd.ExecuteNonQuery();

                    // Inserir os novos servicos
                    foreach (var servico in propostaAlterada.Servicos)
                    {
                        string insertParcelaQuery = @"
                        INSERT INTO propostas_servicos (proposta_id, servico_id, peridiocidade_id, quantidade, valor_unitario, desconto, valor_total) 
                        VALUES (@proposta_id, @servico_id, @peridiocidade_id, @quantidade, @valor_unitario, @desconto, @valor_total)";

                        SqlCommand insertServicoCmd = new SqlCommand(insertParcelaQuery, Connection, transaction);
                        insertServicoCmd.Parameters.AddWithValue("@proposta_id", propostaAlterada.Id);
                        insertServicoCmd.Parameters.AddWithValue("@servico_id", servico.Servico_id);
                        insertServicoCmd.Parameters.AddWithValue("@peridiocidade_id", servico.Peridiocidade_id);
                        insertServicoCmd.Parameters.AddWithValue("@quantidade", servico.Quantidade);
                        insertServicoCmd.Parameters.AddWithValue("@valor_unitario", servico.Valor_unitario);
                        insertServicoCmd.Parameters.AddWithValue("@desconto", servico.Desconto);
                        insertServicoCmd.Parameters.AddWithValue("@valor_total", servico.Valor_total);

                        insertServicoCmd.ExecuteNonQuery();
                    }

                    transaction.Commit();
                    return "Alterada com sucesso!";
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

        public string AtualizarSituacaoProposta(PropostaAtualizaModel propostaAtualizada)
        {
            using (Connection)
            {
                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    // Atualizar a proposta
                    string putQuery = @"
                    UPDATE propostas
                    SET situacao = @situacao, data_aprovacao = @data_aprovacao, data_inicio = @data_inicio
                    WHERE id = @id";


                    SqlCommand putCmd = new SqlCommand(putQuery, Connection, transaction);
                    putCmd.Parameters.AddWithValue("@id", propostaAtualizada.Id);
                    putCmd.Parameters.AddWithValue("@situacao", propostaAtualizada.Situacao);
                    putCmd.Parameters.AddWithValue("@data_aprovacao", propostaAtualizada.Data_aprovacao == null ? (object)DBNull.Value : propostaAtualizada.Data_aprovacao);
                    putCmd.Parameters.AddWithValue("@data_inicio", propostaAtualizada.Data_inicio == null ? (object)DBNull.Value : propostaAtualizada.Data_inicio);

                    putCmd.ExecuteNonQuery();

                    transaction.Commit();
                    return "Atualizada com sucesso!";
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
