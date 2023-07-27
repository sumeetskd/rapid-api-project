# rapid-api-project

Important Commands:

npm install --save-dev ts-node nodemon

adding nodemon.json

replace testscript in package.json

npm install --save-dev rimraf

add in package.json:
"build": "npm install && rimraf ./build && tsc"
"start": "node run build && node build/index.js "