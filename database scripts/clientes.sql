use ajmarketing;

CREATE TABLE clientes (
	cliente_ID INT NOT NULL PRIMARY KEY IDENTITY,

	-- Flag: Física ou Jurídica
	tipo_pessoa VARCHAR(8) NOT NULL, 
	
		-- Jurídica 
		cnpj VARCHAR(14),
		razao_social VARCHAR(50),
		nome_fantasia VARCHAR(50), 
  
		-- Física
		cpf VARCHAR(11),
		nome VARCHAR(50),

	-- Flag: Cliente ou Lead
	tipo_cliente VARCHAR(7) NOT NULL, 

		-- Lead
		interesses VARCHAR(255),
		origem VARCHAR(30),
		situacao VARCHAR(30),

		-- Cliente
		insc_estadual VARCHAR(15),
		insc_municipal varchar(15),

	email VARCHAR(50) NOT NULL,
	celular VARCHAR(11) NOT NULL,
	ramo_atividade VARCHAR(30),

	-- Endereço
	cidade_ID INT NOT NULL, -- Foreign Key
	logradouro VARCHAR(80) NOT NULL,
	numero VARCHAR(6) NOT NULL,
	bairro VARCHAR(30) NOT NULL,
	complemento VARCHAR(80),
	cep VARCHAR(8) NOT NULL,

	ativo BIT NOT NULL,
	data_cadastro DATETIME NOT NULL,
	data_ult_alt DATETIME NOT NULL,
);

ALTER TABLE clientes
ADD FOREIGN KEY (cidade_ID) REFERENCES cidades(cidade_ID);