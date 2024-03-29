# Friend Finder (Express.js, Node.js, MySQL)
Deployed to heroku: https://blooming-spire-75525.herokuapp.com

# Setup
- `git clone <repo>`.
- cd into repo.
- Terminal/Bash: `npm install`.
- Create mock database using `friendFinder.sql`.
- Start application: `node server.js`.
> Ensure that MySQL server is running.
> Express server should be listening on `localhost:3000` and connected to MySQL.

### Default Configurations
PORT `server.js`:

```javascript
    var PORT = process.env.PORT || 3000;
```

MySQL `mysqlRoutes`:

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
