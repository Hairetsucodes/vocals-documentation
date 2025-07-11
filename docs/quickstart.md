# Quick Start

## Basic Usage

### Microphone Streaming (Minimal Example)

```python
import asyncio
from vocals import VocalsClient

async def main():
    # Create SDK instance
    client = VocalsClient()

    # Stream microphone for 10 seconds
    await client.stream_microphone(duration=10.0)

if __name__ == "__main__":
    asyncio.run(main())
```

### Audio File Playback (Minimal Example)

```python
import asyncio
from vocals import VocalsClient

async def main():
    # Create SDK instance
    client = VocalsClient()

    # Stream audio file
    await client.stream_audio_file("path/to/your/audio.wav")

if __name__ == "__main__":
    asyncio.run(main())
```

## SDK Modes

The Vocals SDK supports two usage patterns:

### Default Experience (No Modes)

When you create the SDK without specifying modes, you get a full auto-contained experience:

```python
# Full experience with automatic handlers, playback, and beautiful console output
client = VocalsClient()
```

**Features:**

- ✅ Automatic transcription display with partial updates
- ✅ Streaming AI response display in real-time
- ✅ Automatic TTS audio playback
- ✅ Speech interruption handling
- ✅ Beautiful console output with emojis
- ✅ Perfect for getting started quickly

### Controlled Experience (With Modes)

When you specify modes, the SDK becomes passive and you control everything:

```python
# Controlled experience - you handle all logic
client = VocalsClient(modes=['transcription', 'voice_assistant'])
```

**Available Modes:**

- `'transcription'`: Enables transcription-related internal processing
- `'voice_assistant'`: Enables AI response handling and speech interruption

**Features:**

- ✅ No automatic handlers attached
- ✅ No automatic playback
- ✅ You attach your own message handlers
- ✅ You control when to play audio
- ✅ Perfect for custom applications
