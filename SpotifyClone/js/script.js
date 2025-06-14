console.log("Hello, World!");

async function main() {
  const response = await fetch("http://127.0.0.1:5500/SpotifyClone/song/");
  const data = await response.text();
  // console.log(data);
  let element = document.createElement("div");
  element.innerHTML = data;
  let as = element.getElementsByTagName("a");
  console.log(as);

  let songs = [];

  for (let i = 0; i < as.length; i++) {
    const ele = as[i];
    if (ele.href.endsWith(".mp3")) {
      songs.push(ele.href);
    }
  }
  return songs;
}

async function getSongs() {
  const listen = [
    "http://127.0.0.1:5500/SpotifyClone/song/Aaye%20Haaye%20(Official%20Video)%20%20Karan%20Aujla%2C%20Nora%20Fatehi%2C%20Neha%20Kakkar%2C%20Jay%20Trak%20%20Bhushan%20Kumar.mp3",
    "http://127.0.0.1:5500/SpotifyClone/song/COURTSIDE%20(OFFICIAL%20MUSIC%20VIDEO)%20KARAN%20AUJLA%20%20%20LATEST%20PUNJABI%20SONGS%202025.mp3",
  ];

  let songUl = document
    .querySelector(".songslist")
    .getElementsByTagName("ul")[0];

  // Helper function to extract clean name
  function getCleanName(raw) {
    if (raw.includes("Aaye Haaye")) return "Aaye Haaye - Karan Aujla";
    if (raw.includes("COURTSIDE")) return "COURTSIDE - Karan Aujla";

    return raw; // fallback
  }

  for (const url of listen) {
    const fileName = decodeURIComponent(url.split("/").pop()).replace(
      /\.mp3$/i,
      ""
    );
    const songName = getCleanName(fileName);
    const btn = `<button class="play-now-btn" onclick="playSong('${url}')">Play Now</button>`;
    songUl.innerHTML += `<li>${songName} - ${btn}</li>`;
  }

  var audio = new Audio(listen[0]);

  audio.addEventListener("loadeddata", () => {
    let duration = audio.duration;
    console.log(duration);
  });
}

getSongs()
  .then(() => {
    console.log("Songs fetched successfully");
  })
  .catch((error) => {
    console.error("Error fetching songs:", error);
  });
