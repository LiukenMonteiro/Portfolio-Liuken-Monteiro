// server.js - Backend Avançado para Portfolio
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de Segurança
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: { error: 'Muitas tentativas, tente novamente em 15 minutos' }
});
app.use('/api/', limiter);

// Rate limit específico para contato
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // máximo 5 mensagens por hora
  message: { error: 'Muitas mensagens enviadas, tente novamente em 1 hora' }
});

// Configuração do banco de dados MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_advanced_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acesso requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// ===========================================
// ROTAS PRINCIPAIS
// ===========================================

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '2.0.0'
  });
});

// Buscar todos os projetos
app.get('/api/projects', async (req, res) => {
  try {
    const { featured, status, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM projects WHERE 1=1';
    const params = [];
    
    if (featured === 'true') {
      query += ' AND featured = true';
    }
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY featured DESC, created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const [rows] = await pool.execute(query, params);
    
    // Parse JSON fields
    const projects = rows.map(project => ({
      ...project,
      technologies: JSON.parse(project.technologies || '[]'),
      stats: JSON.parse(project.stats || '{}')
    }));
    
    res.json({
      success: true,
      data: projects,
      total: projects.length
    });
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Enviar mensagem de contato
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;
    
    // Validações
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome, email e mensagem são obrigatórios' 
      });
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email inválido' 
      });
    }
    
    // Salvar no banco
    const [result] = await pool.execute(
      `INSERT INTO contact_messages 
       (name, email, subject, message, phone, ip_address, user_agent) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        email, 
        subject || 'Contato via Portfolio', 
        message, 
        phone || null,
        req.ip,
        req.get('User-Agent')
      ]
    );
    
    // Enviar email
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'Liuken37@gmail.com',
        subject: `🚀 Nova mensagem do portfólio - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px;">Nova Mensagem do Portfolio!</h1>
            </div>
            
            <div style="padding: 30px; background: #f8f9fa;">
              <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-top: 0;">Detalhes do Contato</h2>
                
                <div style="margin: 20px 0;">
                  <strong style="color: #667eea;">Nome:</strong> ${name}
                </div>
                
                <div style="margin: 20px 0;">
                  <strong style="color: #667eea;">Email:</strong> 
                  <a href="mailto:${email}" style="color: #764ba2;">${email}</a>
                </div>
                
                ${phone ? `
                <div style="margin: 20px 0;">
                  <strong style="color: #667eea;">Telefone:</strong> ${phone}
                </div>
                ` : ''}
                
                <div style="margin: 20px 0;">
                  <strong style="color: #667eea;">Assunto:</strong> ${subject || 'Contato via Portfolio'}
                </div>
                
                <div style="margin: 20px 0;">
                  <strong style="color: #667eea;">Mensagem:</strong>
                  <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #667eea;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                
                <div style="margin: 20px 0; font-size: 12px; color: #666;">
                  <strong>Recebido em:</strong> ${new Date().toLocaleString('pt-BR')}
                </div>
              </div>
            </div>
            
            <div style="background: #333; color: white; padding: 20px; text-align: center;">
              <p style="margin: 0;">Portfolio de Liuken Monteiro | Desenvolvedor Full Stack</p>
            </div>
          </div>
        `
      };
      
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError);
    }
    
    res.json({ 
      success: true,
      message: 'Mensagem enviada com sucesso! Retornarei em breve.' 
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao enviar mensagem. Tente novamente.' 
    });
  }
});

// Registrar visualização
app.post('/api/analytics/view', async (req, res) => {
  try {
    const { page, referrer } = req.body;
    
    await pool.execute(
      'INSERT INTO page_views (page, referrer, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [page || 'home', referrer || '', req.ip, req.get('User-Agent')]
    );
    
    // Atualizar contador geral
    await pool.execute(
      'INSERT INTO portfolio_stats (id, views) VALUES (1, 1) ON DUPLICATE KEY UPDATE views = views + 1'
    );
    
    res.json({ 
      success: true, 
      message: 'Visualização registrada' 
    });
  } catch (error) {
    console.error('Erro ao registrar visualização:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Buscar estatísticas gerais
app.get('/api/stats', async (req, res) => {
  try {
    const [projectCount] = await pool.execute(
      'SELECT COUNT(*) as count FROM projects WHERE status = "active"'
    );
    
    const [messageCount] = await pool.execute(
      'SELECT COUNT(*) as count FROM contact_messages WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)'
    );
    
    const [viewCount] = await pool.execute(
      'SELECT views FROM portfolio_stats WHERE id = 1'
    );
    
    res.json({
      success: true,
      data: {
        projects: projectCount[0].count,
        messages: messageCount[0].count,
        views: viewCount[0]?.views || 0,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ 
      success: false, 
      message: 'JSON inválido' 
    });
  }
  
  res.status(500).json({ 
    success: false, 
    message: 'Erro interno do servidor' 
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Rota não encontrada' 
  });
});

// Função para criar as tabelas do banco
async function initializeDatabase() {
  try {
    console.log('🔄 Inicializando banco de dados...');
    
    // Tabela de projetos
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE,
        description TEXT NOT NULL,
        technologies JSON,
        live_url VARCHAR(500),
        github_url VARCHAR(500),
        image_url VARCHAR(500),
        featured BOOLEAN DEFAULT FALSE,
        status ENUM('active', 'beta', 'development', 'maintenance') DEFAULT 'active',
        stats JSON,
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    // Tabela de mensagens
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        phone VARCHAR(20),
        status ENUM('new', 'read', 'replied') DEFAULT 'new',
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    // Tabela de estatísticas
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS portfolio_stats (
        id INT PRIMARY KEY DEFAULT 1,
        views BIGINT DEFAULT 0,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    // Tabela de analytics
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS page_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page VARCHAR(100) NOT NULL,
        referrer VARCHAR(500),
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('✅ Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    process.exit(1);
  }
}

// Inicializar servidor
async function startServer() {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`
🚀 =====================================
   Portfolio API Server - Advanced
   ===================================== 
   
   📡 Servidor rodando na porta ${PORT}
   🌍 Ambiente: ${process.env.NODE_ENV || 'development'}
   📊 Health Check: http://localhost:${PORT}/api/health
   
   ===================================== 🚀
      `);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
