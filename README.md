## Getting Started
Recursively clone the code repo (it needs submodule from text2qti repo):
```
git clone --recurse-submodules https://github.com/substance9/text2qti-web.git
```

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`.
2. Install Python dependencies `yarn install-requirements` or `npm install-requirements`
3. Start development server `yarn start` or `npm start`.

text2qti-web also supports Docker container. To run the container version:
1. `docker-compose build`
2. `docker-compose up`


## File Structure

The front-end is based on [create-react-app](https://github.com/facebook/create-react-app).

The back-end is based on [Flask](https://github.com/pallets/flask).

```
.
├── src - React front-end
│ ├── components - React components for each page
│ ├── App.jsx - React routing
│ └── index.jsx - React root component
├── server/ - Flask server that provides API routes and serves front-end
│ ├── text2qti - text2qti Python program/lib
│ ├── constants.py - Defines the constants for the endpoints and port
│ └── server.py - Configures Port and HTTP Server and provides API routes
└── README.md
```