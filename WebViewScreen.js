import React, { useState } from 'react'; // useState를 React에서 가져옵니다
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';

function WebViewScreen({ route, navigation }) {
  const { uri } = route.params;
  const [debugMessage, setDebugMessage] = useState(''); // 상태 초기화

  const handleMessage = (event) => {
    const message = event.nativeEvent.data;
    
    setDebugMessage("Received: " + message); // 상태 업데이트

    if (message === 'navigateHome') {
      navigation.navigate('Home');
       // 홈으로 이동하면서 데이터 전달
    } else if (message === 'navigatePoitest') {
      navigation.navigate('Poitest'); // 다른 화면으로 이동
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>{debugMessage}</Text>
 
      <WebView
        source={uri}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

export default WebViewScreen;
