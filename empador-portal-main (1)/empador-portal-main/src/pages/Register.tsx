import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt:", formData);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // Envoi des données au backend Spring Boot
      const response = await axios.post("http://127.0.0.1:8083/User/add", {
        username: formData.username,
        password: formData.password, // Envoi uniquement username et password
      });

      // Si l'inscription réussit
      if (response.status === 201) {
        toast.success("Inscription réussie!");
        navigate("/login");
      }
    } catch (error) {
      // En cas d'erreur
      console.error("Error during registration:", error);
      toast.error("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-hover">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur">
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 rounded-full bg-primary/10">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Inscription</h1>
          <p className="text-gray-500">Créez votre compte</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            S'inscrire
          </Button>
        </form>
        <div className="text-center text-sm">
          <span className="text-gray-500">Déjà un compte?</span>{" "}
          <Button
            variant="link"
            className="text-primary p-0"
            onClick={() => navigate("/login")}
          >
            Se connecter
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
