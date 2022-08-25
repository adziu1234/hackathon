
let loc = fetch('https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=AbSo1RM9uq0KBopD4eh2LtdU6COU4Fmu&q=60453')
  .then((response) => response.json());

const apiKey = 'AbSo1RM9uq0KBopD4eh2LtdU6COU4Fmu';

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
      el.style.color = '#0000FF';
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
  let location = await loc;
  let locationKey = location[0].Key;
  console.log(locationKey);
  return locationKey;
}

async function time(){
  let locKey = await locator();
  console.log(locKey);
  const isDayTime = await fetch('https://dataservice.accuweather.com/currentconditions/v1/' + locKey + '?apikey=' + apiKey)
  .then((response) => response.json()).then((data) => {
    console.log(data[0].IsDayTime);
    return data[0].IsDayTime;
  });
  if (isDayTime){
    setPageColorLight();
  } else {
    setPageColorDark();
  }
}


time();
