
using api.Controllers;
using api.Interfaces;
using api.Services;
using System.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("corspolicy",
    policy =>
    {
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
    });
});

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string _connectionString =
    "Server=localhost;Database=ajmarketing;Trusted_Connection=True;Integrated Security=True;TrustServerCertificate=True;MultipleActiveResultSets=True;";
builder.Services.AddTransient<SqlConnection>(sc => new SqlConnection(_connectionString));

builder.Services.AddTransient<IPaisesService, PaisesService>();
builder.Services.AddTransient<IEstadosService, EstadosService>();
builder.Services.AddTransient<ICidadesService, CidadesService>();
builder.Services.AddTransient<IOrigensService, OrigensService>();
builder.Services.AddTransient<IUsuariosService, UsuariosService>();
builder.Services.AddTransient<IClientesService, ClientesService>();
builder.Services.AddTransient<IServicosService, ServicosService>();
builder.Services.AddTransient<IFormaPagamentoService, FormaPagamentoService>();
builder.Services.AddTransient<ICondicaoPagamentoService, CondicaoPagamentoService>();
builder.Services.AddTransient<IPropostasService, PropostaService>();
builder.Services.AddTransient<IInteressesService, InteresseService>();
builder.Services.AddTransient<IRamosAtividadeService, RamosAtividadeService>();
builder.Services.AddTransient<IPeridiocidadesService, PeridiocidadesService>();
builder.Services.AddTransient<IContratosService, ContratosService>();
builder.Services.AddTransient<IContasReceberService, ContasReceberService>();
builder.Services.AddTransient<IOrdensServicoService, OrdemServicoService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corspolicy");

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
