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

/* main dial elements */
let hourhand = document.getElementById("hourhand");
let minutehand = document.getElementById("minutehand");
let secondhand = document.getElementById("secondhand");
let outercenterdot = document.getElementById("outercenterdot");
let innercenterdot = document.getElementById("innercenterdot");

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
let hr = document.getElementsByClassName("hr");

/* activity metric elements */
let amField = document.getElementById("amField");
let distField = document.getElementById("distField");
let stepsField = document.getElementById("stepsField");
let floorsField = document.getElementById("floorsField");
let calsField = document.getElementById("calsField");

let settings = loadSettings();
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
        face: {colors: [
        {className: "tickColor", color: "#c7c7c7"},
        {className: "subMinuteTickColor", color: "#b8b8b8"},
        {className: "fiveMinuteOuterColor", color: "#f47c47"},
        {className: "fiveMinuteInnerColor", color: "#b8b8b8"},
        {className: "quarterHourColor", color: "#f47c47"},
        {className: "minuteHandColor", color: "white"},
        {className: "secondHandColor", color: "#f47c47"},
        {className: "miniHandLColor", color: "white"},
        {className: "miniHandRColor", color: "#f47c47"},
        {className: "miniHandBColor", color: "#f47c47"},
        {className: "handDotColor", color: "black"},
        {className: "faceColor", color: "#505050"},
        {className: "bezelColor", color: "#6f1a21"},
        {className: "miniDialColor", color: "#484848"},
        {className: "miniDialTextColor", color: "#c7c7c7"},
        {className: "dateTextColor", color: "black"},
        {className: "dateBackgroundColor", color: "#a0a0a0"},
        {className: "hrFatBurnColor", color: "green"},
        {className: "hrCardioColor", color: "goldenrod"},
        {className: "hrPeakColor", color: "firebrick"},
        {className: "statsIconColor", color: "#f47c47"},
        {className: "statsTextColor", color: "#c7c7c7"}
      ]},
      handsOpacity: 1.0,
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
     case "face":
       let face = JSON.parse(evt.data.newValue);
       let colors = face.colors;
       colors.forEach(function (element) {
         setColors(element.className, element.color);
       });
       break;
     case "handsOpacity":
        settings.handsOpacity = JSON.parse(evt.data.newValue);
        setHandsOpacity(settings.handsOpacity);
        break;
    }
  }
};

function setColors(className, color) {
  let elements = document.getElementsByClassName(className);
  let i;
  for(i = 0; i < elements.length; i++) {
    let element = elements[i];
    element.style.fill = color;
  }
}
function setHandsOpacity(handsopacity) {
  hourhand.style.opacity = handsopacity;
  minutehand.style.opacity = handsopacity;
  secondhand.style.opacity = handsopacity;
  outercenterdot.style.opacity = handsopacity;
  innercenterdot.style.opacity = handsopacity;
}

/*
 * Heart Rate Event Handling
 */
function hrOpacity(opacity) {
  // console.info("hrOpacity("+opacity+")");
  for (var i=0, len=hr.length|0; i<len; i=i+1|0) {
    let hrElement = hr[i];
    hrElement.style.opacity = opacity;
  }
}
let hrm = null;
if (HeartRateSensor) {
  console.info("Heart rate sensor present");
  hrm = new HeartRateSensor();
  hrm.onreading = () => {
    hrHand.groupTransform.rotate.angle = (144 + 36 / 20 * hrm.heartRate) % 360;
    hrMax.sweepAngle = - 36 / 20 * ( HR_DIAL_MAX - user.maxHeartRate);
    hrResting.sweepAngle = 36 / 20 * (user.restingHeartRate - HR_DIAL_MIN) % 360;
    let section_one = 0;
    let section_two = 0;
    let section_three = 0;
    let i=0;
    // console.info("user.restingHeartRate="+user.restingHeartRate+"; user.maxHeartRate="+user.maxHeartRate);
    for (i=user.restingHeartRate;i<user.maxHeartRate;i++) {
      if (section_one == 0 && user.heartRateZone(i) == HR_FAT_BURN ) {
        section_one = i;
      }
      if (section_two == 0 && user.heartRateZone(i) == HR_CARDIO ) {
        section_two = i;
      }
      if (section_three == 0 && user.heartRateZone(i) == HR_PEAK ) {
        section_three = i;
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
  if (evt.date.getDay() != evtDateDay) {
    evtDateDay = evt.date.getDay();
    monthHand.groupTransform.rotate.angle = (360.0 / 7.0 * evtDateDay)
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
  if (today.adjusted.activeMinutes !== undefined) {
    amField.text = today.adjusted.activeMinutes;
  } else {
    amField.text = "N/A";
  }
  let steps = today.adjusted.steps;
  stepsField.text = steps.toLocaleString();
  let dist = (units.distance === "metric" ? today.adjusted.distance * 0.001 : today.adjusted.distance * 0.000621371);
  dist = Math.floor(dist * 100) / 100;
  distField.text = dist.toLocaleString();
  if (today.local.elevationGain !== undefined) {
    floorsField.text = today.adjusted.elevationGain;
  } else {
    floorsField.text = "N/A";
  }
  let calories = today.adjusted.calories;
  calsField.text = calories.toLocaleString();
};

setColours(settings.accentcolor, settings.markercolor);
setBackgroundGradient(settings.showBackgroundGradient, settings.accentcolor);
setHandsOpacity(settings.handsopacity);
