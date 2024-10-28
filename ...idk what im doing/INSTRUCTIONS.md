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

4. **Access SQLite Database**
   - Navigate to the `db` folder:
   ```bash
   cd db
   ```

   - Open the database:
   ```bash
   sqlite3 users.db
   ```

   - View the stored users:
   ```sql
   SELECT * FROM users;
   ```

   - Exit SQLite:
   ```sql
   .exit
   ```

3. **Close the Server**
   ```bash
   "Ctrl + C"
   ```