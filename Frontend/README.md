# Blog Technical Test - React Application

![Design Preview](https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=400&fit=crop)

A modern, minimalist blog application built with React, Vite, Tailwind CSS, and Firebase. Features include post browsing, tag filtering, Google authentication, and user directory.

## 🎨 Design Inspiration

**Design Style:** Minimalist & Professional  
**Color Palette:** 
- Primary: Blue (#2563EB)
- Background: Light Gray (#F9FAFB)
- Text: Dark Gray (#111827)
- Accents: Purple gradient for user cards

**Design Reference:** Clean, card-based layout inspired by modern blogging platforms like Medium and Dev.to with emphasis on readability and white space.

## 🚀 Features

### ✅ Implemented Features

1. **Post Listing**
   - Display posts with main image, tags, and author information
   - Responsive card-based grid layout
   - Pagination support
   - Like counter display

2. **Comments Modal**
   - Click on any post to view comments
   - Modal overlay with smooth animations
   - User profile pictures and timestamps
   - Handles posts with no comments gracefully

3. **Tag Filtering**
   - Display all available tags
   - Filter posts by selected tag
   - "All Posts" option to reset filter
   - Visual feedback for active tag

4. **Google Authentication**
   - Protected routes using Firebase Auth
   - Google Sign-In integration
   - Persistent login state
   - Logout functionality

5. **User Directory (Protected)**
   - Requires authentication to access
   - Grid layout of user profiles
   - Profile pictures and basic information
   - Pagination for user list
   - **Data persistence in Firebase Firestore**

6. **Firebase Integration**
   - User authentication with Google
   - Firestore database for user data persistence
   - Real-time data synchronization

## 🛠️ Technologies Used

- **React 18.2** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Authentication and Firestore database
- **DummyAPI** - Blog posts and user data
- **GitHub Pages** - Deployment

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blog-technical-test.git
cd blog-technical-test
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (see `.env.example`):
```env
VITE_DUMMYAPI_APP_ID=your_app_id
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

## 🔧 Configuration

### DummyAPI Setup
1. Go to [DummyAPI](https://dummyapi.io/)
2. Create an account
3. Get your `app-id` from the dashboard
4. Add it to your `.env` file

### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication → Google Sign-In
4. Enable Firestore Database
5. Get your config from Project Settings
6. Add credentials to `.env` file

**Important Firebase Rules:**
Add these rules in Firestore Database:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 📁 Project Structure

```
blog-technical-test/
├── src/
│   ├── components/
│   │   ├── CommentsModal.jsx    # Modal for displaying post comments
│   │   ├── Navbar.jsx           # Navigation bar with auth status
│   │   ├── PostCard.jsx         # Individual post card component
│   │   └── TagFilter.jsx        # Tag filtering component
│   ├── pages/
│   │   ├── Home.jsx             # Main posts listing page
│   │   ├── Login.jsx            # Google authentication page
│   │   └── Users.jsx            # Protected user directory
│   ├── context/
│   │   └── AuthContext.jsx      # Firebase auth context provider
│   ├── config/
│   │   └── firebase.js          # Firebase configuration
│   ├── services/
│   │   └── api.js               # DummyAPI service functions
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # App entry point
│   └── index.css                # Tailwind CSS imports
├── .env.example                 # Environment variables template
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚢 Deployment

### GitHub Pages Deployment

1. Update `vite.config.js` with your repository name:
```javascript
base: '/your-repo-name/'
```

2. Build and deploy:
```bash
npm run build
npm run deploy
```

3. Enable GitHub Pages in repository settings:
   - Settings → Pages → Source: gh-pages branch

## 📝 Development Notes

### Hourly Commits
This project was developed following best practices with hourly commits:
- Hour 1: Initial setup, API integration, basic structure
- Hour 2: Post listing, tag filtering, comments modal
- Hour 3: Firebase setup, authentication, protected routes
- Hour 4: User directory, Firestore integration, styling refinement

### Key Decisions

1. **Modal vs Route for Comments:** Chose modal for better UX and faster interaction
2. **Tailwind CSS:** Provides rapid development with consistent design
3. **Firebase:** Reliable authentication and real-time database capabilities
4. **Component Structure:** Modular design for maintainability

### Challenges Solved

- Proper Firebase configuration with environment variables
- Protected route implementation with context API
- Efficient API calls with proper error handling
- Responsive design across all device sizes

## 🎯 Future Enhancements

- [ ] Search functionality for posts
- [ ] User profiles with detailed information
- [ ] Bookmarking favorite posts
- [ ] Dark mode support
- [ ] Infinite scroll instead of pagination
- [ ] Rich text editor for comments
- [ ] Social sharing features

## 📧 Environment Variables

Remember to share your `.env` file via email as requested. Never commit it to the repository.

## 🙏 Acknowledgments

- [DummyAPI](https://dummyapi.io/) - For providing the test data
- [Unsplash](https://unsplash.com/) - For beautiful placeholder images
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Firebase](https://firebase.google.com/) - For authentication and database services

## 📄 License

This project was created as a technical test and is available for review purposes.

---

**Developer:** [Your Name]  
**Date:** January 2026  
**Total Development Time:** 4 hours
