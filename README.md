# kaas-site-react

## Goals

This project seeks to provide a robust UI for viewing and managing Kings (or other competitive) competitions.

Data is retrieved from, and persisted to, a backend server over a RESTful API (see [kings-results-service](https://github.com/andrewflbarnes/kings-results-service)).

## Dev environment

To demo the site start the `kings-results-service` on port `9080` or start the mock server by running  
`npm run mock`

Start keycloak in a docker instance by running  
`nom run docker`

This will
- expose keycloak on port `8901`
- provision a dev realm `kaas-dev`
- privision an admin user `kaas-admin` on the `kaas-dev` realm with password `admin`

Start the site server by running `npm start` and visit [http://localhost:3000](http://localhost:3000)

## Build

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The core libraries and frameworks in use are
- react
- bootstrap and react-bootstrap
- redux and react-redux
- reselect

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

[Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)  
[Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)  
[Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)  
[Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)  
[Deployment](https://facebook.github.io/create-react-app/docs/deployment)  
[`npm run build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)  
