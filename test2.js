console.log('goodbye world');

chrome.storage.local.set({"originalColor": document.body.style.backgroundColor});

function setPageColor() {
  //chrome.storage.local.set({"originalColor": document.body.style.backgroundColor});
  chrome.storage.sync.get(["originalColor"], ({ color }) => {
    document.body.style.backgroundColor = '#fff';
    const allPs = document.querySelectorAll('p, h1, b, h3');
    const links = document.querySelectorAll('a');
    allPs.forEach(node => {
      node.style.color = '#000';
    });
    links.forEach(el => {
      el.style.color = '#000';
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

setPageColor();