import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Building, UserPlus, Trash2 } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Departements = () => {
  const [totalDepartements, setTotalDepartements] = useState(0);
  const [departements, setDepartements] = useState([]);
  const [newDepartement, setNewDepartement] = useState({
    nom: "",
    nombre_employes: "",
    responsable: ""
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchDepartements();
    calculDepartements();
  }, []);

  const calculDepartements = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8083/Departement/count");
      setTotalDepartements(response.data);
    } catch (error) {
      console.error("Erreur lors du calcul des départements", error);
    }
  };

  const fetchDepartements = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8083/Departement/list");
      setDepartements(response.data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des départements", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8083/Departement/delete/${id}`);
      setDepartements((prev) => prev.filter((departement) => departement.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du département", error);
    }
  };

  const handleAddDepartement = async () => {
    try {
      const departementPayload = {
        nom: newDepartement.nom,
        nombreEmployes: newDepartement.nombre_employes,
        responsable: newDepartement.responsable
      };

      await axios.post("http://127.0.0.1:8083/Departement/add", departementPayload);
      toast.success("Département ajouté avec succès");
      setIsAddDialogOpen(false); // Fermer le modal après l'ajout
      fetchDepartements(); // Rafraîchir la liste des départements
    } catch (error) {
      toast.error("Erreur lors de l'ajout du département");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Gestion des Départements</h1>

        {/* Carte principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg">
            <div className="flex items-center space-x-6">
              <Building className="w-12 h-12 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-400">Total Départements</p>
                <p className="text-2xl font-bold text-white">{totalDepartements}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Liste des départements */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Liste des Départements</h2>
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-700 px-4 py-2 text-left">Nom</th>
                  <th className="border-b border-gray-700 px-4 py-2 text-left">Responsable</th>
                  <th className="border-b border-gray-700 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departements.map((departement) => (
                  <tr key={departement.id} className="hover:bg-gray-700">
                    <td className="px-4 py-2">{departement.nom || "Non spécifié"}</td>
                    <td className="px-4 py-2">{departement.responsable || "Non spécifié"}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => handleDelete(departement.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Actions rapides</h2>
          <Card className="p-6 bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-400">Ajouter un nouveau département</p>
              <p className="text-lg font-bold text-white">Gestion facile des équipes</p>
            </div>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <UserPlus className="w-4 h-4 mr-2" /> Ajouter
            </button>
          </Card>
        </div>

        {/* Modal pour ajouter un département */}
        {isAddDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full">
              <h2 className="text-xl font-bold text-white mb-4">Ajouter un Département</h2>
              <input
                type="text"
                placeholder="Nom du département"
                value={newDepartement.nom}
                onChange={(e) => setNewDepartement({ ...newDepartement, nom: e.target.value })}
                className="mb-2 p-2 rounded w-full text-black"
              />
              <input
                type="number"
                placeholder="Nombre d'employés"
                value={newDepartement.nombre_employes}
                onChange={(e) => setNewDepartement({ ...newDepartement, nombre_employes: e.target.value })}
                className="mb-2 p-2 rounded w-full text-black"
              />
              <input
                type="text"
                placeholder="Responsable"
                value={newDepartement.responsable}
                onChange={(e) => setNewDepartement({ ...newDepartement, responsable: e.target.value })}
                className="mb-2 p-2 rounded w-full text-black"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleAddDepartement}
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setIsAddDialogOpen(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Departements;
