# Conexão Solidária - Production Deployment Guide

## 📋 Sumário das Refatorações para Produção

Este projeto foi refatorado completamente para suportar deployment profissional no **Render** com segurança, validação e scalability.

### ✅ Mudanças Implementadas

#### 1. **Backend (Node.js/Express)**
- ✅ CORS configurável via variáveis de ambiente
- ✅ Validação robusta de entrada (email, senha, nome)
- ✅ Proteção contra SQL Injection e XSS
- ✅ Rate limiting para auth routes
- ✅ Sanitização de inputs
- ✅ Arquivo `validation.js` centralizado para reutilização

#### 2. **Frontend (React/Vite)**
- ✅ Arquivo `api.ts` centralizado para URLs de API
- ✅ Variáveis de ambiente com `.env` e `.env.production`
- ✅ Componentes atualizados para usar novo API module
- ✅ Sistema de mapeamento de ícones (`icons.tsx`)

#### 3. **Infrastructure as Code**
- ✅ `render.yaml` completo e pronto para deployment
- ✅ Duas services configuradas (Backend + Frontend)
- ✅ Build commands otimizados
- ✅ Static publishing para Frontend

---

## 🚀 Deployment no Render (Passo a Passo)

### Pré-requisitos
- Conta no [Render.com](https://render.com)
- Repositório Git (GitHub, GitLab ou Bitbucket)
- Este projeto com `render.yaml` na raiz

### Passos de Deployment

#### 1. **Conectar Repositório ao Render**
```bash
# Faça push do seu código para GitHub
git add .
git commit -m "Refactor for production deployment on Render"
git push origin main
```

#### 2. **Criar Blueprint no Render**
1. Vá para https://render.com/dashboard
2. Clique em "New +" → "Blueprint"
3. Selecione seu repositório
4. Selecione branch `main`
5. Render vai detectar `render.yaml` automaticamente

#### 3. **Configurar Variáveis de Ambiente**

**Para Backend Service:**
```
NODE_ENV=production
FRONTEND_URL=https://conexao-solidaria-frontend.onrender.com
```

**Para Frontend Service:**
```
VITE_API_URL=https://conexao-solidaria-backend.onrender.com
```

#### 4. **Deploy**
- Clique em "Deploy" e aguarde ~5-10 minutos
- Render vai criar ambos os services automaticamente

---

## 💻 Desenvolvimento Local

### Setup Inicial

```bash
# Instalar dependências
npm install
cd Frontend && npm install
cd ../Backend && npm install

# Criar .env locais (já existem com valores padrão)
# .env no Backend: PORT=3000, FRONTEND_URL=http://localhost:5175
# .env no Frontend: VITE_API_URL=http://localhost:3000
```

### Rodar Localmente

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
# Servidor em http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
# Aplicação em http://localhost:5175
```

---

## 🔒 Segurança & Validação Implementada

### Backend (`validation.js`)

**Email Validation:**
- ✅ Regex para formato válido
- ✅ SQL Injection detection
- ✅ Máximo 255 caracteres

**Password Validation:**
- ✅ Mínimo 6 caracteres
- ✅ Máximo 128 caracteres
- ✅ Bloqueia caracteres perigosos: `< > " ' % ; ( ) & + `` 

**Name Validation:**
- ✅ Aceita letras acentuadas
- ✅ Números, espaços, hífens permitidos
- ✅ 2-100 caracteres

**Rate Limiting:**
- ✅ 5 tentativas de registro por minuto
- ✅ 10 tentativas de login por minuto
- ✅ Bloqueia com mensagem de erro apropriada

### Endpoints Protegidos

```typescript
POST /api/register
POST /api/login
POST /api/questionnaire
POST /api/analyze
```

---

## 📁 Estrutura de Ícones

### Sistema de Mapeamento (`Frontend/src/icons.tsx`)

Para adicionar novo ícone:

1. **Criar arquivo em** `Frontend/src/assets/icons/`
   ```
   icon-home.svg
   icon-user.png
   icon-heart.svg
   ```

2. **Adicionar em `icons.tsx`:**
   ```typescript
   ICONS_REGISTRY = {
     "home": { filename: "icon-home", format: "svg", size: 24 },
     "user": { filename: "icon-user", format: "png", size: 24 },
     // ...
   }
   ```

3. **Usar em componentes:**
   ```tsx
   import { Icon } from "../icons";
   
   <Icon name="home" size={24} className="icon-large" />
   ```

---

## 📊 Estrutura do Projeto Final

```
ConexaoSolidariaPI2/
├── render.yaml                 (Blueprint para Render)
├── Backend/
│   ├── server.js              (Server principal com CORS prod)
│   ├── validation.js          (Validação centralizada)
│   ├── package.json
│   ├── .env                   (Dev: PORT=3000)
│   └── .env.production        (Prod: NODE_ENV=production)
├── Frontend/
│   ├── src/
│   │   ├── api.ts             (API endpoints centralizados)
│   │   ├── icons.tsx          (Icon mapping system)
│   │   ├── assets/icons/      (Arquivos de ícones)
│   │   ├── pages/
│   │   │   └── Register.tsx   (Atualizado para usar api.ts)
│   │   └── ...
│   ├── .env                   (Dev: VITE_API_URL=http://localhost:3000)
│   ├── .env.production        (Prod: VITE_API_URL=https://backend.onrender.com)
│   └── vite.config.ts
└── README.md
```

---

## 🔗 URLs de Produção (Render)

Após deployment:
- **Frontend:** `https://conexao-solidaria-frontend.onrender.com`
- **Backend API:** `https://conexao-solidaria-backend.onrender.com/api`

---

## 🧪 Testes de Health Check

```bash
# Backend health
curl https://conexao-solidaria-backend.onrender.com/api/health

# Exemplo de resposta:
{
  "status": "OK",
  "service": "Conexão Solidária API",
  "environment": "production",
  "timestamp": "2024-04-17T10:30:00.000Z"
}
```

---

## 🐛 Troubleshooting

### Erro: "CORS policy violation"
- Verifique `FRONTEND_URL` no Backend
- Certifique-se que Frontend URL está em `allowedOrigins`

### Erro: "Port already in use"
```bash
# Windows (PowerShell)
Get-NetTCPConnection -LocalPort 3000 | Stop-Process -Force

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Frontend retorna 404 na API
- Verifique `VITE_API_URL` em `.env.production`
- Confirme que Backend está rodando
- Teste com: `curl $VITE_API_URL/api/health`

---

## 📝 Próximas Melhorias (Roadmap)

- [ ] Implementar JWT para autenticação
- [ ] Adicionar bcrypt para hash de senhas
- [ ] Conectar a banco de dados (PostgreSQL)
- [ ] Rate limiting com Redis
- [ ] Testes unitários e E2E
- [ ] CI/CD pipeline
- [ ] Monitoramento e alertas

---

## 📧 Support & Questions

Para dúvidas sobre deployment ou configuração, consulte:
- [Render Docs](https://render.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Express CORS](https://expressjs.com/en/resources/middleware/cors.html)

---

**Projeto refatorado e pronto para produção! 🚀**
