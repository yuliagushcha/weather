function success(pos) {
  /* eslint-disable no-undef */
  document.querySelector('.searchButton').textContent = 'Search';
  const mapboxgl = require('mapbox-gl'); 

  const crd = pos.coords;

  mapboxgl.accessToken = 'pk.eyJ1IjoieXVsaWFndXNoY2hhIiwiYSI6ImNrM3l6eXFxcTBxazUzZ3A2eGFheDh2dDMifQ.CkbN64r5oWl8yDnK7pNhfQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [`${crd.longitude}`, `${crd.latitude}`],
    zoom: 12
  });

  return map;
}

navigator.geolocation.getCurrentPosition(success);
