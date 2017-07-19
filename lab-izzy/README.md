#### Feature Tasks
Created the following components and structured them according to the following diagram.  
```
App
  SearchForm
  SearchResultList
```
###### App Component
* contains all of the **application state**
* contains methods for modifying the application state
* the state has a topics array for holding the results of the search

###### SearchForm Component
* contains a text input for the user to supply a reddit board to look up
* contains a number input for the user to limit the number of results to return
  * the number must be less than 0 and greater than 100
* `onSubmit` the form should make a request to reddit
  * it should make a get request to `http://reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`
  * on success it passes the results to the application state
  * on failure it adds a class to the form called error and turn the form's inputs borders red

###### SearchResultList Component
* receives all search results through props
* topics stored in the applications state are displayed as an unordered list
* Each list item in the unordered list contains the following
  * an anchor tag with a href to the topic.url
    * inside the anchor a heading tag with the topic.title
    * inside the anchor a p tag with the number of topic.ups 
