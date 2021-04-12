/* fitbit imports */
import clock from "clock";
import document from "document";
import { units } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { today } from 'user-activity';
import { me } from "appbit";
import { me as device } from "device";
import { battery } from "power";
import { user } from "user-profile";
import * as messaging from "messaging";
import * as fs from "fs";

/* our import */
import {faces} from "./faces.js";

/* Watch Names */
const VERSA_LITE = "Versa Lite";

/* Settings Constants */
const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

/* Heart Rate Constants */
const HR_DIAL_MIN = 40;
const HR_DIAL_MAX = 200;
const HR_FAT_BURN = "fat-burn";
const HR_CARDIO = "cardio"
const HR_PEAK = "peak"

/* main dial elements */
let hourhand = document.getElementById("hourhand");
let minutehand = document.getElementById("minutehand");
let secondhand = document.getElementById("secondhand");

/* 24 hour mini-dial elements */
let hourhand24 = document.getElementById("hourhand24");
let batteryMeter = document.getElementById("batteryMeter");

/* day/date mini-dial elements */
let dateField = document.getElementById("dateField");
let monthHand = document.getElementById("monthHand");

/* heart rate mini-dial elements */
let hrHand = document.getElementById("hrHand");
let hrMax = document.getElementById("hrMax");
let hrResting = document.getElementById("hrResting");
let hrFatBurn = document.getElementById("hrFatBurn");
let hrCardio = document.getElementById("hrCardio");
let hrPeak = document.getElementById("hrPeak");

/* activity metric elements */
let amField = document.getElementById("amField");
let distField = document.getElementById("distField");
let stepsField = document.getElementById("stepsField");
let floorsField = document.getElementById("floorsField");
let calsField = document.getElementById("calsField");
let statsFloors = document.getElementById("stats-floors");
let statsCycle = document.getElementById("stats-cycle");


function memoryToConsole(where) {
  console.info(where);
  console.info("JS memory:       used: " + memory.js.used.toLocaleString() +
      " peak: " + memory.js.peak.toLocaleString() +
      " total: " + memory.js.total.toLocaleString());
  console.info("Native memory:   used: " + memory.native.used.toLocaleString() +
      " peak: " + memory.native.peak.toLocaleString() +
      " total: " + memory.native.total.toLocaleString());
  console.info("Memory pressure: " + memory.monitor.pressure);
}

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    console.error("ERROR fs.readFileSync("+SETTINGS_FILE+", "+SETTINGS_TYPE+")");
    let defaultFace = faces.get("Black");
    return {
      face: defaultFace,
      handsOpacity: 1.0
    };
  }
}

let settings = loadSettings();

me.addEventListener("unload", saveSettings);
function saveSettings() {
  try {
    fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
  }
  catch (ex) {
    console.error("ERROR fs.readFileSync("+SETTINGS_FILE+", settings, "+SETTINGS_TYPE+")");
  }
}

messaging.peerSocket.onmessage = evt => {
  if (evt.data.newValue){
    switch (evt.data.key) {
      case "face":
        let faceName = JSON.parse(evt.data.newValue).values[0].name;
        settings.face = faces.get(faceName);
        let colors = settings.face.colors;
        colors.forEach(function (element) {
          setClrs(element[0], element[1]);
        });
        let opacities = settings.face.opacities;
        opacities.forEach(function(element) {
          setOpacity(element[0], element[1]);
        });
        saveSettings();
        break;
      case "handsOpacity":
        settings.handsOpacity = JSON.parse(evt.data.newValue);
        setHandsOpacity(settings.handsOpacity);
        saveSettings();
        break;
    }
  }
};

function setFace(face) {
  let colors = face.colors;
  if (colors) {
    colors.forEach(function (color) {
      setClrs(color[0], color[1]);
    });
  }
  let opacities = face.opacities;
  if (opacities) {
    opacities.forEach(function (opacity) {
      setOpacity(opacity[0], opacity[1]);
    });
  }
}

function setClrs(className, color) {
  if (className && color) {
    let elements = document.getElementsByClassName(className);
    let i;
    for(i = 0; i < elements.length; i++) {
      let element = elements[i];
      element.style.fill = color;
    }
  }
}
function setOpacity(className, opacity) {
  if (className && opacity !== undefined) {
    let elements = document.getElementsByClassName(className);
    let i;
    for(i = 0; i < elements.length; i++) {
      let element = elements[i];
      element.style.opacity = opacity;
    }
  }
}
function setHandsOpacity(opacity) {
  setOpacity("mainHand",opacity);
}
/*
 * Heart Rate Event Handling
 */
