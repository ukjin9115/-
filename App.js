import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebViewScreen from './WebViewScreen';  // WebViewScreen 컴포넌트를 불러옵니다.

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={WebViewScreen}
          initialParams={{ uri: require('./index.html') }}  // 로컬 HTML 파일을 WebView에 로드합니다.
        />
        <Stack.Screen
          name="Poitest"
          component={WebViewScreen}
          initialParams={{ uri: require('./poitest.html') }}  // 로컬 HTML 파일을 WebView에 로드합니다.
        />
        <Stack.Screen
          name="Poitest2"
          component={WebViewScreen}
          initialParams={{ uri: require('./poitest2.html') }}  // 로컬 HTML 파일을 WebView에 로드합니다.
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
