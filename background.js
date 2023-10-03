chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
});
chrome.tabs.onCreated.addListener(function () {
  // tab được tạo
  // alert("Open")
});

chrome.tabs.onRemoved.addListener(function () {
  // tab đóng
  // alert("Close")
});
let lst_tabs = [];
let id_active = 0;
let list_acountlink = [];
let run_row_number = 0
let status_return = true;
let data_return = null;
// Cổng giao tiếp qua các tab
chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.action === "return") {
    status_return = true;
    data_return = message.msg;
  }
  if (message.action === "save_data") {
    var msg = message.data;
    localStorage.setItem(msg.key, msg.value);
    // Your logic here...
  }
  if (message.action === "get_data") {
    var msg = message.data.key;
    var data = localStorage.getItem(msg);
    var message = { action: "get_data", data: data };
    chrome.runtime.sendMessage(message);
    // Your logic here...
  }
  if (message.action === "start_app") {
    await get_list_tabs();
    let count = await runJSCodeTab(
      id_active,
      "var t = document.getElementsByClassName('account-cell-link').length; t;"
    );
    for (let i = 0; i < count; i++) {
      var link = await runJSCodeTab(
        id_active,
        `var t = document.getElementsByClassName('account-cell-link')[${i}].getAttribute('href'); t;`
      );
      list_acountlink.push("https://ads.google.com"+link);
    }
    setTimeout(()=>{
      reloadSciptStartUp()
    },1000)
  }
});
async function runJSCodeTab(tabId, code) {
  return new Promise(async (resolve, reject) => {
    // Kiểm tra xem trang đã được tải thành công
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        // Thực hiện mã JavaScript
        chrome.tabs.executeScript(tabId, { code }, (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            console.log(result);
            resolve(result);
          }
        });
      }
    });
  });
}

// quy trình kín
async function reloadSciptStartUp() {
  let id_ads = list_acountlink[run_row_number]
  await runJSCodeTab(id_active,`location.href = '${id_ads}'`);
  sleep(5000)
  await waitClickElement("document.getElementsByClassName('overview-extended-fab-menu')[0].children[0]"
  ,"document.getElementsByClassName('overview-extended-fab-menu')[0].children[0].click()")
  sleep(5000)
  await waitClickElement("document.getElementsByClassName('selection-item')[5].getElementsByClassName('item')[0]"
  ,"document.getElementsByClassName('selection-item')[5].getElementsByClassName('item')[0].click()")
  sleep(5000)
  await waitClickElement("document.getElementsByClassName('selection-item')[8].getElementsByClassName('item')[0]"
  ,"document.getElementsByClassName('selection-item')[8].getElementsByClassName('item')[0].click()")
  await waitClickElement("document.getElementsByClassName('material-radio-value')[0]"
  ,"document.getElementsByClassName('material-radio-value')[0].click()")
  console.log("_______done");
}
function waitClickElement(code1,code2 = "",limit = 10) {
  return new Promise((resolve, reject) => {
    let number = 0
    var idSetInterval = setInterval(async ()=>{
      var kq = await runJSCodeTab(id_active,`var t = ${code1}; t;`)
      if(kq.length > 0){
        if(kq[0] != undefined){
          sleep(3000)
          if(code2.length > 10){
            await runJSCodeTab(id_active,code2)
          }
          clearInterval(idSetInterval)
          resolve(true)
        }
      }
      number +=1;
      if(number >= limit){
        resolve(false)
      }
    },3000)
  });
}
//
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleepStatus() {
  return new Promise((resolve, reject) => {
    var idSetInterval = setInterval(() => {
      if (status_return) {
        clearInterval(idSetInterval);
        resolve();
      }
    }, 500);
  });
}
// quy trình quản lý tài khoản
async function get_list_tabs() {
  return new Promise((resolve, reject) => {
    lst_tabs = [];
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        tab = {
          id: tab.id,
          title: tab.title,
        };
        console.log(tab);
        if (tab.title.includes("Google Ads")) {
          id_active = tab.id;
        }
        lst_tabs.push(tab);
      });
      resolve(lst_tabs);
    });
  });
}
function sendMessageToContentScript(tab_id, message) {
  // Query the currently active tab
  chrome.tabs.sendMessage(tab_id, message);
}
