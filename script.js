var lat = 5.6229888;
var long = -0.1933312;
var map = L.map('map', { zoomControl: false }).setView([lat, long], 13);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    zoomControl: false,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(map);

var search_form = document.querySelector('#form')
var query = document.querySelector('#search');
var search = document.querySelector('.search_button');
var ip_text = document.querySelector('.ip');
var isp_text = document.querySelector('.isp');
var location_text = document.querySelector('.location');
var timezone_text = document.querySelector('.timezone');
const api_key = 'at_807VqlxCF1OMY9Vq9svERrZ5rpowf';

search.addEventListener('click', fetchData);
search_form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchData();
}, false)
async function fetchData() {
    const ip_or_domain = query.value;

    var base = `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ip_or_domain}&domain=${ip_or_domain}`

    var req = await fetch(base);
    if (!req.ok) {
        alert('Error fetching data, Please check the IP Address and reload');
        return;
    }
    var data = await req.json()
    console.log(data)
    if (data.location.country === 'ZZ') {
        alert('No data found for the entered IP Adress')
        return;
    }
    ip_text.innerHTML = data.ip;
    location_text.innerHTML = `${data.location.city}, ${data.location.region}`
    timezone_text.innerHTML = `UTC ${data.location.timezone}`
    isp_text.innerHTML = data.isp;
    var myIcon = L.icon({
        iconUrl: 'images/icon-location.svg'
    });
    L.marker([data.location.lat, data.location.lng], { icon: myIcon }).addTo(map).openPopup();
    map.setView([data.location.lat, data.location.lng]);
}
fetchData();