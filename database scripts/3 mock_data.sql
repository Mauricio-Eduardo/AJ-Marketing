USE ajmarketing

INSERT INTO paises (pais, sigla, ddi)
VALUES
('Brasil',  'BR', '55'),
('Argentina', 'AR', '54'),
('Chile', 'CL', '56'),
('Uruguai', 'UY', '598'),
('Paraguai', 'PY', '595'),
('Bolívia', 'BO', '591'),
('Peru', 'PE', '51'),
('Equador', 'EC', '593'),
('Colômbia', 'CO', '57'),
('Venezuela', 'VE', '58');

INSERT INTO estados (pais_ID, estado, uf)
VALUES
(1, 'São Paulo', 'SP'),
(1, 'Rio de Janeiro', 'RJ'),
(1, 'Minas Gerais', 'MG'),
(1, 'Espírito Santo', 'ES'),
(1, 'Paraná', 'PR'),
(1, 'Santa Catarina', 'SC'),
(1, 'Rio Grande do Sul', 'RS'),
(1, 'Bahia', 'BA'),
(1, 'Pernambuco', 'PE'),
(1, 'Ceará', 'CE');

INSERT INTO cidades (estado_ID, cidade, ddd)
VALUES
(1, 'São Paulo', '11'),
(2, 'Rio de Janeiro', '21'),
(3, 'Belo Horizonte', '31'),
(4, 'Vitória', '27'),
(5, 'Curitiba', '41'),
(6, 'Florianópolis', '48'),
(7, 'Porto Alegre', '51'),
(8, 'Salvador', '71'),
(9, 'Recife', '81'),
(10, 'Fortaleza', '85');

INSERT INTO servicos (servico, valor, descricao)
VALUES 
('Campanha', 1000.00, ''),
('Post Instagram', 100.00, ''),
('Reels Instagram', 150.00, ''),
('Tráfego Pago', 2000.00, ''),
('Video Youtube', 200.00, '');

INSERT INTO formasPagamento (formaPagamento) 
VALUES
('Cartão de Crédito'),
('Boleto'),
('Transferência Bancária'),
('PIX'),
('Dinheiro'),
('Cheque'),
('Cartão de Débito'),
('PayPal'),
('Crédito Consignado'),
('Vale Alimentação');

INSERT INTO condicoesPagamento (condicaoPagamento, quantidadeParcelas, desconto, juros, multa) 
VALUES
('30/60/90/120/150/180', 6, 1.00, 2.00, 5.00);

INSERT INTO parcelas (numeroParcela, dias, porcentagem, condPag_ID, formaPag_ID)
VALUES
(1, 30, 16.70, 1, 4),
(2, 60, 16.66, 1, 4),
(3, 90, 16.66, 1, 4),
(4, 120, 16.66, 1, 4),
(5, 150, 16.66, 1, 4),
(6, 180, 16.66, 1, 4);

INSERT INTO peridiocidades (descricao, dias)
VALUES 
('Semanal', 7),
('Quinzenal', 15), 
('Mensal', 30),
('Anual', 365);

INSERT INTO usuarios (nome, email, senha)
VALUES
('João Silva', 'joao.silva@email.com', 'senha123'),
('Maria Oliveira', 'maria.oliveira@email.com', 'senha123'),
('Carlos Souza', 'carlos.souza@email.com', 'senha123'),
('Ana Costa', 'ana.costa@email.com', 'senha123');

INSERT INTO origens (origem)
VALUES 
('Instagram'),
('Facebook'),
('WhatsApp'),
('Google Ads'),
('YouTube'),
('Site');

INSERT INTO interesses (interesse)
VALUES 
('Tráfego Pago'),
('Meta Business'),
('Campanhas');

INSERT INTO ramosAtividade (ramo)
VALUES 
('Comércio'),
('Serviços'),
('Indústria'),
('Agronegócio'),
('Tecnologia'),
('Educação'),
('Saúde'),
('Transportes'),
('Financeiro'),
('Imobiliário');

-- Tabela temporária para armazenar os IDs das propostas inseridas
DECLARE @Clientes TABLE (ClienteID INT);

-- Inserindo ao clientes e capturando os IDs gerados
INSERT INTO clientes (
    tipo_pessoa, 
    cpf_cnpj, 
    nome_razaoSocial, 
    apelido_nomeFantasia, 
    rg_inscricaoEstadual, 
    genero,
    email, 
    celular, 
    cidade_id, 
    logradouro, 
    numero, 
    bairro, 
    complemento, 
    cep, 
    origem_id 
)
OUTPUT INSERTED.id INTO @Clientes(ClienteID)  -- Captura o ID das propostas inseridas
VALUES 
('Física', '12345678901', 'João Silva', 'João', 'MG1234567', 'Masculino', 'joao.silva@example.com', '11987654321', 1, 'Rua A', '100', 'Centro', '', '12345678', 1),
('Jurídica', '12345678000195', 'Empresa ABC', 'ABC Ltda', 'SP12345678', '', 'contato@empresaabc.com', '11987654322', 2, 'Rua B', '200', 'Centro', '', '12345679', 2),
('Física', '12345678902', 'Maria Souza', 'Maria', 'RJ1234567', 'Feminino', 'maria.souza@example.com', '11987654323', 3, 'Rua C', '300', 'Bairro A', '', '12345680', 3);
-- Inserindo os usuarios para cada cliente inserido
INSERT INTO clientes_interesses(cliente_id, interesse_id)
SELECT 
    c.ClienteID, 
    1
FROM @Clientes c
UNION ALL
SELECT 
    c.ClienteID, 
    2
FROM @Clientes c
UNION ALL
SELECT 
    c.ClienteID, 
    3
FROM @Clientes c

-- Inserindo os usuarios para cada cliente inserido
INSERT INTO clientes_ramosAtividade(cliente_id, ramo_id)
SELECT 
    c.ClienteID, 
    1
FROM @Clientes c
UNION ALL
SELECT 
    c.ClienteID, 
    2
FROM @Clientes c
UNION ALL
SELECT 
    c.ClienteID, 
    3
FROM @Clientes c;