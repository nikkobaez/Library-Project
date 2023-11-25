README
COSC 3380 Library Database Project 
(DO NOT USE FIREFOX)
Description:
The library system facilitates the borrowing of a diverse range of items, including books, media, devices, etc., with specific limits for students and faculty on the number of items that can be borrowed. 
Varied borrowing durations are established for students and teachers. Each item is identified by a unique ID, even if multiple copies are available. Fines are implemented for overdue items, reflecting 
the importance of timely returns. Students and faculty will have the same view of the webapp, while admins will have access to everything.

Members:
Ben Tuason 
Nikko Baez
Jose Conde
David Maranon 
Hoang Dang Pham

Technologies:
Front-end: ReactJS, TailwindCSS
Back-end: NodeJS
Database: MySQL
Front-end hosting: Netlify
Back-end hosting: Heroku

Installations instructions:
Have the latest version of NodeJS installed: https://nodejs.org/en/download/current
Extract the zipped folder.
Open terminal and input these commands.
cd downloads
cd Library
cd Library-nikko
cd client
npm install react-scripts (wait for it to finish)
npm start


Link to access the webapp:
https://fluffy-tarsier-1bd9b6.netlify.app


Login info for admin:
email: a@a.com
password: password
admin secret code for signup: COSC3380

Login info for student:
email: e@e.com
password: password

Login info for faculty:
email: f@f.com
password: password

Front-end files description:
All our front-end files can be found in "client". 
•	“src”: to access all the specific files.
•	“components”: " include our features for our admins, users, and route protections so accessing pages only works if a user is logged in. Any attempt to change the URL to access certain pages will redirect you to the login page for security.
•	"App.js": includes all the routes for the entire webapp.
•	"pages": Where all the webpages that you'll see in the webapp are located.
•	“AuthContext.js": allows us to access variables throughout the whole webapp. 

Back-end files description: 
All our back-end files can be found in "server"
•	“config”: where “db.js” is located.
•	“db.js”: connects our backend to our hosted database.
•	“index.js”: Includes all the queries for fetching all the data for reports, displaying all the users, displaying all the rented, processing, and available items. It also includes all the CRUD functionalities for the admin.

SQL dump file description: 
It has all the populated tables and the triggers.  

 



 



