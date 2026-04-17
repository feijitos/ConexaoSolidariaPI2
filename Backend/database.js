// TODO: Database integration in progress
// Connection to MySQL will be implemented in next phase

import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "app",
  password: process.env.MYSQL_PASSWORD || "apppass",
  database: process.env.MYSQL_DATABASE || "conexao_solidaria",
  port: process.env.MYSQL_PORT || 3306,
};

let connection;

export const connectDatabase = async () => {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    // Fallback to mock database for now
  }
};

export const getConnection = () => connection;

// Future queries implementation:
// - getUserByEmail(email)
// - createUser(name, email, password)
// - saveQuestionnaire(userId, answers)
// - getAnalysisResults(userId)
