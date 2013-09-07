// chrome.browserAction.setBadgeText({text: ''});

chrome.webRequest.onCompleted.addListener(
    function(details) {
        var color;

        switch (details.statusCode) {
        case 401:
        case 403:
        case 404:
        case 500:
            color = [255, 0, 0, 255];
            break;
        default:
            color = [0, 255, 50, 255];
            break;
        }

        chrome.browserAction.setBadgeText({
            text: String(details.statusCode),
            tabId: details.tabId
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: color,
            tabId: details.tabId
        });

        console.log(details);
    },
    {
        urls: ['*://*/*'],
        types: ['main_frame']
    },
    ['responseHeaders']
);
