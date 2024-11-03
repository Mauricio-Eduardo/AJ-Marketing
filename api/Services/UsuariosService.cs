using api.Interfaces;
using api.Models.Usuario;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Transactions;

namespace api.Services
{
    public class UsuariosService: IUsuariosService
    {
        private readonly SqlConnection Connection;

        public UsuariosService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<UsuarioModel> GetAllUsuarios() 
        {
            List<UsuarioModel> listaUsuarios = new List<UsuarioModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT * FROM usuarios"), Connection);

                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaUsuarios.Add(
                            new UsuarioModel
                            {
                                Id = reader.GetInt32("id"),
                                Nome = reader.GetString("nome"),
                                Email = reader.GetString("email"),
                                Senha = reader.GetString("senha"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.IsDBNull(reader.GetOrdinal("data_ult_alt"))
                                    ? (DateTime?)null
                                    : reader.GetDateTime(reader.GetOrdinal("data_ult_alt"))
                            }
                        );
                    }
                    return listaUsuarios;

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

        public UsuarioModel GetUsuario(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT * FROM usuarios WHERE id = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new UsuarioModel
                        {
                            Id = reader.GetInt32("id"),
                            Nome = reader.GetString("nome"),
                            Email = reader.GetString("email"),
                            Senha = reader.GetString("senha"),
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

        public string PostUsuario(UsuarioPostModel usuarioInserido)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand postCmd = new SqlCommand(String.Format(
                    "INSERT INTO usuarios (nome, email, senha) " +
                    "VALUES (@nome, @email, @senha)"), Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@nome", SqlDbType.VarChar).Value = usuarioInserido.Nome;
                    postCmd.Parameters.Add("@email", SqlDbType.VarChar).Value = usuarioInserido.Email;
                    postCmd.Parameters.Add("@senha", SqlDbType.VarChar).Value = usuarioInserido.Senha;

                    postCmd.ExecuteNonQuery();
                    return "Usuário inserido com Sucesso!";

                }
                catch (SqlException ex)
                {
                    throw;
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

        public string PutUsuario(UsuarioPutModel usuarioAlterado)
        {
            using (Connection)
            {
                SqlTransaction transaction = null;

                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    if (usuarioAlterado.NovoUsuario_id != null)
                    {
                        TransferirResp(Connection, transaction, usuarioAlterado.Id, (int)usuarioAlterado.NovoUsuario_id);
                    }

                    SqlCommand putCmd = new SqlCommand(String.Format(
                        "UPDATE usuarios SET nome = @nome, email = @email, senha = @senha, " +
                        "ativo = @ativo, data_ult_alt = @data_ult_alt " +
                        "WHERE id = @id;"), Connection, transaction);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = usuarioAlterado.Id;
                    putCmd.Parameters.Add("@nome", SqlDbType.VarChar).Value = usuarioAlterado.Nome;
                    putCmd.Parameters.Add("@email", SqlDbType.VarChar).Value = usuarioAlterado.Email;
                    putCmd.Parameters.Add("@senha", SqlDbType.VarChar).Value = usuarioAlterado.Senha;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = usuarioAlterado.Ativo;
                    putCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

                    putCmd.ExecuteNonQuery();
                    
                    transaction.Commit();
                    return ("Usuário alterado com Sucesso!");
                }
                catch (SqlException ex)
                {
                    if (transaction != null)
                    {
                        transaction.Rollback();
                    }
                    throw;
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

        public string DeleteUsuario(int id, int novoUsuario_id)
        {
            using (Connection)
            {
                SqlTransaction transaction = null;
                try
                {
                    Connection.Open();
                    transaction = Connection.BeginTransaction();

                    TransferirResp(Connection, transaction, id, novoUsuario_id);

                    // Verifica se o usuário ainda está relacionado com alguma outra tabela
                    string checkRelationsQuery = @"
                        SELECT COUNT(*)
                        FROM ordensServico
                        WHERE usuario_id = @id;"
                            ;

                    SqlCommand checkRelationsCmd = new SqlCommand(checkRelationsQuery, Connection, transaction);
                    checkRelationsCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    int relatedCount = (int)checkRelationsCmd.ExecuteScalar();

                    if (relatedCount == 0)
                    {
                        string deleteQuery = @"DELETE FROM usuarios WHERE id = @id;";
                        SqlCommand deleteCmd = new SqlCommand(deleteQuery, Connection, transaction  );
                        deleteCmd.Parameters.Clear();
                        deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                        deleteCmd.ExecuteNonQuery();

                        transaction.Commit();
                        return "Usuário deletado com Sucesso!";   
                    }
                    {
                        // Caso ainda tenha relações, desfaz a transação e retorna uma mensagem
                        transaction.Rollback();
                        throw new Exception("Não foi possível excluir o usuário pois ele tem ordens de serviço entregues!.");
                    }
                }
                catch (SqlException ex)
                {
                    if (transaction != null)
                    {
                        transaction.Rollback();
                    }
                    throw;
                }
                finally
                {
                    Connection.Close();
                }
            }
        }

        private void TransferirResp(SqlConnection connection, SqlTransaction transaction, int id, int novoUsuario_id)
        {
            try
            {
                string transferQuery = @"
                UPDATE ordensServico SET usuario_id = @novoUsuario_id 
                WHERE usuario_id = @id
                AND (situacao = 'Pendente' OR situacao = 'Em Andamento');";

                SqlCommand transferCmd = new SqlCommand(transferQuery, connection, transaction);
                transferCmd.Parameters.Clear();
                transferCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;
                transferCmd.Parameters.Add("@novoUsuario_id", SqlDbType.Int).Value = novoUsuario_id;

                transferCmd.ExecuteNonQuery();
                
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
