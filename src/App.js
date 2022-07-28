import React,{ useEffect } from "react";
import { useSelector } from 'react-redux';

// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import Router from './routes';
import { getToken } from './Redux/Selectors/UserSelectors';
import { HttpClient } from "./Redux/Controllers";

// ----------------------------------------------------------------------


export default function App() {
  const accessToken = useSelector(getToken);

  useEffect(() => {
    if(accessToken){
      HttpClient.setAuthorization(accessToken);
    }
  },[accessToken])

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
        <Router/>
    </ThemeProvider>
  );
}
