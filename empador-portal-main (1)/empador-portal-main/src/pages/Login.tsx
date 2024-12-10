import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);  // Ajouter un état de chargement pour l'authentification

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", credentials);
    
    setLoading(true);  // Déclencher le chargement avant l'appel API

    try {
      const response = await fetch("http://127.0.0.1:8083/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.text();
        toast.success(data);  // Afficher le message de succès
        navigate("/dashboard");
      } else {
        const error = await response.text();
        toast.error(error);  // Afficher un message d'erreur
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la connexion.");
    } finally {
      setLoading(false);  // Arrêter le chargement une fois la requête terminée
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-hover">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur">
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 rounded-full bg-primary/10">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Connexion</h1>
          <p className="text-gray-500">Bienvenue sur votre espace de gestion</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Nom d'utilisateur"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Mot de passe"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Chargement..." : "Se connecter"}
          </Button>
        </form>
        <div className="text-center text-sm">
          <span className="text-gray-500">Pas encore de compte?</span>{" "}
          <Button
            variant="link"
            className="text-primary p-0"
            onClick={() => navigate("/register")}
          >
            S'inscrire
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
