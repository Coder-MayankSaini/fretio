// SMS Service for OTP verification
// In production, integrate with Twilio, AWS SNS, or other SMS providers

class SMSService {
  private static instance: SMSService;
  private otpStore = new Map<string, { otp: string; expires: number; attempts: number }>();

  static getInstance(): SMSService {
    if (!SMSService.instance) {
      SMSService.instance = new SMSService();
    }
    return SMSService.instance;
  }

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTP(phoneNumber: string): Promise<{ success: boolean; message: string }> {
    const otp = this.generateOTP();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
    
    // Store OTP with expiry and attempt counter
    this.otpStore.set(phoneNumber, { otp, expires, attempts: 0 });

    try {
      // Simulate SMS sending delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In development, log the OTP to console
      console.log(`🔐 OTP for ${phoneNumber}: ${otp}`);
      
      // In production, integrate with SMS provider:
      // await this.sendSMSViaTwilio(phoneNumber, otp);
      // await this.sendSMSViaAWS(phoneNumber, otp);
      
      return {
        success: true,
        message: `OTP sent to ${phoneNumber.slice(-4).padStart(phoneNumber.length, '*')}`
      };
    } catch (error) {
      console.error('SMS sending error:', error);
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.'
      };
    }
  }

  async verifyOTP(phoneNumber: string, userOTP: string): Promise<{ success: boolean; message: string }> {
    const stored = this.otpStore.get(phoneNumber);
    
    if (!stored) {
      return {
        success: false,
        message: 'OTP not found. Please request a new one.'
      };
    }

    // Check if OTP has expired
    if (Date.now() > stored.expires) {
      this.otpStore.delete(phoneNumber);
      return {
        success: false,
        message: 'OTP has expired. Please request a new one.'
      };
    }

    // Check attempt limit
    if (stored.attempts >= 3) {
      this.otpStore.delete(phoneNumber);
      return {
        success: false,
        message: 'Too many failed attempts. Please request a new OTP.'
      };
    }

    // Verify OTP
    if (stored.otp === userOTP) {
      this.otpStore.delete(phoneNumber);
      return {
        success: true,
        message: 'Phone number verified successfully!'
      };
    } else {
      // Increment attempts
      stored.attempts++;
      this.otpStore.set(phoneNumber, stored);
      
      return {
        success: false,
        message: `Invalid OTP. ${3 - stored.attempts} attempts remaining.`
      };
    }
  }

  // Placeholder for Twilio integration
  private async sendSMSViaTwilio(phoneNumber: string, otp: string): Promise<void> {
    // const client = twilio(accountSid, authToken);
    // await client.messages.create({
    //   body: `Your Fretio verification code is: ${otp}. Valid for 5 minutes.`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phoneNumber
    // });
  }

  // Placeholder for AWS SNS integration
  private async sendSMSViaAWS(phoneNumber: string, otp: string): Promise<void> {
    // const sns = new AWS.SNS();
    // await sns.publish({
    //   Message: `Your Fretio verification code is: ${otp}. Valid for 5 minutes.`,
    //   PhoneNumber: phoneNumber
    // }).promise();
  }
}

export const smsService = SMSService.getInstance();