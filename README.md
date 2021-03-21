# Dataset Management Platform (Frontend)

Author: Syafiq Abdillah Umarghanis
# Disclaimer
This homework project doesn't fullfil technical requirement no 7 "Use SQLite" because Heroku doesn't support SQLite due to its "disk backed storage" while Heroku server's disk storage will be cleared periodically. 
Source: https://devcenter.heroku.com/articles/sqlite3.
For the alternative, I use PostgreSQL as the relational database. But worry not, the database is integrated whether you use the live demo version of trying to install this project locally on your machine.
# Live Demo (Heroku)
You can access the live demo version at <br>
https://dmp-konvergenai.herokuapp.com <br>
username: user1 <br>
password: user1
# Installation Manual
## System Requirements 
1. Node.js v12.18.2 
2. Git 2.27.01
## Prerequisites
1. Go to certain directory or make a new one. Let's call it DMP <br> 
`mkdir DMP && cd DMP`
2. Clone this repo to to DMP <br> 
`git clone https://github.com/syafiqabdillah/dmp-frontend.git frontend`
3. Download .env file that has been sent via email
## Installation
1. Go to DMP directory 
2. Go to frontend directory 
`cd frontend`
3. Install all dependencies <br>
`yarn install` or `npm install`
4. Copy paste .env file for frontend (sent via email) to frontend directory
5. Run the server 
`yarn dev` or `npm run dev`
6. Open http://localhost:3000 in your browser
## Questions 
Any questions or difficulties? Don't hesitate to ask me by posting new issue in this repo or sending me emails at abdillah.syafiq@gmail.com