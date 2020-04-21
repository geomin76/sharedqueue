package sharedqueue.Embeddable;
import javax.persistence.*;

@Embeddable
public class NextSong {
    public String token;
    public String code;

    public NextSong() {}

    public NextSong(String token, String code) {
        this.token = token;
        this.code = this.code;
    }

    public String getCode() {
        return code;
    }

    public String getToken() {
        return token;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
