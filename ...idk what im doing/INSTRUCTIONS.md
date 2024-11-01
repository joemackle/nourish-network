# Simple Login App

A basic Node.js application that allows users to register and log in, with passwords securely hashed using bcrypt and stored in a SQLite database.

## Instructions

### Setup and Run

# 1. Change Directory
   ```bash
   cd ...idk what im doing
   ```  

# 2. Install Dependencies
   ```bash
   npm install express bcryptjs jsonwebtoken sqlite3
   ```

# 3. Run the Server
   ```bash
   node server.js
   ```

# 4. View Data in HTML Format
   - Go to [http://localhost:3000/view-db](http://localhost:3000/view-db) while the server is running.

# 5. Test User Server Authentication

   **Get Token**
   - Login with a registered user and copy down the token.

   **Go to Protected Page**
   - Go to [http://localhost:3000/protected](http://localhost:3000/protected) while the server is running.

   **Open HTML Console**
   - Either right-click inspect page or f12 (maybe "fn+ f12") and go to the Console tab

   **Run Protected Access Script**
   - Paste the following code and replace "your_token_here" with your token.
   ```javascript
   fetch('http://localhost:3000/protected', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer your_token_here' // Include your token here
      }
   })
   .then(response => {
      if (!response.ok) {
         throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON response
   })
   .then(data => {
      console.log(data); // Log the data received from the server
   })
   .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
   });
   ```

   **Verify Results**
   - If no error and output looks smiliar to this, user server authentication is working.
   ```javascript 
   {message: 'This is a protected route', user: {…}}
      message: "This is a protected route"
      user: {userId: 2, username: 'test_user_2', iat: 4856490336, exp: 4856 ...
   ```

# 6. Close the Server
   ```bash
   Press "Ctrl + C"
   ```

# 7. Access SQLite Database
   
   **Open SQLite command line**
   ```bash
   sqlite3 ./db/users.db
   ```

   **To make it prettier, first type:**
   ```bash
   .mode column
   .headers on
   ```

   **Then again:**
   ```bash
   SELECT * FROM users;
   ```

   **To exit:**
   ```bash
   .exit
   ```