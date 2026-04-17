/**
 * API Configuration
 * Centralizes all API endpoints and base URL management
 * Uses Vite environment variables for production/development
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  // Authentication
  REGISTER: `${API_BASE_URL}/api/register`,
  LOGIN: `${API_BASE_URL}/api/login`,

  // Questionnaire
  QUESTIONNAIRE_SUBMIT: `${API_BASE_URL}/api/questionnaire`,
  QUESTIONNAIRE_GET: (id) => `${API_BASE_URL}/api/questionnaire/${id}`,

  // Analysis
  ANALYZE: `${API_BASE_URL}/api/analyze`,

  // Health Check
  HEALTH: `${API_BASE_URL}/api/health`,
};

/**
 * Generic API request wrapper with error handling
 */
export const apiRequest = async (
  url,
  options = {}
) => {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro na requisição");
    }

    return { ok: true, data, status: response.status };
  } catch (error) {
    console.error("API Error:", error);
    return {
      ok: false,
      error: error.message || "Erro ao conectar com o servidor",
      status: 500,
    };
  }
};
