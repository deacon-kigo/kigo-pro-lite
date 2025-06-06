# Kigo Pro Lite - Product Specification

**Version:** 1.0  
**Last Updated:** December 6, 2024  
**Status:** Final Specification for v1 Launch  

---

## Table of Contents

1. [Overview](#overview)
2. [User Story](#user-story)
3. [User Flow](#user-flow)
4. [Detailed Requirements](#detailed-requirements)
5. [Component Architecture](#component-architecture)
6. [Error Handling](#error-handling)
7. [Design Guidelines](#design-guidelines)
8. [Out of Scope (v2 Features)](#out-of-scope-v2-features)
9. [Technical Specifications](#technical-specifications)

---

## Overview

### Context
To support the new in-store redemption flow—both in person and over the phone—we need a mechanism that allows dealers to confirm the validity of offer tokens and mark them as redeemed.

We originally planned to leverage SMS through Expert Connect, but learned that not all dealers use Expert Connect, and it's not a scalable solution.

We are now building a standalone web form that allows dealers to authenticate, validate promo codes, and redeem them, ensuring a consistent experience for all dealers.

### Key Goals
- Enable real-time promo code validation and redemption for dealers
- Provide consistent experience across all dealer touchpoints
- Ensure accurate status reflection in customer's Perks Hub
- Support both in-person and phone-based redemptions

---

## User Story

**As a dealer**, I want to validate and redeem customer promo codes via a secure web form, so that I can confirm redemptions in real time and ensure the system reflects accurate status in the customer's Perks Hub.

---

## User Flow

### Step Sequence (5 Steps Total)
1. **Enter Code** - Promo code validation
2. **Confirm** - Customer verification and redemption confirmation  
3. **Instructions** - Promotion part ID entry guidance
4. **Details** - Invoice information collection
5. **Complete** - Success confirmation

### Detailed Flow
```
[Authentication] → [Enter Promo Code] → [Validate & Confirm Customer] → 
[Show Part ID Instructions] → [Collect Invoice Details] → [Success Summary]
```

---

## Detailed Requirements

### 🔐 **Authentication & Entry Point**
- **Primary Access**: Link within Deere dealer experience (auto-authenticated)
- **Secondary Access**: Direct URL access requires authentication
- **Unauthenticated State**: Display login screen directing to Deere authentication

### 🎨 **Header & Branding**
- **Title**: "Retail Incentive Redemption Portal"
- **Subtitle**: "John Deere Dealer System" 
- **Dealer Info Display**: Show authenticated dealer employee information
- **Logo**: John Deere branding (JD logo with green/yellow styling)
- **Support Link**: ❌ **REMOVED** - No support link in header (PM Feedback Override)

### 📝 **Step 1: Enter Code**
- **Title**: "Enter Promo Code"
- **Field**: Single input for promo code entry
- **Validation**: Real-time validation against promo database
- **Demo Codes**: Quick-test buttons for development/training
- **Layout**: ✅ **Centered single-column layout** (PM Feedback Override)

### ✅ **Step 2: Confirm Redemption**
- **Title**: ✅ **"This promo code is valid"** (PM Feedback Override)
- **Emphasis**: Focus on unique promo code validity, not general promotion
- **Customer Verification**: Display first name, last name, email, mobile for identity confirmation
- **Content Integration**: ✅ **Combine tip content into main body** (PM Feedback Override)
- **Warning Message**: ✅ **"This action will permanently invalidate the promo code"** (PM Feedback Override)
- **Action**: Single "Yes, Redeem This Promotion" button

### 📋 **Step 3: Instructions**
- **Title**: ✅ **"Enter the promotion part ID"** (PM Feedback Override)
- **Content Focus**: ✅ **Clarify this is promotion part ID, NOT the original promo code** (PM Feedback Override)
- **Instructions**: Clear guidance on entering part ID into dealer invoice system
- **Part ID Display**: Show specific part ID (e.g., "JDFILTER20")

### 💼 **Step 4: Details**
- **Title**: "Invoice Details"
- **Dealer Information**: ❌ **REMOVED** - No dealer info section (PM Feedback Override)
- **Invoice ID Field**: Text input for invoice reference
- **Discount Amount Field**: ✅ **"Enter the discount amount that resulted from applying the [PROMOTION_CODE] promotion"** (PM Feedback Override)
- **Validation**: Ensure proper currency format

### 🎉 **Step 5: Complete**
- **Title**: "Redemption Complete!"
- **Summary**: Display all key transaction details
- **Action**: "Redeem Another Promotion" button
- **Status**: Confirmation that promo code is invalidated and recorded

### 🆘 **Support Section**
- **Location**: ✅ **Bottom of interface** (PM Feedback Override)
- **Contact Method**: ✅ **Email only** (PM Feedback Override)
- **Removed Elements**: ❌ **No live chat, no 24/7 claims, no response time** (PM Feedback Override)
- **Simple Contact**: Single email support option

---

## Component Architecture

### 🏗️ **Layout Structure**
```
[Header - No Support Link]
[Progress Bar - 5 Steps]
[Main Content Area - Centered/Single Column]
[Support Section - Bottom]
```

### 📦 **Component Hierarchy**
```
KigoProLite/
├── Layout/
│   ├── Background (animated)
│   ├── Header (dealer info, no support link)
│   ├── ProgressBar (5-step indicator)
│   └── StepContainer (single-column layout)
├── UI/
│   └── Button (reusable with variants)
├── Steps/
│   ├── EnterCodeStep
│   ├── ConfirmRedemptionStep
│   ├── InstructionsStep
│   ├── DetailsStep
│   └── CompleteStep
└── Panels/
    └── SupportPanel (email only, bottom placement)
```

### 🗂️ **Archived Components (v2)**
```
archived/
├── AvailablePromotionsPanel.tsx
├── DealerSupportPanel.tsx (full version)
└── StepContainer-3column.tsx
```

---

## Error Handling

### ❌ **Invalid Promo Codes**
- **Message**: "Invalid promo code. Please check the code and try again."
- **Action**: Allow retry with field focus

### ⏰ **Expired Codes**  
- **Message**: "This promo code has expired."
- **Action**: Clear field and show error state

### 🔄 **Already Redeemed**
- **Message**: "This promo code has already been redeemed."
- **Action**: Prevent further processing

### ⏳ **Pending Codes**
- **Message**: "This promo code is pending approval. Please contact John Deere Corporate for assistance."
- **Action**: Provide contact guidance

### 📝 **Validation Errors**
- **Empty Fields**: "Please enter [field name]"
- **Invalid Format**: "Please enter a valid [field type] (e.g., $9.40)"
- **Network Issues**: "Connection error. Please try again."

---

## Design Guidelines

### 🎨 **Visual Design**
- **Style**: Glassmorphism with backdrop blur effects
- **Colors**: John Deere green (#367C2B), yellow accents (#FFDE00)
- **Typography**: Modern, clean fonts with good hierarchy
- **Shadows**: Subtle elevation with colored shadows
- **Animations**: Smooth transitions, floating background elements

### 📱 **Responsive Design**
- **Mobile**: Single-column, touch-optimized
- **Tablet**: Adapted layout with appropriate spacing  
- **Desktop**: Optimized for efficiency and clarity
- **Breakpoints**: Standard responsive breakpoints

### ♿ **Accessibility**
- **Focus Management**: Auto-focus on step transitions
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliance

---

## Out of Scope (v2 Features)

### 🚫 **Removed for v1 Launch**
1. **Available Promotions Panel**
   - Interactive promotion browser
   - "Use This Code" quick-select buttons
   - Promotion status indicators

2. **Advanced Dealer Support**
   - Live chat integration
   - 24/7 support claims
   - Response time guarantees
   - Multi-channel support options

3. **Dealer Information Management**
   - Editable dealer name/location
   - Dealer profile management
   - Location switching

4. **Final Verification Step**
   - Complete transaction review
   - Multi-section confirmation
   - Detailed verification flow

### 🔮 **Planned for v2**
- Enhanced promotion discovery
- Advanced support integration
- Dealer profile management
- Analytics and reporting
- Bulk operations
- Advanced search and filtering

---

## Technical Specifications

### 🛠️ **Technology Stack**
- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)
- **Deployment**: Vercel

### 🗄️ **Data Structure**
```typescript
interface PromoCode {
  status: 'ACTIVE' | 'REDEEMED' | 'PENDING';
  customer: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  promo: string;
  accountNumber: string;
  discount: number;
  discountType: 'percent' | 'fixed';
  item: string;
  partId?: string;
  referenceNumber?: string;
}
```

### 🔄 **Step Flow Constants**
```typescript
const STEPS = {
  ENTER_CODE: 'enter_code',
  CONFIRM_REDEMPTION: 'confirm_redemption', 
  REDEMPTION_SUCCESS: 'redemption_success',
  ENTER_INVOICE_DETAILS: 'enter_invoice_details',
  COMPLETE: 'complete'
} as const;
```

### 📂 **File Structure**
```
src/
├── components/
│   ├── ui/Button.tsx
│   ├── layout/
│   │   ├── Background.tsx
│   │   ├── Header.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StepContainer.tsx
│   ├── panels/
│   │   ├── SupportPanel.tsx
│   │   └── archived/
│   ├── steps/
│   └── KigoProLite.tsx
├── constants/steps.ts
├── data/mockData.ts
└── app/
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
```

---

## Implementation Notes

### 🎯 **Priority Order**
1. **Phase 1**: Architecture changes (layout, step removal)
2. **Phase 2**: Content updates (copy changes, support simplification)  
3. **Phase 3**: Flow optimization (navigation, error handling)

### ✅ **Success Criteria**
- 5-step flow completion under 2 minutes
- Clear error messaging and recovery
- Responsive design across all devices
- Successful promo code validation and redemption
- Accurate transaction recording

### 🧪 **Testing Strategy**
- Demo codes for various states (valid, redeemed, pending, invalid)
- Cross-device testing (mobile, tablet, desktop)
- Error state validation
- Accessibility compliance testing
- Performance optimization

---

**Document Status**: ✅ Final Specification  
**Next Steps**: Begin Phase 1 implementation with component architecture changes

---

*This specification serves as the single source of truth for Kigo Pro Lite v1 development. All implementation decisions should reference this document.* 