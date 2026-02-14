import * as pdfjs from 'pdfjs-dist';

// Set worker source for pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const getApiKey = () => {
    return localStorage.getItem('VITE_MISTRAL_API_KEY') || import.meta.env.VITE_MISTRAL_API_KEY;
};

export const setMistralApiKey = (key) => {
    localStorage.setItem('VITE_MISTRAL_API_KEY', key);
};

/**
 * Extracts text from a PDF file using pdfjs-dist.
 */
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        text += strings.join(" ") + "\n";
    }

    return text;
}

/**
 * Converts a file to base64 for vision models if needed.
 */
async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

/**
 * Analyzes files and answers a prompt using Mistral AI.
 * @param {File[]} files - Actual File objects from browser upload
 * @param {string} prompt - User question
 */
export async function analyzeWithMistral(files, prompt) {
    const API_KEY = getApiKey();

    if (!API_KEY) {
        throw new Error("Invalid or missing Mistral API Key. Please click the Settings icon in the chat to set your key.");
    }

    console.log(`Attempting analysis with Mistral AI`);

    const messages = [
        {
            role: "system",
            content: "You are a helpful assistant that analyzes documents and text. Extract key information and answer user queries accurately based on the provided content."
        }
    ];

    let combinedPrompt = prompt;
    const contents = [];

    if (files && files.length > 0) {
        for (const file of files) {
            if (file.type === 'application/pdf') {
                const pdfText = await extractTextFromPDF(file);
                combinedPrompt += `\n\n[Content from PDF: ${file.name}]\n${pdfText}`;
            } else if (file.type.startsWith('image/')) {
                // Mistral supports vision in some models like 'pixtral-12b-2409'
                const base64 = await fileToBase64(file);
                contents.push({
                    type: "image_url",
                    image_url: `data:${file.type};base64,${base64}`
                });
            } else {
                combinedPrompt += `\n\n[Uploaded File: ${file.name} (${file.type})] - I will attempt to analyze this file based on its description.`;
            }
        }
    }

    // Mistral API structure for multimodal (similar to OpenAI)
    const userMessageContent = contents.length > 0 ? [
        { type: "text", text: combinedPrompt },
        ...contents
    ] : combinedPrompt;

    messages.push({
        role: "user",
        content: userMessageContent
    });

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: contents.length > 0 ? "pixtral-12b-2409" : "mistral-large-latest",
                messages: messages,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Mistral API Error Response:", errorData);
            throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error("Mistral Request Error:", error);
        throw error;
    }
}
