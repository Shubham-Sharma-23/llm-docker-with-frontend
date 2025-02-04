#!/bin/bash

# Read model name from config
MODEL_NAME=$(python3 -c "import yaml; print(yaml.safe_load(open('config.yaml'))['model']['name'])")

echo "Starting Ollama server..."
# Start Ollama server in background and redirect output to stdout
ollama serve > /proc/1/fd/1 2>&1 &
OLLAMA_PID=$!

# Wait for server to start
echo "Waiting for server to initialize..."
sleep 5

# Pull the specified model
echo "Pulling model: $MODEL_NAME"
ollama pull $MODEL_NAME

# Keep container running and watch the Ollama process
echo "Server is ready!"
wait $OLLAMA_PID

