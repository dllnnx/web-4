package rest;

import beans.Result;
import beans.User;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import validation.Validator;

import java.util.Objects;

@Path("/results")
@Produces(MediaType.APPLICATION_JSON)
public class ResultsResource {
    @GET
    public Response addResult (
            @QueryParam("login") String login,
            @QueryParam("x") double x,
            @QueryParam("y") double y,
            @QueryParam("r") double r) {
        long startTime = System.currentTimeMillis();
        User user = new User(); //TODO: get user from database by login
        if (Objects.isNull(user)) {
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity("User not found")
                    .build();
        }

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
