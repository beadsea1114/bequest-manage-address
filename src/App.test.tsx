import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('render main page', () => {
  const { getByText } = render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  expect(getByText(/Find your address in the book./i)).toBeInTheDocument();
});
