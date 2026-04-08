import React from "react";
import { Info, Target, Heart, Shield, Accessibility, UserCheck } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <Info size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sobre o projeto</h1>
          <p className="text-gray-500">Conheça a missão e os valores do Conexão Solidária.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 mb-12 shadow-sm">
        <div className="flex items-center gap-3 mb-6 text-indigo-600 font-bold text-xl">
          <Target size={24} /> Nossa Missão
        </div>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            O <span className="font-bold text-gray-900">Conexão Solidária</span> é um projeto voltado para auxiliar pessoas com Transtorno do Espectro 
            Autista (TEA) a identificar ambientes de trabalho mais compatíveis com seu perfil e 
            necessidades.
          </p>
          <p>
            Através de um questionário cuidadosamente elaborado, analisamos preferências relacionadas 
            ao ambiente sensorial, comunicação, rotina, tipo de tarefa e interação social para sugerir áreas 
            profissionais que ofereçam maior compatibilidade.
          </p>
          <p>
            Nosso objetivo é promover a inclusão no mercado de trabalho de forma respeitosa, 
            personalizada e acessível, ajudando cada pessoa a encontrar seu espaço com mais confiança.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-8">Nossos valores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ValueCard 
          icon={<Heart className="text-indigo-600" />}
          title="Inclusão"
          description="Acreditamos que toda pessoa merece encontrar um ambiente de trabalho que respeite suas necessidades."
        />
        <ValueCard 
          icon={<UserCheck className="text-indigo-600" />}
          title="Personalização"
          description="Cada pessoa é única. Nosso sistema respeita a individualidade de cada perfil."
        />
        <ValueCard 
          icon={<Accessibility className="text-indigo-600" />}
          title="Acessibilidade"
          description="Design pensado para conforto visual e redução de sobrecarga sensorial."
        />
        <ValueCard 
          icon={<Shield className="text-indigo-600" />}
          title="Privacidade"
          description="Seus dados são pessoais e protegidos. Você controla suas informações."
        />
      </div>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-indigo-300 transition-all">
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
