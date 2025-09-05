-- Script de Setup do Banco de Dados - Portfolio Liuken Monteiro v2.0
CREATE DATABASE IF NOT EXISTS portfolio_advanced_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_advanced_db;

-- Tabela de projetos
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    technologies JSON,
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'beta', 'development', 'maintenance', 'deprecated') DEFAULT 'active',
    stats JSON,
    views INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_featured (featured),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de mensagens de contato
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    phone VARCHAR(20),
    status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_created (created_at),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de estatísticas
CREATE TABLE IF NOT EXISTS portfolio_stats (
    id INT PRIMARY KEY DEFAULT 1,
    total_views BIGINT UNSIGNED DEFAULT 0,
    projects_count INT DEFAULT 0,
    messages_count INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de analytics
CREATE TABLE IF NOT EXISTS page_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page VARCHAR(100) NOT NULL,
    referrer VARCHAR(500),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_page (page),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de tecnologias
CREATE TABLE IF NOT EXISTS technologies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category ENUM('frontend', 'backend', 'database', 'cloud', 'tools', 'ai', 'mobile') DEFAULT 'tools',
    proficiency INT DEFAULT 50 CHECK (proficiency >= 0 AND proficiency <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir dados de exemplo - Projetos
INSERT INTO projects (title, slug, description, technologies, live_url, github_url, image_url, featured, status, stats) VALUES
(
    'SaaS Dashboard Analytics',
    'saas-dashboard-analytics',
    'Plataforma completa de analytics com IA integrada, processamento de big data em tempo real, dashboards personalizáveis e machine learning para predições de negócio.',
    '["React", "Node.js", "Python", "TensorFlow", "MongoDB", "Redis", "WebSocket"]',
    'https://analytics-dashboard-liuken.vercel.app',
    'https://github.com/LiukenMonteiro/analytics-dashboard',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    TRUE,
    'active',
    '{"users": "10K+", "performance": "99.9%", "rating": 4.9}'
),
(
    'E-commerce Inteligente',
    'ecommerce-inteligente',
    'Marketplace com recomendações por IA, chatbot integrado, sistema de pagamentos múltiplos, AR para visualização de produtos e analytics avançados.',
    '["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "OpenAI", "Three.js"]',
    'https://ecommerce-ia-liuken.vercel.app',
    'https://github.com/LiukenMonteiro/ecommerce-inteligente',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    TRUE,
    'beta',
    '{"users": "5K+", "performance": "98.5%", "rating": 4.8}'
),
(
    'Sistema ERP Empresarial',
    'sistema-erp-empresarial',
    'ERP completo com módulos de CRM, financeiro, estoque, RH e BI. Interface moderna, relatórios dinâmicos e integração com múltiplas APIs.',
    '["React", "Node.js", "MySQL", "Express", "Chart.js", "Socket.io", "JWT"]',
    'https://erp-system-liuken.vercel.app',
    'https://github.com/LiukenMonteiro/erp-system',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    TRUE,
    'active',
    '{"users": "2K+", "performance": "99.2%", "rating": 4.7}'
);

-- Inserir tecnologias
INSERT INTO technologies (name, category, proficiency) VALUES
('React', 'frontend', 95),
('Node.js', 'backend', 92),
('TypeScript', 'frontend', 88),
('Python', 'backend', 85),
('MySQL', 'database', 90),
('MongoDB', 'database', 87),
('AWS', 'cloud', 82),
('Docker', 'tools', 85),
('TensorFlow', 'ai', 75);

-- Inserir estatísticas iniciais
INSERT INTO portfolio_stats (id, total_views, projects_count, messages_count) VALUES 
(1, 0, 3, 0);

-- Views úteis
CREATE VIEW active_projects AS
SELECT * FROM projects 
WHERE status = 'active' 
ORDER BY featured DESC, created_at DESC;

-- Triggers para atualizar estatísticas
DELIMITER $

CREATE TRIGGER update_projects_count
AFTER INSERT ON projects
FOR EACH ROW
BEGIN
    UPDATE portfolio_stats 
    SET projects_count = (SELECT COUNT(*) FROM projects WHERE status = 'active')
    WHERE id = 1;
END$

CREATE TRIGGER update_messages_count
AFTER INSERT ON contact_messages
FOR EACH ROW
BEGIN
    UPDATE portfolio_stats 
    SET messages_count = (SELECT COUNT(*) FROM contact_messages)
    WHERE id = 1;
END$

DELIMITER ;

SELECT 'Banco de dados configurado com sucesso!' as status;
