package sharedqueue.Controller;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sharedqueue.Embeddable.NextSong;
import sharedqueue.Embeddable.SearchBody;
import sharedqueue.Embeddable.Song;
import sharedqueue.Entity.SharedQueue;
import sharedqueue.Repository.SharedQueueRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URLEncoder;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/spotify")
public class SpotifyController {

    @Autowired
    private SharedQueueRepository sharedQueueRepository;

    //fix token issue, make sure it isn't passed in but given immediately


    //search functionality, with query + token
    @GetMapping("/search")
    public StringBuffer search(@RequestBody SearchBody searchBody) throws IOException  {
        String url = "https://api.spotify.com/v1/search?q=" + URLEncoder.encode(searchBody.getQuery(), "UTF-8") + "&type=track&limit=15";
        HttpClient client = HttpClientBuilder.create().build();
        HttpGet request = new HttpGet(url);
        request.addHeader("Authorization", "Bearer " + searchBody.getToken());
        request.addHeader("Accept", "application/json");
        HttpResponse response = client.execute(request);

        //error handling

        BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

        StringBuffer result = new StringBuffer();
        String line = "";
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        return result;
    }

    //play next song
    @GetMapping("/playNext")
    public ResponseEntity<Song> playnext(@RequestBody NextSong nextSong) throws IOException, JSONException {
        SharedQueue sharedQueue = sharedQueueRepository.findByCode(nextSong.getCode());
        Song song = sharedQueue.pop();
        sharedQueueRepository.save(sharedQueue);
        String url = "https://api.spotify.com/v1/me/player/play";
        String[] songArr = { song.getSongId() };
        HttpClient client = HttpClientBuilder.create().build();
        HttpPut request = new HttpPut(url);
//        String payload  = "{" + "\"uri"\: + songArr + "}";
        JSONObject obj = new JSONObject();
        obj.put("uri", songArr);
        String payload = obj.toString();
        System.out.println(payload);
        StringEntity entity = new StringEntity(payload, ContentType.APPLICATION_FORM_URLENCODED);
        request.setEntity(entity);
        request.addHeader("Authorization", "Bearer " + nextSong.getToken());
        request.addHeader("Accept", "application/json");
        HttpResponse response = client.execute(request);
        return new ResponseEntity<Song>(song, HttpStatus.OK);
    }

    //resume
    @GetMapping("/play")
    public ResponseEntity<String> play(@RequestParam String token) throws IOException {
        String url = "https://api.spotify.com/v1/me/player/play";
        HttpClient client = HttpClientBuilder.create().build();
        HttpPut request = new HttpPut(url);
        request.addHeader("Authorization", "Bearer " + token);
        request.addHeader("Accept", "application/json");
        HttpResponse response = client.execute(request);

        //error handling

        return new ResponseEntity<String>("Playing", HttpStatus.OK);
    }

    //pause
    @GetMapping("/pause")
    public ResponseEntity<String> pause(@RequestParam String token) throws IOException {
        String url = "https://api.spotify.com/v1/me/player/pause";
        HttpClient client = HttpClientBuilder.create().build();
        HttpPut request = new HttpPut(url);
        request.addHeader("Authorization", "Bearer " + token);
        request.addHeader("Accept", "application/json");
        HttpResponse response = client.execute(request);

        //error handling

        return new ResponseEntity<String>("Paused", HttpStatus.OK);
    }
}
