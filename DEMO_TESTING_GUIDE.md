# 🧪 **John Deere Promo Code Redemption System - Demo Testing Guide**

## 📋 **Overview**
This guide provides comprehensive testing scenarios for the John Deere Retail Incentive Redemption Portal. Test all paths including happy flows, error states, and edge cases.

---

## 🎯 **Test Scenarios & Sample Codes**

### ✅ **Happy Path - Valid Active Codes**

#### **Test Code: `8BCFM2`**
- **Status**: ACTIVE
- **Customer**: Tim Farmer
- **Email**: tfarmer@example.com
- **Mobile**: (555) 123-4567
- **Promotion**: 20% Off Filters
- **Part ID**: JDFILTER20
- **Expected Flow**: Enter Code → Confirm → Instructions → Invoice Details → Complete

#### **Test Code: `JD5678OIL`**
- **Status**: ACTIVE  
- **Customer**: Sarah Johnson
- **Email**: sjohnson@example.com
- **Mobile**: (555) 987-6543
- **Promotion**: 15% Off Oil Changes
- **Part ID**: JDOIL15
- **Expected Flow**: Enter Code → Confirm → Instructions → Invoice Details → Complete

---

### ❌ **Error States - Invalid/Problem Codes**

#### **Test Code: `JD9012PARTS`**
- **Status**: REDEEMED
- **Customer**: Mike Wilson
- **Expected Result**: Error message "This promo code has already been redeemed" with shake animation
- **Error Type**: Already used code

#### **Test Code: `JD7890REPAIR`**
- **Status**: PENDING
- **Customer**: Linda Martinez
- **Expected Result**: Error message "This promo code is pending approval. Please contact John Deere Corporate for assistance" with shake animation
- **Error Type**: Needs approval

#### **Test Code: `EXPIRED123`**
- **Status**: EXPIRED
- **Customer**: Test Customer
- **Expected Result**: Error message "This promo code has expired" with shake animation
- **Error Type**: Past expiration date

