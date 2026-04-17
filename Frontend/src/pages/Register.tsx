import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { API_ENDPOINTS, apiRequest } from "../api";

interface RegisterProps {
  onLogin: (user: any) => void;
}

export default function Register({ onLogin }: RegisterProps) {
  const [isLogin, setIsLogin] = useState(false);
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register fields
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await apiRequest(API_ENDPOINTS.LOGIN, {
      method: "POST",
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });

    if (result.ok) {
      onLogin(result.data);
      navigate("/dashboard");
    } else {
      setError(result.error || "Credenciais inválidas. Tente novamente.");
    }

    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await apiRequest(API_ENDPOINTS.REGISTER, {
      method: "POST",
      body: JSON.stringify({ name: registerName, email: registerEmail, password: registerPassword }),
    });

    if (result.ok) {
      onLogin(result.data);
      navigate("/dashboard");
    } else {
      setError(result.error || "Ocorreu um erro ao criar sua conta.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              className={`flex-1 py-4 px-6 font-bold text-center transition-all ${
                !isLogin
                  ? "text-indigo-600 border-b-4 border-indigo-600 bg-white"
                  : "text-gray-600 border-b-4 border-transparent hover:text-gray-900"
              }`}
            >
              Criar conta
            </button>
            <button
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              className={`flex-1 py-4 px-6 font-bold text-center transition-all ${
                isLogin
                  ? "text-indigo-600 border-b-4 border-indigo-600 bg-white"
                  : "text-gray-600 border-b-4 border-transparent hover:text-gray-900"
              }`}
            >
              Entrar
            </button>
          </div>

          {/* Form Content */}
          <div className="p-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
              >
                <AlertCircle size={20} />
                {error}
              </motion.div>
            )}

            {!isLogin ? (
              // Register Form
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Criar Conta</h2>
                <p className="text-gray-500 mb-8">Junte-se a nós e descubra seu potencial.</p>

                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nome Completo</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <User size={20} />
                      </div>
                      <input
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all font-medium"
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Mail size={20} />
                      </div>
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all font-medium"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Senha</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Lock size={20} />
                      </div>
                      <input
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all font-medium"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
                  >
                    Começar agora <ArrowRight size={20} />
                  </button>
                </form>
              </>
            ) : (
              // Login Form
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Entrar</h2>
                <p className="text-gray-500 mb-8">Acesse sua conta para continuar sua jornada.</p>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Mail size={20} />
                      </div>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all font-medium"
                        placeholder="Digite seu e-mail"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Senha</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Lock size={20} />
                      </div>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-0 transition-all font-medium"
                        placeholder="Digite sua senha"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
                  >
                    Começar agora <ArrowRight size={20} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

