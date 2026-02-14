# Hospital Finder App - Prototype

A React Native/Expo application with authentication screens and a hospital discovery feature using dummy data.

## 📱 Screens Created

### 1. **Login Screen** (`app/(auth)/login.tsx`)
- Email and password input fields
- Login button with loading state
- Link to sign up screen
- Form validation
- Simulated API call (1 second delay)

### 2. **Sign Up Screen** (`app/(auth)/signup.tsx`)
- Full name, email, password, and confirm password fields
- Password confirmation validation
- Sign up button with loading state
- Link back to login screen
- Form validation with error alerts

### 3. **Home Screen - Hospital Finder** (`app/(home)/home.tsx`)
- **Top 10 Dummy Hospitals**: Pre-populated with realistic hospital data
- **Search Functionality**: Search by hospital name or city
- **Location Filter**: Filter hospitals by city with "All" option
- **Hospital List View** with:
  - Hospital name and location
  - Rating badge (with star)
  - Distance information
  - Number of beds
  - Specialties (tags)
  - Tap to view more details
- **Logout Button**: In the header to sign out

## 🏥 Dummy Hospital Data

The app includes 10 hospitals across major Indian cities:

1. **Apollo Hospitals** - Hyderabad (4.8 rating)
2. **Max Healthcare** - Delhi (4.7 rating)
3. **Fortis Hospital** - Mumbai (4.6 rating)
4. **AIIMS** - New Delhi (4.9 rating)
5. **Manipal Hospital** - Bangalore (4.7 rating)
6. **Medanta Hospital** - Gurgaon (4.8 rating)
7. **Asian Hospital** - Delhi (4.5 rating)
8. **Jaslok Hospital** - Mumbai (4.6 rating)
9. **Aster CMI Hospital** - Bangalore (4.7 rating)
10. **Lilavati Hospital** - Mumbai (4.8 rating)

## 🔐 Authentication Flow

- **Initial Screen**: Login (with option to go to Sign Up)
- **Sign Up**: Create new account → Redirects to Login
- **Login**: Enter credentials → Navigate to Home
- **Logout**: Logout button on home screen → Back to Login

The authentication state is managed using React Context (`context/auth-context.tsx`).

## 🛠️ Tech Stack

- **Framework**: Expo Router (v6)
- **Language**: TypeScript
- **UI Components**: React Native
- **Navigation**: Expo Router with Stack & Group layouts
- **State Management**: React Context API

## 📁 Project Structure

```
app/
  _layout.tsx          # Root navigation with auth state
  (auth)/              # Authentication group
    _layout.tsx
    login.tsx          # Login screen
    signup.tsx         # Sign up screen
  (home)/              # Home group
    _layout.tsx
    home.tsx           # Hospital finder home screen
  
context/
  auth-context.tsx     # Authentication context provider
```

## 🚀 Running the App

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npm start
   ```

3. Open on iOS/Android:
   ```bash
   npm run ios
   # or
   npm run android
   ```

## ✨ Features

- ✅ Sign up with validation
- ✅ Login flow
- ✅ Hospital search and filtering
- ✅ Location-based filtering
- ✅ Hospital detail view (tap card to see more)
- ✅ Logout functionality
- ✅ Responsive UI
- ✅ Theme support (dark/light mode)

## 📝 Notes

- All data is dummy data for prototype purposes
- Search is case-insensitive
- Filtering works in combination with search
- Authentication is simulated (no real backend)
- All screens have proper loading states and error handling

## 🔄 Next Steps for Production

- Connect to real backend API
- Implement actual authentication (JWT tokens)
- Add real hospital database
- Implement geolocation for distance calculation
- Add hospital booking functionality
- Add user profiles and preferences
- Implement ratings and reviews
