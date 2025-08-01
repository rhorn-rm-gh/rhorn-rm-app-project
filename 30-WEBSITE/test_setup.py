#!/usr/bin/env python3
"""
Test script to verify JSON file accessibility
"""

import json
import os
from pathlib import Path

def test_json_file():
    """Test if the JSON file exists and is valid"""
    
    # Get current directory
    current_dir = Path.cwd()
    print(f"Current directory: {current_dir}")
    
    # Check if we're in the right directory
    json_file = Path("json/description-data.json")
    
    if not json_file.exists():
        print("❌ JSON file not found!")
        print(f"Looking for: {json_file.absolute()}")
        
        # Check what files do exist
        print("\nFiles in current directory:")
        for item in os.listdir('.'):
            if os.path.isdir(item):
                print(f"  📁 {item}/")
                if item == 'json':
                    print("    Contents of json/ directory:")
                    for json_item in os.listdir(item):
                        print(f"      📄 {json_item}")
            else:
                print(f"  📄 {item}")
        return False
    
    # Try to read and parse the JSON
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print("✅ JSON file found and valid!")
        print(f"File path: {json_file.absolute()}")
        print(f"File size: {json_file.stat().st_size} bytes")
        
        # Check structure
        if 'description' in data:
            print("✅ 'description' key found")
            if 'paragraphs' in data['description']:
                print(f"✅ Found {len(data['description']['paragraphs'])} paragraphs")
                for i, para in enumerate(data['description']['paragraphs']):
                    print(f"  📝 Paragraph {i+1}: {para['id']} ({len(para['content'])} chars)")
            else:
                print("❌ 'paragraphs' key not found in description")
        else:
            print("❌ 'description' key not found")
        
        return True
        
    except json.JSONDecodeError as e:
        print(f"❌ JSON parsing error: {e}")
        return False
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return False

def test_server_requirements():
    """Check if we have the right files for the server"""
    
    required_files = [
        'index.html',
        'css/styles02.css',
        'js/description-loader.js',
        'json/description-data.json'
    ]
    
    print("\nChecking required files:")
    all_good = True
    
    for file_path in required_files:
        if os.path.exists(file_path):
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path} - MISSING")
            all_good = False
    
    return all_good

if __name__ == "__main__":
    print("🔍 Testing JSON file and server requirements...")
    print("=" * 50)
    
    json_ok = test_json_file()
    files_ok = test_server_requirements()
    
    print("\n" + "=" * 50)
    if json_ok and files_ok:
        print("✅ All tests passed! Ready to start the server.")
        print("\nTo start the server, run:")
        print("  python start_server.py")
        print("\nThen open: http://localhost:8000")
    else:
        print("❌ Some tests failed. Please fix the issues above.")
        
    print("\n💡 Debug tips:")
    print("1. Make sure you're in the 30-WEBSITE directory")
    print("2. Check browser console (F12) for error messages")
    print("3. Verify the server is serving the JSON file at: http://localhost:8000/json/description-data.json")
