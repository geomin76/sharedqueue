var token = "";

fetch("http://localhost:3000/token")
.then((response) => {
    return response.json()
})
.then((data) => {
    token = data.token;
})

function Song(name, artist, songId, img) {
    this.name = name;
    this.artist = artist;
    this.songId = songId;
    this.img = img;
}


function myFunction() {
    var songList = [];
    var x = document.getElementById("mySearch").value;
    var url = 'https://api.spotify.com/v1/search?' + "q=" + encodeURI(x) + "&type=track&market=US&limit=10";
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // console.log(data.tracks.items);
        for (var i = 0; i < 10; i++) {
            var newSong = new Song(data.tracks.items[i].name, data.tracks.items[i].artists[0].name, data.tracks.items[i].uri, data.tracks.items[i].album.images[0].url);
            songList[i] = newSong;
        }
        var select = document.getElementById("select");
        var select_length = document.getElementById("select").length;
        if (select_length == 1) {
            for (var i = 0; i < 10; i++) {
                var el = document.createElement("option");
                el.text = songList[i].name;
                el.value = songList[i].name;
                select.add(el);
            }
        }
        else {
            while (select_length != 0) {
                select.remove(select_length);
                select_length--;
            }
            for (var i = 0; i < 10; i++) {
                var el = document.createElement("option");
                el.text = songList[i].name;
                el.value = songList[i].name;
                select.add(el);
            }
        }
    })
}

function APIhit() {
    //call localhost, and make a table or list on the right. anytime hit submit, it puts to queue and adds to list on html.
    var results = document.getElementById("select");
    var result = results.options[e.selectedIndex].value;
    // console.log(result);
    data = {
        "name": result,
        "songId": result,
        "suggestedBy": result,
        "photoCover": result
    }
    const response = fetch("http://localhost:8080/api/addToQueue?code=6263%206160", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    alert(response);
}

/**
 * Need to do:
 * 
 * Play/Pause
 * Next (goes down queue)
 * Previous (do that later)
 * Options to play songs from the queue
 * Able to switch queue
 * Ability to delete from queue
 */