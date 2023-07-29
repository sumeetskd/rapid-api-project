# rapid-api-project

Important Commands:

npm install --save-dev ts-node nodemon

adding nodemon.json

replace testscript in package.json

npm install --save-dev rimraf

add in package.json:
"build": "npm install && rimraf ./build && tsc"
"start": "node run build && node build/index.js "


npm install dotenv -> allows us to use env variables locally

add .env in .gitignore file


NOTE: app.use() acts as a middleware in express

#### toubleshoot .gitignore

To untrack a single file that has already been added/initialized to your repository, i.e., stop tracking the file but not delete it from your system use: git rm --cached filename

To untrack every file that is now in your .gitignore:

First commit any outstanding code changes, and then, run this command:

git rm -r --cached .
This removes any changed files from the index(staging area), then just run:

git add .
Commit it:

git commit -m ".gitignore is now working"