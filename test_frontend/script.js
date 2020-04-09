var token = "";

fetch("http://localhost:3000/token")
.then((response) => {
    return response.json()
})
.then((data) => {
    token = data.token;
})

function Song(name, songId, img) {
    this.name = name;
    this.songId = songId;
    this.img = img;
}


function myFunction() {
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
        console.log(data.tracks.items);
    })
}