import EncryptedStorage from 'react-native-encrypted-storage';
// import UserDetailsFromToken from './src/styles/endPointCalls';
import UserDetailsFromToken from './endPointCalls';

async function retrieveUserSession() {
  try {
    const session = await EncryptedStorage.getItem('user_session');

    if (session !== undefined) {
      UserDetailsFromToken(JSON.parse(session).token);
      console.log('true1');
      return true;
    } else {
      console.log('false2');
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function clearStorage() {
  try {
    await EncryptedStorage.clear();
    console.log('here1111');
    // Congrats! You've just cleared the device storage!
  } catch (error) {
    console.log('here22222');
    // There was an error on the native side
  }
}

export {retrieveUserSession, clearStorage};
