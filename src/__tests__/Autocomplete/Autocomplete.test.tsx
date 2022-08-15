import React from 'react';
import { screen, render, fireEvent, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import data from '../../Autocomplete/data.json';
import {
  filterMockData,
} from '../../Autocomplete/Data';
import Autocomplete from '../../Autocomplete/Autocomplete';

const getMockData = (value: string) => filterMockData(value, data);

describe('<Autocomplete/>', () => {
  const setup = async () => {
    const user = userEvent.setup();
    const { 
      findByTestId, 
      queryByTestId,
      queryAllByTestId,
      findAllByTestId,
    } = render(
      <Autocomplete
        filterData={getMockData}
      />
    );
    const input = await findByTestId('autocomplete');

    return {
      user,
      findByTestId,
      findAllByTestId,
      queryByTestId,
      queryAllByTestId,
      input,
    }
  };

  test('should display a blank autocomplete input', async () => {
    const { input } = await setup();
    expect(input).toHaveValue('');
  });

  test('should display 0 suggestions on input focus', async () => {
    const { input, queryByTestId } = await setup();

    input.focus();
    const list = await queryByTestId('suggestions');

    expect(list).toBeNull();
    expect(input).toHaveFocus();
  });

  test('should display 9 suggestions on set input value = "l" in correct order', async () => {
    const { user, input, queryByTestId, findAllByTestId } = await setup();

    //fireEvent.focus(autocompleteInput);
    input.focus();
    //fireEvent.change(autocompleteInput, { target: { value: "l" } });
    await user.keyboard('l');

    const items = await findAllByTestId('suggestionitem');

    expect(input).toHaveValue('l');
    expect(items.length).toBe(9);
    expect(items[1]).toHaveTextContent('Latvia');
    expect(items[8]).toHaveTextContent('Luxembourg');
  });

  test('should display 2 suggestions on set input value = "la" in correct order', async () => {
    const { user, input, queryByTestId, findAllByTestId } = await setup();

    //fireEvent.focus(autocompleteInput);
    input.focus();
    //fireEvent.change(autocompleteInput, { target: { value: "l" } });
    await user.keyboard('la');

    const items = await findAllByTestId('suggestionitem');

    expect(input).toHaveValue('la');
    expect(items.length).toBe(2);
    expect(items[1]).toHaveTextContent('Latvia');
  });

  test('should display 1 suggestion on set input value = "latv"', async () => {
    const { user, input, queryByTestId, findAllByTestId } = await setup();

    //fireEvent.focus(autocompleteInput);
    input.focus();
    //fireEvent.change(autocompleteInput, { target: { value: "l" } });
    await user.keyboard('latv');

    const items = await findAllByTestId('suggestionitem');

    expect(input).toHaveValue('latv');
    expect(items.length).toBe(1);
    expect(items[0]).toHaveTextContent('Latvia');
  });

  test('should hide suggestions list on full enter of any value from list', async () => {
    const { user, input, queryByTestId, findAllByTestId } = await setup();

    //fireEvent.focus(autocompleteInput);
    input.focus();
    //fireEvent.change(autocompleteInput, { target: { value: "l" } });
    await user.keyboard('latvia');

    const list = await queryByTestId('suggestions');

    expect(input).toHaveValue('latvia');
    expect(list).toBeNull();
  });
});