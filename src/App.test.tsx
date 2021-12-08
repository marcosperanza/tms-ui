import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {create} from "react-test-renderer";
import NewActivity from "./components/NewActivity";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store' //ES6 modules

const mockStore = configureStore([])

it('app should render without throwing an error', function() {
  const store = mockStore();

  const container = create(
      <Provider store={store}>
        <App />
      </Provider>);
  expect(container).not.toBeNull();
});
