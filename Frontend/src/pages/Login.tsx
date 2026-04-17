import React from "react";
import Register from "./Register";

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  // Just delegate to Register component which now handles both login and register
  return <Register onLogin={onLogin} />;
}

