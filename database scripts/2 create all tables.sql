use ajmarketing

CREATE TABLE paises (
  id int NOT NULL PRIMARY KEY IDENTITY,

  pais VARCHAR(56) NOT NULL,
  sigla VARCHAR(2) NOT NULL,
  ddi VARCHAR(3),

  ativo BIT NOT NULL DEFAULT 1,
  data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
  data_ult_alt DATETIME DEFAULT NULL
)

CREATE TABLE estados (
  id int NOT NULL PRIMARY KEY IDENTITY,
 
  estado VARCHAR(56) NOT NULL,
  uf VARCHAR(2) NOT NULL,

  pais_id int NOT NULL, -- Foreign Key
  FOREIGN KEY (pais_id) REFERENCES paises(id),

  ativo BIT NOT NULL DEFAULT 1,
  data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
  data_ult_alt DATETIME DEFAULT NULL
)

CREATE TABLE cidades (
  id int NOT NULL PRIMARY KEY IDENTITY,
  
  cidade VARCHAR(100) NOT NULL,
  ddd VARCHAR(2),

  estado_id int NOT NULL, -- Foreign Key
  FOREIGN KEY (estado_id) REFERENCES estados(id),

  ativo BIT NOT NULL DEFAULT 1,
  data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
  data_ult_alt DATETIME DEFAULT NULL
);

CREATE TABLE servicos (
	id INT NOT NULL PRIMARY KEY IDENTITY,
	servico VARCHAR(30) NOT NULL,
	valor DECIMAL(8,2) NOT NULL,
	descricao VARCHAR(255),

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME DEFAULT NULL
)

CREATE TABLE formasPagamento (
    id INT NOT NULL PRIMARY KEY IDENTITY,
    formaPagamento VARCHAR(50) NOT NULL,

    ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME DEFAULT NULL
);

CREATE TABLE condicoesPagamento (
    id INT NOT NULL PRIMARY KEY IDENTITY,
    condicaoPagamento VARCHAR(50) NOT NULL,
    quantidadeParcelas INT DEFAULT 0,
	desconto DECIMAL(5, 2),
    juros DECIMAL(5, 2),
    multa DECIMAL(5, 2),

    ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME DEFAULT NULL
);


CREATE TABLE parcelas (
    id INT NOT NULL PRIMARY KEY IDENTITY,
    numeroParcela INT NOT NULL,
    dias INT NOT NULL,
    porcentagem DECIMAL(8, 2) NOT NULL,

    condPag_id INT NOT NULL, -- Foreign Key
    formaPag_id INT NOT NULL, -- Foreign Key

	FOREIGN KEY (condPag_id) REFERENCES condicoesPagamento(id),
	FOREIGN KEY (formaPag_id) REFERENCES formasPagamento(id),
);

CREATE TABLE usuarios (
	id INT NOT NULL PRIMARY KEY IDENTITY,

	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	senha VARCHAR(30) NOT NULL,

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME DEFAULT NULL
)

CREATE TABLE origens (
	id INT NOT NULL PRIMARY KEY IDENTITY,

	origem VARCHAR(30) NOT NULL,

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME DEFAULT NULL
)

CREATE TABLE interesses (
	id INT NOT NULL PRIMARY KEY IDENTITY,
	interesse VARCHAR(60) NOT NULL,

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME DEFAULT NULL
)

CREATE TABLE ramosAtividade (
	id INT NOT NULL PRIMARY KEY IDENTITY,
	ramo VARCHAR(60) NOT NULL,

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME DEFAULT NULL
)

CREATE TABLE peridiocidades (
	id INT NOT NULL PRIMARY KEY IDENTITY,
	
	descricao VARCHAR(20) NOT NULL,
	dias INT NOT NULL,

	ativo BIT NOT NULL DEFAULT 1,
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME DEFAULT NULL
)

CREATE TABLE clientes (
	id INT NOT NULL PRIMARY KEY IDENTITY,

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
	cidade_id INT NOT NULL, -- Foreign Key
	FOREIGN KEY (cidade_id) REFERENCES cidades(id),

	logradouro VARCHAR(80) NOT NULL,
	numero VARCHAR(6) NOT NULL,
	bairro VARCHAR(30) NOT NULL,
	complemento VARCHAR(80),
	cep VARCHAR(8) NOT NULL,

	origem_id INT NOT NULL, -- Foreign Key
	FOREIGN KEY (origem_id) REFERENCES origens(id),	

	ativo BIT NOT NULL DEFAULT 1, -- Quando for 0, deve-ser como 'Contrato Vencido' ou 'Contrato Cancelado'
	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME DEFAULT NULL
);

