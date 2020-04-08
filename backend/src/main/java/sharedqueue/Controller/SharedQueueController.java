package sharedqueue.Controller;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sharedqueue.Embeddable.User;
import sharedqueue.Entity.SharedQueue;
import sharedqueue.Embeddable.Song;
import sharedqueue.Repository.SharedQueueRepository;
import sharedqueue.Service.SharedQueueService;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class SharedQueueController {

    @Autowired
    private SharedQueueRepository sharedQueueRepo;
    @Autowired
    private SharedQueueService sharedQueueService;


    @PostMapping("/createCode")
    public ResponseEntity<String> createCode(@RequestParam String name, @RequestParam int spotify) {
        SharedQueue newQueue = new SharedQueue(name, spotify, sharedQueueService.createCode());
        sharedQueueRepo.save(newQueue);
        return new ResponseEntity<>(newQueue.getCode(), HttpStatus.OK);
    }

    @GetMapping("/getCode")
    public ResponseEntity<SharedQueue> getCode(@RequestParam String code) {
        SharedQueue sharedQueue = sharedQueueRepo.findByCode(code);
        if (sharedQueue == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else {
            return new ResponseEntity<>(sharedQueue, HttpStatus.OK);
        }
    }

    @PostMapping("/addToQueue")
    public ResponseEntity<String> addToQueue(@RequestParam String code, @RequestBody Song song) {
        SharedQueue sharedQueue = sharedQueueRepo.findByCode(code);
        if (sharedQueue == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else {
            sharedQueue.getQueue().add(song);
            sharedQueueRepo.save(sharedQueue);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @GetMapping("/getQueue")
    public ResponseEntity<List> getQueue(@RequestParam String code) {
        SharedQueue sharedQueue = sharedQueueRepo.findByCode(code);
        if (sharedQueue == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else {
            return new ResponseEntity<>(sharedQueue.getQueue(), HttpStatus.OK);
        }
    }

    @PostMapping("/switchElements")
    public ResponseEntity<String> switchElements(@RequestParam String code, @RequestParam String indexOne, @RequestParam String indexTwo) {
        SharedQueue sharedQueue = sharedQueueRepo.findByCode(code);
        if (sharedQueue == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else {
            sharedQueue.switchElements(Integer.parseInt(indexOne), Integer.parseInt(indexTwo));
            sharedQueueRepo.save(sharedQueue);
            return new ResponseEntity<>("Switched " + indexOne + " with " + indexTwo, HttpStatus.OK);
        }
    }

    @PostMapping("/pop")
    public ResponseEntity<Song> pop(@RequestParam String code) {
        SharedQueue sharedQueue = sharedQueueRepo.findByCode(code);
        Song msg = sharedQueue.pop();
        sharedQueueRepo.save(sharedQueue);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @PostMapping("/deleteFromQueue/{id}")
    public ResponseEntity<String> deleteFromQueue(@RequestParam String code, @PathVariable int id) {
        SharedQueue sharedQueue = sharedQueueRepo.findByCode(code);
        sharedQueue.getQueue().remove(id);
        sharedQueueRepo.save(sharedQueue);
        return new ResponseEntity<>("Deleted " + Integer.toString(id), HttpStatus.OK);
    }


    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestParam String code, @RequestBody User user) {
        SharedQueue sharedQueue = sharedQueueRepo.findByCode(code);
        sharedQueue.getUserList().add(user);
        sharedQueueRepo.save(sharedQueue);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@RequestParam String code, @PathVariable int id) {
        SharedQueue sharedQueue = sharedQueueRepo.findByCode(code);
        sharedQueue.getUserList().remove(id);
        sharedQueueRepo.save(sharedQueue);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }


}
