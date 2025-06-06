// Application steps
export const STEPS = {
  ENTER_CODE: 'enter_code',
  CONFIRM_REDEMPTION: 'confirm_redemption',
  REDEMPTION_SUCCESS: 'redemption_success',
  ENTER_INVOICE_DETAILS: 'enter_invoice_details',
  FINAL_CONFIRMATION: 'final_confirmation',
  COMPLETE: 'complete'
} as const;

export type StepType = typeof STEPS[keyof typeof STEPS]; 