chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
});
chrome.tabs.onCreated.addListener(function() {
  // tab được tạo
  alert("Open")
});

chrome.tabs.onRemoved.addListener(function() {
  // tab đóng
  alert("Close")
});
let lst_tabs = []
let id_active = 0
let status_return = true;
let data_return = null
// Cổng giao tiếp qua các tab
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if (message.action === 'return') {
    status_return = true
    data_return = message.msg
  }
  if (message.action === 'save_data') {
    var msg = message.data
    localStorage.setItem(msg.key,msg.value)
    // Your logic here...
  }
  if (message.action === 'get_data') {
    var msg = message.data.key
    var data = localStorage.getItem(msg)
    var message = { action: 'get_data',data:data };
    chrome.runtime.sendMessage(message);
    // Your logic here...
  }
  if (message.action === 'start_app') {
    alert("")
    await get_list_tabs()
    await get_list_ads_page(id_active)
    sleep(1000)
    console.log(lst_tabs)
    setTimeout(()=>{
      reloadSciptStartUp()
    },1000)
  }

});
async function get_list_ads_page(tabId){
  status_return = false
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript({
      target: { tabId: tabId },
      function: () => {
        // Mã JavaScript ở đây
        var elements = getElementByClass('account-cell-link')
        for(let i = 0 ;i < elements.length; i++){
          var temp = elements[i];
          lst_tabs.push(temp.getAttribute('href'))
        }
        console.log(lst_tabs)
        var message = { action: 'return',data:data };
        chrome.runtime.sendMessage(message);
      },
    }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
  
}
// quy trình kín
function reloadSciptStartUp(){
  console.log("++++++++++++++",id_active)
}

// 
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sleepStatus() {
  return new Promise((resolve, reject)=>{
    var idSetInterval = setInterval(()=>{
      if(status_return){
        clearInterval(idSetInterval)
        resolve()
      }
    },500)
  });
}
// quy trình quản lý tài khoản 
async function get_list_tabs(){
  return new Promise((resolve, reject) => {
    lst_tabs = []
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        tab = {
          id : tab.id,
          title : tab.title
        }
        console.log(tab)
        if(tab.title.includes('Google Ads')){
          id_active = tab.id
        }
        lst_tabs.push(tab)
      });
      resolve(lst_tabs)
    });
  });
 
}
function sendMessageToContentScript(tab_id,message) {
    // Query the currently active tab
    chrome.tabs.sendMessage(tab_id, message);
}




