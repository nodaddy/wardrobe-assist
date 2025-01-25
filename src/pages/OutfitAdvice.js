import { Banner } from "../components/Banner";
import { useState } from "react";
import { EyeFilled, MessageOutlined } from "@ant-design/icons";
import { fetchChatCompletion } from "../OpenAI";
import { getWardrobeItems } from "../services/wardrobeItems";
import { Loader } from "../components/Loader";
import OutfitPromptExamples from "../components/OutfitPromptsForAI";
import { assist } from "../assets";
import { useSpeechRecognition } from "react-speech-kit"; // Speech recognition library

export const OutfitAdvice = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loadingResponse, setLoadingResponse] = useState(false);
    const { listen, stop, supported } = useSpeechRecognition({
        onResult: (result) => {
            setQuery(result);
        },
    });

    const handleSubmit = () => {
        setLoadingResponse(true);
        getWardrobeItems().then((data) => {
            if (data) {
                data.items = data.items.map((item) => {
                    return {
                        wardrobeItemName: item?.name,
                        colourOrDesign: item?.colors,
                        category: item?.category,
                        type: item?.type,
                    };
                });
            }

            fetchChatCompletion(
                query +
                    `Keep the response under 70 words, I have the following things in my inventory: ${JSON.stringify(
                        data
                    )}, ${JSON.stringify(
                        data
                    )} and following are my details: ${localStorage.getItem(
                        "userProfile"
                    )}`
            )
                .then((data) => {
                    console.log(data);
                    setResponse(data);
                    setLoadingResponse(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingResponse(false);
                });
        });
    };

    return (
        <div
            style={{
                padding: "0px 30px",
                height: "calc(100vh - 78px)",
                overflowY: "auto",
                overflowX: "hidden",
            }}
        >
            <Banner icon={<MessageOutlined />} title="Outfit Assistant" />
            <br />
            <br />
            <img src={assist} style={{ width: "130px" }} />
            <br />
            <br />
            <br />
            <div align="right">
                <textarea
                    placeholder="Ask the assistant eg. What should I wear to the party tonight? the weather is cold and we might go out in the midnight"
                    value={query}
                    rows={3}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ borderRadius: "10px 10px 0px 0px", width: "100%", border: '0px' }}
                />
                {/* <div
                    align="left"
                    style={{
                        color: "white",
                        background: "#946d4c",
                        padding: "10px",
                        borderRadius: "0px 0px 10px 10px",
                        fontSize: "12px",
                    }}
                >
                    <EyeFilled style={{ color: "white" }} /> Make sure you have added
                    items to your wardrobe; the assistant works better that way.
                </div> */}
                <br />
                {supported ? (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <span style={{ marginRight: '15px', textAlign: "right", fontSize: "14px" }}>
            Press and <br /> hold to speak
        </span>
        <button
            style={{
                background: "linear-gradient(145deg, #3da9a8, #317e7e)", // Gradient effect for modern look
                color: "white",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Adds a subtle shadow
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s", // Smooth hover effect
            }}
            onMouseDown={() => listen()}
            onMouseUp={() => {
                stop();
                setTimeout(() => {
                    handleSubmit();
                }, 500);
            }}
            onTouchStart={() => listen()} // For mobile touch
            onTouchEnd={() => {
                stop();
                setTimeout(() => {
                    handleSubmit();
                }, 500);
            }} // For mobile touch
            onMouseOver={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.4)";
            }}
            onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
            }}
        >
            <span
                style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                }}
            ></span>
        </button>
    </div>
) : (
    <p>Speech recognition is not supported in this browser.</p>
)}

                {/* <button
                    style={{
                        background: "#3C9CA0",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "0px",
                        fontSize: "15px",
                        marginLeft: "10px",
                    }}
                    onClick={handleSubmit}
                >
                    Submit
                </button> */}
            </div>
            {
                <div align="left">
                    {loadingResponse ? (
                        <div align="center">
                            <Loader />
                        </div>
                    ) : response ? (
                        <>
                            <p
                                style={{
                                    padding: "10px",
                                    background: "#3C9CA0",
                                    color: "white",
                                    borderRadius: "10px",
                                }}
                            >
                                {response}
                            </p>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            }
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};