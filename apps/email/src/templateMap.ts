import { render } from '@react-email/render';
import EmailVerification from './emails/transaction/auth/EmailVerification';
import PasswordReset from './emails/transaction/auth/PasswordReset';

export const templateMap = {
  email_verification: {
    subject: 'Verify your email address',
    render: (data: any) => render(<EmailVerification {...data} />),
  },
  password_reset: {
    subject: 'Reset your password',
    render: (data: any) => render(<PasswordReset {...data} />),
  },
  order_confirmation: {
    subject: 'Order Confirmation',
    render: (data: any) => render(<OrderConfirmation {...data} />),
  },
};