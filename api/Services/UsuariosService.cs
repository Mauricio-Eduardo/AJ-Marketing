using api.Interfaces;
using api.Models.Usuario;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace api.Services
{
    public class UsuariosService: IUsuariosService
    {
        private readonly SqlConnection Connection;

        public UsuariosService(SqlConnection pSqlConnection)
        {
            this.Connection = pSqlConnection;
        }

        public IEnumerable<UsuarioModel> GetAllUsuariosAtivos()
        {
            List<UsuarioModel> listaUsuarios = new List<UsuarioModel>();

            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT * FROM usuarios WHERE ativo = @ativo"), Connection);

                    getAllCmd.Parameters.Clear();
                    getAllCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = 1;

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

        public string PutUsuario(UsuarioPutModel usuarioAlterado)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand putCmd = new SqlCommand(String.Format(
                    "UPDATE usuarios SET nome = @nome, email = @email, senha = @senha, " +
                    "ativo = @ativo, data_ult_alt = @data_ult_alt " +
                    "WHERE id = @id"), Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = usuarioAlterado.Id;
                    putCmd.Parameters.Add("@nome", SqlDbType.VarChar).Value = usuarioAlterado.Nome;
                    putCmd.Parameters.Add("@email", SqlDbType.VarChar).Value = usuarioAlterado.Email;
                    putCmd.Parameters.Add("@senha", SqlDbType.VarChar).Value = usuarioAlterado.Senha;
                    putCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = usuarioAlterado.Ativo;
                    putCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

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

        public string DeleteUsuario(int id)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM usuarios WHERE id = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = id;

                    deleteCmd.ExecuteNonQuery();
                    return "Deletado com Sucesso!";

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
