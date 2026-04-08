export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    score: Record<string, number>;
    icon?: string;
  }[];
}

export interface QuestionnaireStep {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
  birthDate?: string;
  bio?: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
}

export interface CompatibilityResult {
  category: string;
  score: number;
}

export interface ProfessionalArea {
  name: string;
  percentage: number;
  description: string;
  rank?: string;
  icon?: string;
}
