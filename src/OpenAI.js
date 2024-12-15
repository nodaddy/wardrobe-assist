import OpenAI from "openai";
import axios from 'axios';

// Replace with your actual OpenAI API key
const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;

const openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
    organization: "org-jkBqACiLqgRU8flgdZdYsOio",
    project: process.env.REACT_APP_OPEN_AI_PROJECT_I,
});

// Method to call the OpenAI API
export const fetchChatCompletion = async (message) => {
  const url = 'https://api.openai.com/v1/chat/completions';

  console.log(message);

  try {
    const response = await axios.post(
      url,
      {
        model: 'gpt-4o-mini',
        messages: [
        {role: "system", content: "you are a wardrobe assistant,  never suggest anything other than the available items in the wardrobe, help people with that, if anyone asks anytning other than wardrobe or clothing or styling or fashion realted things, tell them that this is not the right place to discuss that, always talk like you are an expert on styling and clothing,"},
        {
            role: "user",
            content: message
        }
      ],

        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    ).then(response => response.data).catch(error => {
          console.error('Error fetching chat completion:', error);
          throw error;
        });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching chat completion:', error);
    throw error;
  }
};
