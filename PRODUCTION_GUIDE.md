# Production Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] Run `npm run lint` and fix all warnings/errors
- [ ] Run tests: `npm run test`
- [ ] Check TypeScript: `npm run type-check`
- [ ] Review console for warnings

### ✅ Performance
- [ ] Check bundle size: `npm run build -- --analyze`
- [ ] Test with slow 3G throttling
- [ ] Verify Lighthouse score > 90
- [ ] Check Core Web Vitals

### ✅ Security
- [ ] Run security audit: `npm audit`
- [ ] Review API endpoints for authentication
- [ ] Check environment variables are not exposed
- [ ] Enable HTTPS
- [ ] Add CORS headers

### ✅ Testing
- [ ] Test all critical user flows
- [ ] Test error states
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Test with slow internet

## Build Process

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

1. Copy `.env.example` to `.env.production`
2. Set production values:
   ```
   VITE_ENV=production
   VITE_API_URL=https://your-api.com/api
   VITE_DEBUG=false
   ```

## Deployment

### Option 1: Vercel
```bash
npm i -g vercel
vercel --prod
```

### Option 2: GitHub Pages
```bash
npm run build
# Deploy dist/ folder
```

### Option 3: Docker
```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Monitoring

### Setup Error Tracking
- Integrate Sentry or similar service
- Monitor error rates
- Set up alerts

### Setup Analytics
- Add Google Analytics
- Track key user actions
- Monitor performance metrics

## Production Issues Resolution

### White Screen of Death
1. Check browser console for errors
2. Verify API connectivity
3. Check environment variables
4. Review build output

### Slow Performance
1. Check network throttling
2. Review bundle size
3. Check for memory leaks
4. Optimize images

### API Errors
1. Verify API endpoints
2. Check CORS configuration
3. Review authentication tokens
4. Check rate limiting

## Rollback Procedure

1. Keep previous build artifacts
2. Maintain version history
3. Have quick rollback script ready
4. Test rollback procedure

## Performance Optimization

- Enable gzip compression
- Use CDN for static assets
- Implement service workers
- Lazy load components
- Code splitting
- Image optimization

## Security Headers

Add to web server configuration:
```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```
