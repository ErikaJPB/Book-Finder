# BookCove

BookCove is a web application built with Next.js, TypeScript and TailwindCSS. The app allows users to search for books using the Google Books API. The user can sign up with their google account, login, have a profile and save their favorite books.

## Firebase

Firebase is used to handle the user authentication through the Google Authentication Provider and to store the user data, including their favorite books.

The following enviroment variables are used to configure Firebase in the app:

``` 
NEXT_PUBLIC_FIREBASE_API_KEY: API key for Firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: Firebase authentication domain 
NEXT_PUBLIC_FIREBASE_PROJECT_ID: Firebase project 
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: Firebase storage bucket 
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: Firebase messaging sender 
NEXT_PUBLIC_FIREBASE_APP_ID: Firebase app 
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: Firebase measurement ID 
```

## Google Books API

The Google Books API is used to search for books and retrieve book information like the title, author, description and cover.
The following enviroment variable is used to configure the Google Books API in the app:

``` 
NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY: API key for the Google Books API 
```

To run the app locally, you will need to provide valid API keys for Firebase and the Google Books API in a .env file in the root directory of the app.

### Getting Started

To run the app locally, follow these steps:

  1. Clone the repository

```
git clone https://github.com/ErikaJPB/Book-Finder 
```

  2. Install dependencies:

``` 
cd book-finder 
npm install
```

  3. Create an .env file in the root directory of the app and add your API Keys:

```
NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY 
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN 
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID 
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET 
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID 
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID 
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID
```
  4. Start the development server:

```
npm run dev
```

The app should now be running at [http://localhost:3000](http://localhost:3000).

## Author

Developed By [ErikaJPB](https://github.com/ErikaJPB)
