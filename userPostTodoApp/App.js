import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserScreen from './src/Screens/UserScreen';
import FeedScreen from './src/Screens/FeedScreen';
import TodoScreen from './src/Screens/TodoScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colors from './src/constants/colors';
import store from './src/store';
import {Provider} from 'react-redux';

const Tab = createBottomTabNavigator();
const DEFAULT_ROUTE = 'Users';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={DEFAULT_ROUTE}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => {
              const icons = {
                Users: 'people',
                Feed: 'list',
                Todo: 'checkmark-circle-outline',
              };

              return (
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? `ios-${icons[route.name]}`
                      : `md-${icons[route.name]}`
                  }
                  color={
                    focused ? colors.tabIconSelected : colors.tabIconDefault
                  }
                  size={30}
                />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: colors.tabIconSelected,
            inactiveTintColor: colors.tabIconDefault,
          }}>
          <Tab.Screen name="Users" component={UserScreen} />
          <Tab.Screen name="Feed" component={FeedScreen} />
          <Tab.Screen name="Todo" component={TodoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
