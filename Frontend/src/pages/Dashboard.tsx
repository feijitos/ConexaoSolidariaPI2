import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ClipboardList, BarChart3, User, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface DashboardProps {
  user: any;
}

export default function Dashboard({ user }: DashboardProps) {
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    const results = localStorage.getItem(`results_${user.id}`);
    if (results) {
      setHasCompleted(true);
    }
  }, [user.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <User size={18} />
          <span className="font-medium">Bem-vindo ao Conexão Solidária</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Olá, {user.name}!</h1>
        <p className="text-gray-600 mt-2">Aqui você pode descobrir ambientes de trabalho mais compatíveis com seu perfil, no seu tempo e ritmo.</p>
      </div>

      {hasCompleted && (
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-12 flex items-center gap-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-green-800 font-medium">Questionário completo! Confira seus resultados ou refaça o questionário quando quiser.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DashboardCard 
          icon={<ClipboardList className="text-indigo-600" />}
          title="Questionário"
          description="Responder o questionário para obter a análise."
          link="/questionnaire"
          linkText={hasCompleted ? "Refazer questionário" : "Responder questionário"}
        />
        <DashboardCard 
          icon={<BarChart3 className="text-indigo-600" />}
          title="Resultados"
          description="Veja sua análise de compatibilidade."
          link="/results"
          linkText="Ver resultados"
          disabled={!hasCompleted}
        />
        <DashboardCard 
          icon={<User className="text-indigo-600" />}
          title="Meu perfil"
          description="Monte seu perfil profissional e currículo."
          link="/profile"
          linkText="Criar perfil"
        />
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, description, link, linkText, disabled }: { icon: React.ReactNode, title: string, description: string, link: string, linkText: string, disabled?: boolean }) {
  return (
    <div className={`bg-white p-8 rounded-3xl border border-gray-200 flex flex-col h-full ${disabled ? 'opacity-60 grayscale' : 'hover:border-indigo-300 hover:shadow-lg transition-all'}`}>
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 flex-grow">{description}</p>
      
      {disabled ? (
        <span className="text-gray-400 font-bold flex items-center gap-2 cursor-not-allowed">
          {linkText} <ArrowRight size={18} />
        </span>
      ) : (
        <Link 
          to={link} 
          className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
        >
          {linkText} <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
