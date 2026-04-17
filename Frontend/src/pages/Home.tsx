import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Shield,
  Sparkles,
  Zap,
  Heart
} from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-8">
              <Sparkles size={16} />
              <span>icon + Inclusão no mercado de trabalho</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
              Encontre o ambiente de<br />
              <span className="text-indigo-600">trabalho ideal para você</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              Um sistema pensado para pessoas com Transtorno do Espectro Autista que desejam descobrir ambientes profissionais mais compatíveis com seu perfil e necessidades.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:-translate-y-1"
              >
                Começar agora <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
              >
                Saiba mais
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Como funciona</h2>
            <p className="text-lg text-gray-600">
              Uma experiência simples e acolhedora para ajudar você a entender suas preferências profissionais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "icon",
                title: "Ambiente Seguro",
                desc: "Questionário sem pressão, no seu tempo e ritmo."
              },
              {
                icon: "icon",
                title: "Análise personalizada",
                desc: "Resultados baseados nas suas preferências reais."
              },
              {
                icon: "icon",
                title: "Perfil profissional",
                desc: "Monte seu currículo e identifique seus pontos fortes."
              },
              {
                icon: "icon",
                title: "Acessibilidade",
                desc: "Design pensado para conforto e baixa estimulação."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-gray-200"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 text-gray-600">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Questionnaire Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Pronto para descobrir seu perfil?</h2>
          <p className="text-lg text-gray-600 mb-12">
            O questionário leva cerca de 5 minutos e você pode pausar a qualquer momento.
          </p>
          
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:-translate-y-1"
          >
            Iniciar questionário <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

