package sharedqueue.Controller;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sharedqueue.Embeddable.SearchBody;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/spotify")
public class SpotifyController {

    //fix token issue, make sure it isn't passed in but given immediately


    //search functionality, with query + token
    @GetMapping("/search")
    public StringBuffer search(@RequestBody SearchBody searchBody) throws IOException  {
        String url = "https://api.spotify.com/v1/search?q=" + searchBody.getQuery() + "&type=track&limit=15";
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
