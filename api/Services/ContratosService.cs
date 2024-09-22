using api.Interfaces;
using api.Models.Contratos;
using api.Models.PropostaServico;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class ContratosService: IContratosService
    {
        private readonly SqlConnection Connection;

        public ContratosService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<ContratoModel> GetAllContratos() 
        {
            List<ContratoModel> listaContratos = new List<ContratoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT c.id, c.cliente_id, cl.tipo_pessoa, cl.cpf_cnpj, cl.nome_razaoSocial, c.proposta_id, p.total, c.condPag_id, co.condicaoPagamento, " +
                        "c.data_contrato, c.situacao " +
                        "FROM contratos c " +
                        "INNER JOIN clientes cl ON c.cliente_id = cl.id " +
                        "INNER JOIN propostas p ON c.proposta_id = p.id " +
                        "INNER JOIN condicoesPagamento co ON c.condPag_id = co.id"), Connection);

                    using (SqlDataReader reader = getAllCmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            listaContratos.Add(
                            new ContratoModel
                            {
                                Id = reader.GetInt32("id"),
                                Cliente_id = reader.GetInt32("cliente_id"),
                                Cpf_cnpj = reader.GetString("cpf_cnpj"),
                                Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                                Proposta_id = reader.GetInt32("proposta_id"),
                                Total = reader.GetDecimal("total"),
                                CondPag_id = reader.GetInt32("condPag_id"),
                                CondicaoPagamento = reader.GetString("condicaoPagamento"),
                                Data_contrato = reader.GetDateTime("data_contrato"),
                                Situacao = reader.GetString("situacao"),
                            });
                        }
                    }

                    foreach (var contrato in listaContratos)
                    {
                        contrato.Servicos = GetServicosFromProposta(Connection, contrato.Proposta_id);
                    }

                    return listaContratos;

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

        public ContratoModel GetContrato(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT c.id, c.cliente_id, cl.cpf_cnpj, cl.nome_razaoSocial, c.proposta_id, p.total, c.condPag_id, co.condicaoPagamento, " +
                    "c.data_contrato, c.situacao " +
                    "FROM contratos c " +
                    "INNER JOIN clientes cl ON c.cliente_id = cl.id " +
                    "INNER JOIN propostas p ON c.proposta_id = p.id " +
                    "INNER JOIN condicoesPagamento co ON c.condPag_id = co.id " +
                    "WHERE c.id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    List<PropostaServicoModel> servicos = GetServicosFromProposta(Connection, id);

                    SqlDataReader reader = getCmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new ContratoModel
                        {
                            Id = reader.GetInt32("id"),
                            Cliente_id = reader.GetInt32("cliente_id"),
                            Cpf_cnpj = reader.GetString("cpf_cnpj"),
                            Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                            Proposta_id = reader.GetInt32("proposta_id"),
                            Total = reader.GetDecimal("total"),
                            CondPag_id = reader.GetInt32("condPag_id"),
                            CondicaoPagamento = reader.GetString("condicaoPagamento"),
                            Data_contrato = reader.GetDateTime("data_contrato"),
                            Situacao = reader.GetString("situacao"),
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

        public string PostContrato(ContratoPostModel contratoInserido)
        {
            using (Connection)
            {

                try
                {
                    Connection.Open();

                    string postQuery = @"
                    INSERT INTO contratos (proposta_id, cliente_id, condPag_id) 
                    VALUES (@proposta_id, @cliente_id, @condPag_id); 
                    SELECT SCOPE_IDENTITY();";

                    SqlCommand postCmd = new SqlCommand(postQuery, Connection);
                    postCmd.Parameters.AddWithValue("@proposta_id", contratoInserido.Proposta_id);
                    postCmd.Parameters.AddWithValue("@cliente_id", contratoInserido.Cliente_id);
                    postCmd.Parameters.AddWithValue("@condPag_id", contratoInserido.CondPag_id);

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

        public string CancelarContrato(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    // Atualizar a condição de pagamento
                    string putQuery = @"
                    UPDATE contratos
                    SET situacao = @situacao 
                    WHERE id = @id";

                    SqlCommand putCmd = new SqlCommand(putQuery, Connection);
                    putCmd.Parameters.AddWithValue("@id", id);
                    putCmd.Parameters.AddWithValue("@situacao", "Cancelado");

                    putCmd.ExecuteNonQuery();
                    return "Cancelado com sucesso!";
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
