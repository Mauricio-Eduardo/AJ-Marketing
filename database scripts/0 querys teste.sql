use ajmarketing;

SELECT * FROM clientes_usuarios
SELECT * FROM usuarios

INSERT INTO clientes_usuarios (cliente_ID, usuario_ID)
VALUES (2, 2);

SELECT cl.cliente_ID, cl.tipo_pessoa, cl.cpf_cnpj, cl.nome_razaoSocial, cl.apelido_nomeFantasia, cl.rg_inscricaoEstadual, 
cl.dataNascimento_dataAbertura, cl.genero, cl.email, cl.celular, cl.ramo_atividade, cl.cidade_ID, c.cidade, e.estado, p.pais, 
cl.logradouro, cl.numero, cl.bairro, cl.complemento, cl.cep, cl.origem_ID, o.origem, cl.interesses, cl.ativo, cl.data_cadastro, 
cl.data_ult_alt 
FROM clientes cl 
INNER JOIN cidades c ON cl.cidade_ID = c.cidade_ID
INNER JOIN estados e ON c.estado_ID = e.estado_ID
INNER JOIN paises p ON e.pais_ID = p.pais_ID
INNER JOIN origens o ON cl.origem_ID = o.origem_ID
WHERE cl.ativo = 1

DROP TABLE servicos

SELECT cl.cliente_ID, cl.tipo_pessoa, cl.cpf_cnpj, cl.nome_razaoSocial, cl.apelido_nomeFantasia, cl.rg_inscricaoEstadual,
cl.dataNascimento_dataAbertura, cl.genero, cl.email, cl.celular, cl.ramo_atividade,
cl.cidade_ID, c.cidade, e.estado, p.pais, cl.logradouro, cl.numero, cl.bairro, cl.complemento, cl.cep,
cl.origem_ID, o.origem, cl.interesses,
cl.ativo, cl.data_cadastro, cl.data_ult_alt

FROM clientes cl
INNER JOIN cidades c ON cl.cidade_ID = c.cidade_ID
INNER JOIN estados e ON c.estado_ID = e.estado_ID
INNER JOIN paises p ON e.pais_ID = p.pais_ID
INNER JOIN origens o ON cl.origem_ID = o.origem_ID

WHERE cl.ativo = 1

SELECT * FROM formasPagamento WHERE ativo = 1

DROP TABLE formasPagamento;

SELECT * FROM PARCELAS WHERE condPag_ID = 1