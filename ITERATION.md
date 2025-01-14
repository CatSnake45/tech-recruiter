- [x] hide the database link!!!
- [x] had to delete node modules folder to run it
- [x] when creating an account you cannot immediately log in
- [x] Search function is not working properly and somehow attached to your registration city
- [x] Jobs keep infinitely populating (sometimes empty objects)
- [x] API is hard coded to one query ("https://jsearch.p.rapidapi.com/search?query=Python%20developer%20in%20Texas%2C%20USA&page=1&num_pages=1";)
- [x] API has a super small daily quota - Idea: save queried data in our own database to lessen API load
- [ ] Could turn job populations into title cards to click on rather than full view in overview (like Snippet Cards)
- [x] Add a logout button
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

## Checking server

- [ ] Routes do not seem restful (userData, register, login)
- [x] Unnecessary sub-router in root route
- [x] all the responses are in the middleware
- [ ] is GET /userData used at all?
- [ ] bodyparser.json() no longer necessary?
- [x] create a global error handler
- [x] create a 404 handler
- [x] changing imports to require
      -> turns out imports are newer than require!

## Checking controllers

- [x] getUserData is a GET request with a body. Bad practice?
- [x] register function is using newUser.save() instead of create()
- [x] is getUserData used anywhere? Does it make sense?
- [x] (front-end?) city is always being grabbed from
- [x] create and bind a new database
- [x] create and bind in a new API
- [x] put API in an ENV variable?
- [ ] imported JWT (jsonwebtoken) but never used it?
- [x] Bundle all user related middleware into a new userController

### Working on the Job API

https://developer.adzuna.com/activedocs#!/adzuna/search
