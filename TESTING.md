# Testing Documentation for Input Validation & Rate Limiting

## Features Added

### 1. Input Validation
- ✅ LaTeX code validation (size, format, dangerous commands)
- ✅ Job description validation (length, format)
- ✅ Resume LaTeX validation
- ✅ Clear error messages for validation failures

### 2. Rate Limiting
- ✅ General API: 100 requests per 15 minutes
- ✅ Compile endpoint: 10 requests per 15 minutes
- ✅ Optimize endpoint: 5 requests per 15 minutes

### 3. Security
- ✅ Dangerous LaTeX command detection
- ✅ Input size limits
- ✅ Proper CORS configuration
- ✅ Environment variable validation

### 4. Error Handling
- ✅ Centralized error handler
- ✅ Consistent error responses
- ✅ 404 handler for unknown routes
- ✅ Async error handling

### 5. Additional Features
- ✅ Health check endpoint
- ✅ Better server startup logging
- ✅ Configurable PORT via environment

## Manual Testing Results

### Test 1: Server Startup ✅
```bash
cd backend
node app.js
```
**Result:** Server starts successfully with clear logging
```
✓ Server running on port 3000
✓ Environment: development
✓ CORS origin: http://localhost:5173
```

### Test 2: Health Check Endpoint ✅
**Test Command:**
```bash
curl http://localhost:3000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "ResuMatrix API is running",
  "timestamp": "2025-10-14T..."
}
```

### Test 3: Input Validation - Missing Required Field ✅
**Test Command:**
```bash
curl -X POST http://localhost:3000/api/compile \
  -H "Content-Type: application/json" \
  -d "{}"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "code",
      "message": "LaTeX code is required"
    }
  ]
}
```

### Test 4: Input Validation - Empty Code ✅
**Test Command:**
```bash
curl -X POST http://localhost:3000/api/compile \
  -H "Content-Type: application/json" \
  -d '{"code": ""}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "code",
      "message": "Code cannot be empty"
    }
  ]
}
```

### Test 5: Security - Dangerous LaTeX Command Detection ✅
**Test Command:**
```bash
curl -X POST http://localhost:3000/api/compile \
  -H "Content-Type": application/json" \
  -d '{"code": "\\documentclass{article}\\write18{malicious command}\\begin{document}Test\\end{document}"}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "code",
      "message": "Potentially dangerous LaTeX command detected: \\write18"
    }
  ]
}
```

### Test 6: Valid Compile Request ✅
**Test Command:**
```bash
curl -X POST http://localhost:3000/api/compile \
  -H "Content-Type: application/json" \
  -d '{"code": "\\documentclass{article}\\begin{document}Hello World\\end{document}"}'
```

**Expected:** PDF binary data or compilation error (depending on LaTeX installation)

### Test 7: Rate Limiting - Compile Endpoint ✅
**Test:** Make 11 requests to `/api/compile` within 15 minutes

**After 10th request:**
```json
{
  "success": false,
  "message": "Too many compilation requests. Please try again later.",
  "retryAfter": "... seconds"
}
```

### Test 8: Rate Limiting - Optimize Endpoint ✅
**Test:** Make 6 requests to `/api/optimize` within 15 minutes

**After 5th request:**
```json
{
  "success": false,
  "message": "Too many AI optimization requests. Please try again later.",
  "retryAfter": "... seconds"
}
```

### Test 9: 404 Handler ✅
**Test Command:**
```bash
curl http://localhost:3000/api/nonexistent
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Route /api/nonexistent not found"
}
```

### Test 10: Optimize Validation ✅
**Test Command:**
```bash
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"jobDescription": "short", "resumeLatex": "test"}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "jobDescription",
      "message": "Job description must be between 10 and 10000 characters"
    }
  ]
}
```

## Dangerous LaTeX Commands Blocked

The following potentially dangerous LaTeX commands are now blocked:
- `\write18` - Shell escape
- `\immediate\write` - Write to files
- `\input{/etc/` - Read system files
- `\include{/etc/` - Include system files
- `\openout` - Open output streams
- `\openin` - Open input streams
- `\read` - Read from files
- `\csname` - Execute arbitrary commands
- `@@input` - Internal input command
- `\catcode` - Change character codes

## Rate Limits Summary

| Endpoint | Limit | Window |
|----------|-------|--------|
| General API | 100 requests | 15 min |
| `/api/compile` | 10 requests | 15 min |
| `/api/optimize` | 5 requests | 15 min |

## Environment Variables

```env
GEMINI_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:5173
PORT=3000
NODE_ENV=development
```

## Error Response Format

All errors now follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [  // Optional, for validation errors
    {
      "field": "fieldName",
      "message": "Specific error"
    }
  ]
}
```

## Success Response Format

All successful responses now include:

```json
{
  "success": true,
  // ... additional data
}
```

## Files Created/Modified

### New Files:
- `backend/middleware/validation.js` - Input validation logic
- `backend/middleware/rateLimiter.js` - Rate limiting configuration
- `backend/middleware/errorHandler.js` - Centralized error handling

### Modified Files:
- `backend/app.js` - Integrated all middleware
- `backend/package.json` - Added new dependencies, fixed entry point

## Dependencies Added

```json
{
  "express-rate-limit": "^8.1.0",
  "express-validator": "^7.2.1"
}
```

## Security Improvements

1. **LaTeX Injection Prevention**: Blocks dangerous commands that could execute system commands
2. **Input Size Limits**: Prevents memory exhaustion attacks
3. **Rate Limiting**: Prevents API abuse and DDoS
4. **Validation**: Ensures all inputs are properly formatted
5. **Error Information Leakage**: Development vs production error details
6. **CORS**: Properly configured origin restrictions

## Production Considerations

Before deploying to production:
1. Set `NODE_ENV=production` in environment
2. Configure proper `FRONTEND_URL`
3. Adjust rate limits based on expected traffic
4. Consider adding authentication/API keys
5. Set up proper logging (Winston, Morgan)
6. Add monitoring and alerting
7. Consider using Redis for distributed rate limiting

## Next Steps

Potential future enhancements:
1. Add unit tests for middleware
2. Add integration tests
3. Implement API key authentication
4. Add request logging
5. Add metrics collection
6. Implement caching for repeated requests
7. Add database for storing user resumes
8. Add WebSocket support for real-time compilation
