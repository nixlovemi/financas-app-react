import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator, Image } from 'react-native';
import { Container, Button, Form, Item, Input, Label } from 'native-base';
import { Asset } from 'expo-asset';

import styles from '../style';
import { WEBSERVICE_URL, WEBSERVICE_TOKEN, readRest } from '../lib/FetchRest';
import { decodeHtmlEntities } from '../lib/Utils';
/*import { saveSession } from '../lib/Session';*/

export default function Login({navigation}) {
  const [loginUsuario, setLoginUsuario] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const imageURI = Asset.fromModule(require('../assets/logo.png')).uri;

  async function verificaLogin() {
    setIsLoading(true);

    let headers = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({user: loginUsuario, password: loginSenha, appkey: WEBSERVICE_TOKEN})
    }

    let ret  = await readRest(WEBSERVICE_URL + '/checkLogin', headers);
    let isOk = ret.isOk;
    setIsLoading(false);

    if(!isOk){
      let errorMsg = decodeHtmlEntities('Não conseguimos conectar com o servidor. Mensagem: ' + ret.errorMsg);
      Alert.alert('Erro de Rede!', errorMsg);
    } else {
      const result = ret.result;
      if ( result.error ) {
        Alert.alert('Erro no Login!', 'Usuário e/ou senha inválidos!');
      } else {
        // @todo fazer gravar "session"
        // saveSession('Usuario', JSON.stringify(result.Usuario));
        navigation.navigate('MainTemplate');
      }
    }
  }

  useEffect(() => {
    // qdo abre a tela, passa DEFAULT
    // apenas pra teste
    setLoginUsuario('admin');
    setLoginSenha('verdaumsdrobs');
  }, []);

  return (
    <Container style={styles.bgPrimary}>
      <View style={pgStyles.loginFormContainer}>
        <Image style={{width: 178, height: 24, marginBottom: 20}} source={{uri: imageURI}} />
        <Form style={pgStyles.loginForm}>
          <Item stackedLabel>
              <Label>Usuário</Label>
              <Input onChangeText={setLoginUsuario} value={loginUsuario} />
          </Item>
          <Item stackedLabel last>
              <Label>Senha</Label>
              <Input onChangeText={setLoginSenha} value={loginSenha} secureTextEntry={true} password="true" />
          </Item>
          <Button block light
            disabled={isLoading}
            onPress={() => {
              verificaLogin()
            }}
          >
            <Text>Entrar</Text>
            <ActivityIndicator style={pgStyles.loading} animating={isLoading} size="small" color="#002fd9" />
          </Button>
        </Form>
      </View>
    </Container>
  );
}

const pgStyles = StyleSheet.create({
  loginFormContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1
  },
  loginForm: {
    width: '80%',
    backgroundColor: '#FFF'
  },
  loading: {
    position: 'relative',
    left: 10
  }
});