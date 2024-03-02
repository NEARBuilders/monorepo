const API_URL = props.API_URL || "";
const ACCESS_TOKEN =
  props.accessToken ||
  "pk.eyJ1IjoiZWpsYnJhZW0iLCJhIjoiY2xrbmIwaW53MGE0NTNtbGsydWd2MmpyZSJ9.m1ZfEqv2fGet2zblGknT8A";
const styleUrl = props.styleUrl || "mapbox://styles/mapbox/streets-v12"; // see https://docs.mapbox.com/api/maps/styles/#mapbox-styles
const center = props.center || [-87.6298, 41.8781]; // starting position [lng, lat]
const zoom = props.zoom || 9; // starting zoom
const accountId = context.accountId;
const markers = props.markers || [];
const onMapClick = props.onMapClick || (() => {});
const onMarkerClick = props.onMarkerClick || (() => {});
const edit = props.edit || false;

const markerAsset =
  props.markerAsset || "https://i.ibb.co/w6QRm4h/Liberty-Map-Pin-Dark.png";

const myMarkers = props.myMarkers || [];
const myMarkerAsset =
  props.myMarkerAsset ||
  "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png";

const code = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
    
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet">
    
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
    
    <style>
      body { margin: 0; padding: 0; }
      #map { position: absolute; top: 0; bottom: 0; width: 100%; }

      .marker {
        background-image: url('${markerAsset}');
        background-size: cover;
        width: 30px;
        height: 45px;
        cursor: pointer;
      }
      
      #mymarker {
        background-image: url('${myMarkerAsset}') !important;
      }

      h6 {
        margin:0;
        font-size: 16px;
      }

      .mapboxgl-popup-content{
        background: rgb(25, 26, 26);
        color: white;
        border: 1px solid;
        border-radius: 9px;
        padding: 10px;
      }

      .mapboxgl-popup-close-button{
        color: white;
      }

      .mapboxgl-ctrl-logo {
        display: none !important;
      }
      a {
        outline: 0;
      }
    </style>
  </head>
  <body>

    <div id="map"></div>

    <script>
    const accountId = "${accountId}";
    const isSetMarkerActive = ${edit};
    const markersById = {};
    const myMarkers = ${JSON.stringify(myMarkers)};
    let selectedMarkerElement = null;

    mapboxgl.accessToken = "${ACCESS_TOKEN}";

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: '${styleUrl}',
        center: [${center[0]}, ${center[1]}], 
        zoom: ${zoom}
    });

    function handleMarkerClick(marker) {
      map.flyTo({
        center: [marker.lng, marker.lat],
        essential: true
      });

      if (selectedMarkerElement) {
        selectedMarkerElement.style.boxShadow = '';
      }

      const markerInstance = markersById[marker.id];
      // markersById[marker.accountId];
      
      if (markerInstance) {
          const el = markerInstance.getElement();
          // el.style.boxShadow = '0px 0px 10px 3px rgba(0,0,0,0.5)';
          selectedMarkerElement = el;
      }
  
      // Post message with marker data
      window.parent.postMessage({
          handler: 'marker-click',
          data: marker
      }, '*');
    }

    // Function to populate markers to the map
    function populateMarkers() {
        const markersData = ${JSON.stringify(markers)};
        
        markersData.forEach(marker => {
        
          try {
            const el = document.createElement('div');
            el.className = 'marker';
            el.dataset.id = marker.id;
        
            if (myMarkers.some((it) => it.id === marker.id)) el.id = 'mymarker';
            
            markersById[marker.id] = new mapboxgl.Marker(el)
                .setLngLat([marker.lng, marker.lat])
                .addTo(map);

                el.addEventListener('click', () => {
              event.stopPropagation();

              handleMarkerClick(marker); 
            });
          } catch (e) {
            console.log(e);
          }
        });
    }

    populateMarkers();

    map.on('click', function(event) {
      const { lngLat } = event;

      if (selectedMarkerElement) {
        // selectedMarkerElement.style.boxShadow = '';
        selectedMarkerElement = null;
      }

      if (isSetMarkerActive) {

        // THIS USED TO REMOVE A MARKER IF IT ALREADY EXISTED... like you're moving an existing marker
        // if (markersById[accountId]) {
        //   markersById[accountId].remove();
        // }
          
        const _el = document.getElementById("mymarker");
        const myel = _el ? _el : document.createElement('div');
        myel.className = 'marker';
        myel.id = 'mymarker';

        const newMarker = new mapboxgl.Marker(myel)
          .setLngLat([lngLat.lng, lngLat.lat])
          .addTo(map);

        // markersById[accountId] = newMarker;
      }

      window.parent.postMessage({
        handler: 'map-click',
        data: {
          coordinates: lngLat
        }
      }, '*');
    });
    </script>
  </body>
</html>
  `;

const Container = styled.div`
  height: 100%;
  display: flex;

  /* reset */
  button,
  fieldset,
  input {
    all: unset;
  }
`;

return (
  <Container>
    <iframe
      id="myMap"
      className="w-100 h-100"
      srcDoc={code}
      onMessage={(e) => {
        switch (e.handler) {
          case "map-click": {
            onMapClick(e.data);
            break;
          }
          case "marker-click": {
            onMarkerClick(e.data);
            break;
          }
        }
      }}
    />
  </Container>
);
