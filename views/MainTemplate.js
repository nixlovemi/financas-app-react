import React, { Component } from 'react';
import { Text, ActivityIndicator, Alert, StyleSheet, FlatList, Footer } from 'react-native';
import { Container, Header, Body, Title, Content, Right, Button, ActionSheet, Card, CardItem, View } from 'native-base';
import { WEBSERVICE_URL, WEBSERVICE_TOKEN, readRest } from '../lib/FetchRest';
import Icon from 'react-native-vector-icons/MaterialIcons';
/*import { numberToReal } from '../lib/Utils';*/
import * as Font from 'expo-font';
import styles from '../style';

/*import { getSession } from '../lib/Session';*/

var BUTTONS      = ["Novo Lançamento", "Nova Transferência", "Fechar"];
var CANCEL_INDEX = 2;

function openAsNew() {
    ActionSheet.show(
        {
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX,
          title: "NOVO"
        },
        buttonIndex => {
            if ( buttonIndex == 0 ) {
                openNewLcto();
            } else if ( buttonIndex == 1 ) {
                openNewTransf();
            }

            // console.log( BUTTONS[buttonIndex], buttonIndex );
            // this.setState({ clicked: BUTTONS[buttonIndex] });
        }
    )
}

function openNewLcto() {
    console.log('New Lcto');
}

function openNewTransf() {
    console.log('New Transf');
}

function logOut(props) {
    Alert.alert(
        'Sair do Aplicativo!',
        'Deseja realmente fazer logout?',
        [
            {
                text: 'Sim',
                onPress: () => {
                    props.navigation.goBack();
                }
            },
            {
                text: 'Não',
                onPress: () => {}
            }
        ]
    )
}

export default class MainTemplate extends Component {
    state = {
        isReady: false,
        loadLcto: false,
        showLoadMore: true,
        arrSaldoContas: [],
        arrLancamentos: [],
        selected: false,
    }
    // usuId;
    // usuNome;

    constructor(props) {
        super(props);
    }

    componentDidMount = async() => {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
        });

        // @todo fazer carregar "session"
        // let jsonUsuario = getSession('Usuario');
        // console.log(jsonUsuario);

        /*let Usuario     = JSON.parse(jsonUsuario);
        this.usuId      = Usuario["id"];
        this.usuNome    = Usuario["usuario"];
        console.log(Usuario);*/
      
        // saldo contas
        let headersSC = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({mes: '03', ano: '2020', appkey: WEBSERVICE_TOKEN})
        }

        let retSaldoContas  = await readRest(WEBSERVICE_URL + '/getSaldoContas', headersSC);
        if ( retSaldoContas.isOk ) {
            let arrSaldoContas = retSaldoContas.result;
            this.setState({ arrSaldoContas: arrSaldoContas });
        }
        // ============

        // lancamentos
        let headersLCTO = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({mesBase: '03', anoBase: '2020', /*limit: this.state.lctoStep, offset: this.state.lctoOffset,*/ appkey: WEBSERVICE_TOKEN})
        }

        let retLancamentos  = await readRest(WEBSERVICE_URL + '/getLancamentos', headersLCTO);
        if ( retLancamentos.isOk ) {
            // limit | offset | rows |
            let arrLancamentos = retLancamentos.result.rows;
            this.setState({ arrLancamentos: arrLancamentos });
        }
        // ===========
        
        this.setState({ isReady: true });
    }

    renderSaldoContas () {
        return (
            <Card>
                <CardItem header bordered>
                    <Text style={pgStyles.cardTitle}>Saldo Contas</Text>
                </CardItem>
                {
                    this.state.arrSaldoContas.map((arrSaldoContas) => {
                        return (
                            <View key={arrSaldoContas.contaSigla} style={pgStyles.cardItem}>
                                <Text style={pgStyles.nomeConta}>
                                    {arrSaldoContas.contaDesc}
                                </Text>
                                <Right style={pgStyles.saldoContas}>
                                    <Text>Saldo: {arrSaldoContas.strSaldo}</Text>
                                    <Text style={[pgStyles.saldoInicial]}>Saldo Inicial: {arrSaldoContas.strSaldoIni}</Text>
                                </Right>
                            </View>
                        );
                    })
                }
            </Card>
        );
    }

    renderLancamentos () {
        return (
            <FlatList
                data={this.state.arrLancamentos}
                renderItem={({ item }) => (
                    <Text>123</Text>
                )}
            />
        );

        return (
            <Card>
                <CardItem header bordered>
                    <Text style={pgStyles.cardTitle}>Lançamentos</Text>
                </CardItem>
                {
                    this.state.arrLancamentos.map((arrLancamentos) => {return (
                            <View key={arrLancamentos.lanId} style={pgStyles.cardItem}>
                                <Text>
                                    {arrLancamentos.lanDespesa}
                                    {"\n"}
                                    <Text style={{fontSize: 10, color: '#666'}}>123 456</Text>
                                </Text>
                                <Right style={pgStyles.saldoContas}>
                                    <Text>{arrLancamentos.lanValor}</Text>
                                </Right>
                            </View>
                        );
                    })
                }
            </Card>
        );
    }

    render () {
        if (!this.state.isReady) {
            return <ActivityIndicator />;
        }
        return (
            <Container style={{backgroundColor: '#F9F9F9'}}>
                <Header style={styles.bgPrimary}>
                    <Body>
                        <Title>Finanças Pessoais</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={() => {
                                openAsNew();
                            }}
                        >
                            <Icon color="#FFF" size={25} name='add-circle' />
                        </Button>
                        <Button transparent
                            onPress={() => {
                                logOut(this.props);
                            }}
                        >
                            <Icon color="#FFF" size={25} name='exit-to-app' />
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                    { /*this.renderSaldoContas()*/ }
                    { this.renderLancamentos() }
                </Content>
            </Container>
        );
    }
}

const pgStyles = StyleSheet.create({
    nomeConta: {fontSize: 15, fontWeight: 'bold'},
    saldoContas: {/*display: 'flex', flex: 1*/},
    saldoInicial: {fontSize: 11, color: '#666'},
    cardItem: {paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor:'#eaeaea', flex: 1, flexDirection: 'row'},
    cardTitle: {display: 'flex', flex: 1, textAlign: 'center', fontSize: 15},
});