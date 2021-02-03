/* images for TextImageRow */
import iconBlack from "./Black.png"
import iconWhite from "./White.png"
import iconOrangeOnGray from "./Orange on Gray.png"
import iconMediumBlue from "./Medium Blue.png"
import iconRacingRed from "./Racing Red.png"
import iconRacingYellow from "./Racing Yellow.png"
import iconRacingBlue from "./Racing Blue.png"
import iconWhiteAndBlack from "./White and Black.png"
import iconRedAndBlack from "./Red and Black.png"
import iconBlackAndSilver from "./Black and Silver.png"
import iconBlueAndWhite from "./Blue and White.png"
import iconGrayAndBlack from "./Gray and Black.png"

/* set up the image map */
let optionImages = new Map();
optionImages.set("Black",iconBlack);
optionImages.set("White",iconWhite);
optionImages.set("Orange on Gray",iconOrangeOnGray);
optionImages.set("Medium Blue",iconMediumBlue);
optionImages.set("Racing Red",iconRacingRed);
optionImages.set("Racing Yellow",iconRacingYellow);
optionImages.set("Racing Blue",iconRacingBlue);
optionImages.set("White and Black",iconWhiteAndBlack);
optionImages.set("Red and Black",iconRedAndBlack);
optionImages.set("Black and Silver",iconBlackAndSilver);
optionImages.set("Blue and White",iconBlueAndWhite);
optionImages.set("Gray and Black",iconGrayAndBlack);

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
                        {name:"Black", value: {
                                name: "Black",
                                colors: [
                                    ["tickClr", "white"],
                                    ["subMinTickClr", "white"],
                                    ["fiveMinOuterClr", "white"],
                                    ["fiveMinMiddleClr", "white"],
                                    ["fiveMinInnerClr", "white"],
                                    ["quarterHourClr", "white"],
                                    ["minHandClr", "white"],
                                    ["secHandClr", "white"],
                                    ["handDotClr", "#888888"],
                                    ["faceClr", "black"],
                                    ["bezelClr", "#444444"],
                                    ["miniHandLClr", "white"],
                                    ["miniHandRClr", "white"],
                                    ["miniHandBClr", "white"],
                                    ["miniBezelClr", "#cccccc"],
                                    ["miniDialClr", "#111111"],
                                    ["miniTickClr", "white"],
                                    ["miniDialEdgeClr", "white"],
                                    ["miniDialTextClr", "white"],
                                    ["dateTextClr", "white"],
                                    ["dateBgClr", "black"],
                                    ["hrFatBurnClr", "#bbbbbb"],
                                    ["hrCardioClr", "#dddddd"],
                                    ["hrPeakClr", "#bbbbbb"],
                                    ["statsIconClr", "white"],
                                    ["statsTextClr", "white"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",1],
                                    ["fiveMinMiddleClr",1],
                                    ["fiveMinOuterClr",0],
                                    ["quarterHourClr", 1],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 0],
                                    ["miniDialEdgeClr", 0.5]
                                ]
                            }
                        },
                        {name:"White", value: {
                                name: "White",
                                colors: [
                                    ["tickClr", "black"],
                                    ["subMinTickClr", "black"],
                                    ["fiveMinOuterClr", "#111111"],
                                    ["fiveMinMiddleClr", "#111111"],
                                    ["fiveMinInnerClr", "#111111"],
                                    ["quarterHourClr", "#111111"],
                                    ["minHandClr", "black"],
                                    ["secHandClr", "black"],
                                    ["handDotClr", "#888888"],
                                    ["faceClr", "white"],
                                    ["bezelClr", "#dddddd"],
                                    ["miniHandLClr", "#111111"],
                                    ["miniHandRClr", "#111111"],
                                    ["miniHandBClr", "#111111"],
                                    ["miniBezelClr", "#cccccc"],
                                    ["miniDialClr", "#f0f0f0"],
                                    ["miniTickClr", "black"],
                                    ["miniDialEdgeClr", "black"],
                                    ["miniDialTextClr", "black"],
                                    ["dateTextClr", "black"],
                                    ["dateBgClr", "#dddddd"],
                                    ["hrFatBurnClr", "#bbbbbb"],
                                    ["hrCardioClr", "#dddddd"],
                                    ["hrPeakClr", "#bbbbbb"],
                                    ["statsIconClr", "#111111"],
                                    ["statsTextClr", "#111111"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",0],
                                    ["fiveMinMiddleClr",1],
                                    ["fiveMinOuterClr",1],
                                    ["quarterHourClr", 0],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 0],
                                    ["miniDialEdgeClr", 0.7]
                                ]
                            }
                        },
                        {name:"Orange on Gray", value: {
                                name: "Orange on Gray",
                                colors: [
                                    ["tickClr", "#c7c7c7"],
                                    ["subMinTickClr", "#b8b8b8"],
                                    ["fiveMinOuterClr", "#f47c47"],
                                    ["fiveMinMiddleClr", ""],
                                    ["fiveMinInnerClr", "#b8b8b8"],
                                    ["quarterHourClr", "#f47c47"],
                                    ["minHandClr", "white"],
                                    ["secHandClr", "#f47c47"],
                                    ["handDotClr", "black"],
                                    ["faceClr", "#505050"],
                                    ["bezelClr", "#6f1a21"],
                                    ["miniHandLClr", "white"],
                                    ["miniHandRClr", "#f47c47"],
                                    ["miniHandBClr", "#f47c47"],
                                    ["miniBezelClr", "#6f1a21"],
                                    ["miniDialClr", "#484848"],
                                    ["miniDialEdgeClr", "black"],
                                    ["miniTickClr", "#c7c7c7"],
                                    ["miniDialTextClr", "#c7c7c7"],
                                    ["dateTextClr", "black"],
                                    ["dateBgClr", "#a0a0a0"],
                                    ["hrFatBurnClr", "green"],
                                    ["hrCardioClr", "goldenrod"],
                                    ["hrPeakClr", "firebrick"],
                                    ["statsIconClr", "#f47c47"],
                                    ["statsTextClr", "#c7c7c7"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",1],
                                    ["fiveMinMiddleClr",0],
                                    ["fiveMinOuterClr",1],
                                    ["quarterHourClr", 1],
                                    ["mainHandArrow", 0],
                                    ["miniHandArrow", 0],
                                    ["miniDialEdgeClr", 0.7]
                                ]}
                        },
                        {name:"Medium Blue", value: {
                                name: "Medium Blue",
                                colors: [
                                    ["tickClr", "white"],
                                    ["subMinTickClr", "white"],
                                    ["fiveMinOuterClr", "white"],
                                    ["fiveMinMiddleClr", "white"],
                                    ["fiveMinInnerClr", "white"],
                                    ["quarterHourClr", "white"],
                                    ["minHandClr", "white"],
                                    ["secHandClr", "white"],
                                    ["handDotClr", "black"],
                                    ["faceClr", "#013153"],
                                    ["bezelClr", "#025996"],
                                    ["miniHandLClr", "white"],
                                    ["miniHandRClr", "white"],
                                    ["miniHandBClr", "white"],
                                    ["miniBezelClr", "#025996"],
                                    ["miniDialClr", "#012742"],
                                    ["miniDialEdgeClr", "black"],
                                    ["miniTickClr", "#c7c7c7"],
                                    ["miniDialTextClr", "white"],
                                    ["dateTextClr", "white"],
                                    ["dateBgClr", "#011c30"],
                                    ["hrFatBurnClr", "green"],
                                    ["hrCardioClr", "goldenrod"],
                                    ["hrPeakClr", "firebrick"],
                                    ["statsIconClr", "white"],
                                    ["statsTextClr", "white"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",1],
                                    ["fiveMinMiddleClr",1],
                                    ["fiveMinOuterClr",1],
                                    ["quarterHourClr", 1],
                                    ["mainHandArrow", 0],
                                    ["miniHandArrow", 0],
                                    ["miniDialEdgeClr", 0.7]
                                ]}
                        },
                        {
                            name: "Racing Red", value: {
                                name: "Racing Red",
                                colors: [
                                    ["tickClr", "black"],
                                    ["subMinTickClr", "black"],
                                    ["fiveMinOuterClr", "white"],
                                    ["fiveMinMiddleClr", "#ebf8cf"],
                                    ["fiveMinInnerClr", "#ebf8cf"],
                                    ["quarterHourClr", "white"],
                                    ["minHandClr", "white"],
                                    ["secHandClr", "#f0f423"],
                                    ["handDotClr", "black"],
                                    ["faceClr", "#a51e18"],
                                    ["bezelClr", "lightgray"],
                                    ["miniHandLClr", "#f0f423"],
                                    ["miniHandRClr", "white"],
                                    ["miniHandBClr", "#f0f423"],
                                    ["miniBezelClr", "#701410"],
                                    ["miniDialClr", "#991c16"],
                                    ["miniDialEdgeClr", "black"],
                                    ["miniTickClr", "white"],
                                    ["miniDialTextClr", "white"],
                                    ["dateTextClr", "white"],
                                    ["dateBgClr", "#4f0e0b"],
                                    ["hrFatBurnClr", "green"],
                                    ["hrCardioClr", "goldenrod"],
                                    ["hrPeakClr", "firebrick"],
                                    ["statsIconClr", "white"],
                                    ["statsTextClr", "white"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",1],
                                    ["fiveMinMiddleClr", 1],
                                    ["fiveMinOuterClr", 0],
                                    ["quarterHourClr", 0],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 1],
                                    ["miniDialEdgeClr", 0.7]
                                ]
                            }
                        },
                        {name:"Racing Yellow", value: {
                                name: "Racing Yellow",
                                colors: [
                                    ["tickClr", "black"],
                                    ["subMinTickClr", "black"],
                                    ["fiveMinOuterClr", "white"],
                                    ["fiveMinMiddleClr", "#ebf8cf"],
                                    ["fiveMinInnerClr", "#ebf8cf"],
                                    ["quarterHourClr", "white"],
                                    ["minHandClr", "black"],
                                    ["secHandClr", "#731b0f"],
                                    ["handDotClr", "black"],
                                    ["faceClr", "#eae003"],
                                    ["bezelClr", "white"],
                                    ["miniHandLClr", "#731b0f"],
                                    ["miniHandRClr", "black"],
                                    ["miniHandBClr", "#731b0f"],
                                    ["miniBezelClr", "#731b0f"],
                                    ["miniDialClr", "#ded403"],
                                    ["miniDialEdgeClr", "black"],
                                    ["miniTickClr", "black"],
                                    ["miniDialTextClr", "black"],
                                    ["dateTextClr", "black"],
                                    ["dateBgClr", "#eae003"],
                                    ["hrFatBurnClr", "green"],
                                    ["hrCardioClr", "#ded403"],
                                    ["hrPeakClr", "firebrick"],
                                    ["statsIconClr", "black"],
                                    ["statsTextClr", "black"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",1],
                                    ["fiveMinMiddleClr",1],
                                    ["fiveMinOuterClr",0],
                                    ["quarterHourClr", 0],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 1],
                                    ["miniDialEdgeClr", 0.7]
                                ]
                            }
                        },
                        {name:"Racing Blue", value: {
                                name: "Racing Blue",
                                colors: [
                                    ["tickClr", "black"],
                                    ["subMinTickClr", "black"],
                                    ["fiveMinOuterClr", "white"],
                                    ["fiveMinMiddleClr", "white"],
                                    ["fiveMinInnerClr", "white"],
                                    ["quarterHourClr", "white"],
                                    ["minHandClr", "silver"],
                                    ["secHandClr", "#731b0f"],
                                    ["handDotClr", "black"],
                                    ["faceClr", "#062276"],
                                    ["bezelClr", "white"],
                                    ["miniHandLClr", "#731b0f"],
                                    ["miniHandRClr", "white"],
                                    ["miniHandBClr", "#731b0f"],
                                    ["miniBezelClr", "#eeeeee"],
                                    ["miniDialClr", "#062276"],
                                    ["miniDialEdgeClr", "black"],
                                    ["miniTickClr", "white"],
                                    ["miniDialTextClr", "white"],
                                    ["dateTextClr", "#062276"],
                                    ["dateBgClr", "#eeeeee"],
                                    ["hrFatBurnClr", "green"],
                                    ["hrCardioClr", "#ded403"],
                                    ["hrPeakClr", "firebrick"],
                                    ["statsIconClr", "white"],
                                    ["statsTextClr", "white"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",1],
                                    ["fiveMinMiddleClr",1],
                                    ["fiveMinOuterClr",0],
                                    ["quarterHourClr", 0],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 1],
                                    ["miniDialEdgeClr", 0.7]
                                ]
                            }
                        },
                        {name:"White and Black", value: {
                                name: "White and Black",
                                colors: [
                                    ["tickClr", "black"],
                                    ["subMinTickClr", "black"],
                                    ["fiveMinOuterClr", "black"],
                                    ["fiveMinMiddleClr", "#111111"],
                                    ["fiveMinInnerClr", "#111111"],
                                    ["quarterHourClr", "#111111"],
                                    ["minHandClr", "#555555"],
                                    ["secHandClr", "#941212"],
                                    ["handDotClr", "black"],
                                    ["faceClr", "white"],
                                    ["bezelClr", "#cccccc"],
                                    ["miniHandLClr", "white"],
                                    ["miniHandRClr", "#941212"],
                                    ["miniHandBClr", "#941212"],
                                    ["miniBezelClr", "#222222"],
                                    ["miniDialClr", "black"],
                                    ["miniTickClr", "white"],
                                    ["miniDialEdgeClr", "#888888"],
                                    ["miniDialTextClr", "white"],
                                    ["dateTextClr", "white"],
                                    ["dateBgClr", "#222222"],
                                    ["hrFatBurnClr", "green"],
                                    ["hrCardioClr", "goldenrod"],
                                    ["hrPeakClr", "firebrick"],
                                    ["statsIconClr", "#941212"],
                                    ["statsTextClr", "black"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",1],
                                    ["fiveMinMiddleClr",1],
                                    ["fiveMinOuterClr",0],
                                    ["quarterHourClr", 0],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 1],
                                    ["miniDialEdgeClr", 0.7]
                                ]
                            }
                        },
                        {name:"Red and Black", value: {
                                name: "Red and Black",
                                colors: [
                                    ["tickClr", "white"],
                                    ["subMinTickClr", "white"],
                                    ["fiveMinOuterClr", "#dddddd"],
                                    ["fiveMinMiddleClr", "#dddddd"],
                                    ["fiveMinInnerClr", "#dddddd"],
                                    ["quarterHourClr", "#dddddd"],
                                    ["minHandClr", "white"],
                                    ["secHandClr", "white"],
                                    ["handDotClr", "black"],
                                    ["faceClr", "#941212"],
                                    ["bezelClr", "black"],
                                    ["miniHandLClr", "white"],
                                    ["miniHandRClr", "white"],
                                    ["miniHandBClr", "white"],
                                    ["miniBezelClr", "#222222"],
                                    ["miniDialClr", "black"],
                                    ["miniTickClr", "white"],
                                    ["miniDialEdgeClr", "#888888"],
                                    ["miniDialTextClr", "white"],
                                    ["dateTextClr", "white"],
                                    ["dateBgClr", "#222222"],
                                    ["hrFatBurnClr", "green"],
                                    ["hrCardioClr", "goldenrod"],
                                    ["hrPeakClr", "firebrick"],
                                    ["statsIconClr", "white"],
                                    ["statsTextClr", "white"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",1],
                                    ["fiveMinMiddleClr",1],
                                    ["fiveMinOuterClr",0],
                                    ["quarterHourClr", 0],
                                    ["mainHandArrow", 0],
                                    ["miniHandArrow", 0],
                                    ["miniDialEdgeClr", 0.7]
                                ]
                            }
                        },
                        {name:"Black and Silver", value: {
                                name: "Black and Silver",
                                colors: [
                                    ["tickClr", "white"],
                                    ["subMinTickClr", "white"],
                                    ["fiveMinOuterClr", "#dddddd"],
                                    ["fiveMinMiddleClr", "#dddddd"],
                                    ["fiveMinInnerClr", "#dddddd"],
                                    ["quarterHourClr", "#dddddd"],
                                    ["minHandClr", "white"],
                                    ["secHandClr", "#eeeeee"],
                                    ["handDotClr", "#888888"],
                                    ["faceClr", "black"],
                                    ["bezelClr", "#444444"],
                                    ["miniHandLClr", "black"],
                                    ["miniHandRClr", "black"],
                                    ["miniHandBClr", "black"],
                                    ["miniBezelClr", "#eeeeee"],
                                    ["miniDialClr", "silver"],
                                    ["miniTickClr", "black"],
                                    ["miniDialEdgeClr", "#888888"],
                                    ["miniDialTextClr", "black"],
                                    ["dateTextClr", "black"],
                                    ["dateBgClr", "#dddddd"],
                                    ["hrFatBurnClr", "#eeeeee"],
                                    ["hrCardioClr", "#cccccc"],
                                    ["hrPeakClr", "#eeeeee"],
                                    ["statsIconClr", "white"],
                                    ["statsTextClr", "white"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",1],
                                    ["fiveMinMiddleClr",1],
                                    ["fiveMinOuterClr",0],
                                    ["quarterHourClr", 1],
                                    ["mainHandArrow", 0],
                                    ["miniHandArrow", 0],
                                    ["miniDialEdgeClr", 0.7]
                                ]
                            }
                        },
                        {name:"Blue and White", value: {
                                name: "Blue and White",
                                colors: [
                                    ["tickClr", "white"],
                                    ["subMinTickClr", "white"],
                                    ["fiveMinOuterClr", "white"],
                                    ["fiveMinMiddleClr", "white"],
                                    ["fiveMinInnerClr", "white"],
                                    ["quarterHourClr", "white"],
                                    ["minHandClr", "silver"],
                                    ["secHandClr", "silver"],
                                    ["handDotClr", "black"],
                                    ["faceClr", "#013153"],
                                    ["bezelClr", "#025996"],
                                    ["miniHandLClr", "silver"],
                                    ["miniHandRClr", "silver"],
                                    ["miniHandBClr", "silver"],
                                    ["miniBezelClr", "#eeeeee"],
                                    ["miniDialClr", "white"],
                                    ["miniTickClr", "black"],
                                    ["miniDialEdgeClr", "#eeeeee"],
                                    ["miniDialTextClr", "black"],
                                    ["dateTextClr", "black"],
                                    ["dateBgClr", "#eeeeee"],
                                    ["hrFatBurnClr", "#dddddd"],
                                    ["hrCardioClr", "#bbbbbb"],
                                    ["hrPeakClr", "#dddddd"],
                                    ["statsIconClr", "white"],
                                    ["statsTextClr", "white"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",0],
                                    ["fiveMinMiddleClr",1],
                                    ["fiveMinOuterClr",1],
                                    ["quarterHourClr", 1],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 0],
                                    ["miniDialEdgeClr", 0.7]
                                ]
                            }
                        },
                        {name:"Gray and Black", value: {
                                name: "Gray and Black",
                                colors: [
                                    ["tickClr", "white"],
                                    ["subMinTickClr", "white"],
                                    ["fiveMinOuterClr", "#fde602"],
                                    ["fiveMinMiddleClr", "white"],
                                    ["fiveMinInnerClr", "white"],
                                    ["quarterHourClr", "#fde602"],
                                    ["minHandClr", "white"],
                                    ["secHandClr", "#fde602"],
                                    ["handDotClr", "black"],
                                    ["faceClr", "#787878"],
                                    ["bezelClr", "black"],
                                    ["miniHandLClr", "white"],
                                    ["miniHandRClr", "#fde602"],
                                    ["miniHandBClr", "#fde602"],
                                    ["miniBezelClr", "#eeeeee"],
                                    ["miniDialClr", "#222222"],
                                    ["miniTickClr", "white"],
                                    ["miniDialEdgeClr", "#fde602"],
                                    ["miniDialTextClr", "white"],
                                    ["dateTextClr", "#fde602"],
                                    ["dateBgClr", "#111111"],
                                    ["hrFatBurnClr", "green"],
                                    ["hrCardioClr", "#fde602"],
                                    ["hrPeakClr", "firebrick"],
                                    ["statsIconClr", "#fde602"],
                                    ["statsTextClr", "white"]
                                ],
                                opacities: [
                                    ["fiveMinInnerClr",1],
                                    ["fiveMinMiddleClr",0],
                                    ["fiveMinOuterClr",1],
                                    ["quarterHourClr", 1],
                                    ["mainHandArrow", 1],
                                    ["miniHandArrow", 0],
                                    ["miniDialEdgeClr", 1]
                                ]
                            }
                        }
                    ]}
                    renderItem={
                        (option) =>
                            <TextImageRow
                                label={option.name}
                                sublabel=""
                                icon={optionImages.get(option.name)}
                            />
                    }
                    /* onSelection={(selection) => console.log(selection.selected[0])} */
                />
            </Section>
        </Page>
    );
}

registerSettingsPage(mySettings);
