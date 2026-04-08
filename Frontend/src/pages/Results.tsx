import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, PolarRadiusAxis 
} from "recharts";
import { PROFESSIONAL_AREAS } from "../constants";
import { Award, RefreshCcw, CheckCircle2, LayoutDashboard, Briefcase, Trophy, Star } from "lucide-react";
import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";

interface ResultsProps {
  user: any;
}

export default function Results({ user }: ResultsProps) {
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedResults = localStorage.getItem(`results_${user.id}`);
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      navigate("/dashboard");
    }
  }, [user.id, navigate]);

  if (results.length === 0) return null;

  // Prepare data for Radar Chart
  const chartData = results.map((item: any) => ({
    subject: PROFESSIONAL_AREAS.find(a => a.id === item.name)?.name || item.name,
    A: item.percentage,
    fullMark: 100,
  }));

  const renderIcon = (iconName: string | undefined) => {
    if (!iconName) return <Briefcase size={24} />;
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={24} /> : <Briefcase size={24} />;
  };

  const getBadgeText = (index: number) => {
    if (index === 0) return "Mais compatível";
    if (index === 1) return "2º lugar";
    if (index === 2) return "3º lugar";
    return `${index + 1}º lugar`;
  };

  const getBadgeIcon = (index: number) => {
    if (index === 0) return <Trophy size={14} />;
    if (index === 1) return <Award size={14} />;
    return <Star size={14} />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Análise Concluída</h1>
            <p className="text-gray-500">Aqui estão as áreas profissionais que mais combinam com seu perfil.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            to="/questionnaire"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all"
          >
            <RefreshCcw size={20} /> Refazer Teste
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Radar Chart Section */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Award className="text-indigo-600" /> Gráfico de Compatibilidade
            </h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Compatibilidade"
                    dataKey="A"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    fill="#4f46e5"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-600 leading-relaxed">
                O gráfico acima mostra como suas preferências se distribuem entre as diferentes áreas profissionais analisadas.
              </p>
            </div>
          </div>
        </div>

        {/* Areas List Section */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Áreas Profissionais Recomendadas</h2>
          
          {results.map((item: any, index: number) => {
            const areaInfo = PROFESSIONAL_AREAS.find(a => a.id === item.name);
            if (!areaInfo) return null;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white p-6 rounded-3xl border-2 transition-all ${
                  index === 0 
                    ? 'border-indigo-600 shadow-xl shadow-indigo-50 ring-4 ring-indigo-50/50' 
                    : 'border-gray-100 hover:border-indigo-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      index === 0 ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {renderIcon(areaInfo.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{areaInfo.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          index === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {getBadgeIcon(index)}
                          {getBadgeText(index)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-indigo-600">{Math.round(item.percentage)}%</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Compatibilidade</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {areaInfo.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span>Nível de Afinidade</span>
                    <span>{Math.round(item.percentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                      className={`h-full rounded-full ${index === 0 ? 'bg-indigo-600' : 'bg-indigo-400'}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

