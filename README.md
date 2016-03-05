# Ionic Chat
### GT CoC Software Development Bootcamp
Ionic implementation of the GT CoC software development bootcamp application.

## Installation
You will need to install Node.js, Cordova, Ionic, and Gulp

### Node.js
Go to [the node website](https://nodejs.org/en/) and install 
***version 4***.

### Cordova, Ionic and Gulp
Now that you have Node.js installed, you have access to ***npm***.
npm, or Node package manager, is a tool that helps you manage the code
that you need in your Node.js projects.

To Cordova, Ionic and Gulp are all Node.js packages, so you can install
them using npm. Open up a command prompt or terminal, and type:

`npm install -g cordova ionic gulp`

This command says, "Hey npm, download cordova, ionic, and gulp over the internet 
and install them." The `-g` tells npm to install the packages 'globally'. 
Basically, this means that you will be able to use any of these packages you installed 
from the command line.

## Project Structure
Ionic projects are essentially web sites. Thus, most of our code exists within the `/www` 
directory. If you open this directory, you can see the index.html file. Although our app
can have multiple pages, this is the only html page that will be served. All of the rest
of the pages are embedded within it. 
- The `/www/css` directory will contain our custom styles (right now it only contains an
 empty file). 
- The `/www/js` directory will contain all of our application code. This is where the code
 that runs the app will go. 
- The `/www/lib` directory will contain the code that we need for the application, but that
 we did not write. For example, the code that runs the Angular framework will go here.
 (note: this directory is for front end js libraries, not for server/backend ones)
- The `/www/templates` directory will contain the html of the different pages of our app.
 Remember that these html files will not served. They will be embedded within the 
 `/www/index.html` page to be displayed.
