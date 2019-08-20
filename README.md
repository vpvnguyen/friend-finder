# Friend Finder
Deployed to heroku: https://blooming-spire-75525.herokuapp.com/survey
### Built on Express.js, Node.js, MySQL

# Setup
- `git clone <repo>`.
- cd into repo.
- Terminal/Bash: `npm install`.
> Express and MySQL should be installed.
- Start MySQL server.
- Create mock database using `friendFinder.sql`.
- Start application: `node server.js`.
> This starts your Express server and connects to MySQL.

Express server:
```javascript
var PORT = process.env.PORT || 3000;
```

MySQL:
```javascript
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'friendFinder'
});
```

# Application
- Find similar people of interest with a personality test.
- User answers survey questions to be matched with the person of similar score.
- Front and back-end form validation.
- Create API endpoints.
- Data persistence with MySQL.

# Technologies
- Express.js
- Node.js
- MySQL
- jQuery
- Bootstrap
