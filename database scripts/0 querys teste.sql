use ajmarketing;

DROP TABLE clientes_interesses
DROP TABLE clientes_usuarios
DROP TABLE clientes_ramosAtividade
DROP TABLE clientes

DROP TABLE PROPOSTAS

SELECT * FROM propostas WHERE id = 9




SELECT * FROM clientes_usuarios
SELECT * FROM propostas

ALTER TABLE propostas

INSERT INTO clientes_usuarios (cliente_ID, usuario_ID)
VALUES (2, 2);

SELECT * FROM clientes WHERE id = 1

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

SELECT c.id, c.cliente_id, cl.cpf_cnpj, cl.nome_razaoSocial, c.contrato_id, cp.condicaoPagamento, 
c.parcela_id, p.numeroParcela, cp.quantidadeParcelas, c.data_vencimento, c.valor_inicial, c.desconto, c.juros, c.multa, 
c.total, c.data_recebimento, c.situacao
FROM contasReceber c
INNER JOIN clientes cl ON c.cliente_id = cl.id 
INNER JOIN contratos co ON c.contrato_id = co.id 
INNER JOIN parcelas p ON c.parcela_id = p.id
INNER JOIN condicoesPagamento cp ON p.condPag_id = cp.id


-- Declarar variáveis
DECLARE @data_contrato DATE;
DECLARE @valor_inicial DECIMAL(10, 2);

-- Obter a data de vencimento do contrato
SELECT @data_contrato = data_vencimento
FROM contratos
WHERE id = @contrato_id;

-- Obter o valor inicial das parcelas
SELECT @valor_inicial = (valor do contrato ou algum valor necessário para calcular as parcelas)

-- Loop nas parcelas associadas à condição de pagamento
INSERT INTO contasReceber (cliente_id, contrato_id, parcela_id, data_vencimento, valor_inicial, desconto, juros, multa, total, situacao)
SELECT 
    @cliente_id,                         -- ID do cliente
    @contrato_id,                        -- ID do contrato
    p.id AS parcela_id,                  -- ID da parcela
    DATEADD(DAY, p.dias, @data_contrato), -- Calcula a data de vencimento da parcela
    @valor_inicial * (p.porcentagem / 100), -- Calcula o valor inicial da parcela com base na porcentagem
    p.desconto,                          -- Desconto para a parcela (se existir)
    p.juros,                             -- Juros para a parcela (se existir)
    p.multa,                             -- Multa para a parcela (se existir)
    @valor_inicial * (p.porcentagem / 100), -- Total (valor inicial, possivelmente ajustado por juros e desconto)
    'Pendente'                           -- Situação inicial da conta a receber
FROM parcelas p
WHERE p.condPag_id = @condPag_id;

-- Atualiza a data de alteração do contrato
UPDATE contratos
SET data_ult_alt = GETDATE()
WHERE id = @contrato_id;


SELECT desconto, juros, multa
FROM condicoesPagamento
WHERE id = 1

SELECT * FROM contasReceber

SELECT * FROM contratos
WHERE id = 1

SELECT o.id, o.cliente_id, c.nome_razaoSocial, o.contrato_id, o.usuario_id, u.nome, o.servico_id, s.servico,
o.data_prazo, o.data_entrega, o.tema, o.referencia, o.situacao, o.postado
FROM ordensServico o
INNER JOIN clientes c ON o.cliente_id = c.id
INNER JOIN servicos s ON o.servico_id = s.id
LEFT JOIN usuarios u ON o.usuario_id = u.id


SELECT o.id, o.cliente_id, o.contrato_id, o.usuario_id, o.servico_id,
o.data_prazo, o.data_entrega, o.tema, o.referencia, o.situacao, o.postado
FROM ordensServico o

SELECT * FROM ordensServico

SELECT * FROM peridiocidades WHERE ativo = 1

SELECT * FROM contratos

INSERT INTO paises (pais, sigla, ddi)
VALUES ('TESTE', 'tt', '444')

DELETE FROM ordensServico
DELETE FROM contasReceber
DELETE FROM contratos
DELETE FROM propostas_servicos
DELETE FROM propostas

SELECT * FROM contratos
SELECT * FROM propostas 

SELECT * FROM ordensServico
WHERE contrato_id = 9

SELECT * FROM contasReceber

SELECT * FROM contasReceber
ORDER BY data_vencimento ASC

SELECT * FROM contasReceber
WHERE cliente_id = 9

SELECT * FROM recebimentos


DELETE FROM contratos