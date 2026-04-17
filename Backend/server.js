import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import os from "os";
import {
  isValidEmail,
  isValidPassword,
  isValidName,
  sanitizeInput,
  isSQLSafeEmail,
  checkRateLimit,
  validateRegistration,
  validateLogin,
} from "./validation.js";

dotenv.config();

const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
};

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5175",
  "http://localhost:5000",
  process.env.FRONTEND_URL || "http://localhost:5175",
  process.env.RENDER_EXTERNAL_URL ? `https://${process.env.RENDER_EXTERNAL_URL}` : null,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (process.env.NODE_ENV === "development") {
        callback(null, true);
      } else if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const users = new Map();
const questionnaires = new Map();
let userIdCounter = 1;

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  const rateLimitCheck = checkRateLimit(`register:${req.ip || "unknown"}`, 5, 60000);
  if (rateLimitCheck.isLimited) {
    return res.status(429).json({
      error: "Muitas tentativas de registro. Tente novamente mais tarde.",
      retryAfter: Math.ceil(rateLimitCheck.remainingTime / 1000),
    });
  }

  const validation = validateRegistration(name, email, password);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.errors[0] });
  }

  try {
    const existingUser = Array.from(users.values()).find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado" });
    }

    const userId = userIdCounter++;
    const newUser = {
      id: userId,
      name: sanitizeInput(name),
      email: email.toLowerCase(),
      password,
      createdAt: new Date(),
    };

    users.set(userId, newUser);

    return res.status(201).json({
      id: userId,
      name: newUser.name,
      email: newUser.email,
      message: "Conta criada com sucesso",
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Erro ao criar conta" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const rateLimitCheck = checkRateLimit(`login:${req.ip || "unknown"}`, 10, 60000);
  if (rateLimitCheck.isLimited) {
    return res.status(429).json({
      error: "Muitas tentativas de login. Tente novamente mais tarde.",
      retryAfter: Math.ceil(rateLimitCheck.remainingTime / 1000),
    });
  }

  const validation = validateLogin(email, password);
  if (!validation.isValid) {
    return res.status(400).json({ error: "Credenciais inválidas" });
  }

  try {
    const user = Array.from(users.values()).find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        message: "Login realizado com sucesso",
      });
    } else {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
});

app.post("/api/questionnaire", (req, res) => {
  const { userId, answers } = req.body;

  if (!userId || !answers) {
    return res.status(400).json({ error: "userId e answers são obrigatórios" });
  }

  try {
    const questionnaireId = `q_${Date.now()}`;
    questionnaires.set(questionnaireId, {
      id: questionnaireId,
      userId,
      answers,
      createdAt: new Date(),
    });

    return res.status(201).json({
      id: questionnaireId,
      message: "Questionário salvo com sucesso",
    });
  } catch (err) {
    console.error("Questionnaire save error:", err);
    return res.status(500).json({ error: "Erro ao salvar questionário" });
  }
});

app.get("/api/questionnaire/:id", (req, res) => {
  const { id } = req.params;
  const questionnaire = questionnaires.get(id);

  if (questionnaire) {
    return res.status(200).json(questionnaire);
  } else {
    return res.status(404).json({ error: "Questionário não encontrado" });
  }
});

app.post("/api/analyze", (req, res) => {
  const { answers } = req.body;

  if (!answers || typeof answers !== "object") {
    return res.status(400).json({ error: "answers é obrigatório" });
  }

  try {
    const scores = {
      "Administração e Gestão": 0,
      "Design e Criatividade": 0,
      "Trabalho Manual e Técnico": 0,
      "Ciência e Pesquisa": 0,
      "Tecnologia e Programação": 0,
      "Escrita e Conteúdo": 0,
    };

    const answerWeights = {
      noise_1: { "Ciência e Pesquisa": 1, "Escrita e Conteúdo": 1 },
      noise_4: { "Tecnologia e Programação": 1, "Administração e Gestão": 1 },
      comm_1: { "Tecnologia e Programação": 2, "Escrita e Conteúdo": 2 },
      comm_4: { "Administração e Gestão": 2, "Design e Criatividade": 1 },
      task_1: { "Trabalho Manual e Técnico": 2, "Ciência e Pesquisa": 1 },
      task_3: { "Design e Criatividade": 2, "Tecnologia e Programação": 1 },
      team_1: { "Ciência e Pesquisa": 2, "Escrita e Conteúdo": 2 },
      team_4: { "Administração e Gestão": 2, "Design e Criatividade": 1 },
    };

    Object.entries(answers).forEach(([key, value]) => {
      if (answerWeights[value]) {
        Object.entries(answerWeights[value]).forEach(([area, weight]) => {
          scores[area] += weight;
        });
      }
    });

    const topMatches = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([area, score]) => ({ area, score }));

    return res.status(200).json({
      topMatches,
      message: "Análise concluída com sucesso",
    });
  } catch (err) {
    console.error("Analysis error:", err);
    return res.status(500).json({ error: "Erro ao analisar questionário" });
  }
});

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    status: "OK",
    service: "Conexão Solidária API",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

const PORTS_TO_TRY = [process.env.PORT || 3000, 3001, 3002];

const startServer = (portIndex = 0) => {
  if (portIndex >= PORTS_TO_TRY.length) {
    console.error("❌ Nenhuma porta disponível. Todas (3000, 3001, 3002) estão em uso!");
    process.exit(1);
  }

  const currentPort = PORTS_TO_TRY[portIndex];
  const localIp = getLocalIpAddress();
  
  const server = app.listen(currentPort, "0.0.0.0", () => {
    console.log(`✅ Servidor rodando em http://localhost:${currentPort}`);
    console.log(`🌐 Acesso externo: http://${localIp}:${currentPort}`);
    console.log(`📌 Frontend: ${process.env.FRONTEND_URL || "http://localhost:5175"}`);
    console.log(`🔗 API: http://${localIp}:${currentPort}/api`);
    console.log(`📱 Acesse do celular: http://${localIp}:${currentPort}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(
        `⚠️  Porta ${currentPort} já está em uso. Tentando porta ${PORTS_TO_TRY[portIndex + 1]}...`
      );
      startServer(portIndex + 1);
    } else {
      console.error(`❌ Erro ao iniciar servidor: ${err.message}`);
      process.exit(1);
    }
  });
};

startServer();
