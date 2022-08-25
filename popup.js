// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let changeLight = document.getElementById("changeLight");
let sun = document.getElementById("sun");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

chrome.storage.local.set({"originalColor": document.body.style.backgroundColor});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['test.js']
  });
});

changeLight.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['test2.js']
  });
});

sun.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['timedate.js']
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageColor() {
  chrome.storage.local.set({"originalColor": document.body.style.backgroundColor});
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
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

//create a function to change the text color to white
/*function setPageTextColor(){
  chrome.storage.sync.get("textColor", ({ textColor }) =>{
    document.body.innerText.color = textColor;
  })
}*/