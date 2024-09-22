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

SELECT * FROM propostas_servicos

 SELECT ps.id, ps.proposta_id, ps.servico_id, s.servico, ps.quantidade, ps.valor_unitario, ps.desconto, ps.valor_total 
 FROM propostas_servicos ps 
 INNER JOIN servicos s ON ps.servico_id = s.id 
 WHERE ps.proposta_id = 40

 SELECT * FROM propostas_servicos WHERE proposta_id = 20
 SELECT * FROM propostas where id = 20
 SELECT * FROM servicos

 UPDATE propostas SET situacao = 'Recusada' WHERE id = 33

 SELECT * FROM clientes

SELECT cl.id, cl.tipo_pessoa, cl.cpf_cnpj, cl.nome_razaoSocial, cl.apelido_nomeFantasia, cl.rg_inscricaoEstadual,
cl.genero, cl.email, cl.celular, cl.cidade_id, c.cidade, e.estado, p.pais, cl.logradouro, cl.numero, cl.bairro,
cl.complemento, cl.cep, cl.origem_id, o.origem, cl.situacao, cl.ativo, cl.data_cadastro, cl.data_ult_alt

FROM clientes cl

INNER JOIN cidades c ON cl.cidade_id = c.id
INNER JOIN estados e ON c.estado_id = e.id
INNER JOIN paises p ON e.pais_id = p.id
INNER JOIN origens o ON cl.origem_id = o.id

WHERE cl.id = 1

SELECT * FROM clientes_usuarios

SELECT * FROM contratos

DROP TABLE contratos