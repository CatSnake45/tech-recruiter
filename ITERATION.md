- [x] hide the database link!!!
- [x] had to delete node modules folder to run it
- [ ] when creating an account you cannot immediately log in
- [ ] Search function is not working properly and somehow attached to your registration city
- [ ] Jobs keep infinitely populating (sometimes empty objects)
- [ ] API is hard coded to one query ("https://jsearch.p.rapidapi.com/search?query=Python%20developer%20in%20Texas%2C%20USA&page=1&num_pages=1";)
- [ ] API has a super small daily quota - Idea: save queried data in our own database to lessen API load
- [ ] Could turn job populations into title cards to click on rather than full view in overview (like Snippet Cards)
- [ ] Add a logout button
- [ ] Create a README

# Testing:

- [ ] Identify some of the core things on both the frontend and the backend to implement tests for. Do this even before adding new code so we can make sure that while iterating we didn't break anything that was working before.
- [ ] 100% test coverage is not necessary but identifying key pieces before we can move on to the next thing

## Pure functions

- [ ] Jest is great for pure functions like redux and controller methods

## Frontend testing:

- [ ] For React components: React testing library
- [ ] As we're building new features also focus on a couple of those new key pieces and make sure that they work correctly

## Backend testing: Supertest

- [ ] Make sure end points are set up correctly and getting the correct response for HTTP requests. Super helpful for testing server files and routing
- [ ] After core tests are done Trevor can work with us to implement tests for our new features

# Checking the backend

## Checking routes

- [ ] Routes do not seem restful (userData, register, login)
- [ ] Unnecessary sub-router in root route
- [ ] all the responses are in the middleware
- [ ] is GET /userData used at all?
- [ ]

## Checking controllers

- [ ] getUserData is a get request with a body. Bad practice?
- [ ] register function is using newUser.save() instead of create()
- [ ] is getUserData used anywhere? Does it make sense?
- [ ] (front-end?) city is always being grabbed from
- [ ] create and bind a new database
- [ ] create and bind in a new API
