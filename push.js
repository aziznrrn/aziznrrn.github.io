const webPush = require("web-push");
 
const vapidKeys = {
    "publicKey":"BBJUo_7YZfgi2DDQb4TLkAsQxCXAWVLTds3rH8P5oYcOirVmcGmU7EYwgQiyrbZi7nnYww92zESiHoIawHBikgw",
    "privateKey":"3ohMRE6_Y21KxhtjcOdaROn1HeuKmGVwgXykshGzkCA"
};
 
webPush.setVapidDetails(
   "mailto:example@yourdomain.org",
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/evGGQqjX_-E:APA91bHLU38vUAoAExOhPJv2tAE6nFNv1gOb_sob7eQ7tFHc6SdxKbhBfzR_7B-n6SUtaYcApyBwm9cOma_gGudJ9SF-Yb26hkmucDiVGlMbVeF_Be28-NoAVFvHzS60yE5zk5akMHyx",
   "keys": {
       "p256dh": "BNgx24dCG8KcIb16UHNChHcRfm+I+MSJBv6rKQ1QST39kEUjdiAO2ZA5bIEp95yUmQh6VmBWubdTZRFyjjp0zt8=",
       "auth": "UoMn7C9H8qYOQRX0WJ0S4g=="
   }
};
const payload = "Haloo";
 
const options = {
   gcmAPIKey: "403990282286",
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);