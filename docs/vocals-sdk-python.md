# Vocals SDK Python

[![PyPI version](https://badge.fury.io/py/vocals.svg)](https://badge.fury.io/py/vocals)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/hairetsucodes/vocals-sdk-python)](https://github.com/hairetsucodes/vocals-sdk-python/issues)

A Python SDK for voice processing and real-time audio communication with AI assistants. Stream microphone input or audio files to receive live transcription, AI responses, and text-to-speech audio.

## Features

- 🎤 **Real-time microphone streaming** with voice activity detection
- 📁 **Audio file playback** support (WAV format)
- ✨ **Live transcription** with partial and final results
- 🤖 **Streaming AI responses** with real-time text display
- 🔊 **Text-to-speech playback** with automatic audio queueing
- 📊 **Conversation tracking** and session statistics
- 🚀 **Easy setup** with minimal configuration required
- 🔄 **Auto-reconnection** and robust error handling

## Prerequisites

Before using the SDK, make sure you have:

- Python 3.8 or higher
- A Vocals API key (set as `VOCALS_DEV_API_KEY` environment variable)
- Working microphone and audio output

> **Getting Started?** Check out the [Installation Guide](./installation.md) and [Quick Start](./quickstart.md) first.

## Class-Based API

The Vocals SDK now uses a **class-based API** as the primary interface. This provides better resource management, cleaner code organization, and context manager support.

### Basic Usage

```python
import asyncio
from vocals import VocalsClient

async def main():
    # Create client instance
    client = VocalsClient()

    # Stream microphone
    await client.stream_microphone(duration=10.0)

    # Clean up
    await client.disconnect()
    client.cleanup()

asyncio.run(main())
```

### Context Manager Support (Recommended)

The client supports context managers for automatic resource cleanup:

```python
import asyncio
from vocals import VocalsClient

async def main():
    async with VocalsClient() as client:
        await client.stream_microphone(duration=10.0)
        # Automatic cleanup when exiting context

asyncio.run(main())
```

## API Reference

### SDK Modes

The Vocals SDK supports two usage patterns:

#### Default Experience (No Modes)

```python
# Full experience with automatic handlers, playback, and console output
client = VocalsClient()
```

#### Controlled Experience (With Modes)

```python
# Controlled experience - you handle all logic
client = VocalsClient(modes=['transcription', 'voice_assistant'])
```

**Available Modes:**

- `'transcription'`: Enables transcription-related processing
- `'voice_assistant'`: Enables AI response handling

### Core Functions

#### `VocalsClient(modes=None)`

Creates a new Vocals SDK client instance.

**Parameters:**

- `modes` (list, optional): List of modes to enable. Available modes:
  - `'transcription'`: Enables transcription processing
  - `'voice_assistant'`: Enables AI response handling

**Returns:** VocalsClient instance

**Example:**

```python
# Default experience (full auto-contained)
client = VocalsClient()

# Controlled experience (manual handling)
client = VocalsClient(modes=['transcription', 'voice_assistant'])
```

#### `client.stream_microphone(...)`

Stream microphone input for real-time processing.

**Parameters:**

- `duration` (float): Recording duration in seconds (0 for infinite)
- `auto_connect` (bool): Auto-connect to service if needed
- `auto_playback` (bool): Auto-play received audio
- `verbose` (bool): Enable verbose output
- `stats_tracking` (bool): Track session statistics
- `amplitude_threshold` (float): Voice activity detection threshold

**Returns:** Dictionary with session statistics

**Example:**

```python
stats = await client.stream_microphone(
    duration=30.0,
    auto_connect=True,
    auto_playback=True,
    stats_tracking=True
)
```

#### `client.stream_audio_file(filepath)`

Stream audio file for processing.

**Parameters:**

- `filepath` (str): Path to audio file (WAV format)

**Example:**

```python
await client.stream_audio_file("path/to/audio.wav")
```

#### `client.on_message(handler)`

Register a message handler for real-time events.

**Parameters:**

- `handler` (function): Function to handle incoming messages

**Message Types:**

- `transcription`: Speech-to-text results
- `llm_response`: AI assistant responses
- `tts_audio`: Text-to-speech audio data
- `speech_interruption`: Speech interruption events

**Example:**

```python
def handle_message(message):
    if message.type == "transcription":
        print(f"Transcription: {message.data.get('text')}")
    elif message.type == "llm_response":
        print(f"AI Response: {message.data.get('response')}")

client.on_message(handle_message)
```

#### `client.on_connection_change(handler)`

Register a connection state handler.

**Parameters:**

- `handler` (function): Function to handle connection state changes

**States:**

- `CONNECTING`: Attempting to connect
- `CONNECTED`: Successfully connected
- `DISCONNECTED`: Disconnected from service

**Example:**

```python
def handle_connection(state):
    print(f"Connection state: {state.name}")

client.on_connection_change(handle_connection)
```

#### `client.play_audio()`

Manually play queued audio segments.

**Example:**

```python
await client.play_audio()
```

#### `client.stop_recording()`

Stop the current recording session.

**Example:**

```python
await client.stop_recording()
```

#### `client.disconnect()`

Disconnect from the Vocals service.

**Example:**

```python
await client.disconnect()
```

#### `client.cleanup()`

Clean up resources and close connections.

**Example:**

```python
client.cleanup()
```

### Helper Functions

#### `create_conversation_tracker()`

Create a conversation tracker for logging and statistics.

**Returns:** Conversation tracker instance

**Example:**

```python
tracker = create_conversation_tracker()
tracker["add_transcription"]("Hello world", False)
tracker["add_response"]("Hi there!")
tracker["print_conversation"]()
```

#### `create_enhanced_message_handler()`

Create an enhanced message handler with automatic formatting.

**Returns:** Enhanced message handler function

#### `create_default_connection_handler()`

Create a default connection state handler.

**Returns:** Default connection handler function

#### `create_default_error_handler()`

Create a default error handler.

**Returns:** Default error handler function

## Command Line Interface

The SDK includes command-line tools for quick testing:

```bash
# Run setup wizard
vocals setup

# Test installation
vocals test

# Run demo
vocals demo
```

## Error Handling

The SDK includes robust error handling and auto-reconnection:

```python
client = VocalsClient()

try:
    await client.stream_microphone(duration=30.0)
except Exception as e:
    print(f"Error: {e}")
finally:
    await client.disconnect()
    client.cleanup()
```

## Advanced Features

For advanced usage patterns, see:

- [Advanced Usage](./advanced-usage.md) - Enhanced streaming and conversation tracking
- [Custom Audio Processing](./custom-audio-processing.md) - Custom audio handlers

## Troubleshooting

### Common Issues

1. **Audio device not found**

   - Ensure microphone is connected and working
   - Check system audio settings

2. **API key not set**

   - Set `VOCALS_DEV_API_KEY` environment variable
   - Or create `.env` file with your API key

3. **Connection failed**
   - Check internet connection
   - Verify API key is valid

### Getting Help

- [GitHub Issues](https://github.com/hairetsucodes/vocals-sdk-python/issues)
- [GitHub Discussions](https://github.com/hairetsucodes/vocals-sdk-python/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.
