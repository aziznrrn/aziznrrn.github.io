if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();
    requestPermission();
}

function registerServiceWorker() {
    return navigator.serviceWorker.register('sw.js')
    .then((registration) => {
        return registration;
    })
    .catch((e) => {
        console.err(e);
    });
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission()
        .then((result) => {
            if (result === "denied") {
                console.log("notification denied.");
                return;
            } else if (result === "default") {
                console.error("notification dialog closed.");
                return;
            }
                
            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then((registration) => {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BBJUo_7YZfgi2DDQb4TLkAsQxCXAWVLTds3rH8P5oYcOirVmcGmU7EYwgQiyrbZi7nnYww92zESiHoIawHBikgw")
                    }).catch((e) => 
                        console.error(e.message)
                    );
                });
            }
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}