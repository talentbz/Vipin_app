import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Box, Center, VStack, View, Text } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { color } from '../common/color';
import { postData } from '../api/client';
import { useLogin } from '../context/LoginProvider';
import Dialog from "../components/Dialog";


export default function Scanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isshow, setIsshow] = useState(false);
  const [detailInfo, setDetailInfo] = useState({
    content: '',
    id: 0, 
    date:''
  });
  const {location, setIsLoggedIn} = useLogin();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const closeDetail = () => {
    setIsshow(false);
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data);
    let str = '';
    if(data.includes('kus_')){
      let arr = data.split('_');
      str = arr[1];
      postData('api/getqrinformation', {
        qrInfo: str,
        location: location
      })
      .then((response)=> response.json())
      .then(result => {
        console.log(result)
        let data = result;
        if(data.state == 200){
          const d = new Date();
          let text = d.toISOString();
          let arr = text.split('.');
          setIsshow(true);
          setDetailInfo({
            content: data.msg,
            id: 0, 
            date:arr[0].replace('T', ' ')
          })
        } else if(data.state == 401){
          setIsLoggedIn(false);
          alert(data.msg);
        } else {
          alert(data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        alert('Can\'t find server!');
      })
    }else{
      alert('Invalid QR!');
    }
  };

  if (hasPermission === null) {
    return <Box m={2} flex={1} ><Text m='auto'>Requesting for camera permission</Text></Box>;
  }
  if (hasPermission === false) {
    return <Box m={2} flex={1} ><Text m='auto'>No access to camera</Text></Box>;
  }

  return (
    <Box m={2} flex={1} >
      <Dialog isShow={isshow} data={detailInfo} onClose={closeDetail}></Dialog>
      <VStack>
        <View w={'100%'} h='100%' borderRadius={19} borderColor='gray.300' borderWidth={1}  bg='white' m='auto' >
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={[StyleSheet.absoluteFillObject, styles.barcode]}
            />
            <View width={'100%'} height={'100%'} borderWidth={2} borderRadius={15} bg='#0002' borderColor={'#fff5'} style={StyleSheet.absoluteFillObject}  ></View>
            <View style={styles.buttonlist}  h='100%' >
            {scanned && <Button title={'Tap to Scan Again'}  onPress={() => setScanned(false)} /> }
            </View>
        </View>
        <View w={'100%'} m='auto' style={[StyleSheet.absoluteFillObject, {top: '90%'}]}  >
          <Center>
            <Button title={'Go to History'}  onPress={() => navigation.navigate('HistoryScreen')} />
          </Center>
        </View>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: color.color_warning,
  },
  buttonlist: {
    borderColor: 'white',
    justifyContent: 'center',
    marginLeft: 25,
    marginRight: 25
  },
  title: {
    fontSize:22,
    color: color.color_info,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  barcode:{
    borderRadius: 10,
    margin: 10
  }
});