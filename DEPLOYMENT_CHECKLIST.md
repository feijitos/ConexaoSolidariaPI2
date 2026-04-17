# Projeto Conexão Solidária - Checklist de Deployment

## ✅ Arquivos Criados/Modificados

### Backend
- [x] `server.js` - Refatorado com CORS produção e validação
- [x] `validation.js` - Módulo centralizado de validação
- [x] `.env` - Variáveis de ambiente (desenvolvimento)
- [x] `.env.production` - Variáveis de produção
- [x] `package.json` - Dependencies (incluindo cors, express, dotenv)

### Frontend
- [x] `api.ts` - Configuração centralizada de API
- [x] `icons.tsx` - Sistema de mapeamento de ícones
- [x] `.env` - Variáveis de desenvolvimento
- [x] `.env.production` - Variáveis de produção
- [x] `pages/Register.tsx` - Atualizado para usar `api.ts`
- [x] `assets/icons/` - Pasta criada para ícones

### Infrastructure as Code
- [x] `render.yaml` - Blueprint completo para Render
- [x] `PRODUCTION_DEPLOYMENT_GUIDE.md` - Guia detalhado de deployment

---

## 🚀 Quick Start - Deployment em 5 Passos

### Passo 1: Verificar Dependências
```bash
cd Backend && npm install
cd ../Frontend && npm install
```

### Passo 2: Testar Localmente
```bash
# Terminal 1
cd Backend && npm run dev

# Terminal 2  
cd Frontend && npm run dev
```

### Passo 3: Git Push
```bash
git add .
git commit -m "Production-ready refactor for Render deployment"
git push origin main
```

### Passo 4: Render Setup
1. Login em https://render.com
2. Create Blueprint → Selecionar repo
3. Render detectará `render.yaml`
4. Configurar Environment Variables

### Passo 5: Deploy
```
Clique "Deploy" e aguarde ~5-10 minutos
```

---

## 🔐 Security Checklist

- [x] CORS configurável com `FRONTEND_URL`
- [x] Validação de email com regex
- [x] Validação de senha (6-128 chars, sem chars perigosos)
- [x] Validação de nome (apenas letras, números, espaços, hífens)
- [x] SQL Injection protection
- [x] XSS protection (sanitização)
- [x] Rate limiting (login/register)
- [x] Input sanitization

---

## 📊 Environment Variables

### Backend (`.env` / `.env.production`)
```
PORT=3000
NODE_ENV=development (ou production)
FRONTEND_URL=http://localhost:5175 (ou https://...onrender.com)
```

### Frontend (`.env` / `.env.production`)
```
VITE_API_URL=http://localhost:3000 (ou https://...onrender.com)
VITE_APP_NAME=Conexão Solidária
```

---

## 📁 Icon Management

**Adicionar novo ícone:**
1. Colocar arquivo em `Frontend/src/assets/icons/icon-{name}.{svg|png}`
2. Adicionar entrada em `Frontend/src/icons.tsx` na `ICONS_REGISTRY`
3. Usar em componentes: `<Icon name="meu-icon" size={24} />`

**Exemplo:**
```tsx
// Adicionar em icons.tsx
"meu-novo-icon": { filename: "icon-meu-novo-icon", format: "svg", size: 24 },

// Usar em componente
<Icon name="meu-novo-icon" />
```

---

## 🧪 Testing Endpoints

### Registrar novo usuário
```bash
curl -X POST https://backend-url.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@example.com","password":"senha123"}'
```

### Login
```bash
curl -X POST https://backend-url.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","password":"senha123"}'
```

### Health Check
```bash
curl https://backend-url.onrender.com/api/health
```

---

## ⚠️ Common Issues & Solutions

| Problema | Solução |
|----------|---------|
| CORS error | Verificar `FRONTEND_URL` no Backend |
| 404 on API calls | Verificar `VITE_API_URL` no Frontend `.env.production` |
| Port 3000 occupied | `Get-NetTCPConnection -LocalPort 3000 \| Stop-Process -Force` |
| Build fails | Rodar `npm install` em ambas as pastas |
| Icon not loading | Verificar nome exato em `icons.tsx` registry |

---

## 📚 Documentação Relacionada

- [Render Docs](https://render.com/docs)
- [Vite Env Guide](https://vitejs.dev/guide/env-and-mode.html)
- [Express CORS Middleware](https://expressjs.com/en/resources/middleware/cors.html)
- [Node.js Input Validation Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)

---

**Status:** ✅ Pronto para produção em Render  
**Data:** 17 de Abril, 2026  
**Versão:** 1.0 - Production Ready  