#### **Test Code: `INVALID999`**
- **Status**: N/A (doesn't exist)
- **Expected Result**: Error message "Invalid promo code. Please check the code and try again" with shake animation
- **Error Type**: Non-existent code

#### **Test Code: `` (empty)**
- **Status**: N/A (empty input)
- **Expected Result**: Error message "Please enter a promo code" with shake animation
- **Error Type**: Missing input

---

## 🔄 **Complete Test Workflows**

### **Workflow 1: Successful Redemption**
1. **Enter Code Step**
   - Use quick test button "Valid" or manually enter `8BCFM2`
   - Should see loading spinner for 1 second
   - Should advance to Confirm step with smooth slide transition

2. **Confirm Redemption Step**
   - Verify customer details displayed correctly
   - Check "This promo code is valid" message appears
   - Click "Yes, Redeem This Promotion"
   - Should see loading spinner and advance to Instructions

3. **Instructions Step (Redemption Success)**
   - Title should read "Enter the promotion part ID"
   - Part ID `JDFILTER20` should be displayed prominently
   - Instructions should clarify this is NOT the original promo code
   - Click "I've Applied the Promotion"

4. **Invoice Details Step**
   - Enter Invoice ID (e.g., `INV-2024-001`)
   - Enter discount amount (e.g., `$15.75`)
   - Label should show "[JDFILTER20] promotion"
   - Both fields required for "Complete Redemption" button to activate
   - Click "Complete Redemption"

5. **Complete Step**
   - Success animation with bouncing sparkles icon
   - Summary shows: Promo Code, Customer, Invoice ID, Discount Applied
   - Confirmation text about permanent invalidation
   - "Redeem Another Promotion" button available

### **Workflow 2: Error Recovery**
1. **Test Invalid Code**
   - Use quick test button "Redeemed" or enter `JD9012PARTS`
   - Should see red error banner with alert icon and shake animation
   - Should remain on Enter Code step
   - Error clears when typing in input field

2. **Test Expired Code**
   - Use quick test button "Expired" or enter `EXPIRED123`
   - Should see red error banner with shake animation
   - Can clear and try another code immediately

3. **Test Pending Code**
   - Use quick test button "Pending" or enter `JD7890REPAIR`
   - Should see red error banner with specific corporate contact message
   - Should have shake animation

### **Workflow 3: Navigation & Back Buttons**
1. **Forward/Back Navigation**
   - From Confirm step, click "Back to Enter Code"
   - From Invoice Details, click "Back to Instructions"
   - All transitions should be smooth with 300ms slide animations
   - Auto-focus should work on input fields after transitions

2. **Input Validation**
   - Try submitting empty Invoice ID → Error with shake
   - Try submitting empty discount amount → Error with shake
   - Try invalid discount format → Error with shake
   - Valid formats: `$9.40`, `9.40`, `20%`

---

## 🎨 **UI/UX Testing Points**

### **Visual Elements**
- ✅ Header shows John Deere logo with green pulse indicator
- ✅ Progress bar shows 5 steps (no 6th step)
- ✅ Glassmorphism effects on all containers
- ✅ Consistent John Deere branding (green #367C2B, yellow #FFDE00)
- ✅ White input field-like styling for data display in Confirm step

### **Animations**
- ✅ Step transitions slide left-out then right-in (300ms)
- ✅ Error shake animation (2-frame, 2px movement, 0.5s duration)
- ✅ Loading spinners during async operations
- ✅ Bounce animation on completion step icon
- ✅ Scale animations on button hover
- ✅ Auto-focus timing (400ms after step transition)

### **Responsive Design**
- ✅ Single-column layout (no 3-column panels)
- ✅ Mobile-friendly button sizing and spacing
- ✅ Proper keyboard navigation and focus management

---

## 🚨 **Edge Cases to Test**

### **Input Edge Cases**
1. **Very Long Promo Codes**: Test with 20+ character codes
2. **Special Characters**: Test with codes containing `-`, `_`, `.`
3. **Case Sensitivity**: Test `8bcfm2` vs `8BCFM2`
4. **Whitespace**: Test ` 8BCFM2 ` (with leading/trailing spaces)

### **Rapid Interaction Testing**
1. **Double-Click Protection**: Rapidly click submit buttons
2. **Quick Navigation**: Click Back/Forward buttons during transitions
3. **Input During Loading**: Type while loading spinner is active

### **Browser Testing**
1. **Auto-Focus**: Verify input focus after page load and navigation
2. **Form Validation**: Test browser form validation messages
3. **Button States**: Verify disabled states work correctly

---

## 📱 **Mobile Testing Checklist**

### **Touch Interactions**
- ✅ Quick test buttons easy to tap
- ✅ Input fields have proper touch targets
- ✅ No hover states causing issues on mobile
- ✅ Smooth scrolling and no horizontal overflow

### **Keyboard Behavior**
- ✅ Enter key submits forms properly
- ✅ Tab navigation follows logical order
- ✅ Virtual keyboard doesn't break layout

---

## 🎯 **Performance Testing**

### **Animation Performance**
- ✅ Transitions should be 60fps smooth
- ✅ No layout thrashing during animations
- ✅ Loading states appear immediately
- ✅ No flash of unstyled content

### **State Management**
- ✅ Error states clear appropriately
- ✅ Form data persists during navigation
- ✅ Start Over button resets all state
- ✅ No memory leaks from timers/effects

---

## 🛠 **Demo Features (For Development Only)**

### **Quick Test Buttons**
Located at bottom of Enter Code step:
- **"Valid"** → Sets code to `8BCFM2`
- **"Redeemed"** → Sets code to `JD9012PARTS` 
- **"Pending"** → Sets code to `JD7890REPAIR`
- **"Expired"** → Sets code to `EXPIRED123`

### **Mock Data Available**
All test codes are pre-loaded in `mockPromoCodes` constant:
- 5 different status types (ACTIVE, REDEEMED, PENDING, EXPIRED, Invalid)
- Complete customer data for each scenario
- Realistic promotion details and part IDs

---

## ✅ **Final Checklist Before Going Live**

### **Feature Completeness**
- [ ] All 5 steps work correctly
- [ ] All error states display properly
- [ ] All animations are smooth
- [ ] Form validation is comprehensive
- [ ] Auto-focus works on all steps
- [ ] Back navigation preserves state
- [ ] Progress bar shows correct step

### **Content Accuracy**
- [ ] All copy matches the approved spec
- [ ] No placeholder text remains
- [ ] Support email is configured correctly
- [ ] John Deere branding is consistent
- [ ] Part ID instructions are clear

### **Technical Polish**
- [ ] No console errors
- [ ] All TypeScript types are correct
- [ ] No accessibility warnings
- [ ] Mobile layout works perfectly
- [ ] Loading states are intuitive

---

## 🔧 **Components to Remove for Production**

See the separate production cleanup guide for removing demo-specific components and making the system production-ready. 