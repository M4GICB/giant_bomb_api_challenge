# Giant Bomb API Challenge

## How to Access
- A working version of this project can be accessed [here](http://giantbomb.brandoncollins-bc.net/)
- Requirements
    - Google Chrome - [Download Link](https://www.google.com/chrome/)
    - Google Chrome CORS Web Extention - [Allow CORS: Access-Control-Allow-Origin Download Link](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/)

## Running Locally
- Requirements
    - npm
    - react
    - `.env` file containing a Giant Bomb api key
        - `REACT_APP_API_KEY={api key}`
        - [Getting an API Key](https://www.giantbomb.com/api/)
    - Google Chrome CORS Web Extention
- Steps
    - Clone repo
    - Run `npm start` in directory
    - Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Goals
- Implement the Giant Bomb API by creating an application
- Allow a user to search for games existing in Giant Bomb's database
    - Display the thumbnails and titles of searched games
- Allow a user to rent games

## Current Features
### Navigation Bar
There is a navigation bar at the top of the website that remains displayed regardless of what page the user is on. The navgation bar includes buttons to get the user to the home page, search page, and cart. The cart button displays an accurate number of how many items are in the user's cart at all times and updates as the cart updates. 

### Home Page
The home page displays a button to get to the search page and the user's cart. There is also a description provided for the two pages.

### Search Page
__Overview__
The search page consists of a search bar, a search button, a paginated data grid, and a button to add games to the cart. 

__Search Functionality__
Users can search for games by typing a search query into the search bar, and clicking the search button to the right to execute the search. Upon doing so, an api request is sent with the user's search query to Giant Bomb's search API, the search result area loads until the api request is complete, and a list of search results is displayed in the data grid below upon api completion. 

__Search Results__
Prior to making a search request, a message promping the sure to complete a search is displayed on the screen. Upon completing a search request, a data grid of search results matching the search paramters in accordance to Giant Bomb's search API is rendered. The data grid includes the following columns:
- the game's id
- the game's thumbnail
- the game's title
- a brief description of the game
- a link to view more info about the game

The search results are paginated and show up to 10 results per page by default. There is an option to change the number of results per page below the search results. A user has the option to view either 5, 10, 25, 50, or 100 results per page. 

Search results can be filtered and/or sorted based on any column. Columns can also be hidden and shown on user desire. 

__Failed Search Requests__
If there are no results found for a user's search request, a message detailing so will be rendered rather than a data grid of results being rendered. The message will prompt the user to try a different search request, as well as display their entered request. This case will occur if there were no games found for the given query, or if there is an error with the API call.

__Adding games to cart__
When a successful search request is made, a user can click the boxes to the left of displayed games to check them off. As games are checked off, a button below the results will display how many games are marked and offer to add them to the cart. Upon clicking the button, the given number of marked games will be added to the cart and a success message will be displayed, confirming how many games were added. Games already existing in the cart will not be added duplicate times.

### Cart Page
__Overview__
The cart page consists of a paginated data grid of cart items, a button to remove items from the cart, and a button to proceed to checkout. The purpose of this page is to allow users to review what is currently in the user cart, and modify the cart prior to checking out if desired. Users can view more game details on each cart item via links from the cart, and can access the cart at all times.

__Removing Items From Cart__
Similar to the search page, a user can click the boxes to the left of displayed games to check them off. As games are checked off, a button below the data grid will display how many games are marked and offer to remove them from the cart. Upon clicking the button, the given number of marked games will be removed from the cart and the data grid will rerender displaying the new list of cart items.

__Checkout__
The checkout button will take the user to the checkout page.

### Checkout page
__Overview__
The checkout page is currently more of a proof of concept page in an early stage. As a payment process was not implemented, the checkout page simply displays that the user successfully rented the games in the cart, and displays a full list of the games with their images and a link to view more info on each game. In a production business setting, this checkout page would need to be further built out to provide logic for users to enter payment and rental period info as well as include logic for handling what games are checked out for what user and how long they are checked out for.

### Game Detail Page
__Overview__
The game detail page allows the user to view much more info about a given game and add the game to the cart if desired. This page includes the game title, a short description, an image gallery of the game if one exists in Giant Bomb's data, and any other description information that exists for the game in Giant Bomb. There is also a futher link routing the user directly to Giant Bomb's website entry of said game.

## Known Bugs
- Requirement of an Allow CORS web extention
    - After much research and many attempts, I was unable to get CORS handled and enabled on the NGINX server I deployed this application to. An extention to allow CORS is required when testing this application. A production ready version would require the deployed server to properly handle this.
    - The search and game api calls canot be completed without the extention being turned on due to CORS errors.
- Failed hyperlink page navigation
    - Navigating to various pages through hyperlink paths instead of through in app functionalities currently results in 404 pages due to page routing functionality. This includes using the back and forward browser buttons.
- API Key exposed through network inspection
    - Despite the api call key being stored in a secret file that is not commited to git, the api key still gets passed to the network inspection.
- Some screens display the application in unintended ways.

## Next Steps
- Allow pressing "enter" instead of clicking "search" on the search page to execute a search query
- Implementation of clearing the cart upon checkout
- Implementation of a payment system for checkout
- Fixing all listed bugs
- More reactive display to various screen sizes
- Faster query times for search results

# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
