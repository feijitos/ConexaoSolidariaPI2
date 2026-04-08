import { QuestionnaireStep } from "./types";
import { 
  VolumeX, Volume2, Volume1, Volume, 
  Sun, Moon, Cloud, Zap,
  User, Users, Layout, Monitor,
  Mail, MessageSquare, Phone, Users2,
  FileText, Image, MessageCircle, Info,
  Clock, Calendar, ZapOff, Infinity,
  AlertCircle, CheckCircle, HelpCircle, RefreshCw,
  Repeat, Settings, Palette, Search, Code, PenTool
} from "lucide-react";

export const QUESTIONNAIRE_STEPS: QuestionnaireStep[] = [
  {
    id: "sensorial",
    title: "Sensorial",
    description: "Como você se sente em relação ao ambiente físico de trabalho?",
    questions: [
      {
        id: "noise",
        text: "Qual seu nível de conforto com barulho no ambiente?",
        options: [
          { id: "noise_1", text: "Preciso de silêncio total", icon: "VolumeX", score: { "Manual e Técnico": 20, "Administração": 40, "Design": 60, "Ciência": 80, "Tecnologia": 70, "Escrita": 90 } },
          { id: "noise_2", text: "Ruídos baixos são ok", icon: "Volume1", score: { "Manual e Técnico": 40, "Administração": 60, "Design": 80, "Ciência": 70, "Tecnologia": 80, "Escrita": 70 } },
          { id: "noise_3", text: "Barulho moderado não me incomoda", icon: "Volume2", score: { "Manual e Técnico": 70, "Administração": 80, "Design": 60, "Ciência": 50, "Tecnologia": 60, "Escrita": 50 } },
          { id: "noise_4", text: "Lido bem com ambientes barulhentos", icon: "Volume", score: { "Manual e Técnico": 90, "Administração": 70, "Design": 40, "Ciência": 30, "Tecnologia": 40, "Escrita": 30 } },
        ]
      },
      {
        id: "lighting",
        text: "Como você prefere a iluminação?",
        options: [
          { id: "light_1", text: "Luz natural e suave", icon: "Sun", score: { "Design": 90, "Escrita": 80, "Ciência": 70 } },
          { id: "light_2", text: "Luz controlada e indireta", icon: "Moon", score: { "Tecnologia": 90, "Design": 80, "Ciência": 80 } },
          { id: "light_3", text: "Não tenho preferência forte", icon: "Cloud", score: { "Manual e Técnico": 80, "Administração": 80 } },
          { id: "light_4", text: "Qualquer iluminação serve", icon: "Zap", score: { "Manual e Técnico": 90, "Administração": 70 } },
        ]
      },
      {
        id: "space",
        text: "Que tipo de espaço de trabalho você prefere?",
        options: [
          { id: "space_1", text: "Sala individual e fechada", icon: "User", score: { "Ciência": 90, "Escrita": 90, "Tecnologia": 80 } },
          { id: "space_2", text: "Espaço semi-privado com divisórias", icon: "Layout", score: { "Administração": 90, "Tecnologia": 70 } },
          { id: "space_3", text: "Misto, com áreas abertas e fechadas", icon: "Monitor", score: { "Design": 80, "Administração": 70 } },
          { id: "space_4", text: "Espaço aberto e compartilhado", icon: "Users", score: { "Manual e Técnico": 80, "Design": 60 } },
        ]
      }
    ]
  },
  {
    id: "comunicacao",
    title: "Comunicação",
    description: "Como você prefere se comunicar no trabalho?",
    questions: [
      {
        id: "comm_form",
        text: "Qual forma de comunicação você prefere?",
        options: [
          { id: "comm_1", text: "Apenas por escrito (e-mail, chat)", icon: "Mail", score: { "Tecnologia": 90, "Escrita": 90, "Ciência": 80 } },
          { id: "comm_2", text: "Escrito com reuniões ocasionais", icon: "MessageSquare", score: { "Administração": 80, "Design": 80, "Tecnologia": 70 } },
          { id: "comm_3", text: "Misto entre escrito e verbal", icon: "Phone", score: { "Administração": 90, "Design": 70 } },
          { id: "comm_4", text: "Principalmente verbal e presencial", icon: "Users2", score: { "Manual e Técnico": 80, "Administração": 60 } },
        ]
      },
      {
        id: "instructions",
        text: "Como você prefere receber instruções?",
        options: [
          { id: "inst_1", text: "Escritas e bem detalhadas", icon: "FileText", score: { "Ciência": 90, "Tecnologia": 90, "Administração": 80 } },
          { id: "inst_2", text: "Com exemplos visuais", icon: "Image", score: { "Design": 90, "Manual e Técnico": 80 } },
          { id: "inst_3", text: "Explicação verbal com resumo escrito", icon: "MessageCircle", score: { "Administração": 80, "Design": 70 } },
          { id: "inst_4", text: "Apenas direcionamento geral", icon: "Info", score: { "Manual e Técnico": 70, "Design": 60 } },
        ]
      }
    ]
  },
  {
    id: "rotina",
    title: "Rotina",
    description: "Como você prefere organizar seu trabalho?",
    questions: [
      {
        id: "schedule",
        text: "Qual tipo de horário funciona melhor para você?",
        options: [
          { id: "sched_1", text: "Horário fixo e previsível", icon: "Clock", score: { "Administração": 90, "Manual e Técnico": 80, "Ciência": 70 } },
          { id: "sched_2", text: "Horário regular com alguma flexibilidade", icon: "Calendar", score: { "Tecnologia": 80, "Design": 80, "Escrita": 80 } },
          { id: "sched_3", text: "Horário flexível com entregas definidas", icon: "ZapOff", score: { "Design": 90, "Tecnologia": 90, "Escrita": 90 } },
          { id: "sched_4", text: "Totalmente flexível", icon: "Infinity", score: { "Design": 80, "Escrita": 70 } },
        ]
      },
      {
        id: "changes",
        text: "Como você lida com mudanças inesperadas?",
        options: [
          { id: "change_1", text: "Preciso de aviso com antecedência", icon: "AlertCircle", score: { "Administração": 90, "Ciência": 80, "Manual e Técnico": 70 } },
          { id: "change_2", text: "Mudanças pequenas são ok", icon: "CheckCircle", score: { "Tecnologia": 80, "Administração": 70 } },
          { id: "change_3", text: "Consigo me adaptar com suporte", icon: "HelpCircle", score: { "Design": 80, "Tecnologia": 70 } },
          { id: "change_4", text: "Lido bem com mudanças", icon: "RefreshCw", score: { "Manual e Técnico": 80, "Design": 70 } },
        ]
      }
    ]
  },
  {
    id: "tarefas",
    title: "Tarefas",
    description: "Que tipo de atividade profissional combina com você?",
    questions: [
      {
        id: "task_type",
        text: "Que tipo de tarefa você prefere?",
        options: [
          { id: "task_1", text: "Tarefas repetitivas e previsíveis", icon: "Repeat", score: { "Manual e Técnico": 90, "Administração": 80 } },
          { id: "task_2", text: "Tarefas com padrões claros", icon: "Settings", score: { "Ciência": 90, "Tecnologia": 80, "Administração": 70 } },
          { id: "task_3", text: "Mix de rotina e novidades", icon: "Palette", score: { "Design": 80, "Tecnologia": 70 } },
          { id: "task_4", text: "Tarefas variadas e criativas", icon: "PenTool", score: { "Design": 90, "Escrita": 80 } },
        ]
      },
      {
        id: "details",
        text: "Como é sua atenção aos detalhes?",
        options: [
          { id: "det_1", text: "Muito detalhista e minucioso", icon: "Search", score: { "Ciência": 90, "Tecnologia": 90, "Design": 80 } },
          { id: "det_2", text: "Atento aos detalhes importantes", icon: "CheckCircle", score: { "Administração": 80, "Manual e Técnico": 70 } },
          { id: "det_3", text: "Foco no panorama geral", icon: "Monitor", score: { "Design": 70, "Administração": 60 } },
          { id: "det_4", text: "Prefiro visão estratégica", icon: "Zap", score: { "Administração": 70, "Design": 60 } },
        ]
      }
    ]
  },
  {
    id: "social",
    title: "Social",
    description: "Como você prefere interagir com colegas?",
    questions: [
      {
        id: "team_size",
        text: "Em que tipo de equipe você trabalha melhor?",
        options: [
          { id: "team_1", text: "Trabalho individual", icon: "User", score: { "Escrita": 90, "Ciência": 90, "Tecnologia": 80 } },
          { id: "team_2", text: "Equipe pequena (2-3 pessoas)", icon: "Users", score: { "Design": 90, "Tecnologia": 80, "Ciência": 70 } },
          { id: "team_3", text: "Equipe média (4-8 pessoas)", icon: "Users2", score: { "Administração": 80, "Tecnologia": 70 } },
          { id: "team_4", text: "Equipes grandes e dinâmicas", icon: "Users", score: { "Manual e Técnico": 70, "Administração": 60 } },
        ]
      },
      {
        id: "interaction",
        text: "Com que frequência prefere interagir com colegas?",
        options: [
          { id: "int_1", text: "Mínima interação possível", icon: "ZapOff", score: { "Escrita": 90, "Ciência": 90, "Tecnologia": 80 } },
          { id: "int_2", text: "Interações breves e objetivas", icon: "MessageSquare", score: { "Administração": 80, "Tecnologia": 70, "Manual e Técnico": 70 } },
          { id: "int_3", text: "Interação moderada no dia a dia", icon: "Users2", score: { "Design": 80, "Administração": 70 } },
          { id: "int_4", text: "Interação frequente e colaborativa", icon: "Users", score: { "Design": 90, "Manual e Técnico": 60 } },
        ]
      }
    ]
  }
];

export const PROFESSIONAL_AREAS = [
  { id: "Manual e Técnico", name: "Trabalho Manual e Técnico", icon: "Settings", description: "Montagem, manutenção, marcenaria, eletrônica, jardinagem." },
  { id: "Administração", name: "Administração e Organização", icon: "FileText", description: "Arquivo, controle de qualidade, gestão de documentos, logística." },
  { id: "Design", name: "Design e Artes Visuais", icon: "Palette", description: "Design gráfico, UX/UI, ilustração, animação, edição de vídeo." },
  { id: "Ciência", name: "Ciência e Pesquisa", icon: "Search", description: "Pesquisa acadêmica, laboratório, análise de dados científicos." },
  { id: "Tecnologia", name: "Tecnologia e Programação", icon: "Code", description: "Desenvolvimento de software, análise de dados, QA, segurança digital." },
  { id: "Escrita", name: "Escrita e Conteúdo", icon: "PenTool", description: "Redação, revisão, tradução, produção de conteúdo, copywriting." },
];

