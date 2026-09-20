ROMANTIC APOLOGY WEBSITE — README
==================================

Thank you for using this website! Follow these simple steps to personalize it.


1. HOW TO OPEN THE WEBSITE
--------------------------
Double-click "index.html" to open it in your web browser.

No server or internet connection is required (except for loading Google Fonts
the first time — the site works offline after that).


2. WHERE TO PUT YOUR PHOTOS
---------------------------
Place your photos inside the "images" folder:

  apology-website/images/

Name them exactly like this (or edit script.js to use your own names):

  photo1.jpg
  photo2.jpg
  photo3.jpg
  ... up to photo12.jpg

Supported formats: JPG, JPEG, PNG, WEBP, GIF

If a photo is missing, the website shows a beautiful placeholder that says
"Your Memory ❤️" instead of a broken image icon.


3. HOW TO ADD OR REMOVE PHOTOS
------------------------------
Open "script.js" and find the CONFIG section at the top.

Look for the "photos" array:

  photos: [
    'images/photo1.jpg',
    'images/photo2.jpg',
    ...
  ],

Add new paths to include more photos, or remove lines to show fewer.
The gallery layout adjusts automatically.


4. WHERE TO PUT BACKGROUND MUSIC
--------------------------------
Place your music file here:

  apology-website/audio/background-music.mp3

The music does NOT play automatically (browsers block autoplay).
Click the floating music button (🎵) in the bottom-right corner to play/pause.

If no music file exists, the website works normally — the button will appear
dimmed until you add a file.

To use a different filename, edit this line in script.js:

  musicPath: 'audio/background-music.mp3',


5. HOW TO CHANGE THE TEXT
-------------------------
Open "script.js" and edit the CONFIG object at the top of the file.
Everything is clearly labeled:

  - opening.title          → Opening screen headline
  - opening.subtitle       → Opening screen subtitle
  - apologyLines           → "I'm Truly Sorry" section sentences
  - memoryMessage          → Memory message section
  - promiseText            → "My Promise To You" card text
  - deepApologyLines       → "I'm sorry." section lines
  - finalTitle             → Final section heading
  - finalText              → Final section paragraphs
  - oneMoreMessage         → "One More Thing" hidden message

Each section has comments explaining what to change.


6. HOW TO CHANGE COLORS
-----------------------
In script.js, edit the CONFIG.colors object:

  colors: {
    deepRed: '#8b1538',
    romanticRed: '#c41e3a',
    softPink: '#f4a7b9',
    ...
  }

You can also edit CSS variables directly in style.css under :root { }.


7. PROJECT STRUCTURE
--------------------
apology-website/
├── index.html          Main page — open this in your browser
├── style.css           All styling and animations
├── script.js           All interactivity + CONFIG (customize here)
├── images/             Put your photos here
├── audio/              Put background-music.mp3 here
└── README.txt          This file


8. HOW TO PUBLISH ONLINE (OPTIONAL)
-----------------------------------
Want to share this website with someone? Here are two free options:

OPTION A — GitHub Pages (free, easy)
  1. Create a free account at github.com
  2. Create a new repository (e.g. "apology-website")
  3. Upload all files from this folder to the repository
  4. Go to Settings → Pages → Source: "main" branch → Save
  5. Your site will be live at: https://yourusername.github.io/apology-website/

OPTION B — Vercel (free, fast)
  1. Create a free account at vercel.com
  2. Click "Add New Project"
  3. Import your GitHub repo OR drag-and-drop this folder
  4. Click Deploy — done!

Both options work with plain HTML/CSS/JS — no build step needed.


9. TIPS
-------
- Test on your phone by sending yourself the link after publishing
- Replace all 12 photos for the best gallery effect
- Choose a soft, romantic song for background music
- Read through all the text in script.js and personalize every line

Made with love ❤️
