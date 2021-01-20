const colourSet = [
  {color: "red"}, 
  {color: "#F83C40"},
  {color: "crimson"},
  {color: "deeppink"},
  {color: "pink"},
  {color: "orangered"},
  {color: "orange"},
  {color: "#FFCC33"},
  {color: "yellow"},
  {color: "#B8FC68"},
  {color: "darkgreen"},
  {color: "seagreen"},
  {color: "olivedrab"},
  {color: "lightgreen"},
  {color: "teal"},
  {color: "lightskyblue"},
  {color: "deepskyblue"},
  {color: "dodgerblue"},
  {color: "navy"},
  {color: 'mediumpurple'},
  {color: 'purple'},
  {color: "lightgrey"},
  {color: "grey"},
  {color: "white"} 
];

function mySettings(props) {
  return (
    <Page>
       <Section title={<Text bold align="center">Watch Hands Opacity</Text>}>
          <Slider
            label="Invisible - Opaque"
            settingsKey="handsopacity"
            min="0.0"
            max="1.0"
            step="0.25"
          />
      </Section>
      <Section title={<Text bold align="center">Main Color</Text>}>
          <Select
              label={`Multi-Selection`}
              multiple
              settingsKey="multiselection"
              options={[
                  {name:"OrangeOnGray", value:{
                      "colors": [
                              {"tickColor": "#c7c7c7"},
                              {"subMinuteTickColor": "#b8b8b8"},
                              {"fiveMinuteOuterColor": "#f47c47"},
                              {"fiveMinuteInnerColor": "#b8b8b8"},
                              {"quarterHourColor": "#f47c47"},
                              {"minuteHandColor": "white"},
                              {"secondHandColor": "#f47c47"},
                              {"miniHandLColor": "white"},
                              {"miniHandRColor": "#f47c47"},
                              {"miniHandBColor": "#f47c47"},
                              {"handDotColor": "black"},
                              {"faceColor": "#505050"},
                              {"bezelColor": "#6f1a21"},
                              {"miniDialColor": "#484848"},
                              {"miniDialTextColor": "#c7c7c7"},
                              {"dateTextColor": "black"},
                              {"dateBackgroundColor": "#a0a0a0"},
                              {"hrFatBurnColor": "green"},
                              {"hrCardioColor": "goldenrod"},
                              {"hrPeakColor": "firebrick"},
                              {"statsIconColor": "#f47c47"},
                              {"statsTextColor": "#c7c7c7"}
                          ]}
                  },
                  {name:"Two",   value:"2"},
                  {name:"Three", value:"3"},
                  {name:"Four", value:"4"},
                  {name:"Five", value:"5"},
                  {name:"Six", value:"6"},
                  {name:"Seven", value:"7"},
                  {name:"Eight", value:"8"},
                  {name:"Nine", value:"9"},
                  {name:"Ten", value:"10"},
                  {name:"Eleven", value:"11"},
                  {name:"Twelve", value:"12"},
                  {name:"Thirteen", value:"13"},
                  {name:"Fourteen", value:"14"},
                  {name:"Fifteen", value:"15"}
              ]}
              renderItem={
                  (option) =>
                      <TextImageRow
                          label={option.name}
                          sublabel="Sub-Label"
                          icon="https://tinyurl.com/ybbmpxxq"
                      />
              }
              onSelection={(selection) => console.log(selection)}
          />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
