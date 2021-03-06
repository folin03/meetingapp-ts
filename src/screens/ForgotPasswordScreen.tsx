import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {styles} from '../styles';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from './StackParams';

type authScreenProp = StackNavigationProp<AuthStackParamList, 'Auth'>;

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ForgotPasswordScreen = () => {
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const navigation = useNavigation<authScreenProp>();

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.loginHeader}>
          <Text style={styles.title}>Forgot Password Screen</Text>
        </View>
        <View style={styles.loginFooter}>
          <View style={styles.row}>
            <Text style={styles.menuText}>Email</Text>
          </View>
          <TextInput
            style={styles.loginInputBox}
            selectTextOnFocus={true}
            autoCapitalize={'none'}
            keyboardType={'default'}
            selectionColor={'#23FDD3'}
            onChangeText={text => setInputName(text)}
            value={inputName}
          />

          <View style={styles.loginButton}>
            <Button title={'Cancel'} onPress={() => navigation.goBack()} />
            <Button
              title={'Reset'}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default ForgotPasswordScreen;
