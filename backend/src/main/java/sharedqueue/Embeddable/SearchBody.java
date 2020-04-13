package sharedqueue.Embeddable;

import javax.persistence.*;

@Embeddable
public class SearchBody {

    private String token;
    private String query;

    public SearchBody() {}

    public SearchBody(String token, String query) {
        this.token = token;
        this.query = query;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

}
