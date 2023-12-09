from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import openai
from openai import OpenAI
import speech_recognition as sr
from pydub import AudioSegment
import requests

# Load environment variables from .env file
load_dotenv()

# Set your OpenAI API key
# openai.api_key = os.environ.get('OPENAI_API_KEY')
client = OpenAI(
  api_key=os.environ.get("OPENAI_API_KEY"),
)

app = Flask(__name__)

def generate_summary(text_input):
    
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an educational assistant, skilled in explaining the blockchain's DAO concepts."},
            {"role": "user", "content": text_input + " create a summary of this transcript"}
        ]
    )

    print(completion.choices[0].message.content)

    generated_response = completion.choices[0].message.content
    return generated_response

def generate_response(text_input, query):
    
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an educational assistant, skilled in explaining the blockchain's DAO concepts."},
            {"role": "user", "content": text_input + query}
        ]
    )

    print(completion.choices[0].message.content)

    generated_response = completion.choices[0].message.content
    return generated_response

def transcribe_video_from_url(video_url):
    # Download the video from the URL
    video_data = requests.get(video_url).content

    # Save the video data to a file
    video_file_path = "video.mp4"
    with open(video_file_path, "wb") as video_file:
        video_file.write(video_data)

    # Convert the video to WAV format
    video = AudioSegment.from_file(video_file_path, format="mp4")
    audio = video.set_channels(1).set_frame_rate(16000).set_sample_width(2)
    audio.export("audio.wav", format="wav")

    # Initialize recognizer class (for recognizing the speech)
    r = sr.Recognizer()

    # Open the audio file
    with sr.AudioFile("audio.wav") as source:
        audio_text = r.record(source)

    # Recognize the speech in the audio
    text = r.recognize_google(audio_text, language='en-US')

    # Remove the temporary files
    os.remove(video_file_path)
    os.remove("audio.wav")

    # Return the transcribed text
    return text


@app.route('/api/transcribe', methods=['POST'])
def transcribe_video_api():
    # Get the video URL from the request
    video_url = request.json.get('video_url')

    try:
        # Transcribe the video
        transcript = transcribe_video_from_url(video_url)

        # Generate response using OpenAI GPT-3
        

        # Return the transcript and summary as JSON
        return jsonify({
            'video_transcript': transcript,
            
        })

    except Exception as e:
        # Return an error message if an exception occurs
        return jsonify({
            'error': str(e)
        })
    
@app.route('/api/summarize', methods=['POST'])
def summarize_video_api():
    # Get the video URL from the request
    video_url = request.json.get('video_url')

    try:
        # Transcribe the video
        transcript = transcribe_video_from_url(video_url)

        # Generate response using OpenAI GPT-3
        summary = generate_summary(transcript)

        # Return the transcript and summary as JSON
        return jsonify({
            'video_transcript': transcript,
            'video_summary': summary,
        })

    except Exception as e:
        # Return an error message if an exception occurs
        return jsonify({
            'error': str(e)
        })
    
@app.route('/api/query', methods=['POST'])
def query_video_api():
    # Get the video URL from the request
    video_url = request.json.get('video_url')
    query = request.json.get('query')

    try:
        # Transcribe the video
        transcript = transcribe_video_from_url(video_url)

        # Generate response using OpenAI GPT-3
        response = generate_response(transcript, query)

        # Return the transcript and summary as JSON
        return jsonify({
            'video_transcript': transcript,
            'video_summary': response,
        })

    except Exception as e:
        # Return an error message if an exception occurs
        return jsonify({
            'error': str(e)
        })


if __name__ == '__main__':
    app.run(debug=True)
