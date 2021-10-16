/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import medicineData from './api/api.json';
import { RNCamera } from 'react-native-camera';
export default function App() {
  const [code, setCode] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => setData(medicineData[code]), 500);
    return () => clearTimeout(timeOutId);
  }, [code]);

  function handleBarcode(e) {
    console.log(e.data)
    setCode(e.data)
  }

  return (
    <SafeAreaView>
      <View style={{ height: '70%' }}>
        <RNCamera
          onBarCodeRead={handleBarcode}
          style={{ height: 200, width: '100%', }}
          // flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
        />
        <View style={{ backgroundColor: 'red', height: 5 }}></View>
      </View>
      <View style={{ marginHorizontal: 30 }}>
        {!data ? <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>No code found</Text> : (
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}>
              S/N: {data['S/N']}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}>
              Medicine: {data['medicine']}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}>
              Expire date: {data['expire']}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

