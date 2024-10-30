using api.Interfaces;
using api.Models.OrdemServico;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Xml;

namespace api.Services
{
    public class OrdemServicoService : IOrdensServicoService
    {
        private readonly SqlConnection Connection;

        public OrdemServicoService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<OrdemServicoModel> GetAllOrdens(string situacao)
        {
            List<OrdemServicoModel> listaOrdens = new List<OrdemServicoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT o.id, o.cliente_id, c.nome_razaoSocial, o.contrato_id, o.usuario_id, u.nome, o.servico_id, s.servico, " +
                    "o.data_prazo, o.data_entrega, o.tema, o.referencia, o.observacoes, o.situacao, o.postado, o.data_cadastro, o.data_ult_alt " +
                    
                    "FROM ordensServico o " +
                    "INNER JOIN clientes c ON o.cliente_id = c.id " +
                    "INNER JOIN servicos s ON o.servico_id = s.id " +
                    "LEFT JOIN usuarios u ON o.usuario_id = u.id " +
                    "WHERE o.situacao = @situacao " +
                    "AND o.postado = @postado " +
                    "ORDER BY o.data_prazo;"), Connection);

                    getAllCmd.Parameters.Clear();
                    getAllCmd.Parameters.Add("@situacao", SqlDbType.VarChar).Value = situacao;
                    getAllCmd.Parameters.Add("@postado", SqlDbType.VarChar).Value = "Não";
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
                                Observacoes = reader.GetString("observacoes"),
                                Situacao = reader.GetString("situacao"),
                                Postado = reader.GetString("postado"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
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

        public IEnumerable<OrdemServicoModel> GetAllPostados()
        {
            List<OrdemServicoModel> listaOrdens = new List<OrdemServicoModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                    "SELECT o.id, o.cliente_id, c.nome_razaoSocial, o.contrato_id, o.usuario_id, u.nome, o.servico_id, s.servico, " +
                    "o.data_prazo, o.data_entrega, o.tema, o.referencia, o.observacoes, o.situacao, o.postado, o.data_cadastro, o.data_ult_alt " +

                    "FROM ordensServico o " +
                    "INNER JOIN clientes c ON o.cliente_id = c.id " +
                    "INNER JOIN servicos s ON o.servico_id = s.id " +
                    "LEFT JOIN usuarios u ON o.usuario_id = u.id " +
                    "WHERE o.postado = @postado"), Connection);

                    getAllCmd.Parameters.Clear();
                    getAllCmd.Parameters.Add("@postado", SqlDbType.VarChar).Value = "Sim";
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
                                Observacoes = reader.GetString("observacoes"),
                                Situacao = reader.GetString("situacao"),
                                Postado = reader.GetString("postado"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
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
                    "o.data_prazo, o.data_entrega, o.tema, o.referencia, o.observacoes, o.situacao, o.postado, o.data_cadastro, o.data_ult_alt " +
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
                            Observacoes = reader.GetString("observacoes"),
                            Situacao = reader.GetString("situacao"),
                            Postado = reader.GetString("postado"),
                            Data_cadastro = reader.GetDateTime("data_cadastro"),
                            Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
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

        public string PutOrdemServico(OrdemServicoPutModel ordemAlterada)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(
                    "UPDATE ordensServico SET usuario_id = @usuario_id, data_prazo = @data_prazo, data_entrega = @data_entrega, tema = @tema, " +
                    "referencia = @referencia, observacoes = @observacoes, data_ult_alt = @data_ult_alt " +
                    "WHERE id = @id;", Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = ordemAlterada.Id;

                    // Verificando se usuario_id é nulo
                    if (ordemAlterada.Usuario_id == null)
                    {
                        putCmd.Parameters.Add("@usuario_id", SqlDbType.Int).Value = DBNull.Value;
                    }
                    else
                    {
                        putCmd.Parameters.Add("@usuario_id", SqlDbType.Int).Value = ordemAlterada.Usuario_id;
                    }

                    putCmd.Parameters.Add("@data_prazo", SqlDbType.DateTime).Value = ordemAlterada.Data_prazo;
                    putCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

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
                    putCmd.Parameters.Add("@observacoes", SqlDbType.VarChar).Value = ordemAlterada.Observacoes;

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

        public string IniciarPausar(int id, string situacao)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(
                    "UPDATE ordensServico SET situacao = @situacao " +
                    "WHERE id = @id;", Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                    putCmd.Parameters.Add("@situacao", SqlDbType.VarChar).Value = situacao;
 
                    putCmd.ExecuteNonQuery();
                    if (situacao == "Iniciar") return "Iniciado com Sucesso!";
                    else return "Pausado com Sucesso!";

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

        public string Entregar(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(
                    "UPDATE ordensServico SET data_entrega = @data_entrega, situacao = @situacao " +
                    "WHERE id = @id;", Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                    putCmd.Parameters.Add("@data_entrega", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();
                    putCmd.Parameters.Add("@situacao", SqlDbType.VarChar).Value = "Concluído";

                    putCmd.ExecuteNonQuery();
                    return "Entregue com Sucesso!";

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

        public string Postar(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(
                    "UPDATE ordensServico SET postado = @postado " +
                    "WHERE id = @id;", Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                    putCmd.Parameters.Add("@postado", SqlDbType.VarChar).Value = "Sim";

                    putCmd.ExecuteNonQuery();
                    return "Postado com Sucesso!";

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
