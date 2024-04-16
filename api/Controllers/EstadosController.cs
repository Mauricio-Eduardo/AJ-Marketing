using Microsoft.AspNetCore.Mvc;
using api.Models;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Cors;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("corspolicy")]
    public class EstadosController : ControllerBase
    {

        [HttpGet]
        [Route("getAllEstados")]
        public ActionResult<IEnumerable<Estados>> GetAllEstados()
        {
            List<Estados> listaEstados = new List<Estados>();

            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    SqlCommand cmd = new SqlCommand(String.Format("SELECT * FROM estados"), conexao);
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto Estados e adiciona à lista
                        Estados estado = new Estados
                        {
                            estado_ID = reader.GetInt32(0),
                            pais_ID = reader.GetInt32(1),
                            estado = reader.GetString(2),
                            uf = reader.GetString(3)
                        };

                        listaEstados.Add(estado);
                    }

                    conexao.Close();

                    return Ok(listaEstados);

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
        [Route("getEstado")]
        public ActionResult<Estados> GetEstado(int id)
        {
            Estados estadoEncontrado = null;

            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    // Verifica se o estado com o ID fornecido existe
                    SqlCommand cmd = new SqlCommand(String.Format("SELECT * FROM estados WHERE estado_ID = @estado_ID"), conexao);
                    cmd.Parameters.AddWithValue("@estado_ID", id);
                    SqlDataReader reader = cmd.ExecuteReader();

                    reader.Read();
                    estadoEncontrado = new Estados(reader.GetInt32(0), reader.GetInt32(1), reader.GetString(2), reader.GetString(3));

                    conexao.Close();

                    return Ok(estadoEncontrado);                   

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
        [Route("postEstado")]
        public ActionResult<Estados> PostEstado([FromBody] Estados estadoInserido)
        {
            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    // Verifica se o país com o ID especificado existe
                    SqlCommand checkCmd = new SqlCommand("SELECT COUNT(*) FROM paises WHERE pais_ID = @pais_ID", conexao);
                    checkCmd.Parameters.AddWithValue("@pais_ID", estadoInserido.pais_ID);

                    int count = (int)checkCmd.ExecuteScalar();

                    if (count == 0)
                    {
                        return NotFound("O país associado ao estado não foi encontrado."); // Retorna 404 Not Found se o país não existir
                    }

                    // Insere o novo estado na tabela de estados
                    SqlCommand insertCmd = new SqlCommand("INSERT INTO estados (pais_ID, estado, uf) VALUES (@pais_ID, @estado, @uf)", conexao);
                    insertCmd.Parameters.AddWithValue("@pais_ID", estadoInserido.pais_ID);
                    insertCmd.Parameters.AddWithValue("@estado", estadoInserido.estado);
                    insertCmd.Parameters.AddWithValue("@uf", estadoInserido.uf);

                    insertCmd.ExecuteNonQuery();

                    conexao.Close();

                    return Ok(estadoInserido); // Retorna 200 OK se o estado for criado com 
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
        [Route("putEstado")]
        public ActionResult PutEstado([FromBody] Estados estadoModificado)
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
                    checkCmd.Parameters.AddWithValue("@estado_ID", estadoModificado.estado_ID);

                    int countEstado = (int)checkCmd.ExecuteScalar();

                    if (countEstado == 0)
                    {
                        return NotFound("O estado não foi encontrado."); // Retorna 404 Not Found se o país não existir
                    }

                    // Verifica se o país com o ID especificado existe
                    checkCmd = new SqlCommand("SELECT COUNT(*) FROM paises WHERE pais_ID = @pais_ID", conexao);
                    checkCmd.Parameters.AddWithValue("@pais_ID", estadoModificado.pais_ID);

                    int countPais = (int)checkCmd.ExecuteScalar();

                    if (countPais == 0)
                    {
                        return NotFound("O país associado ao estado não foi encontrado."); // Retorna 404 Not Found se o país não existir
                    }

                    // Atualiza o estado com os novos dados
                    SqlCommand cmd = new SqlCommand(
                        "UPDATE estados SET pais_ID = @pais_id, estado = @estado, uf = @uf WHERE estado_ID = @estado_ID", conexao);
                    cmd.Parameters.AddWithValue("@estado_ID", estadoModificado.estado_ID);
                    cmd.Parameters.AddWithValue("@pais_id", estadoModificado.pais_ID);
                    cmd.Parameters.AddWithValue("@estado", estadoModificado.estado);
                    cmd.Parameters.AddWithValue("@uf", estadoModificado.uf);

                    int rowsAffected = cmd.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        conexao.Close();
                        return Ok(estadoModificado); // Retorna 200 OK se a atualização for bem-sucedida
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
        [Route("deleteEstado")]
        public ActionResult DeleteEstado(int id)
        {
            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    // Verifica se o estado com o ID fornecido existe
                    SqlCommand checkCmd = new SqlCommand(String.Format("SELECT COUNT(*) FROM estados WHERE estado_ID = @estado_ID"), conexao);
                    checkCmd.Parameters.AddWithValue("@estado_ID", id);
                    int count = (int)checkCmd.ExecuteScalar();

                    if (count > 0)
                    {
                        // Deleta o estado
                        SqlCommand cmd = new SqlCommand(
                            "DELETE FROM estados WHERE estado_id = @estado_ID", conexao);
                        cmd.Parameters.AddWithValue("@estado_ID", id);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            conexao.Close();
                            return Ok("Estado exclúido com sucesso"); // Retorna 200 OK se a atualização for bem-sucedida
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