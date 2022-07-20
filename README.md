# Manage AddressBook - Bequest
Created by <Andrew John>

Tech Stack: [React], [Typescript], [Redux], [ReduxToolkit], [MaterialUI]
Features: Modal, DataGrid, Validation, Autocomplete, Test, Notification, debounce 

There is not backend logic to store the selected address permanently.
So the address book will be reset when refreshing the browser.

# Features

## Add an address manually
Users will see the modal with the address form by clicking "ADD NEW ADDRESS" button.
There are six fields on the form. Line1, Town, Postcode and Country are required.
The country dropdown lists the countries when typing the keyword.
When clicking "SAVE" button, the address will be added to the address book if not exists.

## Search by PostCode
User will see the search by postcode modal by clicking "SEARCH BY POSTCODE" button.
When user start typing word, it will show the postcodes including the keyword. (typeahead api)
If there is no postcode, an error will appear.
When user select a postcode from the autocompleted list, the addresses will be returned by the getaddress find api 
and listed in the below table.
User will be able to select an address on the table by "Select" button.

## Address Book
The selected or added addresses will be shown on the table.
User will be able to select an address by clicking row on the table.
There is also "Delete" icon to remove address.

Selected adress will appear at the top right of the header.

## Notification
The messages to show some action was successed or failed will be appear.

# Test
I created two test scripts. App.test.tsx and alertSlice.test.tsx
I think that these two files can show my experience about the unit test with react test library(jest).
Other test scripts will be similar, but the input params and return values will be different.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

