#!/usr/bin/env python3
"""
Simple HTTP Server for testing the website locally
Run this from the 30-WEBSITE directory
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Set the port
PORT = 8000

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent.absolute()
WEBSITE_DIR = SCRIPT_DIR

# Change to the website directory
os.chdir(WEBSITE_DIR)

print(f"Starting server in directory: {WEBSITE_DIR}")
print(f"Server will be available at: http://localhost:{PORT}")
print(f"To stop the server, press Ctrl+C")
print("-" * 50)

# Custom handler to add CORS headers and better logging
class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Enhanced logging
        print(f"[{self.date_time_string()}] {format % args}")
    
    def do_GET(self):
        print(f"GET request for: {self.path}")
        
        # Check if file exists
        if self.path.startswith('/'):
            file_path = self.path[1:]  # Remove leading slash
            if file_path == '':
                file_path = 'index.html'
            
            if os.path.exists(file_path):
                print(f"✓ File found: {file_path}")
            else:
                print(f"✗ File not found: {file_path}")
        
        return super().do_GET()

try:
    # Create the server
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Server started successfully on port {PORT}")
        print(f"Directory contents:")
        for item in os.listdir('.'):
            if os.path.isdir(item):
                print(f"  📁 {item}/")
            else:
                print(f"  📄 {item}")
        print("-" * 50)
        
        # Serve until interrupted
        httpd.serve_forever()
        
except KeyboardInterrupt:
    print("\nServer stopped by user")
except OSError as e:
    if e.errno == 98:  # Address already in use
        print(f"Error: Port {PORT} is already in use")
        print("Try using a different port or stop the other server")
    else:
        print(f"Error starting server: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
