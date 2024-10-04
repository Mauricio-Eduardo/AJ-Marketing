﻿using api.Models.Peridiocidade;

namespace api.Interfaces
{
    public interface IPeridiocidadesService
    {
        IEnumerable<PeridiocidadeModel> GetAllPeridiocidades();
        IEnumerable<PeridiocidadeModel> GetAllPeridiocidadesAtivas();
        PeridiocidadeModel GetPeridiocidade(int id);
        string PostPeridiocidade(PeridiocidadePostModel peridiocidadeInserida);
        string PutPeridiocidade(PeridiocidadePutModel peridiocidadeAlterada);
        string DeletePeridiocidade(int id);
    }
}
