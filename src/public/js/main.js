const zoom = 13;
const latitud = 4.092516799999999;
const longitud = -75.1545381;
var acum = 0.1;
const socket = io();
//Title View
const TileURL = 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const map = L.map('map').setView([latitud, longitud],zoom);
L.tileLayer(TileURL).addTo(map);   

//
map.locate({enableHighAccuracy: true})
map.on('locationfound',e =>{   
     //Coord
     const coords = [e.latitude, e.longitude];
     
     //Marker
     const you = L.marker([coords[0],coords[1]]);
     you.bindPopup('You');
     you.addTo(map);
     
     //Socket emit event
     socket.emit('userCoord', coords);
});

socket.on('newUserCoord', (coords)=>{
     acum = acum + 0.1;
      
      //Marker
     const marker = L.marker([coords[0]+acum,coords[1]+acum]);
     marker.bindPopup('You are here');
     marker.addTo(map);    
});

 