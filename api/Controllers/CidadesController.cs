using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using api.Models.Cidades;
using System.Data.SqlTypes;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CidadesController : ControllerBase
    {

        private readonly string _connectionString;

        public CidadesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        [HttpGet]
        [Route("getAllCidadesAtivas")]
        public ActionResult<IEnumerable<Cidades>> GetAllCidadesAtivas()
        {
            List<Cidades> listaCidades = new List<Cidades>();

            try
            {
                
                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    SqlCommand cmd = new SqlCommand(String.Format(
                        "SELECT c.cidade_ID,  c.cidade, c.ddd, c.estado_ID, e.estado, c.ativo, c.data_cadastro, c.data_ult_alt " +
                        "FROM cidades c INNER JOIN estados e ON c.estado_ID = e.estado_ID WHERE c.ativo = 1"), conexao);
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto Cidades e adiciona à lista
                        Cidades cidade = new Cidades
                        {
                            cidade_ID = reader.GetInt32(0),
                            cidade = reader.GetString(1),
                            ddd = reader.GetString(2),
                            estado_ID = reader.GetInt32(3),
                            estado = reader.GetString(4),
                            ativo = reader.GetBoolean(5),
                            data_cadastro = reader.GetDateTime(6),
                            data_ult_alt = reader.GetDateTime(7),
                        };

                        listaCidades.Add(cidade);
                    }

                    conexao.Close();
                    return Ok(listaCidades);

                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
        }

        [HttpGet]
        [Route("getAllCidadesInativas")]
        public ActionResult<IEnumerable<Cidades>> GetAllCidadesInativas()
        {
            List<Cidades> listaCidades = new List<Cidades>();

            try
            {

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    SqlCommand cmd = new SqlCommand(String.Format(
                        "SELECT c.cidade_ID,  c.cidade, c.ddd, c.estado_ID, e.estado, c.ativo, c.data_cadastro, c.data_ult_alt " +
                        "FROM cidades c INNER JOIN estados e ON c.estado_ID = e.estado_ID WHERE c.ativo = 0"), conexao);
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto Cidades e adiciona à lista
                        Cidades cidade = new Cidades
                        {
                            cidade_ID = reader.GetInt32(0),
                            cidade = reader.GetString(1),
                            ddd = reader.GetString(2),
                            estado_ID = reader.GetInt32(3),
                            estado = reader.GetString(4),
                            ativo = reader.GetBoolean(5),
                            data_cadastro = reader.GetDateTime(6),
                            data_ult_alt = reader.GetDateTime(7),
                        };

                        listaCidades.Add(cidade);
                    }

                    conexao.Close();
                    return Ok(listaCidades);

                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
        }

        [HttpGet]
        [Route("getCidade/{id}")]
        public ActionResult<Cidades> GetCidade(int id)
        {
            Cidades cidadeEncontrada = null;

            try
            {

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    // Verifica se o estado com o ID fornecido existe
                    SqlCommand cmd = new SqlCommand(String.Format(
                        "SELECT c.cidade_ID, c.cidade, c.ddd, c.estado_ID, e.estado, c.ativo, c.data_cadastro, c.data_ult_alt " +
                        "FROM cidades c INNER JOIN estados e ON c.estado_ID = e.estado_ID " +
                        "WHERE c.cidade_ID = @id"), conexao);
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();

                    reader.Read();
                    cidadeEncontrada = new Cidades(
                        reader.GetInt32(0), // cidade_id
                        reader.GetString(1), // cidade
                        reader.GetString(2), // ddd
                        reader.GetInt32(3), //estado_id
                        reader.GetString(4), // estado
                        reader.GetBoolean(5), // ativo
                        reader.GetDateTime(6), // data_cadastro
                        reader.GetDateTime(7)); // data_ult_alt

                    conexao.Close();

                    return Ok(cidadeEncontrada);                   

                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
        }

        [HttpPost]
        [Route("postCidade")]
        public ActionResult<Cidades> PostCidade([FromBody] CidadesPostModel cidadeInserida)
        {
            try
            {

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    // Verifica se o estado com o ID especificado existe
                    SqlCommand checkCmd = new SqlCommand("SELECT COUNT(*) FROM estados WHERE estado_ID = @estado_ID", conexao);
                    checkCmd.Parameters.AddWithValue("@estado_ID", cidadeInserida.estado_ID);

                    int count = (int)checkCmd.ExecuteScalar();

                    if (count == 0)
                    {
                        return NotFound("O estado associado a cidade não foi encontrado."); // Retorna 404 Not Found se o estado não existir
                    }

                    // Insere a nova cidade na tabela de cidades
                    SqlCommand insertCmd = new SqlCommand(
                        "INSERT INTO cidades (cidade, ddd, estado_ID, ativo, data_cadastro, data_ult_alt) " +
                        "VALUES (@cidade, @ddd, @estado_ID, @ativo, @data_cadastro, @data_ult_alt)", conexao);

                    insertCmd.Parameters.AddWithValue("@cidade", cidadeInserida.cidade);
                    insertCmd.Parameters.AddWithValue("@ddd", cidadeInserida.ddd);
                    insertCmd.Parameters.AddWithValue("@estado_ID", cidadeInserida.estado_ID);
                    insertCmd.Parameters.AddWithValue("@ativo", cidadeInserida.ativo);
                    insertCmd.Parameters.AddWithValue("@data_cadastro", new SqlDateTime(DateTime.Now).ToSqlString());
                    insertCmd.Parameters.AddWithValue("@data_ult_alt", new SqlDateTime(DateTime.Now).ToSqlString());

                    insertCmd.ExecuteNonQuery();

                    conexao.Close();

                    return Ok(cidadeInserida); // Retorna 200 OK se o estado for criado com 
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
        }

        [HttpPut]
        [Route("putCidade")]
        public ActionResult PutCidade([FromBody] CidadesPutModel cidadeModificada)
        {
            try
            {
               
                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    // Verifica se a cidade com o ID especificado existe
                    SqlCommand checkCmd = new SqlCommand("SELECT COUNT(*) FROM cidades WHERE cidade_ID = @cidade_ID", conexao);
                    checkCmd.Parameters.AddWithValue("@cidade_ID", cidadeModificada.cidade_ID);

                    int countCidade = (int)checkCmd.ExecuteScalar();

                    if (countCidade == 0)
                    {
                        return NotFound("A cidade não foi encontrada."); // Retorna 404 Not Found se a cidade não existir
                    }

                    // Verifica se o estado com o ID especificado existe
                    checkCmd = new SqlCommand("SELECT COUNT(*) FROM estados WHERE estado_ID = @estado_ID", conexao);
                    checkCmd.Parameters.AddWithValue("@estado_ID", cidadeModificada.estado_ID);

                    int countEstado = (int)checkCmd.ExecuteScalar();

                    if (countEstado == 0)
                    {
                        return NotFound("O estado associado a cidade não foi encontrado."); // Retorna 404 Not Found se o estado não existir
                    }

                    // Atualiza o estado com os novos dados
                    SqlCommand updateCmd = new SqlCommand(
                        "UPDATE cidades SET cidade = @cidade, ddd = @ddd, estado_ID = @estado_ID, " +
                        "ativo = @ativo, data_ult_alt = @data_ult_alt " +
                        "WHERE cidade_ID = @cidade_ID;", conexao);

                    updateCmd.Parameters.AddWithValue("@cidade_ID", cidadeModificada.cidade_ID);
                    updateCmd.Parameters.AddWithValue("@cidade", cidadeModificada.cidade);
                    updateCmd.Parameters.AddWithValue("@ddd", cidadeModificada.ddd);
                    updateCmd.Parameters.AddWithValue("@estado_ID", cidadeModificada.estado_ID);
                    updateCmd.Parameters.AddWithValue("@ativo", cidadeModificada.ativo);
                    updateCmd.Parameters.AddWithValue("@data_ult_alt", new SqlDateTime(DateTime.Now).ToSqlString());

                    int rowsAffected = updateCmd.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        conexao.Close();
                        return Ok(cidadeModificada); // Retorna 200 OK se a atualização for bem-sucedida
                    }
                    else
                    {
                        conexao.Close();
                        return StatusCode(500); // Retorna 500 Internal Server Error se não for possível atualizar
                    }

                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
        }

        [HttpDelete]
        [Route("deleteCidade/{id}")]
        public ActionResult DeleteCidade(int id)
        {
            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    // Verifica se a cidade com o ID fornecido existe
                    SqlCommand checkCmd = new SqlCommand(String.Format("SELECT COUNT(*) FROM cidades WHERE cidade_ID = @cidade_ID"), conexao);
                    checkCmd.Parameters.AddWithValue("@cidade_ID", id);
                    int count = (int)checkCmd.ExecuteScalar();

                    if (count > 0)
                    {
                        // Tenta deletar a cidade
                        SqlCommand cmd = new SqlCommand(
                            "DELETE FROM cidades WHERE cidade_ID = @cidade_ID", conexao);
                        cmd.Parameters.AddWithValue("@cidade_ID", id);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            conexao.Close();
                            return Ok("Cidade exclúida com sucesso"); // Retorna 200 OK se a atualização for bem-sucedida
                        }
                        else // Caso nao possa deletar a cidade por ter registros que utilizem ela
                        {
                            conexao.Close();
                            SqlCommand updateCmd = new SqlCommand(
                                "UPDATE cidades SET situacao = @situacao " +
                                "WHERE cidade_ID = @cidade_ID;", conexao);

                            updateCmd.Parameters.AddWithValue("@situacao", false); // Deixa a situação como falsa

                            return StatusCode(500); // Retorna 500 Internal Server Error se não for possível atualizar
                        }
                    }
                    else
                    {
                        conexao.Close();
                        return NotFound(); // Retorna 404 Not Found se o país não for encontrado
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500); // Erro interno do servidor
            }
        }
    }
}