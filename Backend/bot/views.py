import google.generativeai as genai
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pypdf import PdfReader 
import io

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash') 


CHAT_SESSIONS = {}

def extract_pdf_text(file_obj):
    """Helper function to extract text from a PDF file using modern pypdf."""
    reader = PdfReader(file_obj)
    text = "".join(page.extract_text() + "\n" for page in reader.pages if page.extract_text())
    return text

@api_view(['POST'])
def reset_chat(request):
    """Endpoint to clear context for a specific chat ID (Triggered by 'New Chat' button)."""
    chat_id = request.data.get('chatId')
    if chat_id in CHAT_SESSIONS:
        del CHAT_SESSIONS[chat_id] 
    return Response({"status": "success", "message": "Context reset."})

@api_view(['POST'])
def chat_endpoint(request):
    """Main endpoint handling text, file uploads, and Gemini API interaction."""
    
    chat_id = request.POST.get('chatId', 'default_session')
    user_text = request.POST.get('text', '')
    uploaded_files = request.FILES.getlist('files')

    if chat_id not in CHAT_SESSIONS:
        CHAT_SESSIONS[chat_id] = {
            "history": "",
            "document_text": ""
        }
    
    session = CHAT_SESSIONS[chat_id]
    
    gemini_contents = [] 

    for file in uploaded_files:
        file_name = file.name.lower()
        
        if file_name.endswith('.pdf'):
            extracted = extract_pdf_text(file)
            session["document_text"] += f"\n--- Content from {file.name} ---\n{extracted}\n"
        
        elif file_name.endswith('.txt'):
            extracted = file.read().decode('utf-8')
            session["document_text"] += f"\n--- Content from {file.name} ---\n{extracted}\n"
            
        elif file_name.endswith(('.png', '.jpg', '.jpeg')):
            image_data = file.read()
            gemini_contents.append({
                "mime_type": file.content_type,
                "data": image_data
            })

    full_text_prompt = f"""
    Background Document Context (if any):
    {session['document_text']}
    
    Previous Conversation History:
    {session['history']}
    
    Current User Message:
    {user_text}
    Please generate a helpful and relevant response based on the above information and structure it to show in a message bubble in the chat interface.
    """
    
    gemini_contents.append(full_text_prompt)

    try:
        response = model.generate_content(gemini_contents)
        bot_reply = response.text
        
        session['history'] += f"User: {user_text}\nBot: {bot_reply}\n"
        
        return Response({
            "status": "success", 
            "reply": bot_reply
        })
        
    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=500)