# 🎃 Halloween Party Backend Server

Backend API server untuk Pump Fun Halloween Party dengan secure OpenAI integration.

## 🚀 Features

- ✅ **Secure API Key Management** - API key tersimpan aman di server
- ✅ **No User API Key Required** - User tidak perlu input API key
- ✅ **Rate Limiting** - Proteksi dari spam (10 requests per 5 minutes)
- ✅ **CORS Enabled** - Bisa diakses dari frontend
- ✅ **Helmet Security** - Security headers enabled
- ✅ **Fallback System** - Auto fallback jika OpenAI error
- ✅ **Error Handling** - Robust error handling
- ✅ **Logging** - Request logging untuk monitoring

---

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

Dependencies yang akan diinstall:
- `express` - Web framework
- `cors` - Enable CORS
- `dotenv` - Environment variables
- `openai` - OpenAI SDK
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting

### 2. Configure Environment

File `.env` sudah berisi API key Anda. Pastikan sudah sesuai:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your-key-here
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=300
OPENAI_TEMPERATURE=0.9

# Server Configuration
PORT=3000
NODE_ENV=development
```

---

## 🏃 Running the Server

### Development Mode (with nodemon):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

Server akan running di: `http://localhost:3000`

---

## 📡 API Endpoints

### 1. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Halloween Party API is running!",
  "timestamp": "2025-10-20T..."
}
```

---

### 2. Get Costume Suggestion (Main)
```http
POST /api/costume-suggestion
Content-Type: application/json

{
  "userName": "Sarah"
}
```

**Success Response:**
```json
{
  "success": true,
  "userName": "Sarah",
  "suggestion": "<HTML formatted suggestion>",
  "timestamp": "2025-10-20T..."
}
```

**Error Response:**
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later.",
  "fallback": true
}
```

---

### 3. Fallback Suggestion
```http
POST /api/fallback-suggestion
Content-Type: application/json

{
  "userName": "Michael"
}
```

**Response:**
```json
{
  "success": true,
  "userName": "Michael",
  "suggestion": "<HTML formatted suggestion>",
  "isFallback": true,
  "timestamp": "2025-10-20T..."
}
```

---

## 🔒 Security Features

### 1. Rate Limiting
- **Limit**: 10 requests per 5 minutes per IP
- **Purpose**: Prevent spam and abuse
- **Response**: 429 Too Many Requests

### 2. Helmet Security Headers
- XSS Protection
- Content Security Policy
- HSTS
- Frame Guard

### 3. Input Validation
- Name length: max 50 characters
- HTML tag sanitization
- Required field checking

### 4. API Key Protection
- API key hanya di server (.env)
- Never exposed to client
- Protected by .gitignore

---

## 📊 Testing

### Test Health Endpoint:
```bash
curl http://localhost:3000/api/health
```

### Test Costume Suggestion:
```bash
curl -X POST http://localhost:3000/api/costume-suggestion \
  -H "Content-Type: application/json" \
  -d '{"userName":"Sarah"}'
```

### Test Rate Limiting:
```bash
# Run this 11 times quickly
for i in {1..11}; do
  curl -X POST http://localhost:3000/api/costume-suggestion \
    -H "Content-Type: application/json" \
    -d '{"userName":"Test"}'
done
```

---

## 🚀 Deployment

### Deploy to Heroku:

```bash
# Login to Heroku
heroku login

# Create app
heroku create halloween-party-api

# Set environment variables
heroku config:set OPENAI_API_KEY=your-key-here
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Open app
heroku open
```

### Deploy to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Deploy to Railway:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

## 🔧 Configuration

### Change Rate Limit:

Edit `server.js`:
```javascript
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // Change time window
    max: 10, // Change max requests
    // ...
});
```

### Change OpenAI Model:

Edit `.env`:
```env
OPENAI_MODEL=gpt-4  # Use GPT-4 instead
```

### Change Port:

Edit `.env`:
```env
PORT=8080  # Use different port
```

---

## 📈 Monitoring

### View Logs:
```bash
# Development
npm run dev

# Production (with PM2)
pm2 logs halloween-api
```

### Monitor Usage:
```bash
# Watch server logs
tail -f server.log

# Monitor with PM2
pm2 monit
```

---

## 🐛 Troubleshooting

### Error: "API Key not configured"

**Solution:**
```bash
# Check .env file
cat .env

# Make sure OPENAI_API_KEY is set
# Restart server
npm start
```

### Error: "Port already in use"

**Solution:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000  # Windows
lsof -ti:3000  # Mac/Linux

# Kill the process or use different port
# Edit .env:
PORT=3001
```

### Error: "CORS blocked"

**Solution:**
Edit `server.js`:
```javascript
app.use(cors({
    origin: 'https://your-frontend-domain.com',
    credentials: true
}));
```

### Rate Limit Too Strict:

**Solution:**
Edit `server.js`:
```javascript
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 20, // 20 requests
    // ...
});
```

---

## 📊 Cost Estimation

### OpenAI API Costs:
- **GPT-3.5-turbo**: ~$0.002 per request
- **100 users**: ~$0.20
- **1000 users**: ~$2.00
- **10000 users**: ~$20.00

### With Rate Limiting (10 req / 5 min):
- **Max requests per hour**: 120 per IP
- **Max requests per day**: ~2,880 per IP
- **Daily cost (100 unique IPs)**: ~$5.76

---

## 🎯 Best Practices

### 1. Monitor API Usage
```bash
# Check OpenAI dashboard
https://platform.openai.com/usage
```

### 2. Set Budget Alert
- Go to OpenAI dashboard
- Settings → Billing
- Set monthly limit

### 3. Use Environment Variables
```bash
# Never hardcode API keys
# Always use .env
```

### 4. Enable Logging
```bash
# Use logging service like:
# - Loggly
# - Papertrail
# - DataDog
```

### 5. Scale with Load Balancer
```bash
# Use PM2 cluster mode
pm2 start server.js -i max

# Or use cloud auto-scaling
```

---

## 📞 Support

- **Issues**: Create issue di GitHub
- **Questions**: Contact maintainer
- **Docs**: See main README.md

---

## ✅ Checklist Before Production

- [ ] API key di .env configured
- [ ] Rate limiting tested
- [ ] CORS properly configured
- [ ] Error handling tested
- [ ] Logging enabled
- [ ] Budget alert set di OpenAI
- [ ] SSL/HTTPS enabled
- [ ] Domain configured
- [ ] Monitoring setup
- [ ] Backup strategy ready

---

**Ready to serve costume suggestions! 🎃👻**
