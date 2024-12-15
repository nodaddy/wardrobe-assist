import React from "react";

const OutfitPromptExamples = () => {
  const prompts = [
    "🎉 *Help me pick an outfit for a wedding as a guest.*",
    "🌟 *What’s the best outfit to make an impression on a first date?*",
    "🌦️ *What should I wear on a rainy day in Paris?*",
    "🌞 *Suggest an outfit for a sunny picnic with friends.*",
    "👔 *What’s a trendy business-casual look for my meeting tomorrow?*",
    "🧳 *I’m packing for a weekend trip to the mountains. What do I need?*",
    "🌙 *What’s a comfy yet stylish outfit for a cozy night in?*",
    "🎤 *What should I wear for my karaoke night with friends?*",
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h3 style={{ textAlign: "center", color: "#4C956C", marginBottom: "20px", fontWeight: '500' }}>
        💡 You can ask all things wardrobe, here are some examples
      </h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {prompts.map((prompt, index) => (
          <li
            key={index}
            style={{
              margin: "10px 0",
              padding: "10px 15px",
            //   border: "1px solid #D4A373",
              borderRadius: "7px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#FAF3E0",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", color: "#6D4C41" }}>
              {prompt}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutfitPromptExamples;
