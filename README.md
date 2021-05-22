# Gibi - Apollo GraphQL Server

This Apollo GraphQL server will be used to retrieve information from the Gibi database and serve it to the frontend

## Table of contents

- [Gettings started](#getting-started)
- [Testing](#testing)
- [Information](#information)

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 12 / NPM 6 / YARN 1.22

### Source code

Get a copy of the repository:

```bash
git clone ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/backend
```
or alternatively:
```bash
git clone https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/backend
```

Change directory:

```bash
cd backend/
```

### Dependencies

Download all dependencies:

```bash
npm install
```
or alternatively:
```bash
yarn install
```

### Build

Build and start the project:

```bash
npm run start
```
or alternatively:
```bash
yarn start
```

The application will be served and can be accessed at [http://localhost:4000](http://localhost:4000).

## Testing

### Playground

A playground will be available at [http://localhost:4000](http://localhost:4000) for performing queries manually.

### Mocking 

To enable the serving of mock data, add the following line in the `const server` object in the `src/index.js` file:
```
mocks: true
```

The default behavior for mocks is to overwrite the resolvers already present in the schema. To keep the existing resolvers, set the `mockEntireSchema` option to false.

Find more information on the [Apollo doc - mocking section](https://www.apollographql.com/docs/apollo-server/testing/mocking/)

## Information

### Support

For support, please contact [info@flashbeing.com](mailto:info@flashbeing.com).

### Documentation

More documentation can be found at [https://www.apollographql.com/docs/apollo-server/](https://www.apollographql.com/docs/apollo-server/).


