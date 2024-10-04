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
                        "SELECT p.id, p.cliente_id, p.tipo_pessoa, p.cpf_cnpj, p.nome_razaoSocial, p.peridiocidade_id, p2.descricao, p2.dias, " +
                        "p.data_proposta, p.prazo_final, p.data_inicio, p.total, p.situacao, p.data_cadastro, p.data_ult_alt " +
                        "FROM propostas p " +
                        "INNER JOIN peridiocidades p2 ON p.peridiocidade_id = p2.id"), Connection);

                    using (SqlDataReader reader = getAllCmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            listaPropostas.Add(
                            new PropostaModel
                            {
                                Id = reader.GetInt32("id"),
                                Cliente_id = reader.IsDBNull(reader.GetOrdinal("cliente_id"))
                                    ? (int?)null
                                    : reader.GetInt32(reader.GetOrdinal("cliente_id")),
                                Tipo_pessoa = reader.GetString("tipo_pessoa"),
                                Cpf_cnpj = reader.GetString("cpf_cnpj"),
                                Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                                Peridiocidade_id = reader.GetInt32("peridiocidade_id"),
                                Descricao = reader.GetString("descricao"),
                                Dias = reader.GetInt32("dias"),
                                Data_proposta = reader.GetDateTime("data_proposta"),
                                Prazo_final = reader.GetDateTime("prazo_final"),
                                Data_inicio = reader.GetDateTime("data_inicio"),
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
                    "SELECT p.id, p.cliente_id, p.tipo_pessoa, p.cpf_cnpj, p.nome_razaoSocial, p.peridiocidade_id, p2.descricao, p2.dias, " +
                    "p.data_proposta, p.prazo_final, p.data_inicio, p.total, p.situacao, p.data_cadastro, p.data_ult_alt " +
                    "FROM propostas p " +
                    "INNER JOIN peridiocidades p2 ON p.peridiocidade_id = p2.id " +
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
                            Cliente_id = reader.IsDBNull(reader.GetOrdinal("cliente_id"))
                                    ? (int?)null
                                    : reader.GetInt32(reader.GetOrdinal("cliente_id")),
                            Tipo_pessoa = reader.GetString("tipo_pessoa"),
                            Cpf_cnpj = reader.GetString("cpf_cnpj"),
                            Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                            Peridiocidade_id = reader.GetInt32("peridiocidade_id"),
                            Descricao = reader.GetString("descricao"),
                            Dias = reader.GetInt32("dias"),
                            Data_proposta = reader.GetDateTime("data_proposta"),
                            Prazo_final = reader.GetDateTime("prazo_final"),
                            Data_inicio = reader.GetDateTime("data_inicio"),
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
            SELECT ps.id, ps.servico_id, s.servico, ps.quantidade, ps.valor_unitario, ps.desconto, ps.valor_total 
            FROM propostas_servicos ps 
            INNER JOIN servicos s ON ps.servico_id = s.id 
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
                    INSERT INTO propostas (cliente_id, tipo_pessoa, cpf_cnpj, nome_razaoSocial, peridiocidade_id, data_proposta, prazo_final, 
                    data_inicio, total) 
                    VALUES (@cliente_id, @tipo_pessoa, @cpf_cnpj, @nome_razaoSocial, @peridiocidade_id, @data_proposta, @prazo_final,
                    @data_inicio, @total); 
                    SELECT SCOPE_IDENTITY();";

                    SqlCommand postCmd = new SqlCommand(postQuery, Connection, transaction);
                    postCmd.Parameters.AddWithValue("@cliente_id", propostaInserida.Cliente_id == 0 ? (object)DBNull.Value : propostaInserida.Cliente_id);
                    postCmd.Parameters.AddWithValue("@tipo_pessoa", propostaInserida.Tipo_pessoa);
                    postCmd.Parameters.AddWithValue("@cpf_cnpj", propostaInserida.Cpf_cnpj);
                    postCmd.Parameters.AddWithValue("@nome_razaoSocial", propostaInserida.Nome_razaoSocial);
                    postCmd.Parameters.AddWithValue("@peridiocidade_id", propostaInserida.Peridiocidade_id);
                    postCmd.Parameters.AddWithValue("@data_proposta", propostaInserida.Data_proposta);
                    postCmd.Parameters.AddWithValue("@prazo_final", propostaInserida.Prazo_final);
                    postCmd.Parameters.AddWithValue("@data_inicio", propostaInserida.Data_inicio);
                    postCmd.Parameters.AddWithValue("@total", propostaInserida.Total);

                    int propostaId = Convert.ToInt32(postCmd.ExecuteScalar());

                    //Inserir os serivocs
                    foreach (var servico in propostaInserida.Servicos)
                    {
                        string postServicoQuery = @"
                        INSERT INTO propostas_servicos (proposta_id, servico_id, quantidade, valor_unitario, desconto, valor_total) 
                        VALUES (@proposta_id, @servico_id, @quantidade, @valor_unitario, @desconto, @valor_total)";

                        SqlCommand insertServicoCmd = new SqlCommand(postServicoQuery, Connection, transaction);
                        insertServicoCmd.Parameters.AddWithValue("@proposta_id", propostaId);
                        insertServicoCmd.Parameters.AddWithValue("@servico_id", servico.Servico_id);
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
                    SET cliente_id = @cliente_id, tipo_pessoa = @tipo_pessoa, cpf_cnpj = @cpf_cnpj, nome_razaoSocial = @nome_razaoSocial, 
                    peridiocidade_id = @peridiocidade_id, data_proposta = @data_proposta, prazo_final = @prazo_final, 
                    data_inicio = @data_inicio, total = @total, situacao = @situacao, data_ult_alt = @data_ult_alt 
                    WHERE id = @id";

                    SqlCommand putCmd = new SqlCommand(putQuery, Connection, transaction);
                    putCmd.Parameters.AddWithValue("@id", propostaAlterada.Id);
                    putCmd.Parameters.AddWithValue("@cliente_id", propostaAlterada.Cliente_id == 0 ? (object)DBNull.Value : propostaAlterada.Cliente_id);
                    putCmd.Parameters.AddWithValue("@tipo_pessoa", propostaAlterada.Tipo_pessoa);
                    putCmd.Parameters.AddWithValue("@cpf_cnpj", propostaAlterada.Cpf_cnpj);
                    putCmd.Parameters.AddWithValue("@nome_razaoSocial", propostaAlterada.Nome_razaoSocial);
                    putCmd.Parameters.AddWithValue("@peridiocidade_id", propostaAlterada.Peridiocidade_id);
                    putCmd.Parameters.AddWithValue("@data_proposta", propostaAlterada.Data_proposta);
                    putCmd.Parameters.AddWithValue("@prazo_final", propostaAlterada.Prazo_final);
                    putCmd.Parameters.AddWithValue("@data_inicio", propostaAlterada.Data_inicio);
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
                        INSERT INTO propostas_servicos (proposta_id, servico_id, quantidade, valor_unitario, desconto, valor_total) 
                        VALUES (@proposta_id, @servico_id, @quantidade, @valor_unitario, @desconto, @valor_total)";

                        SqlCommand insertServicoCmd = new SqlCommand(insertParcelaQuery, Connection, transaction);
                        insertServicoCmd.Parameters.AddWithValue("@proposta_id", propostaAlterada.Id);
                        insertServicoCmd.Parameters.AddWithValue("@servico_id", servico.Servico_id);
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

        public string AtualizarSituacaoProposta(int id, string situacao)
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
                    SET situacao = @situacao, data_ult_alt = @data_ult_alt 
                    WHERE id = @id";


                    SqlCommand putCmd = new SqlCommand(putQuery, Connection, transaction);
                    putCmd.Parameters.AddWithValue("@id", id);
                    putCmd.Parameters.AddWithValue("@situacao", situacao);
                    putCmd.Parameters.AddWithValue("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

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
