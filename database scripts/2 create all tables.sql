use ajmarketing

CREATE TABLE paises (
  pais_ID int NOT NULL PRIMARY KEY IDENTITY,

  pais VARCHAR(56) NOT NULL,
  sigla VARCHAR(2) NOT NULL,
  ddi VARCHAR(3),

  ativo BIT NOT NULL DEFAULT 1,
  data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
  data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
)

CREATE TABLE estados (
  estado_ID int NOT NULL PRIMARY KEY IDENTITY,
 
  estado VARCHAR(56) NOT NULL,
  uf VARCHAR(2) NOT NULL,

  pais_ID int NOT NULL, -- Foreign Key
  FOREIGN KEY (pais_ID) REFERENCES paises(pais_ID),

  ativo BIT NOT NULL DEFAULT 1,
  data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
  data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
)

CREATE TABLE cidades (
  cidade_ID int NOT NULL PRIMARY KEY IDENTITY,
  
  cidade VARCHAR(100) NOT NULL,
  ddd VARCHAR(2),

  estado_ID int NOT NULL, -- Foreign Key
  FOREIGN KEY (estado_ID) REFERENCES estados(estado_ID),

  ativo BIT NOT NULL DEFAULT 1,
  data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
  data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
);

CREATE TABLE servicos (
	servico_ID INT NOT NULL PRIMARY KEY IDENTITY,
	servico VARCHAR(30) NOT NULL,
	valor DECIMAL(7,2) NOT NULL,
	descricao VARCHAR(255),

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
)

CREATE TABLE formasPagamento (
    formaPag_ID INT NOT NULL PRIMARY KEY IDENTITY,
    formaPagamento VARCHAR(50) NOT NULL,

    ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
);

CREATE TABLE condicoesPagamento (
    condPag_ID INT NOT NULL PRIMARY KEY IDENTITY,
    condicaoPagamento VARCHAR(50) NOT NULL,
    desconto DECIMAL(10, 2),
    juros DECIMAL(10, 2),
    multa DECIMAL(10, 2),

    ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
);

CREATE TABLE parcelas (
    parcela_ID INT NOT NULL PRIMARY KEY IDENTITY,
    numeroParcela INT NOT NULL,
    dias INT NOT NULL,
    porcentagem DECIMAL(10, 2) NOT NULL,

    condPag_ID INT NOT NULL, -- Foreign Key
    formaPag_ID INT NOT NULL, -- Foreign Key

	FOREIGN KEY (condPag_ID) REFERENCES condicoesPagamento(condPag_ID),
	FOREIGN KEY (formaPag_ID) REFERENCES formasPagamento(formaPag_ID),
);

CREATE TABLE propostas (
	proposta_ID INT NOT NULL PRIMARY KEY IDENTITY,

	-- Flag: Física ou Jurídica
	tipo_pessoa VARCHAR(8) NOT NULL, 
	
		cpf_cnpj VARCHAR(14),
		nome_razaoSocial VARCHAR(50) NOT NULL,
	
	email VARCHAR(50) NOT NULL,
	celular VARCHAR(11) NOT NULL,

	data_proposta DATE NOT NULL DEFAULT GETDATE(),
	prazo_final DATE NOT NULL,
	inicio DATE NOT NULL,
	termino DATE NOT NULL,
	total DECIMAL NOT NULL,
	situacao VARCHAR(30) NOT NULL DEFAULT 'Pendente',

	data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
)

CREATE TABLE propostas_servicos (
	proposta_ID INT NOT NULL,
	servico_ID INT NOT NULL,

	PRIMARY KEY (proposta_ID, servico_ID), -- Chave Composta
	FOREIGN KEY (proposta_ID) REFERENCES propostas(proposta_ID),
    FOREIGN KEY (servico_ID) REFERENCES servicos(servico_ID),

	quantidade INT NOT NULL,
	desconto DECIMAL,
	valor_unitario DECIMAL NOT NULL,
)

CREATE TABLE usuarios (
	usuario_ID INT NOT NULL PRIMARY KEY IDENTITY,

	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	senha VARCHAR(30) NOT NULL,

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
)

CREATE TABLE origens (
	origem_ID INT NOT NULL PRIMARY KEY IDENTITY,

	origem VARCHAR(30) NOT NULL,

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
)

CREATE TABLE interesses (
	interesse_ID INT NOT NULL PRIMARY KEY IDENTITY,
	interesse VARCHAR(60) NOT NULL,

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
)

