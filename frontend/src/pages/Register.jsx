import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register(){
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function  handleSubmit (e) {
        e.preventDefault();
        setError("");
        try{
            const data = await  registerUser (nom, email, motDePasse);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
        }catch (err){
            setError(err.message);
        }
    } return (
    <main className="px-4 md:px-12 py-12 max-w-md mx-auto">
      <div className="glass-card p-8">
        <h1 className="text-2xl font-bold text-dark mb-6">Inscription</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full bg-white/80 rounded-full px-4 py-3 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/80 rounded-full px-4 py-3 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="w-full bg-white/80 rounded-full px-4 py-3 outline-none"
            required
          />
          <button type="submit" className="w-full bg-dark text-white py-3 rounded-full font-semibold">
            S'inscrire
          </button>
        </form>
      </div>
    </main>
  );
}