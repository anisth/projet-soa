import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Users, Building, BarChart, PlusCircle } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [totalEmployes, setTotalEmployes] = useState(0);
  const [totalDepartements, setTotalDepartements] = useState(0);

  useEffect(() => {
    calculemployer();
    calculdepartement();
  }, []);

  const calculemployer = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8083/Employe/count");
      setTotalEmployes(response.data);
    } catch (error) {
      console.error("Erreur lors du calcul des employés", error);
    }
  };

  const calculdepartement = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8083/Departement/count");
      setTotalDepartements(response.data);
    } catch (error) {
      console.error("Erreur lors du calcul des départements", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Tableau de bord</h1>

        {/* Section des cartes principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex items-center space-x-6">
              <Users className="w-12 h-12 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-400">Total Employés</p>
                <p className="text-2xl font-bold text-white">{totalEmployes}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex items-center space-x-6">
              <Building className="w-12 h-12 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-400">Départements</p>
                <p className="text-2xl font-bold text-white">{totalDepartements}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Graphique ou diagramme */}
        <div className="mt-10">
          <Card className="p-6 bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Statistiques</h2>
            <div className="flex justify-center items-center">
              <BarChart className="w-40 h-40 text-primary" />
              <p className="text-gray-400 ml-4">Graphique à intégrer ici.</p>
            </div>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Actions rapides</h2>
          
        </div>

        
      </main>
    </div>
  );
};

export default Dashboard;
