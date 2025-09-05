#!/bin/bash

echo "🚀 Iniciando Portfolio Liuken Monteiro..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js primeiro."
    exit 1
fi

# Verificar se MySQL está rodando
if ! command -v mysql &> /dev/null; then
    echo "⚠️ MySQL não encontrado. Certifique-se de que está instalado."
fi

echo "📦 Instalando dependências..."

# Frontend
echo "⚛️ Configurando Frontend..."
cd frontend
npm install
echo "✅ Frontend pronto!"

# Backend
echo "🔧 Configurando Backend..."
cd ../backend
npm install
echo "✅ Backend pronto!"

cd ..

echo ""
echo "🎉 SETUP CONCLUÍDO!"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Configure o arquivo backend/.env com suas credenciais"
echo "2. Execute o script SQL no MySQL: mysql -u root -p < database/schema.sql"
echo "3. Inicie o backend: cd backend && npm run dev"
echo "4. Inicie o frontend: cd frontend && npm start"
echo ""
echo "🌟 Seu portfolio estará em: http://localhost:3000"
echo ""
