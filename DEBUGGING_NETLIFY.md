# Debugging White Screen on Netlify

## Quick Checklist

### 1. Check Browser Console
Open your deployed site and press **F12** (or right-click → Inspect), then go to the **Console** tab.

Look for errors like:
- `Failed to fetch` - Network/API issues
- `Uncaught ReferenceError` - Missing variables
- `ChunkLoadError` - Build output issues
- CORS errors - API/Supabase configuration issues

### 2. Check Network Tab
In the browser DevTools, go to the **Network** tab:
- Verify all JS/CSS files are loading (200 status)
- Check if any files return 404
- Look for failed API requests

### 3. Verify Environment Variables
In your Netlify dashboard:
1. Go to **Site Settings** → **Environment Variables**
2. Ensure these are set (if you want to use them):
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL`

**NOTE:** Your app currently has these hardcoded in `src/integrations/supabase/client.ts`, so environment variables are optional.

### 4. Check Build Logs
In Netlify dashboard:
1. Go to **Deploys**
2. Click on the latest deploy
3. Check for any warnings or errors during build

## Common Issues & Solutions

### Issue: White Screen with No Console Errors
**Solution:** The React app might not be mounting.
- Check if `<div id="root"></div>` exists in the HTML
- Verify `index.html` is being served correctly

### Issue: "Failed to fetch" or CORS Errors
**Solution:** Supabase configuration issue.
- Verify your Supabase project is active
- Check Supabase URL is correct
- Ensure Supabase allows requests from your Netlify domain

### Issue: 404 for JS/CSS Files
**Solution:** Build output or base path issue.
- Already fixed with `base: "/"` in `vite.config.ts`
- Ensure `dist` folder is being published

### Issue: ChunkLoadError
**Solution:** Build configuration issue.
- Already addressed with `manualChunks: undefined` in vite config
- May need to clear Netlify build cache

## Testing Locally

To test the production build locally:

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

Then open the URL shown (usually http://localhost:4173) and check if the white screen appears locally.

## Emergency Fixes

### Quick Fix #1: Add Error Boundary
If the app is crashing silently, add error logging to `src/main.tsx`:

```tsx
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

### Quick Fix #2: Simplify App Temporarily
Test if the issue is with routing by temporarily simplifying `App.tsx`:

```tsx
const App = () => <div>Hello World</div>;
```

If this works, the issue is in your routes/components.

## Get Detailed Logs

### Check Netlify Function Logs
If you're using Netlify Functions:
1. Go to **Functions** tab in Netlify
2. Check logs for any errors

### Enable Verbose Logging
Add to `netlify.toml`:
```toml
[build]
  command = "npm install && npm run build -- --verbose"
```

## Next Steps

1. **Check browser console** on your deployed site
2. **Report back** what error messages you see
3. If no errors in console, check the **Network** tab for failed requests
4. Test the production build locally with `npm run build && npm run preview`

## Contact Support

If none of these help, provide:
- Screenshot of browser console errors
- Screenshot of Network tab
- Netlify build log
- URL of your deployed site
