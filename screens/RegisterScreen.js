import * as React from 'react';
import { TextInput, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux'
import { registerAccount } from '../redux/register'
import { MonoText } from '../components/StyledText';

const mapStateToProps = state => {
  console.log(state)
  return {
    climbs: state.climbs,
    register: state.register
  }
}

const mapDispatchToProps = {
  registerAccount
}

const RegisterScreen = props => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')


  const handleLogin = () => {
    console.log(username, password)
    props.registerAccount(username, password, email)
    setUsername('')
    setPassword('')
    setEmail('')
    if (!props.register.error && props.register.registered){
      props.navigation.navigate('Home')
    } else {
      console.log('error creating account')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* <Text style={styles.bould}>Bould.</Text>
        <Text style={styles.subtitle}>a minimalist climbing app</Text>
        <View style={styles.dotContainer}>
          <View style={[styles.dot, styles.green]}></View>
          <View style={[styles.dot, styles.blue]}></View>
          <View style={[styles.dot, styles.red]}></View>
          <View style={[styles.dot, styles.yellow]}></View>
          <View style={[styles.dot, styles.black]}></View>
          <View style={[styles.dot, styles.gray]}></View>
        </View> */}
        <View style={styles.login}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(username) => setUsername(username)}
          />
          <Text style={styles.inputLabel}>username</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={password => setPassword(password)}/>
          <Text style={styles.inputLabel}>password</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={email => setEmail(email)}/>
          <Text style={styles.inputLabel}>email</Text>
          <Button
            style={[styles.loginButton, styles.blue]}
            title='Create Account'
            onPress={() => handleLogin()}/>
          {/* <Text style={styles.createAccountLink} onPress={() => navigation.navigate('Register')}>create an account</Text> */}
        </View>
      </ScrollView>

    </View>
  )
}

RegisterScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  createAccountLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#17BEBB'
  },
  input: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1
  },
  loginButton: {
    paddingTop: 30
  },
  inputLabel: {
    textAlign: 'center',
    marginBottom: 20
  },
  login: {
    marginTop: 80,
    marginLeft: 30,
    marginRight: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  red: {
    backgroundColor: '#E4572E'
  },
  blue: {
    backgroundColor: '#17BEBB'
  },
  yellow: {
    backgroundColor: '#FFC914'
  },
  black: {
    backgroundColor: '#2E282A'
  },
  green: {
    backgroundColor: '#76B041'
  },
  gray: {
    backgroundColor: '#878E88'
  },
  subtitle: {
    textAlign: 'center',
  },
  dot: {
    height: 25,
    width: 25,
    backgroundColor: '#bbb',
    borderRadius: 50,
  },
  dotContainer: {
    marginTop: 20,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  bould: {
    textAlign: 'center',
    fontSize: 70,
    fontWeight: 'bold',
    marginTop: 20,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
