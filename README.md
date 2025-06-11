# 🚜 John Deere Retail Incentive Redemption Portal

A Next.js 15.3.3 prototype demonstrating the complete promo code redemption workflow for John Deere dealers with enterprise-grade UI and seamless step-by-step flow.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🏗️ Prototype Architecture

### **Technology Stack**
- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)
- **Demo Data**: Mock promo codes for testing all scenarios

### **Component Structure**
```
src/
├── components/
│   ├── KigoProLite.tsx           # Main application component
│   ├── AuthError.tsx             # Authentication error page
│   ├── layout/
│   │   ├── Background.tsx        # Animated gradient background
│   │   ├── Header.tsx            # John Deere branded header
│   │   ├── ProgressBar.tsx       # 5-step progress indicator
│   │   └── StepContainer.tsx     # Step wrapper with animations
│   ├── panels/
│   │   └── SupportPanel.tsx      # Bottom support email panel
│   └── ui/
│       └── Button.tsx            # Reusable button component
├── app/
│   ├── globals.css              # Global styles & animations
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
└── constants/
    └── steps.ts                 # Step flow definitions
```

### **Data Structure (Mock)**
```typescript
interface PromoCode {
  status: 'ACTIVE' | 'REDEEMED' | 'INVALID' | 'EXPIRED';
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

---

## 🧪 Demo Testing Guide

### **Pre-loaded Test Codes**
The prototype includes mock data for comprehensive testing:

#### ✅ **Valid Active Codes**
- **`8BCFM2`** - Tim Farmer, 20% Off Filters (Part ID: JDFILTER20)
- **`JD5678OIL`** - Sarah Johnson, 15% Off Oil Changes (Part ID: JDOIL15)

#### ❌ **Error State Codes**
- **`JD9012PARTS`** - REDEEMED status → "This promo code has already been redeemed"
- **`JD7890REPAIR`** - INVALID status → "This promo code is invalid. Please check the code and try again."
- **`EXPIRED123`** - EXPIRED status → "This promo code has expired"
- **`INVALID999`** - Non-existent code → "Invalid promo code. Please check the code and try again"
- **``** (empty input) → "Please enter a promo code"

### **5-Step Workflow Testing**

#### **Happy Path Flow (use `8BCFM2`)**
1. **Enter Code** → Loading spinner (1s simulation) → Auto-advance
2. **Confirm Redemption** → Customer details displayed → Click "Yes, Redeem"
3. **Instructions** → Part ID `JDFILTER20` displayed → Click "I've Applied the Promotion"
4. **Invoice Details** → Enter Invoice ID + Discount Amount → Click "Complete Redemption"
5. **Complete** → Success animation + summary → "Redeem Another Promotion"

#### **Error State Testing**
- Test each error code to see different error messages
- Observe shake animations (2px movement, 0.5s duration)
- Verify errors clear when user starts typing
- Test form validation on empty fields

#### **Navigation Testing**
- Use "Back" buttons to test reverse navigation
- Observe smooth slide transitions (300ms timing)
- Verify auto-focus on input fields after step changes
- Test "Start Over" functionality resets all state

---

## 🎨 UI/UX Features Demonstrated

### **Visual Design Elements**
- ✅ **Glassmorphism Effects** - Backdrop blur containers with transparency
- ✅ **John Deere Branding** - Official colors (green #367C2B, yellow #FFDE00)
- ✅ **Animated Background** - Floating shapes with subtle movement
- ✅ **Progress Indicator** - 5-step visual progress bar
- ✅ **Responsive Layout** - Single-column mobile-friendly design

### **Animations & Interactions**
- ✅ **Step Transitions** - Smooth slide left-out, right-in (300ms)
- ✅ **Error Shake** - Visual feedback for validation errors
- ✅ **Loading States** - Spinners during async operations
- ✅ **Hover Effects** - Button scaling and color transitions
- ✅ **Auto-Focus** - Automatic focus management (400ms delay)

### **Form Behaviors**
- ✅ **Real-time Validation** - Errors clear as user types
- ✅ **Enter Key Support** - Submit forms with keyboard
- ✅ **Input Formatting** - Proper currency and text formatting
- ✅ **State Persistence** - Data maintained during back navigation

---

## 🚨 Edge Case Testing

### **Input Validation**
- **Long Codes**: Test 20+ character promo codes
- **Special Characters**: Try codes with `-`, `_`, `.`
- **Case Sensitivity**: Test `8bcfm2` vs `8BCFM2`
- **Whitespace**: Test ` 8BCFM2 ` (leading/trailing spaces)

### **Interaction Testing**
- **Rapid Clicking**: Double-click buttons to test protection
- **Quick Navigation**: Click Back/Forward during transitions
- **Input During Loading**: Type while loading spinner is active

### **Browser Compatibility**
- **Auto-Focus**: Verify input focus works across browsers
- **Form Validation**: Test native browser validation
- **Button States**: Verify disabled states work correctly

---

## 📱 Mobile Testing

### **Responsive Design**
- ✅ Single-column layout optimized for mobile
- ✅ Touch-friendly button sizes (minimum 44px)
- ✅ Proper input field sizing for mobile keyboards
- ✅ No horizontal overflow or layout breaks

### **Touch Interactions**
- ✅ Tap targets are appropriately sized
- ✅ No hover states causing issues on touch devices
- ✅ Smooth scrolling without performance issues
- ✅ Virtual keyboard doesn't break layout

---

## ⚡ Performance Features

### **Optimizations Implemented**
- **Component Memoization** - Prevents unnecessary re-renders
- **Efficient State Management** - Minimal state updates
- **CSS Animations** - Hardware-accelerated transforms
- **Image Optimization** - Next.js automatic optimization
- **Bundle Splitting** - Code splitting for better loading

### **Animation Performance**
- **60fps Transitions** - Smooth step transitions
- **GPU Acceleration** - CSS transforms for animations
- **Minimal Layout Thrashing** - Optimized animation properties
- **Memory Management** - Proper cleanup of timers and effects

---

## 🎯 Key Prototype Learnings

### **Workflow Insights**
- **5-Step Flow** - Optimized from original 6-step design
- **Error Recovery** - Clear path back to retry failed codes
- **Progressive Disclosure** - Information revealed step-by-step
- **Visual Feedback** - Immediate response to all user actions

### **Technical Approach**
- **Mock Data Strategy** - Complete test scenarios without backend
- **Animation Timing** - Balanced speed vs. perceived quality
- **State Management** - Simple but effective hook patterns
- **Component Architecture** - Reusable and maintainable structure

---

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

---

## 📋 For Production Implementation

### **Mock Components to Replace**
- `mockPromoCodes` constant in `KigoProLite.tsx`
- Demo quick-test buttons (development only)
- Simulated loading delays (`setTimeout` calls)

### **Key Integration Points**
- Promo code validation API endpoint
- Customer data retrieval service
- Redemption submission endpoint
- Authentication/authorization system

### **Architecture Notes**
- Component structure designed for easy API integration
- State management ready for async operations
- Error handling framework established
- UI patterns established for consistent experience

---

## 📞 Support

For questions about this prototype:
- **Email**: support@johndeere.com
- **Demo Testing**: Use the test codes provided above
- **Technical Issues**: Check browser console for errors

---

## 📄 License

© 2024 John Deere. Internal prototype for evaluation purposes.
