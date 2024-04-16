using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using api.Models;
using System.Data.SqlClient;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("corspolicy")]
    public class CidadesController : ControllerBase
    {

        [HttpGet]
        [Route("getAllCidades")]
        public ActionResult<IEnumerable<Cidades>> GetAllCidades()
        {
            List<Cidades> listaCidades = new List<Cidades>();

            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    SqlCommand cmd = new SqlCommand(String.Format("SELECT * FROM cidades"), conexao);
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto Cidades e adiciona à lista
                        Cidades cidade = new Cidades
                        {
                            cidade_ID = reader.GetInt32(0),
                            estado_ID = reader.GetInt32(1),
                            cidade = reader.GetString(2),
                            ddd = reader.GetString(3)
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
        [Route("getCidade")]
        public ActionResult<Cidades> GetCidade(int id)
        {
            Cidades cidadeEncontrada = null;

            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    // Verifica se o estado com o ID fornecido existe
                    SqlCommand cmd = new SqlCommand(String.Format("SELECT * FROM cidades WHERE cidade_ID = @cidade_ID"), conexao);
                    cmd.Parameters.AddWithValue("@cidade_ID", id);
                    SqlDataReader reader = cmd.ExecuteReader();

                    reader.Read();
                    cidadeEncontrada = new Cidades(reader.GetInt32(0), reader.GetInt32(1), reader.GetString(2), reader.GetString(3));

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
        public ActionResult<Cidades> PostCidade([FromBody] Cidades cidadeInserida)
        {
            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
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
                    SqlCommand insertCmd = new SqlCommand("INSERT INTO cidades (estado_ID, cidade, ddd) VALUES (@estado_ID, @cidade, @ddd)", conexao);
                    insertCmd.Parameters.AddWithValue("@estado_ID", cidadeInserida.estado_ID);
                    insertCmd.Parameters.AddWithValue("@cidade", cidadeInserida.cidade);
                    insertCmd.Parameters.AddWithValue("@ddd", cidadeInserida.ddd);

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
        public ActionResult PutCidade([FromBody] Cidades cidadeModificada)
        {
            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
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
                    SqlCommand cmd = new SqlCommand(
                        "UPDATE cidades SET estado_ID = @estado_id, cidade = @cidade, ddd = @ddd WHERE cidade_ID = @cidade_ID", conexao);
                    cmd.Parameters.AddWithValue("@cidade_ID", cidadeModificada.cidade_ID);
                    cmd.Parameters.AddWithValue("@estado_id", cidadeModificada.estado_ID);
                    cmd.Parameters.AddWithValue("@cidade", cidadeModificada.cidade);
                    cmd.Parameters.AddWithValue("@ddd", cidadeModificada.ddd);

                    int rowsAffected = cmd.ExecuteNonQuery();

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
        [Route("deleteCidade")]
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
                        // Deleta a cidade
                        SqlCommand cmd = new SqlCommand(
                            "DELETE FROM cidades WHERE cidade_ID = @cidade_ID", conexao);
                        cmd.Parameters.AddWithValue("@cidade_ID", id);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            conexao.Close();
                            return Ok("Cidade exclúida com sucesso"); // Retorna 200 OK se a atualização for bem-sucedida
                        }
                        else
                        {
                            conexao.Close();
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