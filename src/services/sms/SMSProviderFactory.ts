import { SMSProvider, SMSProviderConfig } from './types';
import { TwilioProvider } from './providers/TwilioProvider';
import { MockProvider } from './providers/MockProvider';

/**
 * Factory for creating SMS providers based on configuration
 */
export class SMSProviderFactory {
  /**
   * Creates an SMS provider instance based on the configuration
   * @param config SMS provider configuration
   * @returns SMSProvider instance
   * @throws Error if provider type is not supported or configuration is invalid
   */
  static createProvider(config: SMSProviderConfig): SMSProvider {
    switch (config.provider) {
      case 'twilio':
        return new TwilioProvider(config);
      
      case 'mock':
        return new MockProvider(config);
      
      case 'aws-sns':
        // TODO: Implement AWS SNS provider when needed
        throw new Error('AWS SNS provider not yet implemented. Use "twilio" or "mock" instead.');
      
      default:
        throw new Error(`Unknown SMS provider: ${config.provider}`);
    }
  }

  /**
   * Creates a provider from environment variables
   * @returns SMSProvider instance
   */
  static createFromEnv(): SMSProvider {
    const provider = (process.env.VITE_SMS_PROVIDER || 'mock') as SMSProviderConfig['provider'];
    
    const config: SMSProviderConfig = {
      provider,
      // Twilio configuration
      accountSid: process.env.VITE_TWILIO_ACCOUNT_SID,
      authToken: process.env.VITE_TWILIO_AUTH_TOKEN,
      fromNumber: process.env.VITE_TWILIO_PHONE_NUMBER,
      // AWS SNS configuration (for future use)
      awsRegion: process.env.VITE_AWS_REGION,
      awsAccessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
    };

    return this.createProvider(config);
  }

  /**
   * Validates that required environment variables are set for the selected provider
   * @returns Object with validation status and error message if any
   */
  static validateEnvConfig(): { valid: boolean; error?: string } {
    const provider = process.env.VITE_SMS_PROVIDER || 'mock';

    if (provider === 'mock') {
      return { valid: true };
    }

    if (provider === 'twilio') {
      const required = ['VITE_TWILIO_ACCOUNT_SID', 'VITE_TWILIO_AUTH_TOKEN', 'VITE_TWILIO_PHONE_NUMBER'];
      const missing = required.filter(key => !process.env[key]);
      
      if (missing.length > 0) {
        return {
          valid: false,
          error: `Missing Twilio configuration: ${missing.join(', ')}. Please check your .env file.`
        };
      }
      return { valid: true };
    }

    if (provider === 'aws-sns') {
      return {
        valid: false,
        error: 'AWS SNS provider is not yet implemented. Please use "twilio" or "mock".'
      };
    }

    return {
      valid: false,
      error: `Unknown SMS provider: ${provider}. Valid options are: "twilio", "mock", "aws-sns"`
    };
  }
}
