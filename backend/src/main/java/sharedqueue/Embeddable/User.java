package sharedqueue.Embeddable;

import javax.persistence.Embeddable;

@Embeddable
public class User {
    private String name;
    private int control;
    private String img;

    public User() {}

    private User(String name, int control, String img) {
        this.name = name;
        this.control = control;
        this.img = img;

    }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public int getControl() { return control; }

    public void setControl(int control) { this.control = control; }

    public String getImg() { return img; }

    public void getImg(String img) { this.img = img; }
}
