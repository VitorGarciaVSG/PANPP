-- ===================================
-- BANCO DE DADOS - EVENTO DESPORTIVO
-- ===================================
-- Database: u880459407_campeonato
-- Created: 2026-08-25

-- ===================================
-- TABELA: categorias
-- ===================================
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL UNIQUE,
  `descricao` TEXT,
  `ativa` BOOLEAN DEFAULT TRUE,
  `criada_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- TABELA: inscritos
-- ===================================
CREATE TABLE IF NOT EXISTS `inscritos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `telefone` VARCHAR(20) NOT NULL,
  `categoria_id` INT NOT NULL,
  `equipe` VARCHAR(100),
  `status` ENUM('pendente', 'aprovado', 'recusado') DEFAULT 'pendente',
  `cpf` VARCHAR(11),
  `data_nascimento` DATE,
  `endereco` TEXT,
  `cidade` VARCHAR(100),
  `estado` VARCHAR(2),
  `cep` VARCHAR(8),
  `observacoes` TEXT,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT,
  INDEX `idx_status` (`status`),
  INDEX `idx_categoria_id` (`categoria_id`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- TABELA: jogos/partidas
-- ===================================
CREATE TABLE IF NOT EXISTS `jogos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `categoria_id` INT NOT NULL,
  `inscrito1_id` INT NOT NULL,
  `inscrito2_id` INT,
  `fase` ENUM('classificatoria', 'semifinal', 'final') DEFAULT 'classificatoria',
  `data_jogo` DATETIME,
  `resultado` VARCHAR(50),
  `vencedor_id` INT,
  `pontuacao1` INT DEFAULT 0,
  `pontuacao2` INT DEFAULT 0,
  `status` ENUM('agendado', 'em_andamento', 'finalizado', 'cancelado') DEFAULT 'agendado',
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT,
  FOREIGN KEY (`inscrito1_id`) REFERENCES `inscritos`(`id`) ON DELETE RESTRICT,
  FOREIGN KEY (`inscrito2_id`) REFERENCES `inscritos`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`vencedor_id`) REFERENCES `inscritos`(`id`) ON DELETE SET NULL,
  INDEX `idx_categoria_id` (`categoria_id`),
  INDEX `idx_data_jogo` (`data_jogo`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- TABELA: palpites
-- ===================================
CREATE TABLE IF NOT EXISTS `palpites` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `jogo_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `palpite` VARCHAR(50),
  `acertou` BOOLEAN DEFAULT NULL,
  `pontos` INT DEFAULT 0,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`jogo_id`) REFERENCES `jogos`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`usuario_id`) REFERENCES `inscritos`(`id`) ON DELETE CASCADE,
  INDEX `idx_jogo_id` (`jogo_id`),
  INDEX `idx_usuario_id` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- TABELA: ranking
-- ===================================
CREATE TABLE IF NOT EXISTS `ranking` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `categoria_id` INT NOT NULL,
  `inscrito_id` INT NOT NULL,
  `posicao` INT,
  `vitorias` INT DEFAULT 0,
  `derrotas` INT DEFAULT 0,
  `pontos_totais` INT DEFAULT 0,
  `atualizado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_categoria_inscrito` (`categoria_id`, `inscrito_id`),
  FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`inscrito_id`) REFERENCES `inscritos`(`id`) ON DELETE CASCADE,
  INDEX `idx_categoria_id` (`categoria_id`),
  INDEX `idx_posicao` (`posicao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- TABELA: datas_importantes
-- ===================================
CREATE TABLE IF NOT EXISTS `datas_importantes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `evento` VARCHAR(255) NOT NULL,
  `data` DATE NOT NULL,
  `descricao` TEXT,
  `ativo` BOOLEAN DEFAULT TRUE,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_data` (`data`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- TABELA: usuarios_admin
-- ===================================
CREATE TABLE IF NOT EXISTS `usuarios_admin` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario` VARCHAR(100) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `ativo` BOOLEAN DEFAULT TRUE,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- INSERTS INICIAIS
-- ===================================

-- Inserir categorias
INSERT INTO `categorias` (`nome`, `descricao`, `ativa`) VALUES
('Futebol', 'Categoria de Futebol', TRUE),
('Ping Pong', 'Categoria de Ping Pong', TRUE),
('Dominó', 'Categoria de Dominó', TRUE),
('Volei', 'Categoria de Volei', TRUE),
('Dama', 'Categoria de Dama', TRUE),
('Xadrez', 'Categoria de Xadrez', TRUE),
('Sinuca', 'Categoria de Sinuca', TRUE),
('Truco', 'Categoria de Truco', TRUE);

-- Inserir datas importantes
INSERT INTO `datas_importantes` (`evento`, `data`, `descricao`, `ativo`) VALUES
('Fim das Inscrições', '2026-08-25', 'Último dia para se inscrever no evento', TRUE),
('Classificatórias - Fase 1', '2026-09-11', 'Primeira fase das classificatórias', TRUE),
('Classificatórias - Fase 2', '2026-09-18', 'Segunda fase das classificatórias', TRUE),
('Final e Premiação', '2026-09-25', 'Partidas finais, entrega de medalhas e churrasco', TRUE);

-- ===================================
-- Criar um usuário admin padrão
-- ===================================
-- IMPORTANTE: Altere a senha abaixo!
-- Usar: INSERT INTO usuarios_admin (usuario, senha, email) VALUES ('admin', PASSWORD('sua_senha'), 'admin@caesb.com');
