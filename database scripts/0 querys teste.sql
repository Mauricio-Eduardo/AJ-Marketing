use ajmarketing;

SELECT * FROM usuarios;

DELETE FROM usuarios

SELECT * FROM condicoesPagamento

SELECT * from parcelas WHERE condPag_id = 2


DELETE FROM usuarios 
WHERE id = 11
AND senha = 123

SELECT * FROM contasReceber

UPDATE usuarios SET nome = 'Mauricio Eduardo'
WHERE id = 2
AND senha = 'asdsadsa'

SELECT * FROM ordensServico 
WHERE usuario_id = 11

INSERT INTO paises (pais, sigla, ddi)
VALUES ('brasil', 'br', '55')

DELETE FROM paises
WHERE pais = 'Brasil'