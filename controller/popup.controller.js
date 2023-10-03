export const save_local_storage = async (key,value) => {
    var message = { action: 'save_data',data:{
        key:key,
        value:value
    } };
    chrome.runtime.sendMessage(message);
    return true
};
export const open_local_storage = async (key) => {
    var message = { action: 'get_data',data:{
        key:key
    }  };
    chrome.runtime.sendMessage(message);
    return message.data
};
export const get_list_tabs = async () => {
    var message = { action: 'start_app'};
    chrome.runtime.sendMessage(message);
    return message.data
};