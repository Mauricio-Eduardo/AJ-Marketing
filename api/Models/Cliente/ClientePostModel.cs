﻿
using api.Models.Clientes_interesses;
using api.Models.Clientes_ramos;

namespace api.Models.Cliente
{
    public class ClientePostModel
    {
        // Variáveis que são necessárias para criar um novo registro
        private string _tipo_pessoa;
        private string _cpf_cnpj;
        private string _nome_razaoSocial;
        private string _apelido_nomeFantasia;
        private string _rg_inscricaoEstadual;
        private string _genero;
        private string _email;
        private string _celular;
        private int _cidade_id;
        private string _logradouro;
        private string _numero;
        private string _bairro;
        private string _complemento;
        private string _cep;
        private int _origem_id;

        private List<ClienteInteresseModel> _interesses;
        private List<ClienteRamoModel> _ramos;

        // Propriedades públicas para acessar as variáveis
        public string Tipo_pessoa
        {
            get { return _tipo_pessoa; }
            set { _tipo_pessoa = value; }
        }

        public string Cpf_cnpj
        {
            get { return _cpf_cnpj; }
            set { _cpf_cnpj = value; }
        }

        public string Nome_razaoSocial
        {
            get { return _nome_razaoSocial; }
            set { _nome_razaoSocial = value; }
        }

        public string Apelido_nomeFantasia
        {
            get { return _apelido_nomeFantasia; }
            set { _apelido_nomeFantasia = value; }
        }

        public string Rg_inscricaoEstadual
        {
            get { return _rg_inscricaoEstadual; }
            set { _rg_inscricaoEstadual = value; }
        }

        public string Genero
        {
            get { return _genero; }
            set { _genero = value; }
        }

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }

        public string Celular
        {
            get { return _celular; }
            set { _celular = value; }
        }

        public int Cidade_id
        {
            get { return _cidade_id; }
            set { _cidade_id = value; }
        }

        public string Logradouro
        {
            get { return _logradouro; }
            set { _logradouro = value; }
        }

        public string Numero
        {
            get { return _numero; }
            set { _numero = value; }
        }

        public string Bairro
        {
            get { return _bairro; }
            set { _bairro = value; }
        }

        public string Complemento
        {
            get { return _complemento; }
            set { _complemento = value; }
        }

        public string Cep
        {
            get { return _cep; }
            set { _cep = value; }
        }

        public int Origem_id
        {
            get { return _origem_id; }
            set { _origem_id = value; }
        }

        public List<ClienteInteresseModel> Interesses
        {
            get { return _interesses; }
            set { _interesses = value; }
        }

        public List<ClienteRamoModel> Ramos
        {
            get { return _ramos; }
            set { _ramos = value; }
        }

        // Construtor sem parâmetros
        public ClientePostModel() { }

        // Construtor com parâmetros
        public ClientePostModel(
            string tipo_pessoa,
            string cpf_cnpj,
            string nome_razaoSocial,
            string apelido_nomeFantasia,
            string rg_inscricaoEstadual,
            string genero,
            string email,
            string celular,
            int cidade_ID,
            string logradouro,
            string numero,
            string bairro,
            string complemento,
            string cep,
            int origem_ID,

            List<ClienteInteresseModel> interesses,
            List<ClienteRamoModel> ramos
            )
        {
            _tipo_pessoa = tipo_pessoa;
            _cpf_cnpj = cpf_cnpj;
            _nome_razaoSocial = nome_razaoSocial;
            _apelido_nomeFantasia = apelido_nomeFantasia;
            _rg_inscricaoEstadual = rg_inscricaoEstadual;
            _genero = genero;
            _email = email;
            _celular = celular;
            _cidade_id = cidade_ID;
            _logradouro = logradouro;
            _numero = numero;
            _bairro = bairro;
            _complemento = complemento;
            _cep = cep;
            _origem_id = origem_ID;
            _interesses = interesses;
            _interesses = interesses;
            _ramos = ramos;
        }
    }
}