function hrOpacity(opacity) {
  setOpacity("hr",opacity);
}

let hrm = null;
if (HeartRateSensor) {
  hrm = new HeartRateSensor();
  hrm.onreading = () => {
    hrHand.groupTransform.rotate.angle = (144 + 36 / 20 * hrm.heartRate) % 360;
    if (user && user.maxHeartRate ) {
      hrMax.sweepAngle = - 36 / 20 * ( HR_DIAL_MAX - user.maxHeartRate);
      hrResting.sweepAngle = 36 / 20 * (user.restingHeartRate - HR_DIAL_MIN) % 360;
      let fatBurnStart = 0;
      let cardioStart = 0;
      let peakStart = 0;
      for (let i=user.restingHeartRate;i<user.maxHeartRate;i++) {
        if (fatBurnStart === 0 && user.heartRateZone(i) === HR_FAT_BURN ) {
          fatBurnStart = i;
        }
        if (cardioStart === 0 && user.heartRateZone(i) === HR_CARDIO ) {
          cardioStart = i;
        }
        if (peakStart === 0 && user.heartRateZone(i) === HR_PEAK ) {
          peakStart = i;
        }
      }
      hrFatBurn.startAngle = (144 + 36 / 20 * fatBurnStart) % 360;
      hrFatBurn.sweepAngle = 36 / 20 * ( cardioStart - fatBurnStart );

      // cardio   : cardio to peak - 1
      hrCardio.startAngle = (144 + 36 / 20 * cardioStart) % 360;
      hrCardio.sweepAngle = 36 / 20 * ( peakStart - cardioStart );

      // peak     : peak to user.maxHeartRate - 1
      hrPeak.startAngle = (144 + 36 / 20 * peakStart) % 360;
      hrPeak.sweepAngle = 36 / 20 * ( user.maxHeartRate - peakStart );
    }
  };

} else {
  // no heart sensor
  hrOpacity(0);
}

if ( BodyPresenceSensor ) {
  let body = new BodyPresenceSensor();
  body.onreading = () => {
    if (hrm) {
      if (!body.present) {
        hrm.stop();
        hrOpacity(0);
      } else {
        hrm.start();
        hrOpacity(1);
      }
    }
  };
  body.start();
}

/*
 * Clock event handling
 */
clock.granularity = "seconds";
let evtDateDay=-1;
let evtDateDayOfMonth=-1;let evtDateMonth=-1;
let evtDateMinutes=-1;
let batteryChargeLevel=-1
clock.ontick = (evt) => {
  let date = evt.date;
  if (date.getDay() !== evtDateDay) {
    evtDateDay = date.getDay();
    monthHand.groupTransform.rotate.angle = (360.0 / 7.0 * evtDateDay)
  }
  if (date.getDate() !== evtDateDayOfMonth) {
    evtDateDayOfMonth = date.getDate();
    dateField.text = evtDateDayOfMonth;
  }
  if (date.getMinutes() !== evtDateMinutes) {
    evtDateMinutes = date.getMinutes();
    hourhand24.groupTransform.rotate.angle = (15 * date.getHours()) + (0.25 * evtDateMinutes);
    hourhand.groupTransform.rotate.angle = (30 * (date.getHours() % 12)) + (0.5 * evtDateMinutes);
  }
  minutehand.groupTransform.rotate.angle = (6 * evtDateMinutes) + (0.1 * date.getSeconds());
  secondhand.groupTransform.rotate.angle = (6 * date.getSeconds());
  if (batteryChargeLevel !== battery.chargeLevel) {
    batteryChargeLevel = battery.chargeLevel;
    batteryMeter.sweepAngle = 3.6 * batteryChargeLevel;
  }
  if (today.adjusted.activeZoneMinutes.total !== undefined) {
    azmField.text = today.adjusted.activeZoneMinutes.total;
  } else {
    azmField.text = "N/A";
  }
  let steps = today.adjusted.steps;
  stepsField.text = "9,073"; //steps.toLocaleString();
  let dist = (units.distance === "metric" ? today.adjusted.distance * 0.001 : today.adjusted.distance * 0.000621371);
  dist = Math.floor(dist * 100) / 100;
  distField.text = "4.87";
  if (today.local.elevationGain !== undefined) {
    floorsField.text = today.adjusted.elevationGain;
  } else {
    floorsField.text = "N/A";
  }
  let calories = today.adjusted.calories;
  calsField.text = "2,571"; // calories.toLocaleString();
};

setFace(settings.face);
setHandsOpacity(settings.handsopacity);