CREATE TABLE propostas (
	id INT NOT NULL PRIMARY KEY IDENTITY,

	situacao VARCHAR(30) NOT NULL DEFAULT 'Pendente', -- Pendente, Aprovada, Recusada, Vencida
	
	peridiocidade_id INT NOT NULL, -- Foreign Key
	FOREIGN KEY (peridiocidade_id) REFERENCES peridiocidades(id),
	

	-- Se o cliente já estiver cadastrado, utiliza o ID dele
	cliente_id INT NULL, -- Foreign Key
	FOREIGN KEY (cliente_id) REFERENCES clientes(id),
	
	-- Caso não esteja cadastrado, preenche esses três campos e depois caso a proposta seja aprovada
	-- utiliza esses campos para cadastrar o Cliente
	tipo_pessoa VARCHAR(8) NOT NULL,
	cpf_cnpj VARCHAR(14) NOT NULL,
	nome_razaoSocial VARCHAR(50) NOT NULL,

	data_proposta DATE NOT NULL DEFAULT GETDATE(),
	prazo_final DATE NOT NULL,
	data_inicio DATE NOT NULL,

	total DECIMAL(10,2) NOT NULL,

	data_cadastro DATETIME NOT NULL DEFAULT GETDATE(),
	data_ult_alt DATETIME DEFAULT NULL
)

CREATE TABLE propostas_servicos (
	id INT NOT NULL PRIMARY KEY IDENTITY,
	proposta_id INT NOT NULL,
	servico_id INT NOT NULL,

	--PRIMARY KEY (id, proposta_ID, servico_ID), -- Chave Composta
	FOREIGN KEY (proposta_id) REFERENCES propostas(id),
    FOREIGN KEY (servico_id) REFERENCES servicos(id),

	quantidade INT NOT NULL,
	desconto DECIMAL(7,2),
	valor_unitario DECIMAL(7,2) NOT NULL,
	valor_total DECIMAL(9, 2) NOT NULL,
)

CREATE TABLE clientes_usuarios (
	cliente_id INT NOT NULL,
	usuario_id INT NOT NULL,
	PRIMARY KEY (cliente_ID, usuario_ID), -- Chave Composta

	FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
)

CREATE TABLE clientes_interesses (
	cliente_id INT NOT NULL,
	interesse_id INT NOT NULL,
	PRIMARY KEY (cliente_id, interesse_id), -- Chave Composta

	FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (interesse_id) REFERENCES interesses(id),
)

CREATE TABLE clientes_ramosAtividade (
	cliente_id INT NOT NULL,
	ramo_id INT NOT NULL,
	PRIMARY KEY (cliente_id, ramo_id), -- Chave Composta

	FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (ramo_id) REFERENCES ramosAtividade(id),
)

CREATE TABLE contratos (
	id INT NOT NULL PRIMARY KEY IDENTITY,

	cliente_id INT NOT NULL, -- Foreign Key
	FOREIGN KEY (cliente_id) REFERENCES clientes(id),

	proposta_id INT NOT NULL, -- Foreign Key
	FOREIGN KEY (proposta_id) REFERENCES propostas(id),

	condPag_id INT NOT NULL, -- Foreign Key
	FOREIGN KEY (condPag_ID) REFERENCES condicoesPagamento(id),

	data_contrato DATE NOT NULL DEFAULT GETDATE(),
	data_vencimento DATE NOT NULL,

	situacao VARCHAR(30) NOT NULL DEFAULT 'Vigente', -- Vigente, Cancelado, Vencido
)

CREATE TABLE contasReceber (
	id INT NOT NULL PRIMARY KEY IDENTITY,

	cliente_id INT NOT NULL, -- Foreign Key
	FOREIGN KEY (cliente_id) REFERENCES clientes(id),

	contrato_id INT NOT NULL, -- Foreign Key
	FOREIGN KEY (contrato_id) REFERENCES contratos(id),

	parcela_id INT NOT NULL, -- Foregin Key
	FOREIGN KEY (parcela_id) REFERENCES parcelas(id),

    valor_inicial DECIMAL(10, 2) NOT NULL,
	
	desconto DECIMAL(10, 2),
	juros DECIMAL(10, 2) DEFAULT 0,
	multa DECIMAL(10, 2) DEFAULT 0,

	total DECIMAL(10, 2) NOT NULL,
	
	valor_pago DECIMAL(10, 2) DEFAULT 0,
	valor_aberto DECIMAL(10, 2) DEFAULT 0,

    data_vencimento DATE NOT NULL,
	data_recebimento DATE,

    situacao VARCHAR(30) NOT NULL DEFAULT 'Pendente', -- Pendente, Atrasada, Vencida, Recebida	
)

CREATE TABLE ordemServicos (
	id INT NOT NULL PRIMARY KEY IDENTITY,

	cliente_id INT NOT NULL, -- Foreign Key
	FOREIGN KEY (cliente_id) REFERENCES clientes(id),

	contrato_id INT NOT NULL, -- Foreign Key
	FOREIGN KEY (contrato_id) REFERENCES contratos(id),

	usuario_id INT NULL, -- Foregin Key
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),

	servico_id INT NOT NULL, -- Foregin Key
	FOREIGN KEY (servico_id) REFERENCES servicos(id),

	data_prazo DATE NOT NULL,
	data_entrega DATE,
	
	tema VARCHAR(200) DEFAULT '',
	referencia VARCHAR(255) DEFAULT '',

	situacao VARCHAR(20) DEFAULT 'Pendente',
	postado VARCHAR(20) DEFAULT 'Não',
)



DROP TABLE ordemServicos
DROP TABLE contasReceber
DROP TABLE contratos
