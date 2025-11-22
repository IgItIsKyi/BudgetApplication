---- CONFIGURATION SYSTEM SETTINGS ----

"dev:electron": "npm run transpile:electron; NODE_ENV=development electron ." - MAC configuration for electron builder on package.json
"dev:electron": "npm run transpile:electron && cross-env NODE_ENV=development electron ." - Windows configuration for electron builder on package.json

---- HOW TO USE ----
* MAKE SURE TO CHECK CONFIGURATION SETTINGS BELOW BEFORE! *

npm i
npm run dist:(CHOOSE ONE: mac, win, linux)
npm run dev