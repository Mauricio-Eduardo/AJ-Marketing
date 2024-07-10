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

INSERT INTO condicoesPagamento (condicaoPagamento, desconto, juros, multa) 
VALUES
('00', 5.00, 0.00, 0.00),
('15', 0.00, 1.00, 0.00),
('30', 0.00, 1.50, 0.00),
('15/30', 0.00, 2.00, 0.00),
('15/30/45', 0.00, 2.50, 0.00),
('30/60', 0.00, 3.00, 0.00),
('30/60/90', 0.00, 3.50, 0.00),
('30/60/90/120', 0.00, 4.00, 0.00),
('30/60/90/120/150', 0.00, 4.50, 0.00),
('30/60/90/120/150/180', 0.00, 5.00, 0.00);

INSERT INTO parcelas (numeroParcela, dias, porcentagem, condPag_ID, formaPag_ID)
VALUES
(1, 30, 10.00, 1, 1),
(2, 60, 20.00, 2, 2),
(3, 90, 30.00, 3, 3),
(4, 120, 40.00, 4, 4),
(5, 150, 50.00, 5, 5),
(6, 180, 60.00, 6, 6),
(7, 210, 70.00, 7, 7),
(8, 240, 80.00, 8, 8),
(9, 270, 90.00, 9, 9),
(10, 300, 100.00, 10, 10);

INSERT INTO propostas (tipo_pessoa, cpf_cnpj, nome_razaoSocial, email, celular, prazo_final, inicio, termino, total)
VALUES 
('Física', '12345678901', 'João Silva', 'joao.silva@example.com', '11987654321', GETDATE(), GETDATE(), GETDATE(), 1000.00),
('Jurídica', '12345678000195', 'Empresa ABC', 'contato@empresaabc.com', '11987654322', GETDATE(), GETDATE(), GETDATE(), 1000.00),
('Física', '12345678902', 'Maria Souza', 'maria.souza@example.com', '11987654323', GETDATE(), GETDATE(), GETDATE(), 1000.00),
('Jurídica', '12345678000295', 'Empresa XYZ', 'contato@empresaxyz.com', '11987654324', GETDATE(), GETDATE(), GETDATE(), 1000.00),
('Física', '12345678903', 'Carlos Lima', 'carlos.lima@example.com', '11987654325', GETDATE(), GETDATE(), GETDATE(), 1000.00),
('Jurídica', '12345678000395', 'Empresa DEF', 'contato@empresadef.com', '11987654326', GETDATE(), GETDATE(), GETDATE(), 1000.00),
('Física', '12345678904', 'Ana Pereira', 'ana.pereira@example.com', '11987654327', GETDATE(), GETDATE(), GETDATE(), 1000.00),
('Jurídica', '12345678000495', 'Empresa GHI', 'contato@empresaghi.com', '11987654328', GETDATE(), GETDATE(), GETDATE(), 1000.00),
('Física', '12345678905', 'Fernanda Oliveira', 'fernanda.oliveira@example.com', '11987654329', GETDATE(), GETDATE(), GETDATE(), 1000.00),
('Jurídica', '12345678000595', 'Empresa JKL', 'contato@empresajkl.com', '11987654330', GETDATE(), GETDATE(), GETDATE(), 1000.00);


DECLARE @PropostaID INT;
SET @PropostaID = SCOPE_IDENTITY();

INSERT INTO propostas_servicos(proposta_ID, servico_ID, quantidade, valor_unitario)
VALUES
	(@PropostaID, FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 1, 10.00),
	(@PropostaID, FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 2, 20.00),
	(@PropostaID, FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 3, 30.00);

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

INSERT INTO clientes (
	proposta_ID,
    tipo_pessoa, 
    cpf_cnpj, 
    nome_razaoSocial, 
    apelido_nomeFantasia, 
    rg_inscricaoEstadual, 
    genero,
    email, 
    celular, 
    cidade_ID, 
    logradouro, 
    numero, 
    bairro, 
    complemento, 
    cep, 
    origem_ID, 
    interesse_ID,
    ramo_ID
) 
VALUES 
(FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Física', '12345678901', 'João Silva', 'João', 'MG1234567', 'Masculino', 'joao.silva@example.com', '11987654321', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Rua A', '100', 'Centro', NULL, '12345678', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID())))),
(FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Jurídica', '12345678000195', 'Empresa ABC', 'ABC Ltda', 'SP12345678', NULL, 'contato@empresaabc.com', '11987654322', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Rua B', '200', 'Centro', NULL, '12345679', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID())))),
(FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Física', '12345678902', 'Maria Souza', 'Maria', 'RJ1234567', 'Feminino', 'maria.souza@example.com', '11987654323', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Rua C', '300', 'Bairro A', NULL, '12345680', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID())))),
(FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Jurídica', '12345678000295', 'Empresa XYZ', 'XYZ Ltda', 'SP12345679', NULL, 'contato@empresaxyz.com', '11987654324', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Rua D', '400', 'Bairro B', NULL, '12345681', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID())))),
(FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Física', '12345678903', 'Carlos Lima', 'Carlos', 'MG1234568', 'Masculino', 'carlos.lima@example.com', '11987654325', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Rua E', '500', 'Bairro C', NULL, '12345682', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID())))),
(FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Jurídica', '12345678000395', 'Empresa DEF', 'DEF Ltda', 'SP12345680', NULL, 'contato@empresadef.com', '11987654326', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Rua F', '600', 'Bairro D', NULL, '12345683', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID())))),
(FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Física', '12345678904', 'Ana Pereira', 'Ana', 'RJ1234568', 'Feminino', 'ana.pereira@example.com', '11987654327', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Rua G', '700', 'Bairro E', NULL, '12345684', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID())))),
(FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Jurídica', '12345678000495', 'Empresa GHI', 'GHI Ltda', 'SP12345681', NULL, 'contato@empresaghi.com', '11987654328', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Rua H', '800', 'Bairro F', NULL, '12345685', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID())))),
(FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Física', '12345678905', 'Fernanda Oliveira', 'Fernanda', 'MG1234569', 'Feminino', 'fernanda.oliveira@example.com', '11987654329', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Rua I', '900', 'Bairro G', NULL, '12345686', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID())))),
(FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Jurídica', '12345678000595', 'Empresa JKL', 'JKL Ltda', 'SP12345682', NULL, 'contato@empresajkl.com', '11987654330', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), 'Rua J', '1000', 'Bairro H', NULL, '12345687', FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))), FLOOR(1 + (10 - 1 + 1) * RAND(CHECKSUM(NEWID()))));


DECLARE @ClienteID INT;
SET @ClienteID = SCOPE_IDENTITY();

INSERT INTO clientes_usuarios (cliente_ID, usuario_ID)
VALUES
	(@ClienteID, 1),
	(@ClienteID, 2),
	(@ClienteID, 3);


INSERT INTO contratos (proposta_ID, cliente_ID, condPag_ID, total, situacao)
VALUES 
(1, 1, 1, 1000.00, 'Vigente'),
(2, 2, 2, 2000.00, 'Vigente'),
(3, 3, 3, 1500.00, 'Vigente'),
(4, 4, 4, 2500.00, 'A vencer'),
(5, 5, 5, 3000.00, 'A vencer'),
(6, 6, 6, 3500.00, 'A vencer'),
(7, 7, 7, 4000.00, 'Vencido'),
(8, 8, 8, 4500.00, 'Vencido'),
(9, 9, 9, 5000.00, 'Vencido'),
(10, 10, 10, 5500.00, 'Vencido');

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
