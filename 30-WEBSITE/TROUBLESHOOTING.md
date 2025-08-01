# Troubleshooting Guide - Dynamic Content Loading

## Problem: Page stuck at "Loading community information..."

### Quick Diagnosis Steps:

1. **Check Browser Console (F12)**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for error messages (should show fetch attempts and any failures)

2. **Test JSON File Directly**
   - Navigate to: `http://localhost:8000/json/description-data.json`
   - Should display the JSON content
   - If 404 error, the file path is wrong or server isn't serving it

3. **Verify Server Directory**
   ```bash
   # Make sure you're in the right directory
   cd "c:\Users\robert.hornilla\OneDrive - The RMR Group\Documents\rhorn-rm-app-project\30-WEBSITE"
   
   # Test the setup
   python test_setup.py
   
   # Start the server
   python start_server.py
   ```

### Common Issues & Solutions:

#### Issue 1: CORS Error
**Symptoms:** Console shows "CORS policy" error
**Solution:** Use the provided `start_server.py` which includes CORS headers

#### Issue 2: 404 - File Not Found
**Symptoms:** Console shows 404 error for JSON file
**Solutions:**
- Verify you're running server from `30-WEBSITE` directory
- Check file exists: `json/description-data.json`
- Verify file permissions

#### Issue 3: JSON Parse Error
**Symptoms:** Console shows JSON parsing error
**Solution:** Validate JSON syntax at jsonlint.com

#### Issue 4: JavaScript Not Loading
**Symptoms:** No console messages at all
**Solutions:**
- Check if `js/description-loader.js` exists
- Verify script tag in HTML: `<script src="js/description-loader.js"></script>`
- Check for JavaScript syntax errors

### Debug Commands:

```powershell
# Navigate to website directory
cd "c:\Users\robert.hornilla\OneDrive - The RMR Group\Documents\rhorn-rm-app-project\30-WEBSITE"

# Test the setup
python test_setup.py

# Start server with logging
python start_server.py

# In another terminal, test the JSON endpoint
curl http://localhost:8000/json/description-data.json
```

### Manual Test in Browser Console:

```javascript
// Test fetch manually in browser console
fetch('json/description-data.json')
  .then(response => {
    console.log('Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('JSON data:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

### Alternative: Test with Python's Built-in Server

If the custom server doesn't work, try Python's built-in server:

```powershell
# Navigate to 30-WEBSITE directory
cd "c:\Users\robert.hornilla\OneDrive - The RMR Group\Documents\rhorn-rm-app-project\30-WEBSITE"

# Python 3.x
python -m http.server 8000

# Then test: http://localhost:8000
```

### Success Indicators:

✅ **Working correctly when:**
- Console shows: "JSON data loaded successfully"
- Description content appears on page
- No error messages in console
- JSON file accessible at: `http://localhost:8000/json/description-data.json`

### Still Not Working?

1. **Check Network Tab** (F12 → Network)
   - Look for the JSON request
   - Check its status and response

2. **Disable Browser Cache**
   - Hard refresh: Ctrl+Shift+R
   - Or disable cache in DevTools

3. **Try Different Browser**
   - Test in Chrome, Firefox, or Edge
   - Some browsers have stricter CORS policies

4. **Check File Encoding**
   - Ensure JSON file is UTF-8 encoded
   - No BOM (Byte Order Mark)

### Contact Information:
If issues persist, provide:
- Browser console errors
- Network tab details
- Server startup messages
- Output from `test_setup.py`
