import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles';
import {clearStorage} from '../commonFunctions/secureStorage';

const ProfileScreen = () => (
  <View style={styles.center}>
    <Text style={styles.title}>Setting screen</Text>
    {/* <Button
      title={'Sign out'}
      onPress={() => {
        clearStorage();
      }}
    /> */}
  </View>
);

export default ProfileScreen;
