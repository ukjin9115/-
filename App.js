import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebViewScreen from './WebViewScreen'; 
 // WebViewScreen 컴포넌트를 불러옵니다.
import 'react-native-reanimated'
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
        <Stack.Screen
          name="login"
          component={WebViewScreen}
          initialParams={{ uri: require('./login.html') }}  // 로컬 HTML 파일을 WebView에 로드합니다.
        />
        <Stack.Screen
          name="user"
          component={WebViewScreen}
          initialParams={{ uri: require('./user.html') }}  // 로컬 HTML 파일을 WebView에 로드합니다.
        />
         <Stack.Screen
          name="userinfo"
          component={WebViewScreen}
          initialParams={{ uri: require('./userinfo.html') }}  // 로컬 HTML 파일을 WebView에 로드합니다.
        />
        <Stack.Screen
          name="allview"
          component={WebViewScreen}
          initialParams={{ uri: require('./allview.html') }}  // 로컬 HTML 파일을 WebView에 로드합니다.
        />
        <Stack.Screen
          name="navigationtest"
          component={WebViewScreen}
          initialParams={{ uri: require('./navigationtest.html') }}  // 로컬 HTML 파일을 WebView에 로드합니다.
        />
        <Stack.Screen
          name="cost"
          component={WebViewScreen}
          initialParams={{ uri: require('./cost.html') }}  // 로컬 HTML 파일을 WebView에 로드합니다.
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
