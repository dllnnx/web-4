package database;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.ejb.Stateless;

import java.security.Key;
import java.util.Date;

@Stateless
public class TokenService {
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);;
    private static final long EXPIRATION_TIME = 86400000; // 24 hours

    public String generateToken(String login) {
        return Jwts.builder()
                .setSubject(login)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    public String validateToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (Exception e) {
            return null; // Возвращаем null, если токен недействителен
        }
    }
}
