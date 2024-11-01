# Simple Login App

A basic Node.js application that allows users to register and log in, with passwords securely hashed using bcrypt and stored in a SQLite database.

## Instructions

### Setup and Run

1. **Change Directory**
    ```bash
   cd ...idk what im doing
   ```  

2. **Install Dependencies**
   ```bash
   npm install express bcryptjs jsonwebtoken sqlite3
   ```

3. **Run the Server**
   ```bash
   node server.js
   ```

4. **View Data in HTML Format**
   ```bash
   "Go to http://localhost:3000/view-db while server is running"
   ```

5. **Close the Server**
   ```bash
   "Ctrl + C"
   ```

6. **Access SQLite Database**
   
   # Open SQLite command line
   ```sql
   sqlite3 ./db/users.db
   ```

   # To make it prettier, first type:
   ```sql
   .mode column
   .headers on
   ```

   # Then again:
   ```sql
   SELECT * FROM users;
   ```

   # To exit:
   ```sql
   .exit
   ```