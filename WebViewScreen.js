import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Text, Linking } from 'react-native';

function WebViewScreen({ route, navigation }) {
  const { uri } = route.params;
  const [debugMessage, setDebugMessage] = useState('');

  const handleMessage = (event) => {
    const messageData = event.nativeEvent.data;

    try {
      // JSON 형태로 파싱 시도
      const message = JSON.parse(messageData);

      // URL 스킴 처리
      if (message.type === 'urlScheme') {
        const url = message.url;
        Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
      }
      
      // JSON 형태의 메시지 처리 (좌표 데이터)
      if (message.latitude && message.longitude) {
        // 좌표 데이터를 Flask 서버로 전송하는 로직을 추가합니다.
        fetch('http://172.20.10.2:5000/coordinates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: message.latitude,
            longitude: message.longitude
          }),
        })
        .then(response => response.json())
        .then(data => setDebugMessage("Coordinates sent successfully: " + JSON.stringify(data)))
        .catch(error => setDebugMessage("Failed to send coordinates: " + error));
      } else {
        // 다른 유형의 메시지 처리
        handleNavigation(message);
      }
    } catch (error) {
      // JSON 파싱 실패 시 기존 문자열 메시지로 간주하고 화면 전환 처리
      handleNavigation(messageData);
    }
  };
  
  // 화면 전환 로직을 별도의 함수로 분리
  const handleNavigation = (message) => {
    setDebugMessage("Received: " + message);
    switch (message) {
      case 'navigateHome':
        navigation.navigate('Home');
        break;
      case 'navigatePoitest':
        navigation.navigate('Poitest');
        break;
      case 'navigatePoitest2':
        navigation.navigate('Poitest2');
        break;
      case 'login':
        navigation.navigate('login');
        break;
      case 'user':
        navigation.navigate('user');
        break;
      case 'navigationtest':
        navigation.navigate('navigationtest');
        break;
      case 'cost':
        navigation.navigate('cost');
        break;
      case 'userinfo':
          navigation.navigate('userinfo');
          break;
      case 'allview':
          navigation.navigate('allview');
          break;
      default:
        setDebugMessage("Unhandled message: " + message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>{debugMessage}</Text>
      <WebView
        source={ uri }
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

export default WebViewScreen;
