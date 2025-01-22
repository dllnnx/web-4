package database;

import beans.User;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;

@Stateless
public class UserService {

    private static final EntityManager em = Persistence.createEntityManagerFactory("default").createEntityManager();

    public boolean saveUserToDb(User user) {
        try {
            em.getTransaction().begin();
            em.persist(user);
            em.getTransaction().commit();
            return true;
        } catch (Exception e) {
            em.getTransaction().rollback();
            return false;
        }
    }

    public User findByUsername(String username) {
        String query = "SELECT u FROM User u WHERE u.login = :username";
        TypedQuery<User> typedQuery = em.createQuery(query, User.class);
        typedQuery.setParameter("username", username);
        return typedQuery.getResultStream().findFirst().orElse(null);
    }

}
