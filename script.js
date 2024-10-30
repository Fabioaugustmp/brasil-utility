const url = "https://brasilapi.com.br/api/cep/v2/";
let map;
let marker;
let latitude;
let longitute;

document.getElementById("cep").addEventListener("input", function () {
  const cep = this.value;
  console.log(cep);

  if (
    (cep.length === 8 && /^[0-9]+$/.test(cep)) ||
    /^[0-9]{5}-[0-9]{3}$/.test(this.value)
  ) {
    findCep(cep);
  }
});

async function findCep(cep) {
  //const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
  const response = await fetch(url + cep);
  console.log(response);

  if (!response.ok) {
    throw new Error("A consulta não foi bem sucedida!");
  }
  let data = await response.json();
  console.log(data);

  if (response.status === "404") {
    alert("Cep inválido!");
  }

  document.getElementById("logradouro").value = data.street || "";
  document.getElementById("logradouro").value = data.street || "";
  document.getElementById("complemento").value = data.value || "";
  document.getElementById("bairro").value = data.neighborhood || "";
  document.getElementById("localidade").value = data.city || "";
  document.getElementById("uf").value = data.state || "";
  document.getElementById("ddd").value = data.ddd || "";

  loadMap(data)
}

function loadMap(data) {
    longitude = data.location.coordinates.longitude;
    latitude = data.location.coordinates.latitude;
    marker = data.city + " " + data.state;
  
    const mapContainer = document.getElementById("map");
    mapContainer.innerHTML = ""; // Clear the previous map
    console.log(map)
   
    if(map){
      map.remove();
      map = null;
    }
    
    map = L.map("map").setView([latitude, longitude], 13);
  
    // Set up the OSM tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    // Optional: Add a marker at the center of the map
    L.marker([latitude, longitude]).addTo(map).bindPopup(marker).openPopup();
  }
  