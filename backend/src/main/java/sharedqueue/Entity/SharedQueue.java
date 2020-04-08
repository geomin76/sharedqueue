package sharedqueue.Entity;
import sharedqueue.Embeddable.Song;
import sharedqueue.Embeddable.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity
public class SharedQueue {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private int spotify;
    @Column(unique=true)
    private String code;
    @ElementCollection
    @OrderColumn
    @Column(columnDefinition = "MEDIUMBLOB")
    private List<Song> queue = new ArrayList<>();
    @ElementCollection
    @OrderColumn
    @Column(columnDefinition = "MEDIUMBLOB")
    private List<User> userList = new ArrayList<>();

    public SharedQueue() {}

    public SharedQueue(String name, int spotify, String code) {
        this.name = name;
        this.spotify = spotify;
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public int getSpotify() { return spotify; }

    public void setSpotify(int spotify) { this.spotify = spotify; }

    public List<Song> getQueue() { return queue; }

    public void setQueue(List<Song> queue) { this.queue = queue; }

    public List<User> getUserList() { return userList; }

    public void setUserList(List<User> userList) { this.userList = userList; }

    public void addToQueue(String name, String songId, String suggestedBy, String photoCover) {
        Song song = new Song(name, songId, suggestedBy, photoCover);
        queue.add(song);
    }

    public void switchElements(int indexOne, int indexTwo) {
        Collections.swap(queue, indexOne, indexTwo);
    }

    public Song pop() {
        return queue.remove(0);
    }
}
