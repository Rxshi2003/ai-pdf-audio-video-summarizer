const getApiKey = () => {
    return localStorage.getItem('VITE_GEMINI_API_KEY') || import.meta.env.VITE_GEMINI_API_KEY;
};

export const setGeminiApiKey = (key) => {
    localStorage.setItem('VITE_GEMINI_API_KEY', key);
};

/**
 * Converts a File object to a base64 string for the Gemini API.
 */
async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
    });

    return {
        inline_data: {
            data: await base64EncodedDataPromise,
            mime_type: file.type
        },
    };
}

/**
 * Analyzes files and answers a prompt using Gemini via manual fetch to the v1beta endpoint.
 * @param {File[]} files - Actual File objects from browser upload
 * @param {string} prompt - User question
 */
export async function analyzeWithGemini(files, prompt) {
    const API_KEY = getApiKey();

    if (!API_KEY || !API_KEY.startsWith('AIza')) {
        throw new Error("Invalid or missing Gemini API Key. Please click the Settings icon in the chat to set your key.");
    }
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    // Filter supported files
    const supportedTypes = ['application/pdf', 'video/', 'audio/', 'image/', 'application/x-photoshop', 'image/vnd.adobe.photoshop'];
    const validFiles = files ? files.filter(file =>
        supportedTypes.some(type => file.type.startsWith(type) || file.name.toLowerCase().endsWith('.psd'))
    ) : [];

    if (files && files.length > 0 && validFiles.length === 0) {
        throw new Error("No supported files found (PDF, Video, Audio, or Images are required).");
    }

    try {
        console.log(`Attempting analysis with Gemini 2.0 Flash`);

        const contents = [];
        const parts = [{ text: prompt }];

        if (validFiles.length > 0) {
            const fileParts = await Promise.all(validFiles.map(fileToGenerativePart));
            parts.push(...fileParts);
        }

        contents.push({ parts });

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contents }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error Response:", errorData);
            throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.warn("Unexpected Gemini API response structure:", data);
            return "I received an empty response from the AI. Please try again.";
        }
    } catch (error) {
        console.error("Request Error:", error);
        throw error;
    }
}
