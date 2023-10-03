chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Check if the action matches the one you're interested in
  if (message.action === 'click') {
    
  }
  if (message.action === 'senkeys') {
   
  }
  if (message.action === 'get') {
      if(message.data.by == "class"){
        var elements = getElementByClass('account-cell-link')
        console.log(elements)
        for(let i = 0 ;i < elements.length; i++){
          var temp = elements[i];
          console.log(temp.getAttribute('href'))
        }
        return elements
      }
  }
});
//get data
function getElementByClass(className) {
  const elements = document.getElementsByClassName(className);
  if (elements.length > 0) {
    return elements
  } else {
    return null
  }
}
// function data
function clickElementByXPath(xpath) {
  const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (element) {
    element.click();
  } else {
    console.error("Không tìm thấy phần tử với XPath: " + xpath);
  }
}
function sendKeysByXPath(xpath, text) {
  const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (element) {
    element.value = text;
  } else {
    console.error("Không tìm thấy phần tử với XPath: " + xpath);
  }
}
function clickElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.click();
  } else {
    console.error("Không tìm thấy phần tử với ID: " + id);
  }
}
function setValueById(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.value = value;
  } else {
    console.error("Không tìm thấy phần tử với ID: " + id);
  }
}
function clickElementByClass(className) {
  const elements = document.getElementsByClassName(className);
  if (elements.length > 0) {
    elements[0].click(); // Click the first element with the specified class
  } else {
    console.error("Không tìm thấy phần tử với class: " + className);
  }
}
function setValueByClass(className, value) {
  const element = document.querySelector("." + className);
  if (element) {
    element.value = value;
  } else {
    console.error("Không tìm thấy phần tử với class: " + className);
  }
}
function setValueByClass(className, value, index) {
  const elements = document.getElementsByClassName(className);
  if (elements.length > index) {
    elements[index].value = value;
  } else {
    console.error("Không tìm thấy phần tử với class: " + className + " và chỉ mục index: " + index);
  }
}
// Hoạt động trên iframe
function clickElementInIframeByXPath(iframeXPath, elementXPath) {
  const iframe = document.evaluate(iframeXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (iframe) {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const element = iframeDocument.evaluate(elementXPath, iframeDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (element) {
      element.click();
    } else {
      console.error("Không tìm thấy phần tử trong iframe với XPath: " + elementXPath);
    }
  } else {
    console.error("Không tìm thấy iframe với XPath: " + iframeXPath);
  }
}
function setValueInIframeByXPath(iframeXPath, elementXPath, value) {
  const iframe = document.evaluate(iframeXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (iframe) {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const element = iframeDocument.evaluate(elementXPath, iframeDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (element) {
      element.value = value;
    } else {
      console.error("Không tìm thấy phần tử trong iframe với XPath: " + elementXPath);
    }
  } else {
    console.error("Không tìm thấy iframe với XPath: " + iframeXPath);
  }
}


