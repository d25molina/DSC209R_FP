import mapboxgl from 'https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/+esm';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Mapbox GL JS Loaded:', mapboxgl);

  // check if setTelemetry function exists and if so, disable to prevent errors
  if (typeof mapboxgl.setTelemetry === 'function') {
    mapboxgl.setTelemetry(false);
  }

  mapboxgl.accessToken =
    'pk.eyJ1IjoibXp1Y3NkIiwiYSI6ImNtaHpxZTFqNTBycmUybHE2bTZveWJ2a20ifQ.N5_98andr8N6SQOmRSnKKg';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-98.5795, 39.8283], //center of USA
    zoom: 3.5,
    minZoom: 3.5,
    maxZoom: 8,
    maxBounds: [
      [-170, 15],
      [-55, 70],
    ],
  });
  window.map = map;

  map.on('load', () => {
    map.addSource('states', {
      type: 'geojson',
      data: './map outlines/gz_2010_us_040_00_20m.json',
    });

    map.addLayer({
      id: 'states-outline',
      type: 'line',
      source: 'states',
      paint: {
        'line-color': '#333',
        'line-width': 0.8,
      },
    });

    map.addSource('us-national-outline', {
      type: 'geojson',
      data: './map outlines/gz_2010_us_outline_20m.json',
    });

    map.addLayer({
      id: 'us-country-boundary',
      type: 'line',
      source: 'us-national-outline',
      paint: {
        'line-color': '#111',
        'line-width': 1.5,
      },
    });
  });

});
