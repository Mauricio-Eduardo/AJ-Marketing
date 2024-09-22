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
('SEO', 1500.00, 'Otimização para motores de busca, melhora da visibilidade nos resultados orgânicos.'),
('Google Ads', 2500.50, 'Campanhas pagas no Google, aumento de tráfego e conversões.'),
('Social Media', 1200.75, 'Gestão de redes sociais, criação de conteúdo e interação com seguidores.'),
('Email Marketing', 800.00, 'Campanhas de email para engajamento e retenção de clientes.'),
('Content Marketing', 2200.25, 'Criação de conteúdo relevante e de qualidade para atrair e engajar o público.'),
('Branding', 3500.00, 'Desenvolvimento de identidade de marca e estratégias de posicionamento.'),
('PPC Advertising', 3000.50, 'Anúncios pagos em diversas plataformas, como Google e redes sociais.'),
('Analytics', 1800.75, 'Análise de dados e métricas para otimização de campanhas e estratégias.'),
('Video Marketing', 4000.00, 'Criação e promoção de vídeos para aumentar o engajamento e alcance.'),
('Influencer Marketing', 5000.25, 'Parcerias com influenciadores para promover produtos e serviços.');

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
('00', 1, 5.00, 0.00, 0.00),
('15/30', 2, 0.00, 1.00, 0.00),
('30/60/90', 3, 0.00, 1.50, 0.00),
('15/30/45/60', 4, 0.00, 2.00, 0.00),
('15/30/45', 0, 0.00, 2.50, 0.00),
('30/60', 0, 0.00, 3.00, 0.00),
('30/60/90', 0, 0.00, 3.50, 0.00),
('30/60/90/120', 0, 0.00, 4.00, 0.00),
('30/60/90/120/150', 0, 0.00, 4.50, 0.00),
('30/60/90/120/150/180', 0, 0.00, 5.00, 0.00);

INSERT INTO parcelas (numeroParcela, dias, porcentagem, condPag_ID, formaPag_ID)
VALUES
(1, 30, 10.00, 1, 1),
(2, 60, 20.00, 2, 2),
(3, 90, 30.00, 2, 3),
(4, 120, 40.00, 3, 4),
(5, 150, 50.00, 3, 5),
(6, 180, 60.00, 3, 6),
(7, 210, 70.00, 4, 7),
(8, 240, 80.00, 4, 8),
(9, 270, 90.00, 4, 9),
(10, 300, 100.00, 4, 10);

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
('Ana Costa', 'ana.costa@email.com', 'senha123'),
('Pedro Santos', 'pedro.santos@email.com', 'senha123'),
('Fernanda Rocha', 'fernanda.rocha@email.com', 'senha123'),
('Lucas Mendes', 'lucas.mendes@email.com', 'senha123'),
('Patricia Lima', 'patricia.lima@email.com', 'senha123'),
('Rafael Dias', 'rafael.dias@email.com', 'senha123'),
('Juliana Martins', 'juliana.martins@email.com', 'senha123');

INSERT INTO origens (origem)
VALUES 
('Instagram'),
('Facebook'),
('LinkedIn'),
('Twitter'),
('WhatsApp'),
('Google Ads'),
('YouTube'),
('Website'),
('Referência de Cliente'),
('Evento');

INSERT INTO interesses (interesse)
VALUES 
('Tecnologia'),
('Saúde'),
('Educação'),
('Automóveis'),
('Moda'),
('Alimentação'),
('Viagens'),
('Imóveis'),
('Esportes'),
('Financeiro');

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
('Física', '12345678902', 'Maria Souza', 'Maria', 'RJ1234567', 'Feminino', 'maria.souza@example.com', '11987654323', 3, 'Rua C', '300', 'Bairro A', '', '12345680', 3),
('Jurídica', '12345678000295', 'Empresa XYZ', 'XYZ Ltda', 'SP12345679', '', 'contato@empresaxyz.com', '11987654324', 4, 'Rua D', '400', 'Bairro B', '', '12345681', 4),
('Física', '12345678903', 'Carlos Lima', 'Carlos', 'MG1234568', 'Masculino', 'carlos.lima@example.com', '11987654325', 5, 'Rua E', '500', 'Bairro C', '', '12345682', 5),
('Jurídica', '12345678000395', 'Empresa DEF', 'DEF Ltda', 'SP12345680', '', 'contato@empresadef.com', '11987654326', 6, 'Rua F', '600', 'Bairro D', '', '12345683', 6),
('Física', '12345678904', 'Ana Pereira', 'Ana', 'RJ1234568', 'Feminino', 'ana.pereira@example.com', '11987654327', 7, 'Rua G', '700', 'Bairro E', '', '12345684', 7),
('Jurídica', '12345678000495', 'Empresa GHI', 'GHI Ltda', 'SP12345681', '', 'contato@empresaghi.com', '11987654328', 8, 'Rua H', '800', 'Bairro F', '', '12345685', 8),
('Física', '12345678905', 'Fernanda Oliveira', 'Fernanda', 'MG1234569', 'Feminino', 'fernanda.oliveira@example.com', '11987654329', 9, 'Rua I', '900', 'Bairro G', '', '12345686', 9),
('Jurídica', '12345678000595', 'Empresa JKL', 'JKL Ltda', 'SP12345682', '', 'contato@empresajkl.com', '11987654330', 10, 'Rua J', '1000', 'Bairro H', '', '12345687', 10);

