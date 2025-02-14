from flask import Flask, render_template, request, jsonify, Response
import ollama
import sys

app = Flask(__name__)

def generate_stream_response(model_name, context, question):
    messages = [{"role": "system", "content": context}, {"role": "user", "content": question}]
    stream = ollama.chat(model=model_name, messages=messages, stream=True)

    for chunk in stream:
        text = chunk['message']['content']
        yield f"data: {text}\n\n"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['GET', 'POST'])  # Allow both GET and POST requests
def chat():
    if request.method == 'GET':
        # Handle GET request (for EventSource)
        user_input = request.args.get('user_input', '').strip()
        context = request.args.get('context', "I want minimal responses. Maintain a consistent conversation flow and mostly refer to medical responses.")
    else:
        # Handle POST request
        data = request.get_json(force=True)
        user_input = data.get('user_input', '').strip()
        context = data.get('context', "I want minimal responses. Maintain a consistent conversation flow and mostly refer to medical responses.")

    if not user_input:
        return jsonify({'response': 'Please enter a message.', 'context': context})

    return Response(generate_stream_response("mistral", context, user_input), content_type='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)