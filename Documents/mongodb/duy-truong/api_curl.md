# RESTFULL API DESCRIPTION

1. Create user
    
    ```powershell
    curl 
    	- XPOST 'localhost:3000/api/user/creatUser'
    	- H 'Authorization: token xxxxxxxxxxxxxxxx'
    	- H 'Content-Type: application/json'
    	- d '{
    			"lastName": "Nguyen",
    			"firstName": "Duy Truong",
    			"age": 22,
    			"email": "example@gmail.com",
    			"phoneNumber": 0123456789,
    			"address": "Da Nang",
    			"status": "active",
    	}'
    ```
    
2. Get all users
    
    ```powershell
    curl 
    	- XGET 'localhost:3000/api/user/'
    	- H 'Authorization: token xxxxxxxxxxxxxxxx'
    ```
    
3. Get a user
    
    ```powershell
    curl 
    	- XGET 'localhost:3000/api/user/:userID'
    	- H 'Authorization: token xxxxxxxxxxxxxxxx'
    	- H 'Content-Type: application/json'
    ```
    
4. Search a user
    
    ```powershell
    curl 
    	- XGET 'localhost:3000/api/user?q=...&type=...'
    	- H 'Authorization: token xxxxxxxxxxxxxxxx'
    	- H 'Content-Type: application/json'
    ```
    
5. Update user
    
    ```powershell
    curl 
    	- XPOST 'localhost:3000/api/user/:userID'
    	- H 'Content-Type: application/json'
    	- d '{
    			"lastName": "Nguyen",
    			"firstName": "Duy Truong",
    			"age": 22,
    			"email": "example@gmail.com",
    			"phoneNumber": 0123456789,
    			"address": "Update",
    			"status": "active",
    	}'
    ```
    
6. Delete user
    
    ```powershell
    curl 
    	- XDELETE 'localhost:3000/api/user/delete/:userID'
    	- H 'Authorization: token xxxxxxxxxxxxxxxx'
    	- H 'Content-Type: application/json'
    ```
    
    ![https://cdn.discordapp.com/attachments/967988169364619304/971311821090861076/unknown.png](https://cdn.discordapp.com/attachments/967988169364619304/971311821090861076/unknown.png)
    
    ![https://cdn.discordapp.com/attachments/967988169364619304/971312766893846538/unknown.png](https://cdn.discordapp.com/attachments/967988169364619304/971312766893846538/unknown.png)