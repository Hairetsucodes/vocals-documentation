# Advanced Usage

## Enhanced Microphone Streaming

```python
import asyncio
import logging
from vocals import (
    create_vocals,
    create_enhanced_message_handler,
    create_default_connection_handler,
    create_default_error_handler,
)

async def main():
    # Configure logging for cleaner output
    logging.getLogger("vocals").setLevel(logging.WARNING)

    # Create SDK with default full experience
    sdk = create_vocals()

    try:
        print("🎤 Starting microphone streaming...")
        print("Speak into your microphone!")

        # Stream microphone with enhanced features
        stats = await sdk["stream_microphone"](
            duration=30.0,            # Record for 30 seconds
            auto_connect=True,        # Auto-connect if needed
            auto_playback=True,       # Auto-play received audio
            verbose=False,            # SDK handles display automatically
            stats_tracking=True,      # Track session statistics
            amplitude_threshold=0.01, # Voice activity detection threshold
        )

        # Print session statistics
        print(f"\n📊 Session Statistics:")
        print(f"   • Transcriptions: {stats.get('transcriptions', 0)}")
        print(f"   • AI Responses: {stats.get('responses', 0)}")
        print(f"   • TTS Segments: {stats.get('tts_segments_received', 0)}")

    finally:
        # Disconnect and cleanup
        await sdk["disconnect"]()
        sdk["cleanup"]()

if __name__ == "__main__":
    asyncio.run(main())
```

## Conversation Tracking Example

```python
import asyncio
from vocals import (
    create_vocals,
    create_conversation_tracker,
    create_enhanced_message_handler,
)

async def main():
    # Create SDK with controlled experience for custom tracking
    sdk = create_vocals(modes=['transcription', 'voice_assistant'])
    conversation_tracker = create_conversation_tracker()

    # Custom message handler with conversation tracking
    def tracking_handler(message):
        # Custom display logic
        if message.type == "transcription" and message.data:
            text = message.data.get("text", "")
            is_partial = message.data.get("is_partial", False)
            if not is_partial and text:
                print(f"🎤 You: {text}")

        elif message.type == "llm_response" and message.data:
            response = message.data.get("response", "")
            if response:
                print(f"🤖 AI: {response}")

        elif message.type == "tts_audio" and message.data:
            text = message.data.get("text", "")
            if text:
                print(f"🔊 Playing: {text}")
                # Manually start playback since we're in controlled mode
                asyncio.create_task(sdk["play_audio"]())

        # Track conversation based on message type
        if message.type == "transcription" and message.data:
            text = message.data.get("text", "")
            is_partial = message.data.get("is_partial", False)
            if text and not is_partial:
                conversation_tracker["add_transcription"](text, is_partial)

        elif message.type == "llm_response" and message.data:
            response = message.data.get("response", "")
            if response:
                conversation_tracker["add_response"](response)

    # Set up handler
    sdk["on_message"](tracking_handler)

    try:
        # Stream microphone
        await sdk["stream_microphone"](
            duration=15.0,
            auto_playback=False  # We handle playback manually
        )

        # Print conversation history
        print("\n" + "="*50)
        print("📜 CONVERSATION HISTORY")
        print("="*50)
        conversation_tracker["print_conversation"]()

        # Print conversation statistics
        stats = conversation_tracker["get_stats"]()
        print(f"\n📈 Session lasted {stats['duration']:.1f} seconds")

    finally:
        await sdk["disconnect"]()
        sdk["cleanup"]()

if __name__ == "__main__":
    asyncio.run(main())
```

## Infinite Streaming with Signal Handling

```python
import asyncio
import signal
from vocals import create_vocals

# Global shutdown event
shutdown_event = asyncio.Event()

def setup_signal_handlers():
    """Setup signal handlers for graceful shutdown."""
    def signal_handler(signum, frame):
        if not shutdown_event.is_set():
            print(f"\n📡 Received signal {signum}, shutting down...")
            shutdown_event.set()

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

async def main():
    setup_signal_handlers()

    # Create SDK
    sdk = create_vocals()

    # Create streaming task
    async def stream_task():
        await sdk["stream_microphone"](
            duration=0,  # 0 = infinite streaming
            auto_connect=True,
            auto_playback=True,
            verbose=False,
            stats_tracking=True,
        )

    # Run streaming and wait for shutdown
    streaming_task = asyncio.create_task(stream_task())
    shutdown_task = asyncio.create_task(shutdown_event.wait())

    try:
        print("🎤 Starting infinite streaming...")
        print("Press Ctrl+C to stop")

        # Wait for shutdown signal
        await shutdown_task

        # Stop recording gracefully
        await sdk["stop_recording"]()

    finally:
        # Cancel streaming task
        streaming_task.cancel()
        await sdk["disconnect"]()
        sdk["cleanup"]()

if __name__ == "__main__":
    asyncio.run(main())
```
