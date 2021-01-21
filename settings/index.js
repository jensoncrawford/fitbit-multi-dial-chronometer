function mySettings(props) {
    return (
        <Page>
            <Section title={<Text bold align="center">Watch Hands Opacity</Text>}>
                <Slider
                    label="Invisible - Opaque"
                    settingsKey="handsOpacity"
                    min="0.0"
                    max="1.0"
                    step="0.1"
                />
            </Section>
            <Section title={<Text bold align="center">Watch Face</Text>}>
                <Select
                    label={`Watch Face Selection`}
                    settingsKey="face"
                    options={[
                        {name:"OrangeOnGray", value: {
                                "colors": [
                                    ["tickColor", "#c7c7c7"],
                                    ["subMinuteTickColor", "#b8b8b8"],
                                    ["fiveMinuteOuterColor", "#f47c47"],
                                    ["fiveMinuteMiddleColor", ""],
                                    ["fiveMinuteInnerColor", "#b8b8b8"],
                                    ["quarterHourColor", "#f47c47"],
                                    ["minuteHandColor", "white"],
                                    ["secondHandColor", "#f47c47"],
                                    ["handDotColor", "black"],
                                    ["faceColor", "#505050"],
                                    ["bezelColor", "#6f1a21"],
                                    ["miniHandLColor", "white"],
                                    ["miniHandRColor", "#f47c47"],
                                    ["miniHandBColor", "#f47c47"],
                                    ["miniBezelColor", "#6f1a21"],
                                    ["miniDialColor", "#484848"],
                                    ["miniTickColor", "#c7c7c7"],
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
                                    ["fiveMinuteInnerColor",1],
                                    ["fiveMinuteMiddleColor",0],
                                    ["fiveMinuteOuterColor",1],
                                    ["quarterHourColor", 1],
                                    ["mainHandArrow", 0],
                                    ["miniHandArrow", 0]
                                ]}
                        },
                        {name:"MediumBlue", value: {
                                name: "Medium Blue",
                                colors: [
                                    ["tickColor", "white"],
                                    ["subMinuteTickColor", "white"],
                                    ["fiveMinuteOuterColor", "white"],
                                    ["fiveMinuteMiddleColor", "white"],
                                    ["fiveMinuteInnerColor", "white"],
                                    ["quarterHourColor", "white"],
                                    ["minuteHandColor", "white"],
                                    ["secondHandColor", "white"],
                                    ["handDotColor", "black"],
                                    ["faceColor", "#013153"],
                                    ["bezelColor", "#025996"],
                                    ["miniHandLColor", "white"],
                                    ["miniHandRColor", "white"],
                                    ["miniHandBColor", "white"],
                                    ["miniBezelColor", "#025996"],
                                    ["miniDialColor", "#012742"],
                                    ["miniTickColor", "#c7c7c7"],
                                    ["miniDialTextColor", "white"],
                                    ["dateTextColor", "white"],
                                    ["dateBackgroundColor", "#011c30"],
                                    ["hrFatBurnColor", "green"],
                                    ["hrCardioColor", "goldenrod"],
                                    ["hrPeakColor", "firebrick"],
                                    ["statsIconColor", "white"],
                                    ["statsTextColor", "white"]
                                ],
                                opacities: [
                                    ["fiveMinuteInnerColor",1],
                                    ["fiveMinuteMiddleColor",1],
                                    ["fiveMinuteOuterColor",1],
                                    ["quarterHourColor", 1],
                                    ["mainHandArrow", 0],
                                    ["miniHandArrow", 0]
                                ]}
                        },
                        {
                            name: "SchumacherRed", value: {
                                name: "Schumacher Red",
                                colors: [
                                    ["tickColor", "black"],
                                    ["subMinuteTickColor", "black"],
                                    ["fiveMinuteOuterColor", "white"],
                                    ["fiveMinuteMiddleColor", "#ebf8cf"],
                                    ["fiveMinuteInnerColor", "#ebf8cf"],
                                    ["quarterHourColor", "white"],
                                    ["minuteHandColor", "white"],
                                    ["secondHandColor", "#f0f423"],
                                    ["handDotColor", "black"],
                                    ["faceColor", "#a51e18"],
                                    ["bezelColor", "lightgray"],
                                    ["miniHandLColor", "#f0f423"],
                                    ["miniHandRColor", "white"],
                                    ["miniHandBColor", "#f0f423"],
                                    ["miniBezelColor", "#701410"],
                                    ["miniDialColor", "#991c16"],
                                    ["miniTickColor", "white"],
                                    ["miniDialTextColor", "white"],
                                    ["dateTextColor", "white"],
                                    ["dateBackgroundColor", "#4f0e0b"],
                                    ["hrFatBurnColor", "green"],
                                    ["hrCardioColor", "goldenrod"],
                                    ["hrPeakColor", "firebrick"],
                                    ["statsIconColor", "white"],
                                    ["statsTextColor", "white"]
                                ],
                                opacities: [
                                    ["fiveMinuteInnerColor",1],
                                    ["fiveMinuteMiddleColor", 1],
                                    ["fiveMinuteOuterColor", 0],
                                    ["quarterHourColor", 0],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 1]
                                ]
                            }
                        },
                        {name:"SchumacherYellow", value: {
                                name: "Schumacher Yellow",
                                colors: [
                                    ["tickColor", "black"],
                                    ["subMinuteTickColor", "black"],
                                    ["fiveMinuteOuterColor", "white"],
                                    ["fiveMinuteMiddleColor", "#ebf8cf"],
                                    ["fiveMinuteInnerColor", "#ebf8cf"],
                                    ["quarterHourColor", "white"],
                                    ["minuteHandColor", "black"],
                                    ["secondHandColor", "#731b0f"],
                                    ["handDotColor", "black"],
                                    ["faceColor", "#eae003"],
                                    ["bezelColor", "white"],
                                    ["miniHandLColor", "#731b0f"],
                                    ["miniHandRColor", "black"],
                                    ["miniHandBColor", "#731b0f"],
                                    ["miniBezelColor", "#731b0f"],
                                    ["miniDialColor", "#ded403"],
                                    ["miniTickColor", "black"],
                                    ["miniDialTextColor", "black"],
                                    ["dateTextColor", "black"],
                                    ["dateBackgroundColor", "#eae003"],
                                    ["hrFatBurnColor", "green"],
                                    ["hrCardioColor", "#ded403"],
                                    ["hrPeakColor", "firebrick"],
                                    ["statsIconColor", "black"],
                                    ["statsTextColor", "black"]
                                ],
                                opacities: [
                                    ["fiveMinuteInnerColor",1],
                                    ["fiveMinuteMiddleColor",1],
                                    ["fiveMinuteOuterColor",0],
                                    ["quarterHourColor", 0],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 1]
                                ]
                            }
                        },
                        {name:"MauruiWhite", value: {
                                name: "Maurui White",
                                colors: [
                                    ["tickColor", "black"],
                                    ["subMinuteTickColor", "black"],
                                    ["fiveMinuteOuterColor", "#111111"],
                                    ["fiveMinuteMiddleColor", "#111111"],
                                    ["fiveMinuteInnerColor", "#111111"],
                                    ["quarterHourColor", "#111111"],
                                    ["minuteHandColor", "black"],
                                    ["secondHandColor", "black"],
                                    ["handDotColor", "#888888"],
                                    ["faceColor", "white"],
                                    ["bezelColor", "#dddddd"],
                                    ["miniHandLColor", "#111111"],
                                    ["miniHandRColor", "#111111"],
                                    ["miniHandBColor", "#111111"],
                                    ["miniBezelColor", "#cccccc"],
                                    ["miniDialColor", "#f0f0f0"],
                                    ["miniTickColor", "black"],
                                    ["miniDialTextColor", "black"],
                                    ["dateTextColor", "black"],
                                    ["dateBackgroundColor", "#dddddd"],
                                    ["hrFatBurnColor", "#bbbbbb"],
                                    ["hrCardioColor", "#dddddd"],
                                    ["hrPeakColor", "#bbbbbb"],
                                    ["statsIconColor", "#111111"],
                                    ["statsTextColor", "#111111"]
                                ],
                                opacities: [
                                    ["fiveMinuteInnerColor",0],
                                    ["fiveMinuteMiddleColor",1],
                                    ["fiveMinuteOuterColor",1],
                                    ["quarterHourColor", 0],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 0]
                                ]
                            }
                        }
                    ]}
                    renderItem={
                        (option) =>
                            <TextImageRow
                                label={option.name}
                                sublabel=""
                                icon={"https://github.com/jensoncrawford/fitbit-analog-watch-speedmaster/blob/master/faceimages/"+option.name+".png?raw=true"}
                            />
                    }
                    onSelection={(selection) => console.log(selection.selected[0])}
                />
            </Section>
        </Page>
    );
}

registerSettingsPage(mySettings);
