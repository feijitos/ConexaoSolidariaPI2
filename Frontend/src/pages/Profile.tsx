import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2,
  BrainCircuit,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";
import { motion } from "motion/react";

interface ProfileProps {
  user: any;
}

export default function Profile({ user }: ProfileProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [profile, setProfile] = useState({
    userId: user.id,
    name: user.name,
    email: user.email,
    phone: "",
    city: "",
    state: "",
    birthDate: "",
    bio: "",
    education: [] as any[],
    experience: [] as any[],
    skills: [] as string[]
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Erro ao buscar perfil", err);
      }
    };
    fetchProfile();
  }, [user.id]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const data = await response.json();
        console.error("Erro ao salvar perfil:", data.error);
      }
    } catch (err) {
      console.error("Erro ao salvar perfil", err);
    } finally {
      setLoading(false);
    }
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [...profile.education, { id: Date.now().toString(), institution: "", degree: "", year: "" }]
    });
  };

  const removeEducation = (id: string) => {
    setProfile({
      ...profile,
      education: profile.education.filter(e => e.id !== id)
    });
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [...profile.experience, { id: Date.now().toString(), company: "", role: "", period: "" }]
    });
  };

  const removeExperience = (id: string) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter(e => e.id !== id)
    });
  };

  const addSkill = (skill: string) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile({ ...profile, skills: [...profile.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Seu Perfil</h1>
            <p className="text-gray-500">Gerencie suas informações e currículo profissional.</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ${
            saved 
              ? 'bg-green-600 text-white shadow-green-100' 
              : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700'
          }`}
        >
          {loading ? "Salvando..." : saved ? <><CheckCircle2 size={20} /> Salvo!</> : <><Save size={20} /> Salvar Alterações</>}
        </button>
      </div>

      <div className="flex border-b border-gray-200 mb-10 overflow-x-auto">
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-8 py-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "personal" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          Informações Pessoais
        </button>
        <button
          onClick={() => setActiveTab("curriculum")}
          className={`px-8 py-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "curriculum" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          Currículo e Habilidades
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "personal" ? (
          <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:bg-white focus:border-indigo-600 transition-all font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full pl-12 pr-4 py-4 bg-gray-100 border-2 border-gray-100 rounded-2xl text-gray-500 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Telefone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:bg-white focus:border-indigo-600 transition-all font-medium"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Nascimento</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        value={profile.birthDate}
                        onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:bg-white focus:border-indigo-600 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Cidade</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:bg-white focus:border-indigo-600 transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Estado</label>
                    <input
                      type="text"
                      value={profile.state}
                      onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:bg-white focus:border-indigo-600 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Sobre Você (Bio)</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={12}
                  className="w-full p-6 bg-gray-50 border-2 border-gray-50 rounded-2xl focus:bg-white focus:border-indigo-600 transition-all font-medium resize-none"
                  placeholder="Conte um pouco sobre suas preferências e objetivos profissionais..."
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Education */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <GraduationCap className="text-indigo-600" /> Formação Acadêmica
                </h2>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all"
                >
                  <Plus size={20} /> Adicionar
                </button>
              </div>
              <div className="space-y-6">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-3xl relative group">
                    <input
                      placeholder="Instituição"
                      value={edu.institution}
                      onChange={(e) => {
                        const newEdu = profile.education.map(item => item.id === edu.id ? { ...item, institution: e.target.value } : item);
                        setProfile({ ...profile, education: newEdu });
                      }}
                      className="bg-white border-2 border-white rounded-xl px-4 py-3 focus:border-indigo-600 transition-all font-medium"
                    />
                    <input
                      placeholder="Curso/Grau"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdu = profile.education.map(item => item.id === edu.id ? { ...item, degree: e.target.value } : item);
                        setProfile({ ...profile, education: newEdu });
                      }}
                      className="bg-white border-2 border-white rounded-xl px-4 py-3 focus:border-indigo-600 transition-all font-medium"
                    />
                    <div className="flex gap-2">
                      <input
                        placeholder="Ano"
                        value={edu.year}
                        onChange={(e) => {
                          const newEdu = profile.education.map(item => item.id === edu.id ? { ...item, year: e.target.value } : item);
                          setProfile({ ...profile, education: newEdu });
                        }}
                        className="flex-grow bg-white border-2 border-white rounded-xl px-4 py-3 focus:border-indigo-600 transition-all font-medium"
                      />
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                {profile.education.length === 0 && (
                  <p className="text-center py-10 text-gray-400 font-medium">Nenhuma formação adicionada.</p>
                )}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Briefcase className="text-indigo-600" /> Experiência Profissional
                </h2>
                <button
                  onClick={addExperience}
                  className="flex items-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all"
                >
                  <Plus size={20} /> Adicionar
                </button>
              </div>
              <div className="space-y-6">
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-3xl relative group">
                    <input
                      placeholder="Empresa"
                      value={exp.company}
                      onChange={(e) => {
                        const newExp = profile.experience.map(item => item.id === exp.id ? { ...item, company: e.target.value } : item);
                        setProfile({ ...profile, experience: newExp });
                      }}
                      className="bg-white border-2 border-white rounded-xl px-4 py-3 focus:border-indigo-600 transition-all font-medium"
                    />
                    <input
                      placeholder="Cargo"
                      value={exp.role}
                      onChange={(e) => {
                        const newExp = profile.experience.map(item => item.id === exp.id ? { ...item, role: e.target.value } : item);
                        setProfile({ ...profile, experience: newExp });
                      }}
                      className="bg-white border-2 border-white rounded-xl px-4 py-3 focus:border-indigo-600 transition-all font-medium"
                    />
                    <div className="flex gap-2">
                      <input
                        placeholder="Período"
                        value={exp.period}
                        onChange={(e) => {
                          const newExp = profile.experience.map(item => item.id === exp.id ? { ...item, period: e.target.value } : item);
                          setProfile({ ...profile, experience: newExp });
                        }}
                        className="flex-grow bg-white border-2 border-white rounded-xl px-4 py-3 focus:border-indigo-600 transition-all font-medium"
                      />
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                {profile.experience.length === 0 && (
                  <p className="text-center py-10 text-gray-400 font-medium">Nenhuma experiência adicionada.</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <BrainCircuit className="text-indigo-600" /> Habilidades
              </h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-sm"
                  >
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:text-indigo-900">
                      <Trash2 size={14} />
                    </button>
                  </span>
                ))}
                {profile.skills.length === 0 && (
                  <p className="text-gray-400 font-medium">Adicione suas principais habilidades.</p>
                )}
              </div>
              <div className="flex gap-3 max-w-md">
                <input
                  id="skill-input"
                  placeholder="Ex: Organização, Excel, Design..."
                  className="flex-grow px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-xl focus:bg-white focus:border-indigo-600 transition-all font-medium"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addSkill((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.getElementById("skill-input") as HTMLInputElement;
                    addSkill(input.value);
                    input.value = "";
                  }}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

