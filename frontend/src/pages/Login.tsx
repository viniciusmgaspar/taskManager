import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err: any) {
      console.error("Login failed", err);
      alert(err?.response?.data?.message || "Erro ao logar");
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>LOGIN</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              color: "#374151",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              color: "#374151",
              marginBottom: "4px",
              textAlign: "center",
            }}
          >
            Senha
          </label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              outline: "none",
            }}
          />
        </div>
        <Link to="/register" style={{ color: "#2563eb", marginTop: "8px" }}>
          Criar uma conta
        </Link>
        <button
          type="submit"
          style={{
            width: "80px",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "500",
            cursor: "pointer",
            border: "none",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
