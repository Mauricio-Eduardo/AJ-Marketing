using api.Models.RamosAtividade;

namespace api.Interfaces
{
    public interface IRamosAtividadeService
    {
        IEnumerable<RamoAtividadeModel> GetAllRamosAtividade();
        RamoAtividadeModel GetRamoAtividade(int id);
        string PostRamoAtividade(RamoAtividadePostModel ramoInserido);
        string PutRamoAtividade(RamoAtividadePutModel ramoAlterado);
        string DeleteRamoAtividade(int id);
    }
}
