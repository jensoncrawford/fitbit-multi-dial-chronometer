import * as messaging from "messaging";
import { settingsStorage } from "settings";

/* socket opens */
messaging.peerSocket.onopen = () => {
  restoreSettings();
};

/* socket closes */
messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

/* settings change */
settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};

/* Restore saved settings and send */
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {   
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        value: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

/* Send to device */
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}
