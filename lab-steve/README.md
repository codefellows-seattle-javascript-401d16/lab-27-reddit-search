## Lab-Steve Lab-26 Documentation - React Cowsay Browser App

### This app is built on the MERN stack utilizing webpack and returns a new "faker" hacker phrase every time a button is pushed.

  * Installation:
    * Install Node.JS: `sudo apt-get install node`
    * Install Yarn: `sudo apt-get install yarn`
    * Clone this repository: `git clone https://github.com/0smium/lab-26-cowsay.git`
    * Navigate to the newly created 'lab-26-cowsay' folder
    * Navigate to the the 'lab-steve' directory
    * Install all node dependencies for the project: `yarn install`
    * Use:
      * `yarn watch`
      * `npm start`
      * Navigate to `localhost:8080` in your browser to use the app.
      * When done, in the server terminal window, type `ctrl+c` to end the server.

  * Modules:
    * webpack.config.js establishes the configuration for webpack.
    * src/main.js is the entry point for the app and defines states and outputs publicly facing HTML.

  * Key NPM Packages:
    * cowsay-browser: produces cowsay output for display in an HTML 'pre' element.
    * faker: produces "fake" text as input for cowsay.

  * Yarn Scripts:
    * "build": "webpack" - Exports static files to ./build necessary to run the app.
    * "watch": "webpack-dev-server --inline --hot" - Runs the app from memory (instead of static files).
