# Library
<img width="1470" alt="Screen Shot 2022-12-04 at 3 02 05 PM" src="https://user-images.githubusercontent.com/41353202/205512966-328409d5-d4c4-4808-b58d-c4b3ae4d5e3c.png">
<img width="392" alt="Screen Shot 2022-12-04 at 3 04 13 PM" src="https://user-images.githubusercontent.com/41353202/205512976-7640f907-ce59-4295-8909-d6c6fedfa4ca.png">
<img width="392" alt="Screen Shot 2022-12-04 at 3 04 44 PM" src="https://user-images.githubusercontent.com/41353202/205512983-c6fbc0e9-9369-49df-be5c-2629535b8957.png">

## Abstract
Web application for cataloguing books. Features include adding books and editing status to keep track of user stats (books, pages read, etc).

Page was built with a Mobile First design philosophy. First steps were creating the back bone html and making a modal form for adding new books. Next, factory functions were written to take the form data to create a new Book object and push the object to the library. 

The "bookshelf" is rendered by looping through the library array and appending books to the DOM. Buttons are added to each book that allows the user to change the book's read status or remove the book from the library. Higher order functions are called when changing book status to reorder bookshelf to show read books first. 

A button in the header swaps between the library page and stats page when clicked. 

This is my first project that makes use of **Modular Javascript**. The js file is laid out as two revealing modules, one for the library and the other for the stats. The library module returns the library array that the stats module uses to print stats. 

Lastly, icons were created in **Figma** by me. 

## Lessons learned

 - How to use the Revealing Module Pattern
 - Using factory functions to create and return new objects
 - Applying form data to newly created objects
 - Utilizing Higher Order functions to manipulate data structures
 - More practiced use of keyframes animations
 - Creating my own icons (svg & png) with Figma
