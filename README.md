# Django/React Hybrid App
## An App demonstrated CRUD operations on a Piano Inventory
### HES CSCI E-33a
You don't have to give up all the advantages of using a fully-featured framework, like Django, in order to take advantage of the React.  This application serves a React app as a static asset served in a Django tmeplate.  In order to build such an app you'll need the following:
1. A functional Django project and app
2. NPM, a package manager
3. Webpack, a bundler
4. Bable, a compiler
5. The Django Rest Framework, to handle the serializations in our Django backend gracefully

The frist step is to add some files ande folder to our regualr Django project structure. There are many ways to do this, but I've chosen to stick closely to the strucutre we've used in the course. It's intutive and clean.  I've added the following in the application folder:
1. a component folder: will contain my React components
2. a frontend/piano_inventory: will contain my source JS file
3. in the above folder add a *index.js*, which will be the root of my React app

In the root directory of the project install webpack.

`npm init -y
npm install webpack webpack-cli --save-dev`

This will create the *package.json* and *package-lock.json* files
