package sharedqueue.Embeddable;

import javax.persistence.*;

@Embeddable
public class Song {

    private String name;
    private String songId;
    private String suggestedBy;
    private String photoCover;

    public Song() {}

    public Song(String name, String songId, String suggestedBy, String photoCover) {
        this.name = name;
        this.songId = songId;
        this.suggestedBy = suggestedBy;
        this.photoCover = photoCover;
    }

    public String getName() {
        return name;
    }

    public String getSongId() {
        return songId;
    }

    public String getSuggestedBy() {
        return suggestedBy;
    }

    public String getPhotoCover() {
        return photoCover;
    }
}
