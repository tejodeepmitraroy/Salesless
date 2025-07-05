export type EmailType =
  | "email_verification"
  | "password_reset"
  | "order_confirmation";

export interface EmailPayload {
  to: string;
  type: EmailType;
  data: Record<string, any>;
}
