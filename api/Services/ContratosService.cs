
using api.Interfaces;
using api.Models.CondicaoPagamento;
using api.Models.ContaReceber;
using api.Models.Contratos;
using api.Models.Parcelas;
using api.Models.Proposta;
using api.Models.PropostaServico;
using System.Data;
using System.Data.SqlClient;

namespace api.Services
{
    public class ContratosService: IContratosService
    {
        private readonly SqlConnection Connection;
        private readonly ICondicaoPagamentoService _condicoesPagamentoService;
        private readonly IPropostasService _propostasService;

        public ContratosService(SqlConnection pSqlConnection, ICondicaoPagamentoService condicoesPagamentoService, 
            IPropostasService propostasService, IContasReceberService contasService)
        {
            this.Connection = pSqlConnection;
            this._condicoesPagamentoService = condicoesPagamentoService;
            this._propostasService = propostasService;
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
                        "SELECT c.id, c.cliente_id, cl.tipo_pessoa, cl.cpf_cnpj, cl.nome_razaoSocial, c.proposta_id, p.total, c.condPag_id, " +
                        "co.condicaoPagamento, co.desconto, co.juros, co.multa, c.data_contrato, c.data_vencimento, c.situacao " +
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
                                Desconto = reader.GetDecimal("total"),
                                Juros = reader.GetDecimal("total"),
                                Multa = reader.GetDecimal("total"),
                                Data_contrato = reader.GetDateTime("data_contrato"),
                                Data_vencimento = reader.GetDateTime("data_vencimento"),
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
                    "SELECT c.id, c.cliente_id, cl.tipo_pessoa, cl.cpf_cnpj, cl.nome_razaoSocial, c.proposta_id, p.total, c.condPag_id, " +
                    "co.condicaoPagamento, co.desconto, co.juros, co.multa, c.data_contrato, c.data_vencimento, c.situacao " +
                    "FROM contratos c " +
                    "INNER JOIN clientes cl ON c.cliente_id = cl.id " +
                    "INNER JOIN propostas p ON c.proposta_id = p.id " +
                    "INNER JOIN condicoesPagamento co ON c.condPag_id = co.id " +
                    "WHERE c.id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    List<PropostaServicoModel> servicos = new List<PropostaServicoModel>();

                    SqlDataReader reader = getCmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        reader.Read();
                        ContratoModel contrato = new ContratoModel
                        {
                            Id = reader.GetInt32("id"),
                            Cliente_id = reader.GetInt32("cliente_id"),
                            Cpf_cnpj = reader.GetString("cpf_cnpj"),
                            Nome_razaoSocial = reader.GetString("nome_razaoSocial"),
                            Proposta_id = reader.GetInt32("proposta_id"),
                            Total = reader.GetDecimal("total"),
                            CondPag_id = reader.GetInt32("condPag_id"),
                            CondicaoPagamento = reader.GetString("condicaoPagamento"),
                            Desconto = reader.GetDecimal("total"),
                            Juros = reader.GetDecimal("total"),
                            Multa = reader.GetDecimal("total"),
                            Data_contrato = reader.GetDateTime("data_contrato"),
                            Data_vencimento = reader.GetDateTime("data_vencimento"),
                            Situacao = reader.GetString("situacao"),
                        };
                        contrato.Servicos = GetServicosFromProposta(Connection, contrato.Proposta_id);
                        return contrato;
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
                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    CondicaoPagamentoModel condicao = new CondicaoPagamentoModel();
                    PropostaModel proposta = new PropostaModel();
                    List<ParcelasModel> parcelas = new List<ParcelasModel>();

                    // Inserir o contrato e obter o ID gerado
                    string postQuery = @"
                        INSERT INTO contratos (proposta_id, cliente_id, condPag_id, data_vencimento) 
                        OUTPUT INSERTED.id
                        VALUES (@proposta_id, @cliente_id, @condPag_id, @data_vencimento);";

                    SqlCommand postCmd = new SqlCommand(postQuery, Connection, transaction);
                    postCmd.Parameters.AddWithValue("@proposta_id", contratoInserido.Proposta_id);
                    postCmd.Parameters.AddWithValue("@cliente_id", contratoInserido.Cliente_id);
                    postCmd.Parameters.AddWithValue("@condPag_id", contratoInserido.CondPag_id);
                    postCmd.Parameters.AddWithValue("@data_vencimento", contratoInserido.Data_vencimento);

                    // Obter o ID do contrato inserido
                    int ContratoID = (int)postCmd.ExecuteScalar();

                    condicao = _condicoesPagamentoService.GetCondicaoPagamento(contratoInserido.CondPag_id);
                    parcelas = GetParcelasFromCondicaoPagamento(Connection, transaction, contratoInserido.CondPag_id);
                    proposta = _propostasService.GetProposta(contratoInserido.Proposta_id);

                    // Inserir as contas a receber para cada parcela
                    foreach (var parcela in parcelas)
                    {
                        string insertContaQuery = @"
                            INSERT INTO contasReceber 
                            (cliente_id, contrato_id, parcela_id, data_vencimento, valor_inicial, desconto, total)
                            VALUES (@cliente_id, @contrato_id, @parcela_id, @data_vencimento, @valor_inicial, @desconto, @total);";

                        SqlCommand insertContaCmd = new SqlCommand(insertContaQuery, Connection, transaction);
                        insertContaCmd.Parameters.AddWithValue("@cliente_id", contratoInserido.Cliente_id);
                        insertContaCmd.Parameters.AddWithValue("@contrato_id", ContratoID);
                        insertContaCmd.Parameters.AddWithValue("@parcela_id", parcela.Id);
                        insertContaCmd.Parameters.AddWithValue("@dias", parcela.Dias);
                        insertContaCmd.Parameters.AddWithValue("@data_vencimento", proposta.Data_inicio.AddDays(parcela.Dias));

                        decimal valorInicial = proposta.Total * (parcela.Porcentagem / 100);
                        decimal desconto = valorInicial * (condicao.Desconto / 100);

                        decimal valor_total = valorInicial - desconto;

                        insertContaCmd.Parameters.AddWithValue("@valor_inicial", valorInicial);
                        insertContaCmd.Parameters.AddWithValue("@desconto", desconto);
                        insertContaCmd.Parameters.AddWithValue("@total", valor_total);

                        insertContaCmd.ExecuteNonQuery();
                    }

                    foreach (var servico in proposta.Servicos)
                    {
                        DateTime dataInicio = proposta.Data_inicio;
                        DateTime dataVencimento = contratoInserido.Data_vencimento;

                        while (dataInicio <= dataVencimento)
                        {
                            // Verificar se a data cai em sábado ou domingo e antecipar para a sexta-feira anterior
                            if (dataInicio.DayOfWeek == DayOfWeek.Saturday)
                            {
                                dataInicio = dataInicio.AddDays(-1);
                            }
                            else if (dataInicio.DayOfWeek == DayOfWeek.Sunday)
                            {
                                dataInicio = dataInicio.AddDays(-2);
                            }

                            string insertOrdemQuery = @"
                                INSERT INTO ordensServico 
                                (cliente_id, contrato_id, servico_id, data_prazo)
                                VALUES (@cliente_id, @contrato_id, @servico_id, @data_prazo);";

                            SqlCommand insertOrdemCmd = new SqlCommand(insertOrdemQuery, Connection, transaction);
                            insertOrdemCmd.Parameters.AddWithValue("@cliente_id", contratoInserido.Cliente_id);
                            insertOrdemCmd.Parameters.AddWithValue("@contrato_id", ContratoID);
                            insertOrdemCmd.Parameters.AddWithValue("@servico_id", servico.Servico_id);
                            insertOrdemCmd.Parameters.AddWithValue("@data_prazo", dataInicio);

                            insertOrdemCmd.ExecuteNonQuery();

                            // Incrementar a data para o próximo ciclo da peridiocidade
                            dataInicio = dataInicio.AddDays(proposta.Dias);
                        }
                    }

                    transaction.Commit();
                    return "Contrato, contas a receber e ordens de serviço inseridos com sucesso!";
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

        private List<ParcelasModel> GetParcelasFromCondicaoPagamento(SqlConnection connection, SqlTransaction transaction, int id)
        {
            try
            {
                List<ParcelasModel> listaParcelas = new List<ParcelasModel>();

                string queryParcelas = @"
                SELECT p.id, p.numeroParcela, p.dias, p.porcentagem, 
                        p.condPag_id, p.formaPag_id, f.formaPagamento
                FROM parcelas p
                INNER JOIN formasPagamento f ON p.formaPag_id = f.id
                WHERE p.condPag_id = @condPag_id";

                using (SqlCommand getAllParcelas = new SqlCommand(queryParcelas, connection, transaction))
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

                    return listaParcelas;
                }
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string CancelarContrato(int id)
        {
            using (Connection)
            {
                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    // Atualizar o contrato
                    string putQuery = @"
                    UPDATE contratos
                    SET situacao = @situacao
                    WHERE id = @id";

                    SqlCommand putCmd = new SqlCommand(putQuery, Connection, transaction);
                    putCmd.Parameters.AddWithValue("@id", id);
                    putCmd.Parameters.AddWithValue("@situacao", "Cancelado");

                    putCmd.ExecuteNonQuery();

                    // Cancelar as Contas a Receber que não estão pagas
                    string contasQuery = @"
                        UPDATE contasReceber SET situacao = @situacao 
                        WHERE contrato_id = @id
                        AND situacao = 'Pendente'";

                    SqlCommand contasCmd = new SqlCommand(contasQuery, Connection, transaction);
                    contasCmd.Parameters.AddWithValue("@id", id);
                    contasCmd.Parameters.AddWithValue("@situacao", "Cancelada");

                    contasCmd.ExecuteNonQuery();

                    // Cancelar as Ordens de Serviço que não estão começadas
                    string ordensQuery = @"
                        UPDATE ordensServico SET situacao = @situacao
                        WHERE contrato_id = @id 
                        AND situacao = 'Pendente'";
                    SqlCommand ordensCmd = new SqlCommand(ordensQuery, Connection, transaction);
                    ordensCmd.Parameters.AddWithValue("@id", id);
                    ordensCmd.Parameters.AddWithValue("@situacao", "Cancelada");

                    transaction.Commit();
                    return "Cancelado com sucesso!";
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
