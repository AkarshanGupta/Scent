// // IMPORTANT: Replace this with your actual Gemini API key
// const GEMINI_API_KEY = "AIzaSyB3IBXamQb0E1Z5BCBgrAioVYLG6xIWuhw";
// const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// export interface GeneratedScent {
//   name: string;
//   topNotes: string[];
//   middleNotes: string[];
//   baseNotes: string[];
//   ingredients: { name: string; percentage: string }[];
//   description: string;
// }

// export const generateScent = async (description: string): Promise<GeneratedScent | null> => {
//   // Check if API key is set
//   if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
//     console.warn('Gemini API key not set. Using mock data.');
//     return null;
//   }

//   try {
//     const requestBody = {
//       contents: [{
//         parts: [{
//           text: `You are a master perfumer. Create a detailed perfume formula for: "${description}". 

// Return ONLY a valid JSON object with this exact structure (no markdown, no explanations, no extra text):

// {
//   "name": "A creative and appealing perfume name",
//   "topNotes": ["note1", "note2", "note3"],
//   "middleNotes": ["note1", "note2", "note3"], 
//   "baseNotes": ["note1", "note2", "note3"],
//   "ingredients": [
//     {"name": "ingredient name", "percentage": "X%"},
//     {"name": "ingredient name", "percentage": "X%"},
//     {"name": "ingredient name", "percentage": "X%"},
//     {"name": "ingredient name", "percentage": "X%"},
//     {"name": "ingredient name", "percentage": "X%"}
//   ],
//   "description": "A detailed, evocative description of how this fragrance smells, its character, and the experience of wearing it"
// }

// Make sure the percentages add up to a realistic total (15-50% total concentration). Use real perfume ingredients and notes.`
//         }]
//       }],
//       generationConfig: {
//         temperature: 0.7,
//         topK: 40,
//         topP: 0.95,
//         maxOutputTokens: 1024,
//       }
//     };

//     const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody)
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('API Error Response:', errorText);
//       throw new Error(`API request failed: ${response.status} - ${errorText}`);
//     }

//     const data = await response.json();
//     console.log('API Response:', data);
    
//     if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
//       throw new Error('Invalid API response format');
//     }

//     const responseText = data.candidates[0].content.parts[0].text;
//     console.log('Raw API Response Text:', responseText);
    
//     // Clean the response text (remove markdown formatting if present)
//     const cleanedText = responseText
//       .replace(/```json/g, '')
//       .replace(/```/g, '')
//       .replace(/^[^{]*/, '') // Remove any text before the first {
//       .replace(/[^}]*$/, '') // Remove any text after the last }
//       .trim();
    
//     console.log('Cleaned Response Text:', cleanedText);
    
//     const parsedResult = JSON.parse(cleanedText);
//     console.log('Parsed Result:', parsedResult);
    
//     // Validate the response structure
//     if (!parsedResult.name || !parsedResult.topNotes || !parsedResult.middleNotes || 
//         !parsedResult.baseNotes || !parsedResult.ingredients || !parsedResult.description) {
//       throw new Error('Invalid response structure from API');
//     }

//     return parsedResult;
//   } catch (error) {
//     console.error('Detailed API Error:', error);
//     if (error instanceof Error) {
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     return null;
//   }
// };

// // Mock data for fallback when API is unavailable
// export const mockScentData: GeneratedScent = {
//   name: "Mystic Garden Breeze",
//   topNotes: ["Bergamot", "Sea Salt", "Green Apple"],
//   middleNotes: ["Jasmine", "Rose Petals", "Lily of the Valley"],
//   baseNotes: ["Sandalwood", "White Musk", "Amber"],
//   ingredients: [
//     { name: "Linalool", percentage: "18%" },
//     { name: "Limonene", percentage: "15%" },
//     { name: "Geraniol", percentage: "12%" },
//     { name: "Citronellol", percentage: "10%" },
//     { name: "Eugenol", percentage: "8%" }
//   ],
//   description: "A refreshing and sophisticated fragrance that opens with bright citrus and marine accords, blossoming into a heart of delicate white florals. The base provides warmth and depth with creamy sandalwood and clean musk, creating a scent that's both invigorating and comforting."
// };

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// Get API key from environment variables
const getApiKey = (): string | null => {
  return import.meta.env.VITE_GEMINI_API_KEY || null;
};

export interface GeneratedScent {
  name: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  ingredients: { name: string; percentage: string }[];
  description: string;
}

export const generateScent = async (description: string): Promise<GeneratedScent | null> => {
  const apiKey = getApiKey();
  
  // Check if API key is available
  if (!apiKey) {
    console.warn('No Gemini API key found in environment variables. Using mock data.');
    return null;
  }

  if (apiKey === 'your_gemini_api_key_here') {
    console.warn('Please replace the placeholder API key in .env file with your actual Gemini API key.');
    return null;
  }

  try {
    const requestBody = {
      contents: [{
        parts: [{
          text: `You are a master perfumer. Create a detailed perfume formula for: "${description}". 

Return ONLY a valid JSON object with this exact structure (no markdown, no explanations, no extra text):

{
  "name": "A creative and appealing perfume name",
  "topNotes": ["note1", "note2", "note3"],
  "middleNotes": ["note1", "note2", "note3"], 
  "baseNotes": ["note1", "note2", "note3"],
  "ingredients": [
    {"name": "ingredient name", "percentage": "X%"},
    {"name": "ingredient name", "percentage": "X%"},
    {"name": "ingredient name", "percentage": "X%"},
    {"name": "ingredient name", "percentage": "X%"},
    {"name": "ingredient name", "percentage": "X%"}
  ],
  "description": "A detailed, evocative description of how this fragrance smells, its character, and the experience of wearing it"
}

Make sure the percentages add up to a realistic total (15-50% total concentration). Use real perfume ingredients and notes.`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid API response format');
    }

    const responseText = data.candidates[0].content.parts[0].text;
    console.log('Raw API Response Text:', responseText);
    
    // Clean the response text (remove markdown formatting if present)
    const cleanedText = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/^[^{]*/, '') // Remove any text before the first {
      .replace(/[^}]*$/, '') // Remove any text after the last }
      .trim();
    
    console.log('Cleaned Response Text:', cleanedText);
    
    const parsedResult = JSON.parse(cleanedText);
    console.log('Parsed Result:', parsedResult);
    
    // Validate the response structure
    if (!parsedResult.name || !parsedResult.topNotes || !parsedResult.middleNotes || 
        !parsedResult.baseNotes || !parsedResult.ingredients || !parsedResult.description) {
      throw new Error('Invalid response structure from API');
    }

    return parsedResult;
  } catch (error) {
    console.error('Detailed API Error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return null;
  }
};

// Mock data for fallback when API is unavailable
export const mockScentData: GeneratedScent = {
  name: "Mystic Garden Breeze",
  topNotes: ["Bergamot", "Sea Salt", "Green Apple"],
  middleNotes: ["Jasmine", "Rose Petals", "Lily of the Valley"],
  baseNotes: ["Sandalwood", "White Musk", "Amber"],
  ingredients: [
    { name: "Linalool", percentage: "18%" },
    { name: "Limonene", percentage: "15%" },
    { name: "Geraniol", percentage: "12%" },
    { name: "Citronellol", percentage: "10%" },
    { name: "Eugenol", percentage: "8%" }
  ],
  description: "A refreshing and sophisticated fragrance that opens with bright citrus and marine accords, blossoming into a heart of delicate white florals. The base provides warmth and depth with creamy sandalwood and clean musk, creating a scent that's both invigorating and comforting."
};