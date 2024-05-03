using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using api.Models.Paises;
using System.Data.SqlTypes;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaisesController : ControllerBase
    {
        private readonly string _connectionString;

        public PaisesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        [HttpGet]
        [Route("getAllPaisesAtivos")]
        public ActionResult<IEnumerable<Paises>> GetAllPaisesAtivos()
        {
            List<Paises> listaPaises = new List<Paises>();

            try
            {
                // Criação da conexão com o banco de dados
                //string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT * FROM paises p " +
                        "WHERE p.ativo = 1"), conexao);
                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto Paises e adiciona à lista
                        Paises pais = new Paises
                        {
                            pais_ID = reader.GetInt32(0),
                            pais = reader.GetString(1),
                            ddi = reader.GetString(2),
                            ativo = reader.GetBoolean(3),
                            data_cadastro = reader.GetDateTime(4),
                            data_ult_alt = reader.GetDateTime(5)
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
        [Route("getAllPaisesInativos")]
        public ActionResult<IEnumerable<Paises>> GetAllPaisesInativos()
        {
            List<Paises> listaPaises = new List<Paises>();

            try
            {
                // Criação da conexão com o banco de dados
                //string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT * FROM paises p " +
                        "WHERE p.ativo = 0"), conexao);
                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto Paises e adiciona à lista
                        Paises pais = new Paises
                        {
                            pais_ID = reader.GetInt32(0),
                            pais = reader.GetString(1),
                            ddi = reader.GetString(2),
                            ativo = reader.GetBoolean(3),
                            data_cadastro = reader.GetDateTime(4),
                            data_ult_alt = reader.GetDateTime(5)
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
        [Route("getPais/{id}")]
        public ActionResult<Paises> GetPais(int id)
        {
            Paises paisEncontrado = null;

            try
            {
                // Criação da conexão com o banco de dados
                //string dadosconexao = "Server=localhost;Database=ajmarketing;Trusted_Connection=True;";

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format("SELECT * FROM paises WHERE pais_ID = @pais_ID"), conexao);
                    getCmd.Parameters.AddWithValue("@pais_ID", id);
                    SqlDataReader reader = getCmd.ExecuteReader();

                    reader.Read();
                    paisEncontrado = new Paises(
                        reader.GetInt32(0), // pais_id
                        reader.GetString(1), // pais
                        reader.GetString(2), // ddi
                        reader.GetBoolean(3), // ativo
                        reader.GetDateTime(4), // data_cadastro
                        reader.GetDateTime(5)); // data_ult_alt

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
        public ActionResult<Paises> PostPais([FromBody] PaisesPostModel paisInserido)
        {
            try
            {

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    // Inclui o país com os dados
                    SqlCommand postCmd = new SqlCommand(
                        "INSERT INTO paises (pais, ddi, ativo, data_cadastro, data_ult_alt) " +
                        "VALUES (@pais, @ddi, @ativo, @data_cadastro, @data_ult_alt)", conexao);

                    postCmd.Parameters.AddWithValue("@pais", paisInserido.pais);
                    postCmd.Parameters.AddWithValue("@ddi", paisInserido.ddi);
                    postCmd.Parameters.AddWithValue("@ativo", paisInserido.ativo);
                    postCmd.Parameters.AddWithValue("@data_cadastro", new SqlDateTime(DateTime.Now).ToSqlString());
                    postCmd.Parameters.AddWithValue("@data_ult_alt", new SqlDateTime(DateTime.Now).ToSqlString());

                    int rowsAffected = postCmd.ExecuteNonQuery();

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
        public ActionResult PutPais([FromBody] PaisesPutModel paisModificado)
        {
            try
            {
                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    // Verifica se o país com o ID fornecido existe
                    SqlCommand checkCmd = new SqlCommand(String.Format("SELECT COUNT(*) FROM paises WHERE pais_ID = @pais_ID"), conexao);
                    checkCmd.Parameters.AddWithValue("@pais_ID", paisModificado.pais_ID);
                    int count = (int)checkCmd.ExecuteScalar();

                    if (count > 0)
                    {
                        // Atualiza o país com os novos dados
                        SqlCommand putCmd = new SqlCommand(
                            "UPDATE paises SET pais = @pais, ddi = @ddi, ativo = @ativo, data_ult_alt = @data_ult_alt " +
                            "WHERE pais_ID = @pais_ID", conexao);

                        putCmd.Parameters.AddWithValue("@pais_ID", paisModificado.pais_ID);
                        putCmd.Parameters.AddWithValue("@pais", paisModificado.pais);
                        putCmd.Parameters.AddWithValue("@ddi", paisModificado.ddi);
                        putCmd.Parameters.AddWithValue("@ativo", paisModificado.ativo);
                        putCmd.Parameters.AddWithValue("@data_ult_alt", new SqlDateTime(DateTime.Now).ToSqlString());

                        int rowsAffected = putCmd.ExecuteNonQuery();

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
        [Route("deletePais/{id}")]
        public ActionResult DeletePais(int id)
        {
            try
            {

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    // Verifica se o país com o ID fornecido existe
                    SqlCommand checkCmd = new SqlCommand(String.Format("SELECT COUNT(*) FROM paises WHERE pais_ID = @pais_ID"), conexao);
                    checkCmd.Parameters.AddWithValue("@pais_ID", id);
                    int count = (int)checkCmd.ExecuteScalar();

                    if (count > 0)
                    {

                        // Tenta deletar o país (só vai deletar se não tiver nenhuma foreign key vinculada a ele, se nao vai inativar o registro)
                        SqlCommand deleteCmd = new SqlCommand(
                            "DELETE FROM paises WHERE pais_ID = @pais_ID", conexao);
                        deleteCmd.Parameters.AddWithValue("@pais_ID", id);

                        int rowsAffected = deleteCmd.ExecuteNonQuery();

                        if (rowsAffected > 0) // Deletou
                        {
                            conexao.Close();
                            return Ok("País exclúido com sucesso"); // Retorna 200 OK se a atualização for bem-sucedida
                        }
                        else // Não deletou, então retorna status code 500 para o front inativar
                        {
                            conexao.Close();
                            return StatusCode(500);
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