# Library

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
