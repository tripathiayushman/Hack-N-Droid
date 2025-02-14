import ollama
import sys

def stream_response(model_name, context, question):
    print("Thinking...", end="", flush=True)

    messages = [{"role": "system", "content": context}, {"role": "user", "content": question}]
    stream = ollama.chat(model=model_name, messages=messages, stream=True)

    print("\rResponse: ", end="")  

    response_text = ""
    for chunk in stream:
        text = chunk['message']['content']
        sys.stdout.write(text)  
        sys.stdout.flush()  
          

    print()  
    return text  

def handle_conversation():
    print("Welcome to the chatbot! Type 'exit' to quit.")

    context = "i want minimal responcs .Maintain a consistent conversation flow. and mostly refer to medical responces"

    while True:
        user_input = input("\nYou: ")
        if user_input.lower() == "exit":
            break

        context += f"\nUser: {user_input}\nAI:"
        bot_response = stream_response("mistral", context, user_input)
        context += f" {bot_response}"

if __name__ == "__main__":
    handle_conversation()
