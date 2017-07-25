# Lab 27 Reddit Search with React

The App component is the parent component and it has two children components, SearchForm and SearchResultList.

The App component has a state with a topics property that is initially an empty array. It can be populated when the function redditSearch is called with the appropriate arguments. In the App components render we return the SearchForm which is passed the function redditSearch as a prop, and the SearchResultList which is passed the topics as a prop.

The SearchForm component has a state with the properties subredditName (empty string), resultsToReturn (empty string) and inputError(null). It renders a form of input type text that takes the subredditName and a form of input type number that takes the number of responsesToReturn. Changes in these values are handled by the functions handleSubredditNameChange and handleResponsesToReturnChange, which control the inputs. Upon form submit, handleSubmit is called, which performs the reddit search at  http://www.reddit.com/r/{subredditName}.json?limit={responsesToReturn} . On success this data is passed back to app to be set in the state by calling the redditSearch prop. On error, the inputError value is set to true and the error class is added to both inputs making their borders red.

SearchResultList populates the data from the search results. When the topics array is empty it reads 'Choose a subreddit and return number of posts', but when the topics array is populated with data it renders the url in an anchor tag, along with an h4 heading of the title and a p tag with the number of ups.
