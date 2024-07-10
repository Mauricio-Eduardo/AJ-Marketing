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

        public IEnumerable<UsuarioModel> GetAllUsuarios(int ativo) 
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
                    getAllCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = ativo;


                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto e adiciona à lista
                        listaUsuarios.Add(
                            new UsuarioModel
                            {
                                Usuario_ID = reader.GetInt32("usuario_ID"),
                                Cpf = reader.GetString("cpf"),
                                Nome = reader.GetString("nome"),
                                Email = reader.GetString("email"),
                                Senha = reader.GetString("senha"),
                                Ativo = reader.GetBoolean("ativo"),
                                Data_cadastro = reader.GetDateTime("data_cadastro"),
                                Data_ult_alt = reader.GetDateTime("data_ult_alt")
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

        public UsuarioModel GetUsuario(int usuario_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                    "SELECT * FROM usuarios WHERE usuario_ID = @id"), Connection);

                    getCmd.Parameters.Clear();
                    getCmd.Parameters.Add("@id", SqlDbType.Int).Value = usuario_ID;

                    SqlDataReader reader = getCmd.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        return new UsuarioModel
                        {
                            Usuario_ID = reader.GetInt32("usuario_ID"),
                            Cpf = reader.GetString("cpf"),
                            Nome = reader.GetString("nome"),
                            Email = reader.GetString("email"),
                            Senha = reader.GetString("senha"),
                            Ativo = reader.GetBoolean("ativo"),
                            Data_cadastro = reader.GetDateTime("data_cadastro"),
                            Data_ult_alt = reader.GetDateTime("data_ult_alt")
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
                    "INSERT INTO usuarios (cpf, nome, email, senha, ativo, data_cadastro, data_ult_alt) " +
                    "VALUES (@cpf, @nome, @email, @senha, @ativo, @data_cadastro, @data_ult_alt)"), Connection);

                    postCmd.Parameters.Clear();
                    postCmd.Parameters.Add("@cpf", SqlDbType.VarChar).Value = usuarioInserido.Cpf;
                    postCmd.Parameters.Add("@nome", SqlDbType.VarChar).Value = usuarioInserido.Nome;
                    postCmd.Parameters.Add("@email", SqlDbType.VarChar).Value = usuarioInserido.Email;
                    postCmd.Parameters.Add("@senha", SqlDbType.VarChar).Value = usuarioInserido.Senha;
                    postCmd.Parameters.Add("@ativo", SqlDbType.Bit).Value = usuarioInserido.Ativo;
                    postCmd.Parameters.Add("@data_cadastro", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();
                    postCmd.Parameters.Add("@data_ult_alt", SqlDbType.DateTime).Value = new SqlDateTime(DateTime.Now).ToString();

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
                    "UPDATE usuarios SET cpf = @cpf, nome = @nome, email = @email, senha = @senha, " +
                    "ativo = @ativo, data_ult_alt = @data_ult_alt " +
                    "WHERE usuario_ID = @id"), Connection);

                    putCmd.Parameters.Clear();
                    putCmd.Parameters.Add("@id", SqlDbType.Int).Value = usuarioAlterado.Usuario_ID;
                    putCmd.Parameters.Add("@cpf", SqlDbType.VarChar).Value = usuarioAlterado.Cpf;
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

        public string DeleteUsuario(int usuario_ID)
        {
            using (Connection)
            {
                try
                {
                    Connection.Open();

                    SqlCommand deleteCmd = new SqlCommand(String.Format(
                    "DELETE FROM usuarios WHERE usuario_ID = @id"), Connection);

                    deleteCmd.Parameters.Clear();
                    deleteCmd.Parameters.Add("@id", SqlDbType.Int).Value = usuario_ID;

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
