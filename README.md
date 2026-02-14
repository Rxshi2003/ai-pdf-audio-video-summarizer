# AI PDF, Audio & Video Summarizer

A premium, purely frontend-based web application that leverages **Mistral AI** to provide deep insights and summaries from multiple file formats.

## 🚀 Key Features
- **Multimodal Support**: Analyze PDFs, Videos, Audio files, and Images (including PSDs).
- **Pure Frontend Architecture**: No backend server required. All logic runs in the browser.
- **Inbuild API Key Configuration**: Securely sourced from environment variables for a seamless experience.
- **Client-Side Authentication**: Secure session management and user accounts using `localStorage`.
- **Structured Plain Text Responses**: Clean, symbol-free answers using numbered headings for clarity.
- **Premium UI/UX**: Modern glassmorphism design with fluid animations and responsive layouts.
- **Context-Aware Chat**: Chat with the AI about multiple uploaded files simultaneously.

## 🛠️ Tech Stack
- **Framework**: React + Vite
- **Styling**: Vanilla CSS (Custom tokens & animations)
- **AI Engine**: Mistral AI (mistral-large-latest / pixtral-12b-2409)
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

3. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   VITE_MISTRAL_API_KEY=your_mistral_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📖 Usage
1. **Sign Up / Login**: Create a local account to access the dashboard.
2. **Upload Files**: Drag and drop or click to upload PDFs, Videos, or Audio files.
3. **Chat & Analyze**: Ask the AI questions about your files. The assistant will provide structured, plain-text answers using numbered points for main headings.

## 🔒 Security
- **Local Storage**: All user data is stored only in your browser's local storage.
- **Direct API Integration**: Your API key is used directly from the environment to communicate with Mistral AI.
- **Zero Backend**: No data is sent to any external server except Mistral AI's API.

## 📄 License
MIT License
