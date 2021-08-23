import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import {styles} from '../styles';
// import { DismissKeyboard } from '../styles/dismissKeyboard';
import {TextInput} from 'react-native-paper';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from './StackParams';

type authScreenProp = StackNavigationProp<AuthStackParamList, 'Auth'>;

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const RegisterScreen = () => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');
  const [nameValidation, setNameValidation] = useState(' ');
  const [emailValidation, setEmailValidation] = useState(' ');
  const [passwordValidation, setPasswordValidation] = useState(' ');

  const navigation = useNavigation<authScreenProp>();

  const SendRegistration = () => {
    fetch('https://meet-me-app.herokuapp.com/dj-rest-auth/registration/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: inputName,
        email: inputEmail,
        password1: inputPassword,
        password2: inputPassword2,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.key) {
          registrationSuccesfulAlert(data.key);
        } else if (data.email) {
          registrationFailAlert(data.email);
        } else if (data.password1) {
          registrationFailAlert(data.password1);
        } else if (data.username) {
          registrationFailAlert(data.username);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const registrationFailAlert = data => {
    Alert.alert('Registration ', data[0], [
      {text: 'OK', onPress: () => console.log('OK Pressed - fail alert')},
    ]);
  };

  const registrationSuccesfulAlert = data => {
    try {
      EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          token: data,
        }),
      );
      console.log('kunda');
      console.log(data);
      // Congrats! You've just stored your first value!
    } catch (error) {
      console.log(error);
      // There was an error on the native side
    }

    Alert.alert('Success', 'Welcome to the app', [
      {text: 'OK', onPress: () => navigation.navigate('Login')},
    ]);
  };

  const validateInputs = () => {
    validateUsername();
    validateEmail();
    validatePassword();
    if (
      nameValidation === '' &&
      emailValidation === '' &&
      passwordValidation === ''
    ) {
      if (!inputPassword2) {
        Alert.alert('Almost there...', 'Please re-type the password');
        return;
      } else if (inputPassword !== inputPassword2) {
        Alert.alert('Oh nooo...', 'Paswords do not match');
        return;
      } else {
        SendRegistration();
      }
    } else {
      return;
    }
  };

  const validateUsername = () => {
    if (inputName.length < 3 && nameValidation === ' ') {
      setNameValidation(' is too short');
    }
    if (inputName.length >= 3) {
      setNameValidation('');
    }
  };

  const validateEmail = () => {
    if (inputEmail.length <= 4 && emailValidation === ' ') {
      setEmailValidation(' is required');
    }
    if (inputEmail.length > 4) {
      setEmailValidation('');
    }
  };

  const validatePassword = () => {
    if (inputPassword.length <= 7 && passwordValidation === ' ') {
      setPasswordValidation(' must be at least 8 characters');
    }
    if (inputPassword.length > 7) {
      setPasswordValidation('');
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.RegisterHeader}>
          <Text style={styles.title}>Sign up Screen</Text>
        </View>
        <View style={styles.RegisterFooter}>
          <ScrollView>
            <View style={styles.row}>
              <Text style={styles.menuText}>Username</Text>
              <Text style={styles.warningText}>{nameValidation}</Text>
            </View>
            <TextInput
              style={styles.loginInputBox}
              selectTextOnFocus={true}
              autoCapitalize={'none'}
              keyboardType={'default'}
              selectionColor={'#23FDD3'}
              onChangeText={text => setInputName(text)}
              value={inputName}
              onEndEditing={() => validateUsername()}
            />
            <View style={styles.row}>
              <Text style={styles.menuText}>Email</Text>
              <Text style={styles.warningText}>{emailValidation}</Text>
            </View>
            <TextInput
              style={styles.loginInputBox}
              selectTextOnFocus={true}
              autoCapitalize={'none'}
              keyboardType={'default'}
              selectionColor={'#23FDD3'}
              onChangeText={text => setInputEmail(text)}
              value={inputEmail}
              onEndEditing={() => validateEmail()}
            />
            <View style={styles.row}>
              <Text style={styles.menuText}>Password</Text>
              <Text style={styles.warningText}>{passwordValidation}</Text>
            </View>
            <TextInput
              style={styles.loginInputBox}
              selectTextOnFocus={true}
              autoCapitalize={'none'}
              keyboardType={'default'}
              selectionColor={'#23FDD3'}
              onChangeText={text => setInputPassword(text)}
              value={inputPassword}
              secureTextEntry
              onEndEditing={() => validatePassword()}
            />
            <View style={styles.row}>
              <Text style={styles.menuText}>Re-enter Password</Text>
            </View>
            <TextInput
              style={styles.loginInputBox}
              selectTextOnFocus={true}
              autoCapitalize={'none'}
              keyboardType={'default'}
              selectionColor={'#23FDD3'}
              onChangeText={text => setInputPassword2(text)}
              value={inputPassword2}
              secureTextEntry
            />
            <View style={styles.loginButton}>
              <Button title={'Cancel'} onPress={() => navigation.goBack()} />
              <Button
                title={'Sign up'}
                onPress={() => {
                  validateInputs();
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default RegisterScreen;
