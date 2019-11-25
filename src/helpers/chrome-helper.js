/* globals chrome */
import shortId from 'shortid';
import ls from 'local-storage';

class ChromeHelper {
    constructor() {
    }

    static open(url) {
        return new Promise(resolve => {
            chrome.tabs.create({url});
            resolve()
        })
    }
    static sendRuntimeMessage(event, data) {
        return new Promise(resolve => {
            if(chrome.runtime.sendMessage) {
                chrome.runtime.sendMessage({event, data}, function (response) {
                    console.log(response);
                    resolve(response);
                });
            }

        })
    }

    // can only be called form popup and background
    static sendTabMessage(event, data) {
        return new Promise(resolve => {
            if(chrome.tabs) {
                chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
                    const tab = tabs[0];
                    chrome.tabs.sendMessage(tab.id, {event, data});
                });
            }

        })
    }

    // can only be called form popup and background
    static getTabUrl() {
        return new Promise((resolve) => {
            if(chrome.tabs) {
                chrome.tabs.getSelected(null, function(tab) {
                    const url = tab.url;
                    resolve(url)
                });
            }
        })
    }


    static addListener(event, listenerFunction) {
        const id = shortId.generate();
        const listeners = ChromeHelper.listeners[event] || {};
        listeners[id] = listenerFunction;
        ChromeHelper.listeners[event] = listeners;
        return id;

    }

    static removeListeners(event, id) {
        const listeners = ChromeHelper.listeners[event];
        if(listeners) {
            delete listeners[id];
            ChromeHelper.listeners[event] = listeners;
        }
    }

    static remove(key) {
        return new Promise((resolve) => {
            resolve(ls.remove(key))
        })
    }

    static set(key, value, sync) {
        return new Promise((resolve) => {
            const obj = {};
            obj[key] = value;
            if(sync) {
                if(chrome.storage) {
                    chrome.storage.sync.set(obj, function() {
                        resolve(value);
                    });
                }
            } else {
                ls.set(key, value);
                resolve(value);
            }


        })
    }

    static get(key, sync) {
        return new Promise((resolve) => {
            if(sync) {
                if(chrome.storage) {
                    chrome.storage.sync.get([key], function (result) {
                        result = result || {};
                        resolve(result[key]);
                    });
                }
            } else {
                resolve(ls.get(key) || {})
            }

        })
    }

    static getSync(keys) {
        return new Promise((resolve) => {
            if(chrome.storage) {
                chrome.storage.sync.get(keys, function (result) {
                    result = result || {};
                    resolve(result);
                });
            }
        })
    }


}
ChromeHelper.listeners = {};
if(chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            const { event, data } = request;
            console.log(`process event: ${event}`);
            console.log(data);
            const listeners = ChromeHelper.listeners[event];
            if(listeners) {
                for(var prop in listeners) {
                    listeners[prop](data, sender, sendResponse);
                }
            }
        });
}


export default ChromeHelper;