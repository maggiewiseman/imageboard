# Imageboard

## Summary
An app that allows users to upload images, comment, and like images. 

## Tech Stack
* Backbone 
* Express.js on Node.js
* Postgresql
* AWS S3 for storing images

## Features
* Users can view images uploaded by other users.
<img src="https://raw.githubusercontent.com/maggiewiseman/imageboard/master/assets/screenshots/landingPage.png" alt="Landing page shows a set of 6 images" width="400px"/>

* Users can upload new images
<img src="https://raw.githubusercontent.com/maggiewiseman/imageboard/master/assets/screenshots/uploadDialog.png" alt="Shows upload file dialog box." width="400px"/>

* App has pagination
<img src="https://raw.githubusercontent.com/maggiewiseman/imageboard/master/assets/screenshots/pagination.png" alt="shows a single image with a next button below it." width="400px"/>

* Clicking on an image shows a a full size image and allows users to make comments and/or like the image. 
<img src="https://raw.githubusercontent.com/maggiewiseman/imageboard/master/assets/screenshots/comments.png" alt="Shows part of a larger image with comments." width="800px"/>

* There is no login so keeping track of likes is done by setting a cookie. 
