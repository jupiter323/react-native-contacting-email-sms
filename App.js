/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { StackNavigator } from 'react-navigation';

import SessionCheck from './src/screens/SessionCheck';


const App = StackNavigator({

  // DashboardTab: { screen:DashboardTabScreen },
  Home: { screen: SessionCheck }

});

export default App;

