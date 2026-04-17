# 🌍 Google Cloud Run - Setup Passo a Passo

## ✅ Pré-requisitos

1. **Conta Google Cloud**
   - Criar em [console.cloud.google.com](https://console.cloud.google.com)
   - Cartão de crédito (para verificação, mas não cobrará)

2. **Google Cloud CLI**
   ```powershell
   # Instalar via Scoop
   scoop install gcloud

   # Ou via Chocolatey
   choco install gcloud

   # Ou download direto
   Invoke-WebRequest -Uri "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe" -OutFile "$env:TEMP\GoogleCloudSDKInstaller.exe"
   & "$env:TEMP\GoogleCloudSDKInstaller.exe"
   ```

3. **Git & GitHub** (para CI/CD automático)

---

## 🚀 Setup em 10 Passos

### Passo 1: Autenticar Google Cloud

```powershell
gcloud auth login
# Abre navegador para autenticar
```

### Passo 2: Criar Projeto

```powershell
$PROJECT_ID = "conexao-solidaria-$(Get-Random -Minimum 100000 -Maximum 999999)"
gcloud projects create $PROJECT_ID --name="Conexão Solidária"
gcloud config set project $PROJECT_ID
echo "PROJECT_ID=$PROJECT_ID" | Out-File -FilePath .env.gcloud
```

### Passo 3: Habilitar APIs Necessárias

```powershell
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  container.googleapis.com \
  sqladmin.googleapis.com \
  containerregistry.googleapis.com
```

### Passo 4: Criar Banco MySQL (Cloud SQL)

```powershell
gcloud sql instances create conexao-db `
  --database-version=MYSQL_8_0 `
  --tier=db-f1-micro `
  --region=us-central1 `
  --assign-ip `
  --availability-type=zonal

# Criar banco de dados
gcloud sql databases create conexao_solidaria `
  --instance=conexao-db

# Criar usuário app
gcloud sql users create app `
  --instance=conexao-db `
  --password=COLOQUE_UMA_SENHA_FORTE

# Pegar IP externo
gcloud sql instances describe conexao-db `
  --format='value(ipAddresses[0].ipAddress)'
```

**Salve o IP externo do MySQL!**

### Passo 5: Configurar Variáveis de Ambiente

**Arquivo: `.env.production.local`**
```
# Google Cloud
PROJECT_ID=seu-project-id-aqui
REGION=us-central1
MYSQL_HOST=IP_EXTERNO_DO_MYSQL
MYSQL_USER=app
MYSQL_PASSWORD=SENHA_DO_PASSO_4
MYSQL_DATABASE=conexao_solidaria
MYSQL_PORT=3306

# Frontend
VITE_API_URL=https://conexao-solidaria-backend-xxxxx.run.app
FRONTEND_DEPLOY_TIME=2026-04-17T17:00:00Z
```

### Passo 6: GitOps - Conectar GitHub

```powershell
# Dar permissões ao Cloud Build acessar GitHub
gcloud builds connect --repo-name=ConexaoSolidariaPI2 `
  --repo-owner=SEU_USUARIO_GITHUB `
  --region=us-central1

# Isso abre um link no navegador para autorizar
```

### Passo 7: Deploy Manual (Teste)

```powershell
# Backend
gcloud run deploy conexao-solidaria-backend `
  --source=./Backend `
  --region=us-central1 `
  --allow-unauthenticated `
  --port=3000 `
  --memory=512Mi `
  --cpu=1 `
  --timeout=3600 `
  --set-env-vars=MYSQL_HOST=IP_EXTERNO,MYSQL_USER=app,MYSQL_PASSWORD=SENHA,MYSQL_DATABASE=conexao_solidaria,NODE_ENV=production,FRONTEND_URL=https://frontend-url.run.app

# Frontend
gcloud run deploy conexao-solidaria-frontend `
  --source=./Frontend `
  --region=us-central1 `
  --allow-unauthenticated `
  --port=3000 `
  --memory=512Mi `
  --cpu=1 `
  --set-env-vars=VITE_API_URL=https://backend-url-from-above.run.app
```

### Passo 8: Deploy Automático (GitHub + Cloud Build)

1. Certifique que `cloudbuild.yaml` está pronto
2. Push para GitHub:
```bash
git add .
git commit -m "Setup Cloud Run deployment"
git push origin main
```

3. Cloud Build detecta webhook e faz deploy automaticamente!

4. Monitor em: [console.cloud.google.com/cloud-build](https://console.cloud.google.com/cloud-build)

### Passo 9: Verificar Deploy

```powershell
# Listar serviços rodando
gcloud run services list

# Pegar URLs
gcloud run services describe conexao-solidaria-backend --region=us-central1 --format='value(status.url)'
gcloud run services describe conexao-solidaria-frontend --region=us-central1 --format='value(status.url)'

# Testar health check
$BACKEND_URL = "https://conexao-solidaria-backend-xxxxx.run.app"
Invoke-WebRequest "$BACKEND_URL/api/health"
```

### Passo 10: Configurar DNS (Opcional)

```powershell
# Se tiver domínio próprio:
gcloud run services update conexao-solidaria-frontend `
  --region=us-central1 `
  --update-env-vars=DOMAIN=seudominio.com

# Depois aponta DNS CNAME para run.app
```

---

## 📊 Visualizar Resources

```powershell
# Dashboard
gcloud console
Start-Process "https://console.cloud.google.com"

# Logs em tempo real
gcloud run services logs read conexao-solidaria-backend --region=us-central1 --limit=50

# Métricas
gcloud monitoring list
```

---

## ✅ Resultado Final

Após completar, você terá:

```
Backend:  https://conexao-solidaria-backend-xxxxx.run.app/api
Frontend: https://conexao-solidaria-frontend-xxxxx.run.app
MySQL:    Managed by Google Cloud SQL
```

**URLs Compartilháveis:**
- Envie a URL do Frontend para qualquer pessoa testar
- Backend conecta automaticamente via CORS
- MySQL protegido dentro da Google Cloud

---

## 💰 Custos Estimados

| Recurso | Preço | Grátis até |
|---------|-------|-----------|
| Cloud Run | $0.40/1M req | 2M req/mês |
| Cloud SQL | ~$10/mês | Nada |
| Storage | $0.020/GB | 5GB |
| **Total** | ~$15/mês | - |

**Dica:** Use sempre free tier na Google Cloud. Saia de graça nos primeiros 3 meses com crédito inicial.

---

## 🐛 Troubleshooting

### Erro: "Permission denied"
```powershell
gcloud auth login
gcloud auth application-default login
```

### Erro: "cloudbuild not enabled"
```powershell
gcloud services enable cloudbuild.googleapis.com
```

### Cloud Job não dispara após git push
1. Verificar webhook em GitHub
2. Checar arquivo `cloudbuild.yaml` está na raiz
3. Triggar manual: `gcloud builds submit --config=cloudbuild.yaml`

### Timeout na primeira build
- Aumentar timeout no `cloudbuild.yaml` (padrão: 30min)
- Aumentar `machineType` para N1_HIGHCPU_8

---

**Pronto!** 🎉 Seu app está online e acessível de qualquer lugar do mundo!
