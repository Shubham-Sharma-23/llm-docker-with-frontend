FROM ollama/ollama:latest

# Add -y flag to avoid prompts and DEBIAN_FRONTEND to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-yaml \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy configuration and scripts
COPY config.yaml /app/config.yaml
COPY scripts/start.sh /app/start.sh
RUN chmod +x /app/start.sh

WORKDIR /app

# Expose Ollama's default port
EXPOSE 11434

# Set entrypoint to our start script
ENTRYPOINT ["/app/start.sh"]