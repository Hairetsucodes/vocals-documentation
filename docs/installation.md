# Installation

## Install the SDK

```bash
pip install vocals
```

## Quick Setup

After installation, use the built-in setup wizard to configure your environment:

```bash
vocals setup
```

Or test your installation:

```bash
vocals test
```

Run a quick demo:

```bash
vocals demo
```

## System Requirements

- Python 3.8 or higher
- Working microphone (for microphone streaming)
- Audio output device (for TTS playback)

## Additional Dependencies

The SDK automatically installs all required Python dependencies including `pyaudio`, `sounddevice`, `numpy`, `websockets`, and others.

On some Linux systems, you may need to install system-level audio libraries:

**Ubuntu/Debian:**

```bash
sudo apt-get install portaudio19-dev
```

**Other Linux distributions:**

```bash
# Install portaudio development headers using your package manager
# For example, on CentOS/RHEL: sudo yum install portaudio-devel
```

## API Key Setup

Set up your Vocals API key as an environment variable:

```bash
export VOCALS_DEV_API_KEY="your_api_key_here"
```

Or create a `.env` file in your project:

```
VOCALS_DEV_API_KEY=your_api_key_here
```
