import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  betaSignup: defineAction({
    input: z.object({
      email: z.string().email("Please enter a valid email address"),
    }),
    handler: async ({ email }, context) => {
      try {
        // Send email notification
        await sendEmailNotification(email);
        
        // Send Telegram notification
        await sendTelegramNotification(email);
        
        return { 
          success: true, 
          message: "Thank you for signing up! You'll be notified when the beta is ready." 
        };
      } catch (error) {
        console.error('Beta signup error:', error);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to process signup. Please try again.',
        });
      }
    },
  }),
};

async function sendEmailNotification(email: string) {
  const emailApiKey = import.meta.env.EMAIL_API_KEY;
  const emailFrom = import.meta.env.EMAIL_FROM || 'noreply@yourdomain.com';
  const emailTo = import.meta.env.EMAIL_TO;
  
  if (!emailApiKey || !emailTo) {
    console.warn('Email credentials not configured');
    return;
  }

  // Using Resend API - you can replace with your preferred email service
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${emailApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: emailFrom,
      to: [emailTo],
      subject: 'New Caffeine Clock Beta Signup',
      html: `
        <h2>New Beta Signup</h2>
        <p>Someone just signed up for the Caffeine Clock beta:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Signed up at:</strong> ${new Date().toLocaleString()}</p>
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email sending failed: ${response.statusText}`);
  }
}

async function sendTelegramNotification(email: string) {
  const telegramBotToken = import.meta.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = import.meta.env.TELEGRAM_CHAT_ID;
  
  if (!telegramBotToken || !telegramChatId) {
    console.warn('Telegram credentials not configured');
    return;
  }

  // Temporary debug: Check what updates your bot has received
  console.log('Checking bot updates to find correct chat ID...');
  try {
    const updatesResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/getUpdates`);
    const updatesData = await updatesResponse.json();
    console.log('Bot updates:', JSON.stringify(updatesData, null, 2));
  } catch (error) {
    console.log('Could not fetch updates:', error);
  }

  // Convert chat ID to number if it's a string
  const chatId = typeof telegramChatId === 'string' ? parseInt(telegramChatId) : telegramChatId;
  
  const message = `🚀 New Caffeine Clock Beta Signup!\n\n` +
                 `📧 Email: ${email}\n` +
                 `⏰ Time: ${new Date().toLocaleString()}`;

  const payload = {
    chat_id: chatId,
    text: message,
  };

  console.log('Sending Telegram message with payload:', JSON.stringify(payload, null, 2));

  const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    console.error('Telegram API error response:', responseData);
    throw new Error(`Telegram sending failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
  }
  
  console.log('Telegram message sent successfully:', responseData);
} 