package rest;

import beans.User;
import database.UserService;
import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {

    @EJB
    private UserService userService;

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(User user) {
        try {
            User registeredUser = userService.register(user.getLogin(), user.getPassword());

            return Response
                    .status(Response.Status.OK)
                    .build();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error while registering user" + e.getMessage())
                    .build();
        }
        // TODO: add check if user already exists, send CONFLICT if so
    }
}
