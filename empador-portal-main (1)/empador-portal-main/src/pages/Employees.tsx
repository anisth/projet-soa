import { useState, useEffect } from 'react';
import { getAllEmployees, addEmployee, deleteEmployee } from './api'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Trash2, Edit2 } from "lucide-react";
import { toast } from 'sonner';
import axios from 'axios';
import Navbar from "@/components/Navbar"; // Assuming you use the same Navbar component

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    contact: '',
    date_entree: '',
    nom: '',
    statut: 'Inactif',
    departement_id: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data || []);
    } catch (error) {
      toast.error('Erreur lors de la récupération des employés');
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      toast.success('Employé supprimé avec succès');
      fetchEmployees(); // Rafraîchit la liste des employés
    } catch (error) {
      toast.error('Erreur lors de la suppression de l\'employé');
    }
  };

  const handleAddEmployee = async () => {
    try {
      const employeePayload = {
        nom: newEmployee.nom,
        dateEntree: newEmployee.date_entree,
        statut: newEmployee.statut,
        departement: { id: newEmployee.departement_id },
        contact: newEmployee.contact
      };

      await axios.post('http://127.0.0.1:8083/Employe/add', employeePayload);
      toast.success('Employé ajouté avec succès');
      setIsAddDialogOpen(false); // Fermer le modal après l'ajout
      fetchEmployees(); // Rafraîchit la liste des employés
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de l\'employé');
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const employeeName = employee.nom?.toLowerCase() || '';
    const employeeContact = employee.contact?.toLowerCase() || '';
    const search = searchQuery.toLowerCase();

    return employeeName.includes(search) || employeeContact.includes(search);
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">Gestion des Employés</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <Input
              className="mb-2 p-2 rounded w-full text-black"
              placeholder="Rechercher un employé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={() => setIsAddDialogOpen(true)} className="whitespace-nowrap">
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un employé
            </Button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employé</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date d'entrée</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-gray-700">
                    <TableCell>{employee.nom || 'Inconnu'}</TableCell>
                    <TableCell>{employee.contact || 'Inconnu'}</TableCell>
                    <TableCell>{employee.departement?.nom || 'Inconnu'}</TableCell>
                    <TableCell>{employee.statut}</TableCell>
                    <TableCell>{employee.dateEntree}</TableCell>
                    <TableCell className="text-right flex space-x-2">
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell  className="text-center">Aucun employé trouvé</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {isAddDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full">
              <h2 className="text-xl font-bold text-white mb-4">Ajouter un Employé</h2>
              <input
                type="text"
                placeholder="Nom de l'employé"
                value={newEmployee.nom}
                onChange={(e) => setNewEmployee({ ...newEmployee, nom: e.target.value })}
                className="mb-2 p-2 rounded w-full text-black"
              />
              <input
                type="text"
                placeholder="Contact"
                value={newEmployee.contact}
                onChange={(e) => setNewEmployee({ ...newEmployee, contact: e.target.value })}
                className="mb-2 p-2 rounded w-full text-black"
              />
              <input
                type="date"
                placeholder="Date d'entrée"
                value={newEmployee.date_entree}
                onChange={(e) => setNewEmployee({ ...newEmployee, date_entree: e.target.value })}
                className="mb-2 p-2 rounded w-full text-black"
              />
              <input
                type="text"
                placeholder="Département ID"
                value={newEmployee.departement_id}
                onChange={(e) => setNewEmployee({ ...newEmployee, departement_id: e.target.value })}
                className="mb-2 p-2 rounded w-full text-black"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleAddEmployee}
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

export default Employees;

