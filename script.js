// Enhanced JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking
            if(navbar.classList.contains('active')) {
                menu.classList.remove('fa-times');
                navbar.classList.remove('active');
            }
        });
    });

    // Form submission handling
    const form = document.getElementById('ecgForm');
    const loader = document.getElementById('loader');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('ecgFile');
        
        if(fileInput.files.length > 0) {
            loader.style.display = 'block';
            // Simulate API call
            setTimeout(() => {
                loader.style.display = 'none';
                alert('Analysis complete! Check your results.');
            }, 3000);
        }
    });

    // File input feedback
    document.getElementById('ecgFile').addEventListener('change', function() {
        const fileName = this.files[0] ? this.files[0].name : 'Choose CSV File';
        document.querySelector('.file-label').textContent = fileName;
    });
});

// Existing menu functionality remains
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbot = document.getElementById('close-chatbot');

    chatbotButton.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Chatbot message handling
    document.getElementById('send-btn').addEventListener('click', sendMessage);
    document.getElementById('user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    let context = "I want minimal responses. Maintain a consistent conversation flow and mostly refer to medical responses.";

    function sendMessage() {
        const userInput = document.getElementById('user-input').value.trim();
        if (!userInput) return;

        appendMessage('user', `\u{1F464} ${userInput}`);
        document.getElementById('user-input').value = '';
        document.getElementById('loading').style.display = 'block';

        // Use EventSource to stream the response from the Flask backend
        const eventSource = new EventSource(
            `/chat?user_input=${encodeURIComponent(userInput)}&context=${encodeURIComponent(context)}`
        );

        let botMessageElement = null; // Track the current bot message element

        // Accumulate incoming chunks in one message bubble
        eventSource.onmessage = function(event) {
            if (!event.data.trim()) return;
            document.getElementById('loading').style.display = 'none';
            if (!botMessageElement) {
                botMessageElement = appendMessage('bot', '\u{1F916} ');
            }
            botMessageElement.innerHTML += event.data;
        };

        eventSource.onerror = function() {
            eventSource.close();
            document.getElementById('loading').style.display = 'none';
        };
    }

    function appendMessage(sender, content) {
        const chatBox = document.getElementById('chat-box');
        const msgElem = document.createElement('div');
        msgElem.classList.add('message', `${sender}-message`);
        msgElem.innerHTML = content;
        chatBox.appendChild(msgElem);
        chatBox.scrollTop = chatBox.scrollHeight;
        return msgElem; // Return the element so we can modify it later
    }
});
