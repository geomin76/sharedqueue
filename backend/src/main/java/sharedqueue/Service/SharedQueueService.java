package sharedqueue.Service;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class SharedQueueService {

    public String createCode() {
        Random rand = new Random();
        int firstRandom = rand.nextInt((9999 - 100) + 1) + 10;
        int secondRandom = rand.nextInt((9999 - 100) + 1) + 10;
        String newString = Integer.toString(firstRandom) + " " + Integer.toString(secondRandom);
        return newString;
    }
}
