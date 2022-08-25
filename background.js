let color = '#333';
let textColor = '#fff';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ textColor });
  console.log('Default background color set to black', `color: ${color}`);
});