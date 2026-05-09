# Infollion Task: Minimal Gemini Chatbot

A minimal, web-based chatbot built with React and Django that integrates Google's Gemini API. This application supports text conversations, document uploads (PDF/TXT), and image uploads (PNG/JPG) while maintaining session-specific context.

---

## 🚀 Live Demo (Bonus Deliverable)

The application has been successfully deployed on a DigitalOcean Droplet using Nginx and Gunicorn.

- **Access the live app here:** http://139.59.15.215

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), CSS Flexbox
- **Backend:** Python, Django, Django REST Framework
- **AI Integration:** `google-generativeai` (Gemini 1.5 Flash)
- **File Parsing:** `pypdf`
- **Deployment:** DigitalOcean (Ubuntu), Nginx, Gunicorn

---

## 📂 Project Structure

```text
INFOLLION_TASK/
│
├── Backend/                 # Django Application
│   ├── bot/                 # Chat logic and API views
│   ├── chatbot_main/        # Core Django settings and routing
│   └── manage.py
│
└── Frontend/                # React Application
    └── Bot_frontend/
        ├── src/
        │   ├── components/  # ChatList, MainChatBox, ChatInputHandle
        │   ├── App.jsx
        │   ├── App.css
        │   └── index.css
        └── package.json
```

---

## 🔑 How to Set the Gemini API Key

To run this application locally, you must provide your own Google Gemini API key.

1. Get an API key from Google AI Studio.
2. Open the backend settings file:

```bash
Backend/chatbot_main/settings.py
```

3. Locate the `GEMINI_API_KEY` variable and replace the placeholder with your actual key:

```python
GEMINI_API_KEY = "your_actual_api_key_here"
```

---

# 💻 How to Run Locally

## 1. Backend Setup (Django)

Open a terminal and navigate to the Backend directory:

```bash
cd Backend
```

Create a virtual environment and activate it:

```bash
python -m venv venv
```

### On Windows

```bash
venv\Scripts\activate
```

### On Mac/Linux

```bash
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install django djangorestframework django-cors-headers google-generativeai pypdf
```

Start the development server:

```bash
python manage.py runserver
```

The backend will now be running on:

```text
http://localhost:8000
```

---

## 2. Frontend Setup (React)

Open a new terminal and navigate to the frontend directory:

```bash
cd Frontend/Bot_frontend
```

Install the Node dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will now be running on:

```text
http://localhost:5173
```

Open this link in your browser to use the app.

---

# 📝 Example Usage Steps

## Basic Text Chat

1. Type a message like:

```text
Hello, what can you do?
```

2. Hit **Send**.
3. The bot will respond using the Gemini 1.5 Flash model.

---

## Document Q&A

1. Click the **+** button next to the chat input.
2. Select a `.pdf` or `.txt` file.
3. A preview badge will appear above the input box.
4. Type a prompt like:

```text
Summarize this document
```

5. Click **Send**.
6. Ask follow-up questions like:

```text
What was the second point mentioned?
```

The bot will remember the uploaded document context within the current session.

---

## Image Q&A

1. Click the **+** button and upload a `.png` or `.jpg` image.
2. An image preview thumbnail will appear.
3. Type:

```text
Describe what is in this image
```

4. Hit **Send**.

The bot will analyze the image and return a description.

---

## Context Reset (New Chat)

1. Click the **New Chat** button in the top right corner.
2. The main chat screen will clear and a new session will be created in the sidebar.
3. If you ask:

```text
What did I just upload?
```

The bot will have no memory of the previous conversation or uploaded files, demonstrating successful context isolation.

---

# ✅ Features Implemented

- Text-based chatbot using Gemini API
- PDF and TXT document upload support
- Image upload and analysis support
- Session-specific chat memory
- Multiple chat sessions
- Responsive UI using React
- Django REST API backend
- File preview support
- Context isolation with New Chat
- Live deployment on DigitalOcean

---

# 📌 Notes

- Ensure that your Gemini API key is valid before running the backend.
- Uploaded files are processed temporarily during the active chat session.
- The application uses Gemini 1.5 Flash for fast responses and multimodal support.

---

# 👨‍💻 Author

Developed as part of the Infollion Full Stack Developer Task Submission.