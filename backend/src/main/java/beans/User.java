package beans;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login", unique = true, nullable = false)
    private String login;
    @Column(name = "password", nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Result> results;

    public User(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public void addResult(Result result) {
        results.add(result);
        result.setUser(this);
        //TODO: save result to database
    }

    public String getResultsAsJSON() {
        StringBuilder sb = new StringBuilder("[");
        results.forEach((item) -> sb.append(item.toString()));
        sb.append("]");
        return sb.toString().replaceAll("}\\{", "}, {");
    }

    public void clearResults() {
        results.clear();
        // TODO: clear all dots from database
    }
}
