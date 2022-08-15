import React from 'react';
import Page from '../Ui/Page';
import Header from '../Ui/Header';
import Autocomplete from './Autocomplete';
import TextSeparator from '../Ui/TextSeparator';

// Mock-up data(countries list)
import data from './data.json';
import {
  filterMockData,
  filterApiData,
  getFilterApiUrl
} from './Data';

const getMockData = (value: string) => filterMockData(value, data);
export default () => {
  return (
    <Page>
      <Header>
        Simple TS Autocomplete
      </Header> 
      <Autocomplete 
        filterData={getMockData}
        placeholder='Search for country in mock json data'
      />
      <TextSeparator>
        OR
      </TextSeparator>
      <Autocomplete 
        filterData={filterApiData}
        placeholder='Search for USA city on my server'
        getUrl={getFilterApiUrl}
      />
    </Page>
  );
};