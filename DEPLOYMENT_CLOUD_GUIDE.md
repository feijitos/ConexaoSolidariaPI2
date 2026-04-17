# 🚀 Guia Completo de Deployment - Conexão Solidária

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  CLIENTE (Browser/App)                       │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴─────────────┐
        │                          │
        ▼                          ▼
  ┌──────────────┐           ┌──────────────┐
  │   Frontend   │           │   Backend    │
  │ Vite + React │◄─────────►│ Express.js   │
  │  Port: 3000  │   /api    │  Port: 3000  │
  └──────────────┘           └────────┬─────┘
        │                             │
        │        ┌────────────────────┴─────────┐
        │        │                              │
        │        ▼                              ▼
        │   ┌──────────────┐           ┌──────────────┐
        │   │    MySQL     │           │   Upload     │
        │   │  Database    │           │   Storage    │
        │   │  Port: 3306  │           │  (S3/Cloud)  │
        │   └──────────────┘           └──────────────┘
        │
        └────► Reverse Proxy (Vite Dev Server)
               Proxies /api → Backend:3000
```

---

## 🏢 Deployment Options

### **OPÇÃO 1: Google Cloud Run (Recomendado)**

**Pros:**
- ✅ Gratuito (até 2M requisições/mês)
- ✅ Serverless (sem servidor rodando 24h)
- ✅ Compartilhável via URL pública
- ✅ MySQL via Cloud SQL
- ✅ Auto-scaling
- ✅ Integrado com GitHub

**Setup Rápido:**

1. **Criar projeto no Google Cloud:**
   ```bash
   gcloud projects create conexao-solidaria --name="Conexão Solidária"
   gcloud config set project conexao-solidaria
   ```

2. **Criar Cloud SQL MySQL:**
   ```bash
   gcloud sql instances create conexao-db \
     --database-version=MYSQL_8_0 \
     --tier=db-f1-micro \
     --region=us-central1
   
   gcloud sql databases create conexao_solidaria \
     --instance=conexao-db
   
   gcloud sql users create app \
     --instance=conexao-db \
     --password=SENHA_SEGURA
   ```

3. **Conectar GitHub (Cloud Build):**
   ```bash
   gcloud builds connect --repo-name=ConexaoSolidariaPI2 \
     --repo-owner=seu-github-user \
     --region=us-central1
   ```

4. **Deploy automático:**
   ```bash
   # Fazer push para main automaticamente dispara:
   git push origin main
   # Cloud Build detecta cloudbuild.yaml e faz deploy
   ```

5. **URLs resultantes:**
   ```
   Backend: https://conexao-solidaria-backend-xxx.run.app
   Frontend: https://conexao-solidaria-frontend-xxx.run.app
   ```

**Variáveis de Ambiente Cloud Run:**

Backend:
```
MYSQL_HOST=35.236.XX.XX (Endereço IP Cloud SQL)
MYSQL_USER=app
MYSQL_PASSWORD=SENHA_SEGURA
MYSQL_DATABASE=conexao_solidaria
NODE_ENV=production
FRONTEND_URL=https://conexao-solidaria-frontend-xxx.run.app
```

Frontend:
```
VITE_API_URL=https://conexao-solidaria-backend-xxx.run.app
```

---

### **OPÇÃO 2: Heroku (Mais Simples)**

**Pros:**
- ✅ Super fácil (git push deploy)
- ✅ Free tier disponível
- ✅ Add-ons incluindo MySQL
- ✅ SSL automático

**Setup:**

1. **Instalar Heroku CLI:**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Criar app:**
   ```bash
   heroku create conexao-solidaria
   ```

3. **Adicionar MySQL:**
   ```bash
   # JawsDB (MySQL grátis no Heroku)
   heroku addons:create jawsdb:kitefin
   # Isso cria JAWSDB_URL automaticamente
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

5. **URL resultante:**
   ```
   https://conexao-solidaria.herokuapp.com
   ```

**Detalhes em Procfile já criado**

---

### **OPÇÃO 3: AWS (Escalável)**

**Pros:**
- ✅ Mais controle
- ✅ Sempre grátis por 12 meses (EC2, RDS)
- ✅ Melhor para produção pesada

**Serviços:**
- EC2 (Virtual Machine)
- RDS (Managed MySQL)
- ALB (Load Balancer)
- CloudFront (CDN)

