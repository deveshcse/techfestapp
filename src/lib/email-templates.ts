export const getPasswordResetEmailHtml = (userName: string, url: string) => {
    return `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e1e4e8; border-radius: 12px; background-color: #ffffff; color: #1a1a1a;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-flex; align-items: center; gap: 10px;">
          <span style="display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center; border-radius: 8px; background-color: #e85d0c; color: #ffffff;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 17.5L12 5l7 12.5H5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
              <path d="M9.2 13.5h5.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </span>
          <h1 style="font-size: 22px; font-weight: 700; margin: 0; color: #1a1a1a; font-family: Poppins, Inter, sans-serif;">TechFestApp</h1>
        </div>
      </div>
      
      <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Reset your password</h2>
      
      <p style="font-size: 16px; line-height: 24px; color: #4b5563; margin-bottom: 24px;">
        Hello <strong>${userName}</strong>,<br><br>
        We received a request to reset your password for your TechFestApp account. Click the button below to choose a new one.
      </p>
      
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${url}" style="display: inline-block; padding: 12px 32px; font-size: 16px; font-weight: 600; color: #ffffff; background-color: #000000; border-radius: 8px; text-decoration: none;">
          Reset Password
        </a>
      </div>
      
      <p style="font-size: 14px; line-height: 20px; color: #6b7280; margin-bottom: 24px;">
        If you didn't request a password reset, you can safely ignore this email. This link will expire in 1 hour.
      </p>
      
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin-bottom: 24px;" />
      
      <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
        &copy; 2026 TechFestApp. All rights reserved.
      </p>
    </div>
  `;
};