CREATE TABLE ramosAtividade (
	ramo_ID INT NOT NULL PRIMARY KEY IDENTITY,
	ramo VARCHAR(60) NOT NULL,

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
)

CREATE TABLE clientes (
	cliente_ID INT NOT NULL PRIMARY KEY IDENTITY,

	proposta_ID INT NOT NULL, -- Foreign Key
	FOREIGN KEY (proposta_ID) REFERENCES propostas(proposta_ID),

	-- Flag: Física ou Jurídica
	tipo_pessoa VARCHAR(8) NOT NULL, 
	
		cpf_cnpj VARCHAR(14),
		nome_razaoSocial VARCHAR(50) NOT NULL,
		apelido_nomeFantasia VARCHAR(50), 
		rg_inscricaoEstadual VARCHAR(14), -- 9 rg 14 ie
		genero VARCHAR(10),

	email VARCHAR(50) NOT NULL,
	celular VARCHAR(11) NOT NULL,

	-- Endereço
	cidade_ID INT NOT NULL, -- Foreign Key
	FOREIGN KEY (cidade_ID) REFERENCES cidades(cidade_ID),

	logradouro VARCHAR(80) NOT NULL,
	numero VARCHAR(6) NOT NULL,
	bairro VARCHAR(30) NOT NULL,
	complemento VARCHAR(80),
	cep VARCHAR(8) NOT NULL,

	origem_ID INT NOT NULL, -- Foreign Key
	FOREIGN KEY (origem_ID) REFERENCES origens(origem_ID),

	interesse_ID INT NOT NULL, -- Foreign Key
	FOREIGN KEY (interesse_ID) REFERENCES interesses(interesse_ID),

	ramo_ID INT NOT NULL, -- Foreign Key
	FOREIGN KEY (ramo_ID) REFERENCES ramosAtividade(ramo_ID),	

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME NOT NULL DEFAULT GETDATE(),
);

CREATE TABLE clientes_usuarios (
	cliente_ID INT NOT NULL,
	usuario_ID INT NOT NULL,
	PRIMARY KEY (cliente_ID, usuario_ID), -- Chave Composta

	FOREIGN KEY (cliente_ID) REFERENCES clientes(cliente_ID),
    FOREIGN KEY (usuario_ID) REFERENCES usuarios(usuario_ID),
)

CREATE TABLE clientes_interesses (
	cliente_ID INT NOT NULL,
	interesse_ID INT NOT NULL,
	PRIMARY KEY (cliente_ID, interesse_ID), -- Chave Composta

	FOREIGN KEY (cliente_ID) REFERENCES clientes(cliente_ID),
    FOREIGN KEY (interesse_ID) REFERENCES interesses(interesse_ID),
)

CREATE TABLE clientes_ramosAtividade (
	cliente_ID INT NOT NULL,
	ramo_ID INT NOT NULL,
	PRIMARY KEY (cliente_ID, ramo_ID), -- Chave Composta

	FOREIGN KEY (cliente_ID) REFERENCES clientes(cliente_ID),
    FOREIGN KEY (ramo_ID) REFERENCES ramosAtividade(ramo_ID),
)

CREATE TABLE contratos (
	contrato_ID INT NOT NULL PRIMARY KEY IDENTITY,

	proposta_ID INT NOT NULL, -- Foreign Key
	FOREIGN KEY (proposta_ID) REFERENCES propostas(proposta_ID),

	cliente_ID INT NOT NULL, -- Foreign Key
	FOREIGN KEY (cliente_ID) REFERENCES clientes(cliente_ID),

	condPag_ID INT NOT NULL, -- Foreign Key
	FOREIGN KEY (condPag_ID) REFERENCES condicoesPagamento(condPag_ID),

	data_contrato DATE NOT NULL DEFAULT GETDATE(),
	total DECIMAL(10, 2) NOT NULL,
	situacao VARCHAR(30) NOT NULL DEFAULT 'Vigente',
)

CREATE TABLE contasReceber (
	contaReceber_ID INT NOT NULL PRIMARY KEY IDENTITY,

	cliente_ID INT NOT NULL, -- Foreign Key
	FOREIGN KEY (cliente_ID) REFERENCES clientes(cliente_ID),

	contrato_ID INT NOT NULL, -- Foreign Key
	FOREIGN KEY (contrato_ID) REFERENCES contratos(contrato_ID),

    data_vencimento DATE NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    situacao VARCHAR(30) NOT NULL DEFAULT 'Pendente',	
)
