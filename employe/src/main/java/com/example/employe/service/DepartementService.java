package com.example.employe.service;

import com.example.employe.entity.Departement;
import com.example.employe.repository.DepartementRepository;
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
@Path("/Departement")
public class DepartementService {

    @Autowired
    private DepartementRepository departementRepository;

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

    // Ajouter un nouveau département
    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response createDepartement(Departement departement) {
        departementRepository.save(departement);
        return Response.status(Response.Status.CREATED)
                .entity("Département ajouté avec succès.")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                .build();
    }
    // Compter le nombre total de départements
    @GET
    @Path("/count")
    @Produces(MediaType.TEXT_PLAIN)
    public Response countDepartements() {
        long count = departementRepository.count();
        return Response.ok("Nombre total de départements : " + count)
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                .build();
    }


    // Supprimer un département par ID
    @DELETE
    @Path("/delete/{departementId}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response deleteDepartement(@PathParam("departementId") Long departementId) {
        Optional<Departement> departement = departementRepository.findById(departementId);
        if (departement.isPresent()) {
            departementRepository.deleteById(departementId);
            return Response.ok("Département supprimé avec succès.")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Département non trouvé.")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        }
    }

    // Obtenir tous les départements
    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllDepartements() {
        List<Departement> departements = departementRepository.findAll();
        return Response.ok(departements)
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                .build();
    }

    // Mettre à jour un département par ID
    @PUT
    @Path("/update/{departementId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response updateDepartement(@PathParam("departementId") Long departementId, Departement departementDetails) {
        Optional<Departement> departement = departementRepository.findById(departementId);
        if (departement.isPresent()) {
            Departement updatedDepartement = departement.get();
            updatedDepartement.setNom(departementDetails.getNom());
            updatedDepartement.setNombreEmployes(departementDetails.getNombreEmployes());
            updatedDepartement.setResponsable(departementDetails.getResponsable());
            departementRepository.save(updatedDepartement);
            return Response.ok("Département mis à jour avec succès.")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Département non trouvé.")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        }
    }
}
