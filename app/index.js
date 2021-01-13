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
/* Heart Rate Constants */
const HR_DIAL_MIN = 40;
const HR_DIAL_MAX = 200;
const HR_OUT_OF_RANGE = "out-of-range";
const HR_FAT_BURN = "fat-burn";
const HR_CARDIO = "cardio"
const HR_PEAK = "peak"
const HR_BELOW_CUSTOM = "below-custom";
const HR_CUSTOM = "custom";
const HR_ABOVE_CUSTOM = "above-custom";

let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
let months = ["JAN ", "FEB", "MAR", "APR", "MAY", "JUN ", "JUL ", "AUG", "SEP", "OCT", "NOV", "DEC"];

let hourhand = document.getElementById("hourhand");
let minutehand = document.getElementById("minutehand");
let secondhand = document.getElementById("secondhand");
let outercenterdot = document.getElementById("outercenterdot");
let innercenterdot = document.getElementById("innercenterdot");
let hourhand24 = document.getElementById("hourhand24");
let dateField = document.getElementById("dateField");
let monthHand = document.getElementById("monthHand");
let batteryMeter = document.getElementById("batteryMeter");
let hrHand = document.getElementById("hrHand");
let hrMax = document.getElementById("hrMax");
let hrResting = document.getElementById("hrResting");
let hrFatBurn = document.getElementById("hrFatBurn");
let hrCardio = document.getElementById("hrCardio");
let hrPeak = document.getElementById("hrPeak");

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

/*
 * Heart Rate Event Handling
 */
let hrm = null;
if (HeartRateSensor) {
  hrm = new HeartRateSensor();
  hrm.onreading = () => {
    hrHand.groupTransform.rotate.angle = (144 + 36 / 20 * hrm.heartRate) % 360;
    hrMax.sweepAngle = - 36 / 20 * ( HR_DIAL_MAX - user.maxHeartRate);
    hrResting.sweepAngle = 36 / 20 * (user.restingHeartRate - HR_DIAL_MIN) % 360;
    let section_one = 0;
    let section_two = 0;
    let section_three = 0;
    let i=0;
    for (i=user.restingHeartRate;i<user.maxHeartRate;i++) {
      if (section_one == 0 && user.heartRateZone(i) == HR_FAT_BURN ) {
        section_one = i;
        // console.info(HR_FAT_BURN + " = " + i);
      }
      if (section_two == 0 && user.heartRateZone(i) == HR_CARDIO ) {
        section_two = i;
        // console.info(HR_CARDIO + " = " + i);
      }
      if (section_three == 0 && user.heartRateZone(i) == HR_PEAK ) {
        section_three = i;
        // console.info(HR_PEAK + " = " + i);
      }
    }
    // fat burn : fat-burn to cardio - 1
    hrFatBurn.startAngle = (144 + 36 / 20 * section_one) % 360;
    hrFatBurn.sweepAngle = 36 / 20 * ( section_two - section_one );

    // cardio   : cardio to peak - 1
    hrCardio.startAngle = (144 + 36 / 20 * section_two) % 360;
    hrCardio.sweepAngle = 36 / 20 * ( section_three - section_two );

    // peak     : peak to user.maxHeartRate - 1
    hrPeak.startAngle = (144 + 36 / 20 * section_three) % 360;
    hrPeak.sweepAngle = 36 / 20 * ( user.maxHeartRate - section_three );
  };

} else {
  hrHand.style.opacity = 0;
  hrMax.style.opacity = 0;
  hrResting.style.opacity = 0;
}

if ( BodyPresenceSensor ) {
  let body = new BodyPresenceSensor();
  body.onreading = () => {
    if (hrm) {
      if (!body.present) {
        hrm.stop();
        hrHand.style.opacity = 0;
        hrMax.style.opacity = 0;
        hrResting.style.opacity = 0;
      } else {
        hrm.start();
        hrHand.style.opacity = 1;
        hrMax.style.opacity = 1;
        hrResting.style.opacity = 1;
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
  if (evt.date.getDay() != evtDateDay) {
    evtDateDay = evt.date.getDay();
    monthHand.groupTransform.rotate.angle = (51.428714 * evtDateDay)
    // dayField.text = days[evtDateDay];
  }
  if (evt.date.getDate() != evtDateDayOfMonth) {
    evtDateDayOfMonth = evt.date.getDate();
    dateField.text = evtDateDayOfMonth;
  }
  if (evt.date.getMinutes() != evtDateMinutes) {
    evtDateMinutes = evt.date.getMinutes();
    hourhand24.groupTransform.rotate.angle = (15 * evt.date.getHours()) + (0.25 * evtDateMinutes);
    hourhand.groupTransform.rotate.angle = (30 * (evt.date.getHours() % 12)) + (0.5 * evtDateMinutes);
  }
  minutehand.groupTransform.rotate.angle = (6 * evtDateMinutes) + (0.1 * evt.date.getSeconds());
  secondhand.groupTransform.rotate.angle = (6 * evt.date.getSeconds());
  if (batteryChargeLevel != battery.chargeLevel) {
    batteryChargeLevel = battery.chargeLevel;
    batteryMeter.sweepAngle = 3.6 * batteryChargeLevel;
  }

};

setColours(settings.accentcolor, settings.markercolor);
setBackgroundGradient(settings.showBackgroundGradient, settings.accentcolor);
setHandsOpacity(settings.handsopacity);