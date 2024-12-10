import axios from "axios";

// L'URL de l'API
const API_URL = "http://127.0.0.1:8082/Employe"; // Changez cette URL selon votre API

// Créez une instance d'Axios avec des configurations par défaut
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Si vous utilisez des cookies pour l'authentification
});

// Types pour une meilleure gestion des données
export interface Employee {
  id?: number; // Facultatif pour un nouvel employé
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
}

// Récupérer tous les employés
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await axiosInstance.get<Employee[]>("/list");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des employés:", error);
    throw error;
  }
};

// Ajouter un employé
export const addEmployee = async (employee: Employee): Promise<Employee> => {
  try {
    const response = await axiosInstance.post<Employee>("/add", employee);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'employé:", error);
    throw error;
  }
};

// Supprimer un employé
export const deleteEmployee = async (employeeId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/delete/${employeeId}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'employé:", error);
    throw error;
  }
};
