package rest;

import beans.Result;
import beans.User;
import database.TokenService;
import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import validation.Validator;

import java.util.Objects;

@Path("/results")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ResultsResource {
    @EJB
    private TokenService tokenService;

    @POST
    public Response addResult (
            @HeaderParam("Authorization") String authHeader,
            Result dot) {
        long startTime = System.currentTimeMillis();
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity("Token not found")
                    .build();
        }

        String token = authHeader.substring("Bearer ".length());
        User user = tokenService.getUserFromToken(token);
        if (Objects.isNull(user)) {
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity("User not found")
                    .build();
        }

        double x = dot.getX(), y = dot.getY(), r = dot.getR();
        if (!new Validator(x, y, r).validateDot())
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity("Invalid parameters")
                    .build();

        Result result = new Result(x, y, r);
        result.setScriptTime(System.currentTimeMillis() - startTime);
        result.setStartTime(startTime);
        user.addResult(result);
        return Response
                .status(Response.Status.OK)
                .entity(result.toJSONObject())
                .build();
    }
}
