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
                <Text>Select one of twelve analog chronograph watch faces</Text>
                <Select
                    label="Click here to display a scrollable list of watch faces"
                    settingsKey="face"
                    options={[
                        {name:"Black", value: {
                                name: "Black",
                            }
                        },
                        {name:"White", value: {
                                name: "White",
                            }
                        },
                        {name:"Orange on Gray", value: {
                                name: "Orange on Gray",
                            }
                        },
                        {name:"Medium Blue", value: {
                                name: "Medium Blue",
                            }
                        },
                        {name: "Racing Red", value: {
                                name: "Racing Red",
                            }
                        },
                        {name:"Racing Yellow", value: {
                                name: "Racing Yellow",
                            }
                        },
                        {name:"Racing Blue", value: {
                                name: "Racing Blue",
                            }
                        },
                        {name:"White and Black", value: {
                                name: "White and Black",
                            }
                        },
                        {name:"Red and Black", value: {
                                name: "Red and Black",
                            }
                        },
                        {name:"Black and Silver", value: {
                                name: "Black and Silver",
                            }
                        },
                        {name:"Blue and White", value: {
                                name: "Blue and White",
                            }
                        },
                        {name:"Gray and Black", value: {
                                name: "Gray and Black",
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
