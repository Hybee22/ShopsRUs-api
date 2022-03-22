# ShopsRUs-api

### To configure and run the app the ShopsRUs API locally, please follow the following steps:

- [x] Create a `.env` file and add the following environment variables, configured to a `Postgres` database on your machine

```
NODE_ENV = 'development'

SHOPSRUS_DB_USER=''
SHOPSRUS_DB_PASSWORD=''
SHOPSRUS_DB_NAME=''
SHOPSRUS_DB_HOST='127.0.0.1'
SHOPSRUS_DB_PORT=5432
SHOPSRUS_DB_DIALECT='postgres'
```

    If you're connecting to a hosted database, be sure to add the following to the environment variable, as provided

```
NODE_ENV = 'test'
DATABASE_URL=''
```

- [x] Start the application by running the following command on your integrated terminal

```
yarn start
```

or if you're using `npm` instead of `yarn`, run the following command

```
npm run start
```

    Once the application is started, it will automatically seed the database with dummy data for customers and discounts, all based on the tests to be carried out

- [x] Test the endpoints as provided in the documentation https://documenter.getpostman.com/view/7036082/UVsSLNgZ

- [x] To describe the seed data for customers

```json
[
  {
    "name": "John Smith",
    "type": "affiliate",
    "dateJoined": "2021-03-24 23:00:00+00"
  },
  {
    "name": "Hayley Jones",
    "type": "employee",
    "dateJoined": "2019-01-02 23:00:00+00"
  },
  {
    "name": "Richie Clark",
    "type": "affiliate",
    "dateJoined": "2020-09-30 23:00:00+00"
  },
];
```

#### `John Smith` is an `affiliate` and is entitled to `10%` discount

#### `Hayley Jones` is an `employee` and is entitled to `30%` discount

#### `Richie Clark` is an `affiliate` and is entitled to `10%` discount but because he's been a customer for more than `2` years, he is entitled to `5%` discount

- [x] To describe the seed data for discounts

```json
[
  { "type": "legacy", "value": 5 },
  { "type": "affiliate", "value": 10 },
  { "type": "employee", "value": 30 }
]
```

#### Discount type `legacy` has a `5%` discount value

#### Discount type `affiliate` has a `10%` discount value

#### Discount type `employee` has a `30%` discount value
