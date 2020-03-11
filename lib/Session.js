import { AsyncStorage } from 'react-native';

export const saveSession = (vKey, vText) => async () => {
  try {
    await AsyncStorage.setItem(vKey, vText);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSession = (vKey) => async () => {
  let Usuario = {};
  try {
    Usuario = await AsyncStorage.getItem(vKey) || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return Usuario;
};