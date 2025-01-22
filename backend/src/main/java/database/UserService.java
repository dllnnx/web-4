package database;

import beans.User;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Persistence;

import java.util.ArrayList;

@Stateless
public class UserService {

    private static final EntityManager em = Persistence.createEntityManagerFactory("default").createEntityManager();

    public User register(String login, String password) {
        User user = new User(login, password);
        user.setResults(new ArrayList<>());
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
        return user;
    }
}
