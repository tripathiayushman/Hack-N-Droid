let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
// Chatbot functionality
const chatbotButton = document.createElement('div');
chatbotButton.className = 'chatbot-button';
chatbotButton.innerHTML = '<i class="fas fa-comment-medical"></i>';
document.body.appendChild(chatbotButton);

const chatWindow = document.createElement('div');
chatWindow.className = 'chat-window';
chatWindow.innerHTML = `
    <div class="chat-header">
        <h3>MedCare Assistant</h3>
        <span class="close-chat fas fa-times"></span>
    </div>
    <div class="chat-messages"></div>
    <div class="chat-input">
        <input type="text" placeholder="Type your message...">
        <button class="btn send-btn"><i class="fas fa-paper-plane"></i></button>
    </div>
`;
document.body.appendChild(chatWindow);

// Chatbot toggling
chatbotButton.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
});

document.querySelector('.close-chat').addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

// Message handling
document.querySelector('.send-btn').addEventListener('click', sendMessage);
document.querySelector('.chat-input input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = document.querySelector('.chat-input input');
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    
    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
        addMessage('Thank you for your message. Our team will respond shortly.', 'bot');
    }, 1000);

    input.value = '';
}

function addMessage(text, sender) {
    const messagesContainer = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
}