# Getting Started with TMS-UI (Task Management System)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), [Redux Thunk](https://redux.js.org/)
and [Typescript](https://www.typescriptlang.org/).

It manages a simple task manager based on [TMS](https://github.com/marcosperanza/tms) server.



## Code contribution and design

The project is developed based on the [redux thunk](https://redux.js.org/usage/writing-logic-thunks) framework. 
It uses middleware dispatchers for creating side-effects to the actions and retrieve data from the APIs.

## Folder structure

- __test__: contains all unit tests
- components: contains the ui component
- containers: contains the connection function between redux and simple component.
- open-api: the json open api needed for generating the service code
- store: redux reducers and action creators

## UI library

A simple UI library has been used for widgets rendering: [Primereact](https://www.primefaces.org/primereact). 
The main usage is the [PrimeFlex](https://www.primefaces.org/primeflex/) library that gives some simple css classes for 
using the _flexbox_, _borders_ and _spicing_



## Open API

TMS server exposes a JSON representative swagger structure that is used for creating services based on `axios`
Follow https://github.com/marcosperanza/tms#open-api for extracting the updated APIs.

This project reads the open APIs json file directly on this folder: `src/open-api/tms-api-v1.json`. In order to generate the services run this

```
npm run generate
```


## Docker

The docker image is based on _nginx:1.19.10_ image. The main idea is to use nginx to publish the webapp and redirect the requests to the backand.
Into the project folder `nginx` there is a default template for configuring nginx.
It uses an envinonment variable `TMS_SERVICES` that must be used for redirect the request to the right backend server. 

[See an example here](https://github.com/marcosperanza/tms/blob/6b8f62a0768ece2f83fe1bc9eacc6bd74644809f/src/main/docker/docker-compose.yml#L13)


```
npm install
npm run build
docker build -t marcosperanza79/tms-ui:latest -f Dockerfile .
```


## Compile and run locally

In the project directory, you can run:

### `npm generate && npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


