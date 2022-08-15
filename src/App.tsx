import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './Ui/Boilerplate.css';
import './Ui/Normalize.css';
import './Ui/InitUi.scss';

import Layout from './Ui/Layout';

import AutocompleteDemoScene from './Autocomplete/AutocompleteDemoScene';

export default () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<AutocompleteDemoScene/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};