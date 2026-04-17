import { QuestionnaireStep } from "./types";

export const QUESTIONNAIRE_STEPS: QuestionnaireStep[] = [
  {
    id: "sensorial",
    title: "Sensorial",
    description: "Como você se sente em relação ao ambiente físico de trabalho?",
    questions: [
      {
        id: "sensorial_noise",
        text: "Qual seu nível de conforto com barulho no ambiente?",
        options: [
          { id: "noise_1", text: "Preciso de silêncio total" },
          { id: "noise_2", text: "Ruídos baixos são ok" },
          { id: "noise_3", text: "Barulho moderado não me incomoda" },
          { id: "noise_4", text: "Lido bem com ambientes barulhentos" },
        ]
      },
      {
        id: "sensorial_lighting",
        text: "Como você prefere a iluminação?",
        options: [
          { id: "light_1", text: "Luz natural e suave" },
          { id: "light_2", text: "Luz controlada e indireta" },
          { id: "light_3", text: "Não tenho preferência forte" },
          { id: "light_4", text: "Qualquer iluminação serve" },
        ]
      },
      {
        id: "sensorial_space",
        text: "Que tipo de espaço de trabalho você prefere?",
        options: [
          { id: "space_1", text: "Sala individual e fechada" },
          { id: "space_2", text: "Espaço semi-privado com divisórias" },
          { id: "space_3", text: "Misto, com áreas abertas e fechadas" },
          { id: "space_4", text: "Espaço aberto e compartilhado" },
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
          { id: "comm_1", text: "Apenas por escrito (e-mail, chat)" },
          { id: "comm_2", text: "Escrito com reuniões ocasionais" },
          { id: "comm_3", text: "Misto entre escrito e verbal" },
          { id: "comm_4", text: "Principalmente verbal e presencial" },
        ]
      },
      {
        id: "comm_instructions",
        text: "Como você prefere receber instruções?",
        options: [
          { id: "instr_1", text: "Instruções escritas e detalhadas" },
          { id: "instr_2", text: "Instruções verbais com exemplos" },
          { id: "instr_3", text: "Demonstração prática passo a passo" },
          { id: "instr_4", text: "Aprendo sozinho explorando" },
        ]
      },
      {
        id: "comm_feedback",
        text: "Como você prefere receber feedback?",
        options: [
          { id: "feedback_1", text: "Feedback frequente e direto" },
          { id: "feedback_2", text: "Feedback privado e construtivo" },
          { id: "feedback_3", text: "Feedback geral do time" },
          { id: "feedback_4", text: "Prefiro solicitar quando preciso" },
        ]
      }
    ]
  },
  {
    id: "rotina",
    title: "Rotina",
    description: "Como você se organiza com horários e mudanças?",
    questions: [
      {
        id: "routine_schedule",
        text: "Qual tipo de horário você prefere?",
        options: [
          { id: "sched_1", text: "Horário fixo rigoroso" },
          { id: "sched_2", text: "Horário fixo com pequena flexibilidade" },
          { id: "sched_3", text: "Horário semiflexível" },
          { id: "sched_4", text: "Horário completamente flexível" },
        ]
      },
      {
        id: "routine_changes",
        text: "Como você lida com mudanças na rotina?",
        options: [
          { id: "change_1", text: "Preciso de aviso prévio com detalhes" },
          { id: "change_2", text: "Aviso com poucas horas de antecedência" },
          { id: "change_3", text: "Consigo me adaptar facilmente" },
          { id: "change_4", text: "Mudanças não me afetam" },
        ]
      },
      {
        id: "routine_breaks",
        text: "Como você prefere seus intervalos?",
        options: [
          { id: "breaks_1", text: "Intervalos curtos e frequentes" },
          { id: "breaks_2", text: "Poucos intervalos longos" },
          { id: "breaks_3", text: "Intervalos autorregulados conforme necessário" },
          { id: "breaks_4", text: "Prefiro trabalhar sem pausas" },
        ]
      }
    ]
  },
  {
    id: "tarefas",
    title: "Tarefas",
    description: "Como você executa melhor suas tarefas?",
    questions: [
      {
        id: "task_type",
        text: "Que tipo de tarefa você executa melhor?",
        options: [
          { id: "task_1", text: "Tarefas com processos bem definidos" },
          { id: "task_2", text: "Tarefas variadas e diferentes" },
          { id: "task_3", text: "Tarefas criativas e inovadoras" },
          { id: "task_4", text: "Tarefas que requerem colaboração" },
        ]
      },
      {
        id: "task_detail",
        text: "Qual é seu nível de atenção a detalhes?",
        options: [
          { id: "detail_1", text: "Extremamente detalhista" },
          { id: "detail_2", text: "Atento aos detalhes importantes" },
          { id: "detail_3", text: "Foco no resultado geral" },
          { id: "detail_4", text: "Prefiro visão ampla e estratégica" },
        ]
      },
      {
        id: "task_learning",
        text: "Qual é seu estilo de aprendizado?",
        options: [
          { id: "learning_1", text: "Aprendo observando e imitando" },
          { id: "learning_2", text: "Aprendo com instruções claras" },
          { id: "learning_3", text: "Aprendo experimentando" },
          { id: "learning_4", text: "Aprendo ensinando outros" },
        ]
      }
    ]
  },
  {
    id: "social",
    title: "Social",
    description: "Como você trabalha melhor em um ambiente social?",
    questions: [
      {
        id: "social_team",
        text: "Qual tamanho de equipe você prefere?",
        options: [
          { id: "team_1", text: "Trabalho individual isolado" },
          { id: "team_2", text: "Pequeno grupo (2-4 pessoas)" },
          { id: "team_3", text: "Equipe média (5-10 pessoas)" },
          { id: "team_4", text: "Grande grupo (mais de 10)" },
        ]
      },
      {
        id: "social_interaction",
        text: "Com que frequência você prefere interagir?",
        options: [
          { id: "interact_1", text: "Interações mínimas durante trabalho" },
          { id: "interact_2", text: "Interações breves e pontuais" },
          { id: "interact_3", text: "Interações frequentes e informais" },
          { id: "interact_4", text: "Gosto de estar constantemente em contato" },
        ]
      },
      {
        id: "social_client",
        text: "Como você se sente com contato com clientes/públicos?",
        options: [
          { id: "client_1", text: "Prefiro não ter contato" },
          { id: "client_2", text: "Contato eventual e breve" },
          { id: "client_3", text: "Contato regular com suporte" },
          { id: "client_4", text: "Gosto de atender pessoas" },
        ]
      }
    ]
  }
];

export const PROFESSIONAL_AREAS = [
  { id: "1", name: "Administração e Gestão" },
  { id: "2", name: "Design e Criatividade" },
  { id: "3", name: "Trabalho Manual e Técnico" },
  { id: "4", name: "Ciência e Pesquisa" },
  { id: "5", name: "Tecnologia e Programação" },
  { id: "6", name: "Escrita e Conteúdo" },
];