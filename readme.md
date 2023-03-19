Problem Statement:-

Implement an API that allows users to:
Get a list of all books.
Get details of a particular book by its ID.
Add a book to the shopping cart.
Remove a book from the shopping cart.
Place an order

API Documentation:

Base URL: http://localhost:8000/api

1.  Register User:
    Endpoint: POST /register
    This API allows you to register a new user. The request body should be a JSON object with the following fields:

    userName (string, required): User name of the new user.
    email (string, required): Email address of the new user.
    password (string, required): Password of the new user.
    
    Example Request:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226157743-1278bb8a-08a5-4915-bd8f-3edd2db40c88.png)
    
    Example Response:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226157910-8bcc24e7-53e9-4486-a54b-89c72a420c4d.png)

2.  Login User:
    Endpoint: POST /login
    This API allows you to login as a registered user. The request body should be a JSON object with the following fields:

    userName (string, required): User name of the user.
    password (string, required): Password of the user.
    
    Example Request:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226158169-af4899fb-5cf8-463b-a3fe-6e4f607781b4.png)
    
    Example Response:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226158187-bb65bd6b-421c-4a4c-8dcb-4d08beeb387a.png)
    
    
3.  Get List of Books
    
    Endpoint: GET /get-all-books/:userId
    This API allows you to get a list of all books by passing in his/her userId which they get after logging in or registering. 

    Example Request:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226158307-71207c05-d8fc-40c8-8bda-07c9748594c9.png)

    Example Response:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226158343-de52c021-dbb8-424f-8a0d-d0faa621a9f3.png)

4.  Get Details about a specific book

    Endpoint: GET /get-book-details/:userId/:bookId
    This API allows you to get details about one specific book by passing in his/her userId along with the id of the book they want to fetch details about. 

    Example Request:-

    ![image](https://user-images.githubusercontent.com/73885838/226158466-9ae64c3f-69b3-454b-92aa-c8bcc161a2ba.png)

    Example Response:-    
    
    ![image](https://user-images.githubusercontent.com/73885838/226158479-54f70f1a-f9c5-463a-9603-04d8f6be85a2.png)

5.  Add a Review for a book

    Endpoint: POST /add-review/
    This API allows you to add a review to a book. The request body should be a JSON object with the following fields:

    userId (string, required): User id of the user.
    bookId (string, required): id of the book.
    message (string, required): message of the review.

    Example Request:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226158629-3495d7fb-dc1e-4c80-aea7-01f65cb04487.png)

    Example Response:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226158651-6fada814-ed8b-4c8f-a6f5-97459e8460b8.png)


6.  Edit the review for a book

    Endpoint: POST /edit-review/
    This API allows you to edit a review for a book. The request body should be a JSON object with the following fields:

    userId (string, required): User id of the user.
    bookId (string, required): id of the book.
    newMessage (string, required): new message of the review.
    reviewId (string, required): id of the review posted
    
    Example Request:-

    ![image](https://user-images.githubusercontent.com/73885838/226159352-ad573796-b6e7-4a63-861f-d5338555a26d.png)

    Example Response:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226159365-6cbf261f-2f84-422d-b664-b0c3b8278563.png)


7.  Add book to cart
    
    Endpoint: POST /add-to-cart/
    This API allows you to add a book to your cart. The request body should be a JSON object with the following fields:

    userId (string, required): User id of the user.
    bookId (string, required): id of the book.

    Example Request:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226159821-f27eb051-7c8f-408f-b4a7-eab6d6677b33.png)

    Example Response:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226159874-13cda404-99e5-4fde-8106-f756ed3bfa0f.png)

8.  View books in cart

    Endpoint: GET /get-books-in-cart/:userId
    This API allows you to get all books in the cart by passing in the userId as a request parameters.

    Example Request:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226159978-17c24ada-dbae-4132-8ab9-677db2008d76.png)

    Example Response:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226160030-ea0f43c6-79bc-423a-9bb8-65c677f89d11.png)
    
    
 9. Remove a book from the cart
 
    Endpoint: POST /add-to-cart/
    This API allows you to add a book to your cart. The request body should be a JSON object with the following fields:

    userId (string, required): User id of the user.
    bookId (string, required): id of the book.

    Example Request:-   
    
    ![image](https://user-images.githubusercontent.com/73885838/226160088-1b86c32e-5a52-4ffe-8b5e-da89ec34d0b8.png)

    Example Response:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226160098-55938a67-f2d7-4554-a133-13933a49101a.png)

10. Place an order

    Endpoint: POST /place-order/
    This API allows you to place order for multiple books. The request body should be a JSON object with the following fields:

    userId (string, required): User id of the user placing the order.
    bookIds (array, required): an array of book ids representing the books needed to be purchased
    qtys (array, required): an array of quantities representing the number of each books needed to be purchased. Index i of qtys array represents number of quantity 
    for the book mentioned in ith position of bookIds array.
    address (string, required): the delivery address

    Example Request:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226160156-4d7ee5eb-dd17-4a5b-8cc8-3d6f990aae3a.png)

    Example Response:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226161038-82f69da5-4a69-4ce3-83f2-b4b96110ed31.png)
    
11. View Past Orders

    Endpoint: POST /view-past-orders/:userId
    This API allows you to view all your past orders.

    Example Request:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226161711-b085105f-0bbe-41e7-99ac-4235e2177921.png)

    Example Response:-
    
    ![image](https://user-images.githubusercontent.com/73885838/226161739-83fcaa72-e8d1-40cd-a2aa-7fc558acbb32.png)
