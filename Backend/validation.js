/**
 * Input Validation Module
 * Provides validation and sanitization utilities for backend routes
 */

/**
 * Validates email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

/**
 * Validates password strength
 * - Minimum 6 characters
 * - Maximum 128 characters
 * - Blocks dangerous characters that could be used for injection
 */
export const isValidPassword = (password) => {
  if (!password || typeof password !== "string") return false;
  
  // Block SQL injection and XSS characters
  const dangerousChars = /[<>"'%;()&+`]/;
  if (dangerousChars.test(password)) return false;
  
  // Check length
  if (password.length < 6 || password.length > 128) return false;
  
  return true;
};

/**
 * Validates name format
 * - Accepts letters (including accented), numbers, spaces, hyphens
 * - Minimum 2 characters
 * - Maximum 100 characters
 */
export const isValidName = (name) => {
  if (!name || typeof name !== "string") return false;
  
  // Allow letters, accented chars, numbers, spaces, hyphens
  const nameRegex = /^[a-zA-ZÀ-ÿ0-9\s\-]{2,100}$/;
  return nameRegex.test(name);
};

/**
 * Sanitizes string input by removing dangerous characters
 */
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  
  // Trim whitespace and remove dangerous characters
  return input.trim().replace(/[<>"'%;()&+`]/g, "");
};

/**
 * Validates email doesn't contain SQL injection patterns
 */
export const isSQLSafeEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  
  // Block common SQL injection patterns in email
  const sqlInjectionPattern = /('|"|-{2}|\/\*|\*\/|xp_|sp_|;|UNION|SELECT|DROP|INSERT|UPDATE|DELETE|CREATE|ALTER)/i;
  return !sqlInjectionPattern.test(email);
};

/**
 * Rate limiting helper (basic in-memory implementation)
 * For production, use Redis or similar
 */
const rateLimitStore = new Map();

export const checkRateLimit = (identifier, maxAttempts = 5, windowMs = 60000) => {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;
  
  let data = rateLimitStore.get(key);
  
  // Clean up old entries
  if (!data || now - data.resetTime > windowMs) {
    data = { attempts: 0, resetTime: now };
  }
  
  data.attempts++;
  rateLimitStore.set(key, data);
  
  // Delete old entries periodically
  if (Math.random() < 0.01) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (now - v.resetTime > windowMs * 2) {
        rateLimitStore.delete(k);
      }
    }
  }
  
  return {
    isLimited: data.attempts > maxAttempts,
    attempts: data.attempts,
    maxAttempts,
    remainingTime: Math.max(0, windowMs - (now - data.resetTime)),
  };
};

/**
 * Comprehensive validation for registration
 */
export const validateRegistration = (name, email, password) => {
  const errors = [];
  
  if (!name) errors.push("Nome é obrigatório");
  else if (!isValidName(name)) errors.push("Nome contém caracteres inválidos ou comprimento inadequado");
  
  if (!email) errors.push("Email é obrigatório");
  else if (!isValidEmail(email)) errors.push("Email inválido");
  else if (!isSQLSafeEmail(email)) errors.push("Email contém caracteres suspeitos");
  
  if (!password) errors.push("Senha é obrigatória");
  else if (!isValidPassword(password)) errors.push("Senha deve ter 6-128 caracteres sem caracteres especiais perigosos");
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Comprehensive validation for login
 */
export const validateLogin = (email, password) => {
  const errors = [];
  
  if (!email) errors.push("Email é obrigatório");
  else if (!isValidEmail(email)) errors.push("Email inválido");
  else if (!isSQLSafeEmail(email)) errors.push("Credenciais inválidas");
  
  if (!password) errors.push("Senha é obrigatória");
  else if (password.length > 128) errors.push("Senha inválida");
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
