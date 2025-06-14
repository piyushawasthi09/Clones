console.log("Hello, World!");

async function main() {
    const response = await fetch("http://127.0.0.1:5500/song/");
    const data = await response.text();
    // console.log(data); 
    let element = document.createElement("div");
    element.innerHTML = data;
    let as = element.getElementsByTagName("a");
    // console.log(as);
    let songs = [];

    for (let i = 0; i < as.length; i++) {
        const ele = as[i];
        if (ele.href.endsWith(".mp3")) {
            songs.push(ele.href)

        }
    }
    return songs 
} 

async function getSongs(){
    let listen = await main();
    console.log(listen);   

    var audio = new Audio(listen[0]);
    audio.play();
}

getSongs().then(() => {
    console.log("Songs fetched successfully");
}
).catch((error) => {
    console.error("Error fetching songs:", error);
}
)



















