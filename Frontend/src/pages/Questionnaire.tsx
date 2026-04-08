import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTIONNAIRE_STEPS } from "../constants";
import { ArrowLeft, ArrowRight, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as LucideIcons from "lucide-react";

interface QuestionnaireProps {
  user: any;
}

export default function Questionnaire({ user }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const step = QUESTIONNAIRE_STEPS[currentStep];

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONNAIRE_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          answers, 
          questions_data: QUESTIONNAIRE_STEPS 
        }),
      });
      
      const results = await response.json();
      if (response.ok) {
        localStorage.setItem(`results_${user.id}`, JSON.stringify(results));
        navigate("/results");
      }
    } catch (err) {
      console.error("Erro ao enviar questionário", err);
    } finally {
      setLoading(false);
    }
  };

  const isStepComplete = step.questions.every(q => !!answers[q.id]);

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <ClipboardList size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Questionário de Preferências</h1>
          <p className="text-gray-500 text-sm">Responda com calma, no seu tempo. Não existem respostas certas ou erradas.</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {QUESTIONNAIRE_STEPS.map((s, idx) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  idx === currentStep 
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' 
                    : idx < currentStep 
                      ? 'bg-indigo-200 text-indigo-700' 
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {idx + 1}
              </div>
              <span className={`text-xs font-medium ${idx === currentStep ? 'text-indigo-600' : 'text-gray-400'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / QUESTIONNAIRE_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm"
        >
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
          </div>

          <div className="space-y-12">
            {step.questions.map(q => (
              <div key={q.id}>
                <h3 className="text-lg font-bold text-gray-800 mb-6">{q.text}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt: any) => (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(q.id, opt.id)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 group ${
                        answers[q.id] === opt.id
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-md'
                          : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        answers[q.id] === opt.id 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                      }`}>
                        {renderIcon(opt.icon)}
                      </div>
                      <span className={`font-medium flex-grow ${answers[q.id] === opt.id ? 'text-indigo-900' : 'text-gray-700'}`}>
                        {opt.text}
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        answers[q.id] === opt.id 
                          ? 'border-indigo-600 bg-indigo-600' 
                          : 'border-gray-300 group-hover:border-indigo-400'
                      }`}>
                        {answers[q.id] === opt.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all disabled:opacity-0"
        >
          <ArrowLeft size={20} /> Anterior
        </button>
        
        <div className="text-gray-400 font-medium">
          {currentStep + 1} de {QUESTIONNAIRE_STEPS.length}
        </div>

        <button
          onClick={handleNext}
          disabled={!isStepComplete || loading}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100"
        >
          {loading ? "Processando..." : currentStep === QUESTIONNAIRE_STEPS.length - 1 ? "Ver resultados" : "Próximo"} 
          {!loading && <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
}

