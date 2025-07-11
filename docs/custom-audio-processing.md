# Custom Audio Processing

Instead of playing audio locally, you can process audio segments with custom handlers - perfect for saving audio files, sending to external players, or implementing custom audio processing.

## Advanced Audio Processing Example

```python
import asyncio
import base64
from vocals import VocalsClient

async def main():
    """Advanced voice assistant with custom audio processing"""

    # Create SDK with controlled mode for manual audio handling
    client = VocalsClient(modes=["transcription", "voice_assistant"])

    # Custom state tracking
    conversation_state = {"listening": False, "processing": False, "speaking": False}

    def handle_messages(message):
        """Custom message handler with audio processing control"""

        if message.type == "transcription" and message.data:
            text = message.data.get("text", "")
            is_partial = message.data.get("is_partial", False)

            if is_partial:
                print(f"\r🎤 Listening: {text}...", end="", flush=True)
            else:
                print(f"\n✅ You said: {text}")

        elif message.type == "llm_response_streaming" and message.data:
            token = message.data.get("token", "")
            is_complete = message.data.get("is_complete", False)

            if token:
                print(token, end="", flush=True)
            if is_complete:
                print()  # New line

        elif message.type == "tts_audio" and message.data:
            text = message.data.get("text", "")
            if text and not conversation_state["speaking"]:
                print(f"🔊 AI speaking: {text}")
                conversation_state["speaking"] = True

                # Custom audio processing instead of local playback
                def custom_audio_handler(segment):
                    """Process each audio segment with custom logic"""
                    print(f"🎵 Processing audio: {segment.text}")

                    # Option 1: Save to file
                    audio_data = base64.b64decode(segment.audio_data)
                    filename = f"audio_{segment.segment_id}.wav"
                    with open(filename, "wb") as f:
                        f.write(audio_data)
                    print(f"💾 Saved audio to: {filename}")

                    # Option 2: Send to external audio player
                    # subprocess.run(["ffplay", "-nodisp", "-autoexit", filename])

                    # Option 3: Stream to audio device
                    # your_audio_device.play(audio_data)

                    # Option 4: Convert format
                    # converted_audio = convert_audio_format(audio_data, target_format)

                    # Option 5: Process with AI/ML
                    # audio_features = extract_audio_features(audio_data)
                    # emotion_score = analyze_emotion(audio_features)

                # Process all available audio segments
                processed_count = client.process_audio_queue(
                    custom_audio_handler,
                    consume_all=True
                )
                print(f"✅ Processed {processed_count} audio segments")

        elif message.type == "speech_interruption":
            print("\n🛑 Speech interrupted")
            conversation_state["speaking"] = False

    # Register message handler
    client.on_message(handle_messages)

    # Connection handler
    def handle_connection(state):
        if state.name == "CONNECTED":
            print("✅ Connected to voice assistant")
        elif state.name == "DISCONNECTED":
            print("❌ Disconnected from voice assistant")

    client.on_connection_change(handle_connection)

    try:
        print("🎤 Voice Assistant with Custom Audio Processing")
        print("Audio will be saved to files instead of played locally")
        print("Speak into your microphone...")
        print("Press Ctrl+C to stop")

        # Stream microphone with custom audio handling
        await client.stream_microphone(
            duration=0,           # Infinite recording
            auto_connect=True,    # Auto-connect to service
            auto_playback=False,  # Disable automatic playback - we handle it
            verbose=False,        # Clean output
        )

    except KeyboardInterrupt:
        print("\n👋 Custom audio processing stopped")
    finally:
        await client.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
```

## Audio Processing Options

When implementing custom audio processing, you have several options:

### 1. Save to Files

Save audio segments as WAV files for later processing or archival.

### 2. External Audio Players

Send audio to external players like `ffplay` or system audio players.

### 3. Stream to Audio Devices

Directly stream audio data to specific audio output devices.

### 4. Format Conversion

Convert audio to different formats (MP3, OGG, etc.) for compatibility.

### 5. AI/ML Processing

Extract audio features, analyze emotions, or perform other AI-based processing on the audio data.
