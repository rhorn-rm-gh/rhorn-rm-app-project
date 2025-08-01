[📄 Return to main branch](https://github.com/rhorn-rm-gh/rhorn-rm-app-project/blob/main/README-Main.md)

# UiPath Postman-Swagger API Automation

This UiPath project automates the complete workflow of:
1. Logging into Postman and refreshing/generating an API token
2. Using the token to authorize in Swagger UI
3. Performing API calls through Swagger
4. Exporting and downloading the results to a local folder

## Project Structure

- **Main.xaml**: Main orchestrator workflow that coordinates all processes
- **PostmanLogin.xaml**: Handles Postman login and API token generation/refresh
- **SwaggerAuthorization.xaml**: Manages Swagger UI authorization using the API token
- **APICallAndDownload.xaml**: Performs API calls and exports data
- **Config.json**: Configuration file for credentials and settings

## Prerequisites

1. **UiPath Studio** (2022.10 or later)
2. **Google Chrome browser** installed
3. **Postman account** with access to API key generation
4. **Swagger UI** endpoint accessible
5. Required UiPath packages (automatically included in project.json):
   - UiPath.System.Activities
   - UiPath.UIAutomation.Activities
   - UiPath.WebAPI.Activities
   - UiPath.Excel.Activities
   - Newtonsoft.Json

## Setup Instructions

### 1. Configure Settings

Edit the `Config.json` file with your specific details:

```json
{
  "PostmanCredentials": {
    "Username": "your_postman_email@example.com",
    "Password": "your_postman_password"
  },
  "SwaggerConfiguration": {
    "SwaggerURL": "https://your-api-domain.com/swagger/index.html",
    "APIEndpoint": "/api/v1/your-endpoint"
  },
  "LocalSettings": {
    "DownloadPath": "C:\\Users\\your-username\\Downloads\\APIExports",
    "TokenStoragePath": "C:\\temp\\tokens"
  }
}
```

### 2. Input Arguments

When running the main workflow, provide these input arguments:

- **in_PostmanUsername**: Your Postman login email
- **in_PostmanPassword**: Your Postman password
- **in_SwaggerURL**: Complete URL to your Swagger UI (e.g., "https://api.example.com/swagger")
- **in_APIEndpoint**: API endpoint path (e.g., "/api/v1/data")
- **in_LocalDownloadPath**: Local folder path for downloads (e.g., "C:\\Downloads\\APIData")

### 3. Browser Configuration

- Ensure Google Chrome is your default browser or manually open Chrome before running
- Allow pop-ups and downloads in Chrome for the target domains
- Consider disabling Chrome password save prompts for smoother automation

## Workflow Process

### 1. Postman Login and Token Refresh (`PostmanLogin.xaml`)

- Navigates to Postman login page
- Enters credentials and logs in
- Navigates to API Keys section
- Generates a new API key with timestamp
- Captures and returns the new token
- Saves token to local file for backup

### 2. Swagger Authorization (`SwaggerAuthorization.xaml`)

- Opens the specified Swagger UI URL
- Clicks the "Authorize" button
- Enters the Bearer token in the authorization dialog
- Confirms authorization
- Stores the token for future reference

### 3. API Call and Data Export (`APICallAndDownload.xaml`)

- Locates and expands the specified API endpoint
- Clicks "Try it out" to enable the endpoint
- Executes the API call
- Captures the response data
- Attempts to download via Swagger UI download button
- Falls back to direct HTTP API call if browser method fails
- Saves response data to specified local folder with timestamp

## Error Handling

The automation includes comprehensive error handling:

- **Browser interaction failures**: Logs errors and continues with fallback methods
- **API call failures**: Attempts both UI-based and direct HTTP calls
- **Authentication issues**: Detailed logging for troubleshooting
- **File save errors**: Validates paths and permissions

## Output Files

The automation generates several output files:

1. **APIToken.txt**: Contains the latest Postman API token
2. **SwaggerAuthToken.txt**: Backup of the token used in Swagger
3. **API_Export_[timestamp].json**: The actual API response data
4. **Log files**: UiPath execution logs with detailed process information

## Customization

### Modifying Selectors

If the web interfaces change, you may need to update the selectors in the workflows:

1. Use UiPath's UI Explorer to identify new selectors
2. Update the selector strings in the respective .xaml files
3. Test with the new interface to ensure compatibility

### Adding New API Endpoints

To handle multiple API endpoints:

1. Modify the `APICallAndDownload.xaml` workflow
2. Add logic to iterate through multiple endpoints
3. Update the configuration to include endpoint arrays

### Different Authentication Methods

For different authentication schemes:

1. Modify the `SwaggerAuthorization.xaml` workflow
2. Update the token format (e.g., API Key, Basic Auth)
3. Adjust the authorization headers accordingly

## Security Considerations

- **Never commit credentials** to version control
- Use UiPath Orchestrator assets for credential management in production
- Consider using Windows Credential Manager for local development
- Implement token rotation and expiration handling
- Use HTTPS for all API communications

## Troubleshooting

### Common Issues

1. **Selector not found errors**:
   - Web interface may have changed
   - Update selectors using UI Explorer
   - Check if elements are in iframes

2. **Login failures**:
   - Verify credentials are correct
   - Check for CAPTCHA or 2FA requirements
   - Ensure browser allows automation

3. **API call failures**:
   - Verify token is valid and not expired
   - Check API endpoint URLs
   - Validate network connectivity

4. **Download failures**:
   - Check browser download settings
   - Verify folder permissions
   - Ensure sufficient disk space

### Debug Mode

Run the automation in debug mode to:
- Step through each activity
- Inspect variable values
- Identify specific failure points
- Validate selector targeting

## Support and Maintenance

- **Browser Updates**: May require selector updates
- **API Changes**: Monitor API documentation for changes
- **UiPath Updates**: Test with new UiPath versions
- **Security Updates**: Regularly update dependencies

## Performance Optimization

- **Parallel Processing**: Consider running multiple API calls concurrently
- **Caching**: Implement token caching to reduce login frequency
- **Batch Processing**: Group multiple API calls for efficiency
- **Resource Management**: Monitor memory usage for large datasets

---

**Created for**: App Challenge 2025
**Version**: 1.0.0
**Last Updated**: July 30, 2025
**Dependencies**: UiPath Studio 2022.10+, Chrome Browser, Postman Account

---
[📄 Return to top](https://github.com/rhorn-rm-gh/rhorn-rm-app-project/blob/main/10-API-UIPATH/README-10.md)
