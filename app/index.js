import clock from "clock";
import document from "document";
import { units } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { today } from 'user-activity';
import { me } from "appbit";
import { battery } from "power";
import { user } from "user-profile";
import * as messaging from "messaging";
import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
let months = ["JAN ", "FEB", "MAR", "APR", "MAY", "JUN ", "JUL ", "AUG", "SEP", "OCT", "NOV", "DEC"];

let hourhand = document.getElementById("hourhand");
let minutehand = document.getElementById("minutehand");
let secondhand = document.getElementById("secondhand");
let outercenterdot = document.getElementById("outercenterdot");
let innercenterdot = document.getElementById("innercenterdot");
let hourhand24 = document.getElementById("hourhand24");
let backgroundGradient = document.getElementById("backgroundGradient");
let dayField = document.getElementById("dayField");
let dateField = document.getElementById("dateField");
let monthHand = document.getElementById("monthHand");
let hrField = document.getElementById("hrField");
let amField = document.getElementById("amField");
let distField = document.getElementById("distField");
let dist = 0;
let stepsField = document.getElementById("stepsField");
let floorsField = document.getElementById("floorsField");
let calsField = document.getElementById("calsField");
let batteryMeter = document.getElementById("batteryMeter");
let batteryPercent = document.getElementById("batteryPercent");

// let restingHeartRate = user.restingHeartRate;
// let maxHeartRate = user.maxHeartRate;

let settings = loadSettings();
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
      accentcolor: "dodgerblue",
      markercolor: "lightgrey",
      handsopacity: 1.0,
      showBackgroundGradient: true
    };
  }
}

me.addEventListener("unload", saveSettings);
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

messaging.peerSocket.onmessage = evt => {
  if (evt.data.newValue){
    switch (evt.data.key) {
      case "accentcolor":
        settings.accentcolor = JSON.parse(evt.data.newValue); 
        setColours(settings.accentcolor, settings.markercolor);
        break;
      case "markercolor":
        settings.markercolor = JSON.parse(evt.data.newValue); 
        setColours(settings.accentcolor, settings.markercolor);
        break;
      case "handsopacity":
        settings.handsopacity = JSON.parse(evt.data.newValue); 
        setHandsOpacity(settings.handsopacity);
        break;
      case "showBackgroundGradient":
        settings.showBackgroundGradient = JSON.parse(evt.data.newValue); 
        setBackgroundGradient(settings.showBackgroundGradient, settings.accentcolor);
        break;
    }    
  }
};

function setColours(accentcolour, markercolour) {
  let elements = document.getElementsByClassName("accentcolour");
  elements.forEach(function (element) {
    element.style.fill = accentcolour;
  });
  // backgroundGradient.gradient.colors.c1 = accentcolour;

  elements = document.getElementsByClassName("markercolour");
  elements.forEach(function (element) {
    element.style.fill = markercolour;
  });
}

function setHandsOpacity(handsopacity) {
  hourhand.style.opacity = handsopacity;
  minutehand.style.opacity = handsopacity;
  secondhand.style.opacity = handsopacity;
  outercenterdot.style.opacity = handsopacity;
  innercenterdot.style.opacity = handsopacity;
}

function setBackgroundGradient(showBackgroundGradient, accentColour) {
  // backgroundGradient.gradient.colors.c1 = (showBackgroundGradient ? accentColour : "black");
}

let hrm = null;
if (HeartRateSensor) {
  hrm = new HeartRateSensor();
  hrm.onreading = () => {
    hrField.text = hrm.heartRate;
  };
} else {
  hrField.txt = "--";
}

if ( BodyPresenceSensor ) {
  let body = new BodyPresenceSensor();
  body.onreading = () => {
    if (hrm) {
      if (!body.present) {
        hrm.stop();
        hrField.text = "--";
      } else {
        hrm.start();
      }
    }
  };
  body.start();
}
clock.granularity = "seconds";
let evtDateDay=-1;
let evtDateDayOfMonth=-1;
let evtDateMonth=-1;
let evtDateMinutes=-1;
let batteryChargeLevel=-1
clock.ontick = (evt) => {
  if (evt.date.getDay() != evtDateDay) { 
    evtDateDay = evt.date.getDay();
    dayField.text = days[evtDateDay];
  }
  if (evt.date.getDate() != evtDateDayOfMonth) {
    evtDateDayOfMonth = evt.date.getDate();
    dateField.text = evtDateDayOfMonth;
  }
  if (evt.date.getMonth() != evtDateMonth ) {
    evtDateMonth = evt.date.getMonth();
    monthHand.groupTransform.rotate.angle = (30 * evtDateMonth);
  }
  if (evt.date.getMinutes() != evtDateMinutes) {
    evtDateMinutes = evt.date.getMinutes();
    hourhand24.groupTransform.rotate.angle = (15 * evt.date.getHours()) + (0.25 * evtDateMinutes);
    hourhand.groupTransform.rotate.angle = (30 * (evt.date.getHours() % 12)) + (0.5 * evtDateMinutes);
  }
  minutehand.groupTransform.rotate.angle = (6 * evt.date.getMinutes()) + (0.1 * evt.date.getSeconds());
  secondhand.groupTransform.rotate.angle = (6 * evt.date.getSeconds());
/*
  amField.text = today.adjusted.activeMinutes;
  stepsField.text = today.adjusted.steps;
  dist = (units.distance === "metric" ? today.adjusted.distance * 0.001 : today.adjusted.distance * 0.000621371);
  distField.text = Math.floor(dist * 100) / 100;
  floorsField.text = today.adjusted.elevationGain;
  calsField.text = today.adjusted.calories;
*/
  if (batteryChargeLevel != battery.chargeLevel) {
    batteryChargeLevel = battery.chargeLevel;
    batteryMeter.sweepAngle = 3.6 * batteryChargeLevel;
    batteryPercent.text = `${batteryChargeLevel}%`
  }
  
};

setColours(settings.accentcolor, settings.markercolor);
setBackgroundGradient(settings.showBackgroundGradient, settings.accentcolor);
setHandsOpacity(settings.handsopacity);