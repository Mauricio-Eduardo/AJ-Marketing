using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using api.Models.Estados;
using System.Data.SqlTypes;
using api.Models.Paises;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadosController : ControllerBase
    {

        private readonly string _connectionString;

        public EstadosController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        [HttpGet]
        [Route("getAllEstadosAtivos")]
        public ActionResult<IEnumerable<Estados>> GetAllEstadosAtivos()
        {
            List<Estados> listaEstados = new List<Estados>();

            try
            {

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT e.estado_ID, e.estado, e.uf, e.pais_ID, p.pais, e.ativo, e.data_cadastro, e.data_ult_alt " +
                        "FROM estados e INNER JOIN paises p ON e.pais_ID = p.pais_ID " +
                        "WHERE e.ativo = 1"), conexao);
                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto Estados e adiciona à lista
                        Estados estado = new Estados
                        {
                            estado_ID = reader.GetInt32(0),
                            estado = reader.GetString(1),
                            uf = reader.GetString(2),
                            pais_ID = reader.GetInt32(3),
                            pais = reader.GetString(4),
                            ativo = reader.GetBoolean(5),
                            data_cadastro = reader.GetDateTime(6),
                            data_ult_alt = reader.GetDateTime(7)
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
        [Route("getAllEstadosInativos")]
        public ActionResult<IEnumerable<Estados>> GetAllEstadosInativos()
        {
            List<Estados> listaEstados = new List<Estados>();

            try
            {

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    SqlCommand getAllCmd = new SqlCommand(String.Format(
                        "SELECT e.estado_ID, e.estado, e.uf, e.pais_ID, p.pais, e.ativo, e.data_cadastro, e.data_ult_alt " +
                        "FROM estados e INNER JOIN paises p ON e.pais_ID = p.pais_ID " +
                        "WHERE e.ativo = 0"), conexao);
                    SqlDataReader reader = getAllCmd.ExecuteReader();

                    while (reader.Read())
                    {
                        // Para cada registro encontrado, cria um objeto Estados e adiciona à lista
                        Estados estado = new Estados
                        {
                            estado_ID = reader.GetInt32(0),
                            estado = reader.GetString(1),
                            uf = reader.GetString(2),
                            pais_ID = reader.GetInt32(3),
                            pais = reader.GetString(4),
                            ativo = reader.GetBoolean(5),
                            data_cadastro = reader.GetDateTime(6),
                            data_ult_alt = reader.GetDateTime(7)
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
        [Route("getEstado/{id}")]
        public ActionResult<Estados> GetEstado(int id)
        {
            Estados estadoEncontrado = null;

            try
            {

                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    SqlCommand getCmd = new SqlCommand(String.Format(
                        "SELECT e.estado_ID, e.estado, e.uf, e.pais_ID, p.pais, e.ativo, e.data_cadastro, e.data_ult_alt " +
                        "FROM estados e INNER JOIN paises p ON e.pais_ID = p.pais_ID " +
                        "WHERE e.estado_ID = @id"), conexao);
                    getCmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = getCmd.ExecuteReader();

                    reader.Read();
                    estadoEncontrado = new Estados(
                        reader.GetInt32(0), // estado_ID
                        reader.GetString(1), // estado
                        reader.GetString(2), // uf
                        reader.GetInt32(3), // pais_ID
                        reader.GetString(4), // pais
                        reader.GetBoolean(5), // ativo
                        reader.GetDateTime(6), // data_cadastro
                        reader.GetDateTime(7)); // data_ult_alt 

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
        public ActionResult<Estados> PostEstado([FromBody] EstadosPostModel estadoInserido)
        {
            try
            {

                using (SqlConnection conexao = new SqlConnection(_connectionString))
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
                    SqlCommand postCmd = new SqlCommand(
                        "INSERT INTO estados (estado, uf, pais_ID, ativo, data_cadastro, data_ult_alt) " +
                        "VALUES (@estado, @uf, @pais_ID, @ativo, @data_cadastro, @data_ult_alt)", conexao);

                    postCmd.Parameters.AddWithValue("@estado", estadoInserido.estado);
                    postCmd.Parameters.AddWithValue("@uf", estadoInserido.uf);
                    postCmd.Parameters.AddWithValue("@pais_ID", estadoInserido.pais_ID);
                    postCmd.Parameters.AddWithValue("@ativo", estadoInserido.ativo);
                    postCmd.Parameters.AddWithValue("@data_cadastro", new SqlDateTime(DateTime.Now).ToSqlString());
                    postCmd.Parameters.AddWithValue("@data_ult_alt", new SqlDateTime(DateTime.Now).ToSqlString());
                    
                    postCmd.ExecuteNonQuery();

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
        public ActionResult PutEstado([FromBody] EstadosPutModel estadoModificado)
        {
            try
            {

                using (SqlConnection conexao = new SqlConnection(_connectionString))
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
                    SqlCommand putCmd = new SqlCommand(
                        "UPDATE estados SET estado = @estado, uf = @uf, pais_ID = @pais_ID, ativo = @ativo, data_ult_alt = @data_ult_alt " +
                        "WHERE estado_ID = @estado_ID;", conexao);

                    putCmd.Parameters.AddWithValue("@estado_ID", estadoModificado.estado_ID);
                    putCmd.Parameters.AddWithValue("@estado", estadoModificado.estado);
                    putCmd.Parameters.AddWithValue("@uf", estadoModificado.uf);
                    putCmd.Parameters.AddWithValue("@pais_id", estadoModificado.pais_ID);
                    putCmd.Parameters.AddWithValue("@ativo", estadoModificado.ativo);
                    putCmd.Parameters.AddWithValue("@data_ult_alt", new SqlDateTime(DateTime.Now).ToSqlString());

                    int rowsAffected = putCmd.ExecuteNonQuery();

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
        [Route("deleteEstado/{id}")]
        public ActionResult DeleteEstado(int id)
        {
            try
            {
       
                using (SqlConnection conexao = new SqlConnection(_connectionString))
                {
                    conexao.Open();

                    // Verifica se o estado com o ID fornecido existe
                    SqlCommand checkCmd = new SqlCommand(String.Format("SELECT COUNT(*) FROM estados WHERE estado_ID = @estado_ID"), conexao);
                    checkCmd.Parameters.AddWithValue("@estado_ID", id);
                    int count = (int)checkCmd.ExecuteScalar();

                    if (count > 0)
                    {
                        // Tenta deletar o estado (só vai deletar se não tiver nenhuma foreign key vinculada a ele, se nao vai inativar o registro)
                        SqlCommand deleteCmd = new SqlCommand(
                            "DELETE FROM estados WHERE estado_ID = @estado_ID", conexao);
                        deleteCmd.Parameters.AddWithValue("@estado_ID", id);

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