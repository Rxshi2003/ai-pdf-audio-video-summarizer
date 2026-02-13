# AI PDF, Audio & Video Summarizer

A premium, purely frontend-based web application that leverages Google's **Gemini 2.0 Flash** to provide deep insights and summaries from multiple file formats.

## 🚀 Key Features
- **Multimodal Support**: Analyze PDFs, Videos, Audio files, and Images (including PSDs).
- **Pure Frontend Architecture**: No backend server required. All logic runs in the browser.
- **Client-Side Authentication**: Secure session management and user accounts using `localStorage`.
- **API Key Management**: Set and persist your Gemini API key directly through the chat interface.
- **Premium UI/UX**: Modern glassmorphism design with fluid animations and responsive layouts.
- **Context-Aware Chat**: Chat with the AI about multiple uploaded files simultaneously.

## 🛠️ Tech Stack
- **Framework**: React + Vite
- **Styling**: Vanilla CSS (Custom tokens & animations)
- **AI Engine**: Google Gemini 2.0 Flash (via Direct API Integration)
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rxshi2003/ai-pdf-audio-video-summarizer.git
   cd ai-pdf-audio-video-summarizer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment (Optional)**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
   *Note: You can also set the API key directly within the app's chat settings.*

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📖 Usage
1. **Sign Up / Login**: Create a local account to access the dashboard.
2. **Set API Key**: Click the Settings (cog) icon in the chat header to enter your Gemini API key if you haven't set it via `.env`.
3. **Upload Files**: Drag and drop or click to upload PDFs, Videos, or Audio files.
4. **Chat & Analyze**: Ask the AI questions about your files in the chat panel.

## 🔒 Security
- **Local Storage**: All user data and API keys are stored only in your browser's local storage.
- **Zero Backend**: No data is sent to any external server except Google's Gemini API.

## 📄 License
MIT License
