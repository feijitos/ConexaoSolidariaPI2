import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Shield, 
  Zap,
  Heart,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-6">
                <Sparkles size={16} />
                <span>Plataforma de Inclusão Profissional</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-8">
                Conectando <span className="text-indigo-600">Talentos</span> ao Futuro <span className="text-indigo-600">Ideal</span>.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                Uma plataforma dedicada a identificar ambientes de trabalho ideais para pessoas com TEA, promovendo inclusão real e sustentável.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:-translate-y-1"
                >
                  Começar Agora <ArrowRight size={20} />
                </Link>
                <Link
                  to="/about"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all hover:-translate-y-1"
                >
                  Saiba Mais
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`}
                      alt="User"
                      className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-yellow-500 font-bold">
                    {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                  <p className="text-gray-500 font-medium">+500 usuários conectados</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white p-4 rounded-[40px] shadow-2xl border border-gray-100">
                <img
                  src="https://picsum.photos/seed/inclusion/800/600"
                  alt="Inclusão Profissional"
                  className="rounded-[32px] w-full h-auto shadow-inner"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Cards */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase">Status</div>
                    <div className="text-sm font-bold text-gray-900">Perfil Analisado</div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <Target size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase">Foco</div>
                    <div className="text-sm font-bold text-gray-900">Match Perfeito</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative Circles */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-indigo-50 rounded-full opacity-50" />
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-indigo-50 rounded-full opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-6">Por que escolher a Conexão Solidária?</h2>
            <p className="text-lg text-gray-600">Desenvolvemos uma metodologia focada na individualidade, respeitando limites e potencializando talentos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="text-indigo-600" size={32} />,
                title: "Ambiente Seguro",
                desc: "Analisamos fatores sensoriais e sociais para garantir um local de trabalho confortável."
              },
              {
                icon: <Zap className="text-indigo-600" size={32} />,
                title: "Análise Inteligente",
                desc: "Algoritmos especializados que cruzam suas preferências com áreas de atuação."
              },
              {
                icon: <Heart className="text-indigo-600" size={32} />,
                title: "Foco no Bem-estar",
                desc: "Priorizamos a saúde mental e a adaptação sustentável no mercado de trabalho."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-indigo-600 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: "Usuários Ativos", val: "500+" },
              { label: "Empresas Parceiras", val: "50+" },
              { label: "Áreas Analisadas", val: "12" },
              { label: "Taxa de Sucesso", val: "94%" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-black mb-2">{stat.val}</div>
                <div className="text-indigo-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gray-900 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full translate-x-1/2 -translate-y-1/2 blur-[100px] opacity-30" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Pronto para encontrar seu caminho?</h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Junte-se a centenas de pessoas que já descobriram onde seus talentos brilham mais.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/20"
              >
                Criar Minha Conta <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

