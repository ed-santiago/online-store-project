# Online Store Project
This online store website is my project for AcademyXi's phase-1 course. Its purpose is to imitate how a real online store operates.

## Requirements
To be able to navigate through this website, you will need to have JSON server installed globally in your machine, and fork and clone this directory.

$ npm install -g json-server

With the command above, you should now be able to spin up a mock server from any directory on your computer. Alternatively, if you remove the -g option from this command but are in a folder with a package.json file, json-server will be added as a dependency in the file.

Now that we have JSON server installed globally, you can fork and clone this directory. In your terminal type $git clone git@github.com:ed-santiago/online-store-project.git. Navigate to this directory and run $ json-server --watch db.json.

When run, you'll see some messaging about how to access our JSON data. By default, JSON Server will start up on port 3000. You should see a notice that you can access the server at http://localhost:3000.

You can now navigate through the website.