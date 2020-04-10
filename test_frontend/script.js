var token = "";
var code = "3220%207374";

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

//functionality for anyone
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
                el.value = songList[i].name+"|"+songList[i].artist+"|"+songList[i].songId+"|"+songList[i].img;
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
                el.value = songList[i].name+"|"+songList[i].artist+"|"+songList[i].songId+"|"+songList[i].img;
                select.add(el);
            }
        }
    })
}

//functionality for anyone
function APIhit() {
    //call localhost, and make a table or list on the right. anytime hit submit, it puts to queue and adds to list on html.
    var e = document.getElementById("select").value;
    var split_string = e.split("|");
    data = {
        "name": split_string[0],
        "songId": split_string[2],
        "suggestedBy": split_string[1],
        "photoCover": split_string[3]
    }
    const response = fetch("http://localhost:8080/api/addToQueue?code=" + code, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    // alert(response);
    console.log(response);
}

//functionality for anyone
async function getQueue() {
    let queue = [];
    var node = document.getElementById("LI");
    const response = await fetch("http://localhost:8080/api/getQueue?code=" + code, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Context-Type': 'application/json'
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        var count = 0;
        while (count != data.length) {
            queue[count] = data[count].name;
            count++;
        }
    });
    queue.forEach(element => {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(element);
        node.appendChild(textnode);
        document.getElementById("myQueue").appendChild(node);
    })
}

//functionality only for host
async function startNewSong() {
    let song = [];
    await fetch("http://localhost:8080/api/pop?code=" + code, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Context-Type': 'application/json'
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(data.songId);
        song[0] = data.songId;
    })
    console.log(song[0]);
    body_content = {
        "uris": song
    }
    fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body_content)
    })
}

function play() {
    fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
}

function pause() {
    fetch("https://api.spotify.com/v1/me/player/pause", {
        method: "PUT",
        mode: 'cors',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
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