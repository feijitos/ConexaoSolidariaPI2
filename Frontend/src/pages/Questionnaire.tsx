import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTIONNAIRE_STEPS } from "../constants";
import { ArrowLeft, ArrowRight, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuestionnaireProps {
  user: any;
}

export default function Questionnaire({ user }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const step = QUESTIONNAIRE_STEPS[currentStep];
  const totalSteps = QUESTIONNAIRE_STEPS.length;
  const isLastStep = currentStep === totalSteps - 1;

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (!isLastStep) {
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
      localStorage.setItem(`answers_${user.id}`, JSON.stringify(answers));
      navigate("/results");
    } catch (err) {
      console.error("Erro ao enviar questionário", err);
    } finally {
      setLoading(false);
    }
  };

  const isStepComplete = step.questions.every(q => !!answers[q.id]);
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <ClipboardList size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Questionário de Preferências</h1>
              <p className="text-gray-500 text-sm">Responda com calma, no seu tempo. Não existem respostas certas ou erradas.</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between items-end gap-2 mb-4">
            {QUESTIONNAIRE_STEPS.map((s, idx) => (
              <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    idx === currentStep 
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 ring-offset-2' 
                      : idx < currentStep 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {idx < currentStep ? '✓' : idx + 1}
                </div>
                <span className={`text-xs font-bold text-center ${idx === currentStep ? 'text-indigo-600' : idx < currentStep ? 'text-gray-700' : 'text-gray-400'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-2xl p-8"
          >
            {/* Section Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h2>
              <p className="text-gray-600">{step.description}</p>
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {step.questions.map((question) => (
                <div key={question.id}>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {question.text}
                  </h3>
                  
                  {/* Options Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => handleOptionSelect(question.id, option.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl text-left font-medium transition-all border-2 ${
                          answers[question.id] === option.id
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-lg">icon</span> {option.text}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={20} /> Anterior
          </button>

          <span className="text-sm font-bold text-gray-600">
            {currentStep + 1} de {totalSteps}
          </span>

          <button
            onClick={handleNext}
            disabled={!isStepComplete || loading}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastStep ? (
              <>
                Ver resultados <ArrowRight size={20} />
              </>
            ) : (
              <>
                Próximo <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
