# Online Store Project
This online store website is my project for AcademyXi's phase-1 course.

## Description
This projects purpose is to imitate how a real online store operates. It is built using HTML, CSS and JavaScript. It incorporates everything I've learned so far with AcademyXi using basic HTML tags and CSS selectors and pseudo selectors. With JavaScript, I use concepts such as conditional statements, functions, manipulating the DOM, event listeners, working with API's and asynchronous JavaScript. It uses JSON server to act as a backend server that allows front-end users to fetch and use that data.

The website has a couple of features such as categories, search filter and a fully functional cart. It has a main and hero section where the main section displays all the products available as well as their price, title and an image.

Here is a blog about how I implemented a shopping cart feature in my project: https://medium.com/@edmond.santiago7/how-i-created-a-shopping-cart-feature-on-my-online-store-web-app-project-2624fcb1c20d

## Requirements
To be able to navigate through this website, you will need to have JSON server installed globally in your machine, and fork and clone this directory.

First, we'll install JSON Server globally on your machine: $ npm install -g json-server.

With the command above, you should now be able to spin up a mock server from any directory on your computer. Alternatively, if you remove the -g option from this command but are in a folder with a package.json file, json-server will be added as a dependency in the file.

Now that we have JSON server installed globally, you can fork and clone this directory. In your terminal type $git clone git@github.com:ed-santiago/online-store-project.git. Navigate to this directory and run $ json-server --watch db.json.

When run, you'll see some messaging about how to access our JSON data. By default, JSON Server will start up on port 3000. You should see a notice that you can access the server at http://localhost:3000.

You can now navigate through the website.

## Usage

Here is a video about how to navigate through the website, showing you the different properties and functionalities the website has and can do.
Link: https://youtu.be/cMMKAisFGag

## Contributing
Feel free to fork and clone this repository, but merging to main branch is not allowed.

## Acknowledgement
This project's db.json is a modified version of https://fakestoreapi.com/ product data.

## Project Status
While the project meets all the requirements of the assignment. I did want to implement more features such as a favourite section and a view section but unfortunately there wasn't enough time.