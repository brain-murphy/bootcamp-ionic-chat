# Ionic Chat
### GT CoC Software Development Bootcamp
Ionic implementation of the GT CoC Software Development Bootcamp application.

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
```
npm install -g cordova ionic gulp
```
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

## Running
There are several ways to run an Ionic project. 

### serve
The easiest way by far is to navigate to your
project's root directory using the command prompt or terminal, and type:
```
ionic serve
```
This will open the application in a browser window. Additionally, when you run ionic serve, 
Gulp will watch your project for any changes you make. When you save your changes, the app
in the browser window will automatically reload, so you can see the changes without any 
additional work

### Emulate Android
If you have the Android sdk installed, running your application on an Android device is as
easy as typeing:
```
ionic emulate android
```
Ionic will automatically configure your project for Android and run it in an emulated Android
device on your computer.

### Emulate iOS
If you running a Mac, and have XCode installed, then running the application on a simulated 
iOS device requires just these steps:
```
ionic platform add ios
ionic build ios
ionic emulate ios
```
This will configure the project for iOS and run it in a simulated iOS device on your computer.