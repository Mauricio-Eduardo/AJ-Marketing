using Microsoft.AspNetCore.Mvc;
using api.Models;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Cors;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("corspolicy")]
    public class PaisesController : ControllerBase
    {

        [HttpGet]
        [Route("getAllPaises")]
        public ActionResult<IEnumerable<Paises>> GetAllPaises()
        {
            List<Paises> listaPaises = new List<Paises>();

            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    SqlCommand cmd = new SqlCommand(String.Format("SELECT * FROM paises"), conexao);
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto Paises e adiciona à lista
                        Paises pais = new Paises
                        {
                            pais_ID = reader.GetInt32(0),
                            pais = reader.GetString(1),
                            ddi = reader.GetString(2)
                        };

                        listaPaises.Add(pais);
                    }

                    conexao.Close();

                    return Ok(listaPaises);

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
        [Route("getPais")]
        public ActionResult<Paises> GetPais(int id)
        {
            Paises paisEncontrado = null;

            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    // Verifica se o país com o ID fornecido existe
                    SqlCommand cmd = new SqlCommand(String.Format("SELECT * FROM paises WHERE pais_ID = @pais_ID"), conexao);
                    cmd.Parameters.AddWithValue("@pais_ID", id);
                    SqlDataReader reader = cmd.ExecuteReader();

                    reader.Read();
                    paisEncontrado = new Paises(reader.GetInt32(0), reader.GetString(1), reader.GetString(2));

                    conexao.Close();

                    return Ok(paisEncontrado);

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
        [Route("postPais")]
        public ActionResult<Paises> PostPais([FromBody] Paises paisInserido)
        {
            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    // Verifica se o país com o ID fornecido existe
                    SqlCommand checkCmd = new SqlCommand(String.Format("SELECT COUNT(*) FROM paises WHERE pais_ID = @pais_ID"), conexao);
                    checkCmd.Parameters.AddWithValue("@pais_ID", paisInserido.pais_ID);
                    int count = (int)checkCmd.ExecuteScalar();

                    if (count == 0)
                    {
                        // Inclui o país com os dados
                        SqlCommand cmd = new SqlCommand(
                            "INSERT INTO paises (pais, ddi) VALUES (@pais, @ddi)", conexao);
                        cmd.Parameters.AddWithValue("@pais", paisInserido.pais);
                        cmd.Parameters.AddWithValue("@ddi", paisInserido.ddi);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            conexao.Close();
                            return Ok(paisInserido); // Retorna 200 OK se a atualização for bem-sucedida
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

        [HttpPut]
        [Route("putPais")]
        public ActionResult PutPais([FromBody] Paises paisModificado)
        {
            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    // Verifica se o país com o ID fornecido existe
                    SqlCommand checkCmd = new SqlCommand(String.Format("SELECT COUNT(*) FROM paises WHERE pais_ID = @pais_ID"), conexao);
                    checkCmd.Parameters.AddWithValue("@pais_ID", paisModificado.pais_ID);
                    int count = (int)checkCmd.ExecuteScalar();

                    if (count > 0)
                    {
                        // Atualiza o país com os novos dados
                        SqlCommand cmd = new SqlCommand(
                            "UPDATE paises SET pais = @pais, ddi= @ddi WHERE pais_ID = @pais_ID", conexao);
                        cmd.Parameters.AddWithValue("@pais_ID", paisModificado.pais_ID);
                        cmd.Parameters.AddWithValue("@pais", paisModificado.pais);
                        cmd.Parameters.AddWithValue("@ddi", paisModificado.ddi);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            conexao.Close();
                            return Ok(paisModificado); // Retorna 200 OK se a atualização for bem-sucedida
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

        [HttpDelete]
        [Route("deletePais")]
        public ActionResult DeletePais(int id)
        {
            try
            {
                // Criação da conexão com o banco de dados
                string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(dadosconexao))
                {
                    conexao.Open();

                    // Verifica se o país com o ID fornecido existe
                    SqlCommand checkCmd = new SqlCommand(String.Format("SELECT COUNT(*) FROM paises WHERE pais_ID = @pais_ID"), conexao);
                    checkCmd.Parameters.AddWithValue("pais_ID", id);
                    int count = (int)checkCmd.ExecuteScalar();

                    if (count > 0)
                    {
                        // Deleta o país
                        SqlCommand cmd = new SqlCommand(
                            "DELETE FROM paises WHERE pais_ID = @pais_ID", conexao);
                        cmd.Parameters.AddWithValue("@pais_ID", id);

                        int rowsAffected = cmd.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            conexao.Close();
                            return Ok("País exclúido com sucesso"); // Retorna 200 OK se a atualização for bem-sucedida
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