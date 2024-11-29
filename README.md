# Django/React Hybrid App
## An App demonstrated CRUD operations on a Piano Inventory
### HES CSCI E-33a
You don't have to give up all the advantages of using a fully-featured framework, like Django, in order to take advantage of the React.  This application serves a React app as a static asset served in a Django tmeplate.  In order to build such an app you'll need the following:
1. A functional Django project and app
2. NPM, a package manager
3. Webpack, a bundler
4. Bable, a compiler
5. The Django Rest Framework, to handle the serializations in our Django backend gracefully

The frist step is to add some files ande folder to our regualr Django project structure. There are many ways to do this, but I've chosen to stick closely to the strucutre we've used in the course. It's intutive and clean.  

This will not be a complete how-to, as all the files necessary are within the repo.  However, in the READEME, I'll walk through the steps explaining what's in the repo.

I've added the following in the application folder:
1. a component folder: will contain my React components
2. a frontend/piano_inventory: will contain my source JS file
3. in the above folder add a *index.js*, which will be the root of my React app

In the root directory of the project install webpack.

`npm init -y`
`npm install webpack webpack-cli --save-dev`

This will create the *package.json* and *package-lock.json* files
Note: *nodule_modules* should be in your *.gitignore* file

Let's go ahead and install React and Babel
`npm install — save-dev @babel/core @babel/preset-env @babel/preset-react`
`npm install --save react react-dom`

If you already haven't done so, create an *index.js* in your *front_end/piano_inventory* folder.  You can put a simple JS function there for place keeping for the time being, or, if you have a React app, your root component that will be rendered.
Then, create a *webpack.config.js* in the application root directory
Finally, add a *scripts* key to the *package.json* file as shown in the repo which will allow us to run webpack from the terminal.

In *webpack.config.js* there are 3 key:value pairs.  The 1st, *entry*, sets the location of the source JS files.  The 2nd, *output*, sets the filename of the bundled JS and that absolute path to the location.  The *module* key uses Babel's *env* and *react* presets to compile (transpile) files.

Running
`run npm dev` should execute the webpack script and , if no errors, place the bundled file in the *static/piano_inventory* folder.  Note that this is the same folder we've used throughout the semester for our static files.

That's pretty much it as far as getting React/JS to render in a Django template.  What we have to do is now hook up our Django backend to the React front-end.

Now, we need to install the Django Rest Framework
`pip install djangorestframework`
You'll need to add `rest_framework` to your project *settings.py* file.
This would probably be a good time to make *serializers.py* in your application directory.  The one with your application's view files.

The Django Rest Framework documentation is excellent so I'm not going to duplicate it here, but I will point out the files, which are commented, that will connect with your Readft front-end.

In the *serializers.py* file are what the DRF needs to handle the serailization of the *models.py* file.
You'll notice in the *urls.py* file, lines 14-18, are the routes that the front-end is calling.  They in turn call the appropriate views in *views.py*, similar to what we've done all semester, and returns Json responses to the React front end.

From what you've already done this semester, the code in lines 88-147 shoudn't look that too unfamiliar to you.  We're retrieving querysets or model instances, serializing/unserializing them, saving to the database, and returning a response to the front-end.  For more detail, consult the DRF documentation.

Finally, on line 1 in the *piano_inventory/compoents/App.js* file, you can the url the app is calling.
`// Url of Django api`
`const url = `http://127.0.0.1:8000/api/pianos/`

That route corresponds to a route in the Django *urls.py* which returns the *piano_list* view.

Again, this README isn't meant to be a step-by-step tutorial, but a further explanation of the Section material and of the code posted in the repository.  Feel free to send me any questions you may have about the code or the implementation of this hybrid app.








