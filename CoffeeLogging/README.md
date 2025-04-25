# CS5200 DBMS Project Repository
# By Naveen Kumanan


## Run Instructions
1. Clone my repository
2. In XAMPP Control Panel, run `MySQL` server and run the `Apache` server. Then hit the admin button to open phpmyadmin.
3. First create, the db and its tables, (by creating a new database named coffee (use this name exactly) and then importing my DDL&DML.sql file in phpmyadmin) then go to the next step to run and use the app.
4. cd into the api folder, if needed, install via `npm install`: `mysql` and `express`
5. type `node coffee.js` and hit enter in terminal (in the api folder)
6. cd into the `frontend` folder, start a local HTTP server using Python: `python -m http.server`
7. In a browser, go to `http://localhost:8000/RequiredTasks/page1.html`
8. Navigate to other frontend pages by changing the url to something like `http://localhost:8000/Reports/page5.html` this is http://localhost:8000/ followed by the path from the frontend folder to a file. Alternatively just use the navigation links at the top of each page.


## Usage Instructions
- start at page1 in the RequiredTask folder and progress to each page by number order. So next page2, then page3 and so on. Follow the order basically.
- Navigate to different pages to see different functionality. I have oraganised the pages into 2 folders that containt thier respective functionality.
- For Id fields you would need to use phpmyadmin to navigate the database and find the id for row you want to enter
- added navigation links at the top of each page, home.html is a starting page that just has all the navigation links

## Pages
- RequiredTasks/page1: Add roasters
- RequiredTasks/page2: Add products and batches
- RequiredTasks/page3: Log tastings
- RequiredTasks/page4: Reports from required tasks
- Reports/page5: Complex reports


## Errors
- make sure to fill out all fields in an indivdual form or section before clicking its associated submit button. An empty field will create a error in the browser and data will not get saved in the database.
- MySQL crashing:
    - delete the contents of the xampp/mysql/data folder and replace with the contents of the xampp/mysql/backup. Only the contents not the folders themselves.
    - can then use the DDL&DML.sql file to recreate the database
    - everytime I stop mysql from the xampp control panel I have to do this to be able to successfully start it again.
    - another easier fix that worked for a while was to just delete the aria_log.00000001 file in xampp/mysql/data. Then start
     mysql. mysql will recreate this file as aria_log.00000002, then 3 and so on. If this doesnt work (i.e mysql does not stay running/it keeps crashing after hitting start) go about it the above way.
    - I also deleted and reinstalled xampp to fix the problem once. Save the DDL&DML.sql file, I didn't have it saved when I deleted xampp.

## Youtube Links
1. Coffee Logging Functionality Demo: https://www.youtube.com/watch?v=RsLE1Vhp-1s
2. Getting the app up and running from scratch: https://www.youtube.com/watch?v=ruHeO5NlHiE