-- Inserindo os usuarios para cada cliente inserido
INSERT INTO clientes_usuarios(cliente_id, usuario_id)
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

-- Tabela temporária para armazenar os IDs das propostas inseridas
DECLARE @Propostas TABLE (PropostaID INT);

-- Inserindo as propostas e capturando os IDs gerados
INSERT INTO propostas (cliente_id, peridiocidade_id, data_proposta, prazo_final, data_inicio, total)
OUTPUT INSERTED.id INTO @Propostas(PropostaID)  -- Captura o ID das propostas inseridas
VALUES 
(1, 1, GETDATE(), GETDATE(), GETDATE(), 100.00),
(2, 2, GETDATE(), GETDATE(), GETDATE(), 200.00),
(3, 2, GETDATE(), GETDATE(), GETDATE(), 300.00),
(4, 2, GETDATE(), GETDATE(), GETDATE(), 400.00),
(5, 3, GETDATE(), GETDATE(), GETDATE(), 500.00),
(6, 3, GETDATE(), GETDATE(), GETDATE(), 600.00),
(7, 4, GETDATE(), GETDATE(), GETDATE(), 700.00),
(8, 4, GETDATE(), GETDATE(), GETDATE(), 800.00),
(9, 1, GETDATE(), GETDATE(), GETDATE(), 900.00),
(10, 1, GETDATE(), GETDATE(), GETDATE(), 1000.00);

-- Inserindo os serviços para cada proposta inserida
INSERT INTO propostas_servicos(proposta_id, servico_id, quantidade, valor_unitario, desconto, valor_total)
SELECT 
    p.PropostaID, 
    1,
    1, -- Quantidade
    10.00, -- Valor Unitário
    0.00, -- Desconto
    10.00  -- Valor Total
FROM @Propostas p
UNION ALL
SELECT 
    p.PropostaID, 
    2,
    2, 
    20.00, 
    5.00, 
    30.00
FROM @Propostas p
UNION ALL
SELECT 
    p.PropostaID, 
    3,
    3, 
    30.00, 
    10.00, 
    60.00
FROM @Propostas p;

INSERT INTO contratos (proposta_id, cliente_id, condPag_id, data_contrato, data_vencimento, situacao)
VALUES 
(1, 1, 1, GETDATE(), GETDATE(), 'Vigente'),
(2, 2, 2, GETDATE(), GETDATE(), 'Vigente'),
(3, 3, 3, GETDATE(), GETDATE(), 'Vigente'),
(4, 4, 4, GETDATE(), GETDATE(), 'Cancelado'),
(5, 5, 5, GETDATE(), GETDATE(), 'Cancelado'),
(6, 6, 6, GETDATE(), GETDATE(), 'Cancelado'),
(7, 7, 7, GETDATE(), GETDATE(), 'Cancelado'),
(8, 8, 8, GETDATE(), GETDATE(), 'Vigente'),
(9, 9, 9, GETDATE(), GETDATE(), 'Vigente'),
(10, 10, 10, GETDATE(), GETDATE(), 'Vigente');

INSERT INTO contasReceber (cliente_ID, contrato_ID, data_vencimento, valor, situacao)
VALUES 
(1, 1, '2024-02-01', 1000.00, 'Pendente'),
(2, 2, '2024-02-02', 2000.00, 'Pendente'),	
(3, 3, '2024-02-03', 1500.00, 'Pendente'),
(4, 4, '2024-02-04', 2500.00, 'Pendente'),
(5, 5, '2024-02-05', 3000.00, 'Pendente'),
(6, 6, '2024-02-06', 3500.00, 'Pendente'),
(7, 7, '2024-02-07', 4000.00, 'Pendente'),
(8, 8, '2024-02-08', 4500.00, 'Pendente'),
(9, 9, '2024-02-09', 5000.00, 'Pendente'),
(10, 10, '2024-02-10', 5500.00, 'Pendente');
