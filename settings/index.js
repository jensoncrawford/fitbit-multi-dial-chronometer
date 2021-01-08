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
      <Section title={<Text bold align="center">Background Color</Text>}>
        <ColorSelect
          settingsKey="accentcolor"
          colors={colourSet}
        />
      </Section>
      <Section title={<Text bold align="center">Main Color</Text>}>
        <ColorSelect
          settingsKey="markercolor"
          colors={colourSet}
        />
      </Section>
      <Section title={<Text bold align="center">Watch Hands Opacity</Text>}>
          <Slider
            label="Invisible - Opaque"
            settingsKey="handsopacity"
            min="0.0"
            max="1.0"
            step="0.25"
          />
      </Section>
      <Section>
        <Toggle
          settingsKey="showBackgroundGradient"
          label="Show Background Gradient"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