**Setup aproximado:**
```bash
# Criar instância EC2
aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro --key-name my-key

# Criar RDS MySQL
aws rds create-db-instance --db-instance-identifier conexao-db \
  --db-instance-class db.t2.micro --engine mysql

# SSH para EC2 e rodar aplicação
ssh ec2-user@IP
docker pull SEU_DOCKER_REGISTRY/conexao-backend
docker pull SEU_DOCKER_REGISTRY/conexao-frontend
docker-compose up
```

---

## 🐳 Docker Local (Teste antes de deploy)

```bash
# 1. Buildando localmente
docker-compose build

# 2. Rodando
docker-compose up

# 3. Acessar
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
# MySQL: localhost:3306 (user: app, password: apppass)

# 4. Parar
docker-compose down

# 5. Parar e remover volumes (limpar banco)
docker-compose down -v
```

---

## 🔧 Ambiente de Produção vs Desenvolvimento

### Desenvolvimento (Local)
```
Frontend -> Vite Dev Server (5173)
           ↓ (proxy /api)
           Backend (3000)
           ↓
           MySQL (localhost:3306)
```

### Produção (Cloud Run)
```
Cliente -> Frontend URL
          ↓
          Reverse Proxy (serve.config.json)
          ↓
          Backend URL
          ↓
          MySQL (Cloud SQL - firewall)
```

---

## 📊 Variáveis de Ambiente por Plataforma

### Google Cloud Run (.env.production)
```
NODE_ENV=production
PORT=3000
MYSQL_HOST=x.x.x.x (Cloud SQL IP)
MYSQL_USER=app
MYSQL_PASSWORD=SENHA
MYSQL_DATABASE=conexao_solidaria
FRONTEND_URL=https://frontend-xxx.run.app
```

### Heroku (.env.production)
```
NODE_ENV=production
PORT=processo.env.PORT (Heroku atribui automaticamente)
DATABASE_URL=mysql://user:pass@host/db (via JAWSDB_URL)
FRONTEND_URL=https://aqui-deve-ir-frontend-url.herokuapp.com
```

### AWS EC2 (.env.production)
```
NODE_ENV=production
PORT=3000
MYSQL_HOST=rds-instance.amazonaws.com
MYSQL_USER=app
MYSQL_PASSWORD=SENHA
MYSQL_DATABASE=conexao_solidaria
```

---

## 🪛 Database Migration

Para todos os ambientes, execute após primeira deploy:

```bash
# Local
mysql -u app -p -h localhost conexao_solidaria < Backend/db/init.sql

# Cloud Run (via Cloud SQL Proxy)
cloud_sql_proxy -instances=PROJECT_ID:us-central1:conexao-db=tcp:3306
mysql -u app -p -h localhost conexao_solidaria < Backend/db/init.sql

# Heroku
heroku local:run 'mysql -u $DB_USER -p$DB_PASSWORD -h $DB_HOST $DB_NAME < Backend/db/init.sql'
```

---

## ✅ Checklist de Deploy

### Pre-Deploy
- [ ] `git add .` & `git commit`
- [ ] `.env.production` configurado
- [ ] Database tables criadas (init.sql)
- [ ] Variáveis de ambiente no platform
- [ ] Backend API testado localmente

### Deploy
- [ ] `git push` para ativar CI/CD
- [ ] Build log sem erros
- [ ] Containers rodando
- [ ] Health check passando

### Post-Deploy
- [ ] Testando endpoints (curl)
- [ ] Frontend carregando
- [ ] Requisições à API funcionando
- [ ] Database conectando
- [ ] CORS configurado corretamente

---

## 🐛 Troubleshooting

### "Porta já em uso"
```bash
lsof -i :3000  # Listar o que está usando
kill -9 PID    # Matar processo
```

### "Connection refused - Backend"
- [ ] Backend está rodando?
- [ ] Porta correta no `api.ts`?
- [ ] Firewall/rede bloqueando?

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Database connection error"
- [ ] MySQL está rodando?
- [ ] Credenciais corretas?
- [ ] Hostname/IP certo?
- [ ] Firewall permite 3306?

---

## 🚀 Minha Recomendação

**Fase 1: Teste (Esta semana)**
→ Docker Compose local

**Fase 2: Compartilhável (Próxima semana)**
→ Google Cloud Run (Gratuito, fácil)

**Fase 3: Produção (Quando vencer)**
→ AWS ou Heroku (mais estável)

---

**Status:** ✅ Pronto para Deployment  
**Última atualização:** 17 de Abril, 2026  
**Versão:** 2.0 - Cloud Ready
