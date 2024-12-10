package com.example.employe.service;

import com.example.employe.entity.Employe;
import com.example.employe.repository.EmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8080") // Autoriser CORS
@Path("/Employe")
public class EmployeService {

    @Autowired
    private EmployeRepository employeRepository;

    // Gérer les requêtes OPTIONS pour CORS
    @OPTIONS
    @Path("{any:.*}")
    public Response handlePreflight() {
        return Response.ok()
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, PUT, DELETE, OPTIONS")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "Content-Type, Authorization")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
                .build();
    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response createEmploye(Employe employe) {
        employeRepository.save(employe);
        return Response.status(Response.Status.CREATED)
                .entity("Employé ajouté avec succès.")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                .build();
    }
    // Compter le nombre total d'employés
    @GET
    @Path("/count")
    @Produces(MediaType.TEXT_PLAIN)
    public Response countEmployes() {
        long count = employeRepository.count();
        return Response.ok("Nombre total d'employés : " + count)
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                .build();
    }

    @POST
    @Path("/addTest")
    public Response addTest(@QueryParam("nom") String nom) {
        return Response.ok("Test POST reçu avec nom : " + nom).build();
    }




    // Supprimer un employé par ID
    @DELETE
    @Path("/delete/{employeId}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response deleteEmploye(@PathParam("employeId") Long employeId) {
        Optional<Employe> employe = employeRepository.findById(employeId);
        if (employe.isPresent()) {
            employeRepository.deleteById(employeId);
            return Response.ok("Employé supprimé avec succès.")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Employé non trouvé.")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        }
    }

    // Obtenir tous les employés
    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEmployes() {
        List<Employe> employes = employeRepository.findAll();
        return Response.ok(employes)
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                .build();
    }

    // Mettre à jour un employé par ID
    @PUT
    @Path("/update/{employeId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response updateEmploye(@PathParam("employeId") Long employeId, Employe employeDetails) {
        Optional<Employe> employe = employeRepository.findById(employeId);
        if (employe.isPresent()) {
            Employe updatedEmploye = employe.get();
            updatedEmploye.setNom(employeDetails.getNom());
            updatedEmploye.setDateEntree(employeDetails.getDateEntree());
            updatedEmploye.setStatut(employeDetails.getStatut());
            updatedEmploye.setDepartement(employeDetails.getDepartement());
            updatedEmploye.setContact(employeDetails.getContact());
            employeRepository.save(updatedEmploye);
            return Response.ok("Employé mis à jour avec succès.")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Employé non trouvé.")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        }
    }
}
