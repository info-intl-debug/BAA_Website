# Membership Form - Email Setup Guide

## Form Features ✅
- Modal popup on "Apply Now" button click
- 3 membership categories with different fees
- Form validation
- Email sending to info@baa.org.in (CC: gs@baa.org.in)
- Success/error messages
- Responsive design

## Email Configuration Options

### Option 1: Using Resend (Recommended for Vercel) ⭐

**Setup:**
1. Go to [resend.com](https://resend.com) and create an account
2. Get your API key from the dashboard
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=your_api_key_here
   ```

**Pros:**
- Easy to set up
- Works great with Vercel
- Built for transactional emails
- Reliable delivery

### Option 2: Using SMTP (Gmail, Custom Email, etc.)

#### Gmail Setup:
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env.local`:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   ```

#### Any SMTP Server:
```
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-password
EMAIL_FROM=noreply@baa.org.in
```

### Option 3: SendGrid

1. Create account at [sendgrid.com](https://sendgrid.com)
2. Get API key
3. Update the API route to use SendGrid's SDK

## Testing Email

1. Fill out the form in development
2. Application data will be logged to console
3. Once email is configured, you'll see "Email sent" message

## Form Workflow

```
User clicks "Apply Now" button
        ↓
Modal popup appears with form
        ↓
User fills form details
        ↓
User clicks "Submit Application"
        ↓
Data sent to /api/membership endpoint
        ↓
Server sends email to info@baa.org.in + cc gs@baa.org.in
        ↓
User sees success message
        ↓
Modal closes automatically
```

## Email Template

The email includes:
- Membership Category selected
- Full Name, Email, Phone
- Company Name
- Type of Business
- Business Address
- Additional Information (if provided)
- Reply-To: Applicant's email

## Security Notes

- Never commit `.env.local` (it's in .gitignore)
- Keep email credentials secure
- Use environment variables for all sensitive data
- API route validates all required fields

## Troubleshooting

**Email not sending:**
1. Check if email credentials are set in `.env.local`
2. Check console logs for errors
3. Verify the email service is working
4. Check spam/junk folder

**Form not submitting:**
1. Check browser console for errors
2. Verify all required fields are filled
3. Check network tab in DevTools
4. Ensure `/api/membership` route is accessible

## Next Steps

1. Choose an email service (Resend recommended)
2. Add API key to `.env.local`
3. Test the form by submitting an application
4. Verify email is received at info@baa.org.in and gs@baa.org.in
