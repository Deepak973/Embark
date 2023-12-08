from flask import Flask, request, jsonify
import openai
from lighthouseweb3 import Lighthouse
import os
from dotenv import load_dotenv
import io  # Add this import

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = os.environ.get('OPENAI_API_KEY')

# Set your Lighthouse API token
lighthouse_api_token = os.environ.get('LIGHTHOUSE_API_TOKEN')
lh = Lighthouse(token=lighthouse_api_token)

def get_video_transcript(video_url):
    # Add code here to extract the transcript from the video
    # You can use a separate library or service for this purpose

    # For demonstration purposes, let's assume the transcript is obtained as follows:
    transcript = "This is a sample video transcript, it has some text for the demo."

    return transcript

def generate_summary(transcript):
    # Append "please make a summary of it" to the transcript
    prompt = transcript + "\n\n what is this video for"

    # Use OpenAI GPT-3 API to generate a summary
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,  # Adjust the max_tokens parameter based on your preference
        temperature=0.6  # Adjust the temperature parameter based on your preference
    )

    summary = response.choices[0].text.strip()
    return summary

@app.route('/api/summarize', methods=['POST'])
def summarize_video():
    # Get the video URL from the request
    video_url = request.json.get('video_url')

    # Get the video transcript
    transcript = get_video_transcript(video_url)

    # Store the transcript as a text file in Lighthouse
    transcript_filename = f"{video_url.replace('/', '_')}_transcript.txt"
    lh.upload(source=io.StringIO(transcript), target=transcript_filename)

    # Generate a summary using OpenAI GPT-3
    summary = generate_summary(transcript)

    # Return the original transcript and the generated summary as JSON
    return jsonify({
        'video_transcript': transcript,
        'generated_summary': summary,
        'transcript_filename': transcript_filename
    })

if __name__ == '__main__':
    app.run(debug=True)
