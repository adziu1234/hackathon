/*async function geolocator(){
  navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  // Show a map centered at latitude / longitude.
  console.log(latitude);
  console.log(longitude);
});
}*/
const apiKey = 'AbSo1RM9uq0KBopD4eh2LtdU6COU4Fmu';

let getLocation = () => new Promise((resolve, reject) =>
navigator.geolocation.getCurrentPosition(resolve,reject));

async function test(){
  let coordinates = await getLocation();
  let lat = coordinates.coords.latitude;
  let long = coordinates.coords.longitude;
  let loc = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}`)
  .then((response) => response.json())
  .then((data) => data);
  return loc;
}


//let loc = fetch('https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=AbSo1RM9uq0KBopD4eh2LtdU6COU4Fmu&q=60453')
//  .then((response) => response.json());



function setPageColorLight() {
  //chrome.storage.local.set({"originalColor": document.body.style.backgroundColor});
  chrome.storage.sync.get(["originalColor"], ({ color }) => {
    document.body.style.backgroundColor = '#fff';
    const allPs = document.querySelectorAll('p, h1, b, h3');
    const links = document.querySelectorAll('a');
    allPs.forEach(node => {
      node.style.color = '#000';
    });
    links.forEach(el => {
      el.style.color = '#FFF';
    })

    /*
    const css = `html {
      -webkit-filter: invert(100%);
      -moz-filter: invert(100%);
      -o-filter: invert(100%);
      -ms-filter: invert(100%);
    }`
    const head = document.head
    const style = document.createElement('style')
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style); */
    /*
    const allH1s = document.querySelectorAll('h1');
    allH1s.forEach(node => {
      node.style.color = '#fff';
    });
    */

  });
  /*
  chrome.storage.sync.get("textColor", ({ textColor }) =>{
    document.querySelectorAll('p').style.color = textColor;
  });
  */
}

function setPageColorDark() {
  chrome.storage.local.set({"originalColor": document.body.style.backgroundColor});
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = '#333';
    const allPs = document.querySelectorAll('p, h1, b, h3');
    const links = document.querySelectorAll('a');
    allPs.forEach(node => {
      node.style.color = '#fff';
    });
    links.forEach(el => {
      el.style.color = '#add8e6';
    })

    /*
    const css = `html {
      -webkit-filter: invert(100%);
      -moz-filter: invert(100%);
      -o-filter: invert(100%);
      -ms-filter: invert(100%);
    }`
    const head = document.head
    const style = document.createElement('style')
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style); */
    /*
    const allH1s = document.querySelectorAll('h1');
    allH1s.forEach(node => {
      node.style.color = '#fff';
    });
    */

  });
  /*
  chrome.storage.sync.get("textColor", ({ textColor }) =>{
    document.querySelectorAll('p').style.color = textColor;
  });
  */
}

async function locator(){
  let locationKey = await test();
  console.log(locationKey);
  return locationKey;
}

async function time(){
  let location = await locator();
  let locKey = location.Key;
  console.log(locKey);
  console.log(location);
  const isDayTime = await fetch('https://dataservice.accuweather.com/currentconditions/v1/' + locKey + '?apikey=' + apiKey)
  .then((response) => response.json()).then((data) => {
    return data[0].IsDayTime;
  });
  if (isDayTime){
    setPageColorLight();
    alert(`You're in ${location.LocalizedName}, so you're in the ${location.TimeZone.Code} time zone and it's day time! ☀️`);
  } else {
    setPageColorDark();
    alert(`You're in ${location.LocalizedName}, so you're in the ${location.TimeZone.Code} time zone and it's night time! Enjoy the darkness 🕶`);
  }

}

time();
