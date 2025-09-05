# 📖 Guia de Setup Completo

## 🔧 Pré-requisitos

- Node.js >= 16.0.0
- MySQL >= 8.0
- NPM >= 8.0.0
- Git

## 📥 Instalação

### 1. Clone ou extraia o projeto
```bash
# Se usando git
git clone https://github.com/LiukenMonteiro/portfolio.git
cd portfolio

# Se usando o script de setup
# Os arquivos já estarão prontos!
```

### 2. Configure o Frontend
```bash
cd frontend
npm install
```

### 3. Configure o Backend
```bash
cd ../backend
npm install
cp .env.example .env
```

### 4. Configure as variáveis de ambiente
Edite o arquivo `backend/.env`:

```env
# Banco de dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=portfolio_advanced_db

# Email (Gmail)
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app

# Segurança
JWT_SECRET=seu_jwt_secret_seguro
```

### 5. Configure o banco MySQL
```bash
# Conectar ao MySQL
mysql -u root -p

# Executar script
source /caminho/para/database/schema.sql
```

### 6. Inicie os serviços
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## ✅ Verificação

- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api/health
- Banco: Verificar tabelas criadas no MySQL

## 🎨 Personalização

### Cores do tema
Edite `frontend/src/components/Portfolio.jsx`:
```js
const colorThemes = {
  // Adicione suas cores aqui
}
```

### Projetos
Adicione seus projetos reais no banco de dados:
```sql
INSERT INTO projects (title, description, ...) VALUES (...);
```

### Informações pessoais
Atualize os links sociais no componente Portfolio.

## 🚀 Deploy em Produção

### Vercel
1. Instale a CLI: `npm i -g vercel`
2. Frontend: `cd frontend && vercel --prod`
3. Backend: `cd backend && vercel --prod`

### Configurar banco em nuvem
- PlanetScale (MySQL)
- AWS RDS
- Google Cloud SQL

## 🆘 Problemas Comuns

### Erro de conexão MySQL
- Verificar se MySQL está rodando
- Confirmar credenciais no .env
- Testar conexão: `mysql -u root -p`

### Erro de porta ocupada
- Frontend: Mudar para porta 3001
- Backend: Mudar PORT no .env

### Erro de email
- Ativar "App Passwords" no Gmail
- Usar senha de app (não senha normal)

## 📞 Suporte

Se precisar de ajuda:
1. Verificar logs de erro
2. Consultar documentação
3. Testar cada parte separadamente

---

🎉 **Sucesso! Seu portfolio está pronto!**
