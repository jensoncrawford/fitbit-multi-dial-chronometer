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
          ["tickColor", "#c7c7c7"],
          ["subMinuteTickColor", "#b8b8b8"],
          ["fiveMinuteOuterColor", "#f47c47"],
          ["fiveMinuteMiddleColor", ""],
          ["fiveMinuteInnerColor", "#b8b8b8"],
          ["quarterHourColor", "#f47c47"],
          ["minuteHandColor", "white"],
          ["secondHandColor", "#f47c47"],
          ["miniHandLColor", "white"],
          ["miniHandRColor", "#f47c47"],
          ["miniHandBColor", "#f47c47"],
          ["handDotColor", "black"],
          ["faceColor", "#505050"],
          ["bezelColor", "#6f1a21"],
          ["miniDialColor", "#484848"],
          ["miniDialTextColor", "#c7c7c7"],
          ["dateTextColor", "black"],
          ["dateBackgroundColor", "#a0a0a0"],
          ["hrFatBurnColor", "green"],
          ["hrCardioColor", "goldenrod"],
          ["hrPeakColor", "firebrick"],
          ["statsIconColor", "#f47c47"],
          ["statsTextColor", "#c7c7c7"]
        ],
        opacities: [
          ["fiveMinuteMiddleColor",0],
          ["quarterHourColor", 1],
          ["mainHandArrow", 0],
          ["miniHandArrow", 0]
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
        console.info("messaging.peerSocket.onmessage: "+evt.data.newValue);
        settings.face = JSON.parse(evt.data.newValue).values[0].value;
        let colors = settings.face.colors;
        colors.forEach(function (element) {
          setColors(element[0], element[1]);
        });
        let opacities = settings.face.opacities;
        opacities.forEach(function(element) {
          setOpacity(element[0], element[1]);
        })
        break;
      case "handsOpacity":
        settings.handsOpacity = JSON.parse(evt.data.newValue);
        setHandsOpacity(settings.handsOpacity);
        break;
    }
  }
};

function setFace(face) {
  let colors = settings.face.colors;
  if (colors) {
    colors.forEach(function (element) {
      setColors(element.className, element.color);
    });
  }
}
function setColors(className, color) {
  if (className && color) {
    // console.info("className="+className+"; color="+color);
    let elements = document.getElementsByClassName(className);
    // console.info(elements.length+" elements of class "+className);
    let i;
    for(i = 0; i < elements.length; i++) {
      let element = elements[i];
      element.style.fill = color;
    }
  }
}
function setOpacity(className, opacity) {
  if (className && opacity !== undefined) {
    console.info("className="+className+"; opacity="+opacity);
    let elements = document.getElementsByClassName(className);
    console.info(elements.length+" elements of class "+className);
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
  // console.info("hrOpacity("+opacity+")");
  /*  for (var i=0, len=hr.length|0; i<len; i=i+1|0) {
      let hrElement = hr[i];
      hrElement.style.opacity = opacity;
    } */
}
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

setFace(settings.face);
setHandsOpacity(settings.handsopacity);
