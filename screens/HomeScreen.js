import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.bould}>Bould.</Text>
        <Text style={styles.subtitle}>a minimalist climbing app</Text>
        <View style={styles.dotContainer}>
          <View style={[styles.dot, styles.green]}></View>
          <View style={[styles.dot, styles.blue]}></View>
          <View style={[styles.dot, styles.red]}></View>
          <View style={[styles.dot, styles.yellow]}></View>
          <View style={[styles.dot, styles.black]}></View>
          <View style={[styles.dot, styles.gray]}></View>
        </View>
        <View style={styles.login}>
          <Input value={username} onChange={e => handleUsernameChange(e)}/>
          <Text style={styles.inputLabel}>username</Text>
          <Input value={password} onChange={e => handlePasswordChange(e)}/>
          <Text style={styles.inputLabel}>password</Text>
          <Button style={[styles.loginButton, styles.blue]} title='Login' onClick={e => handleLogin(e)}/>
        </View>
      </ScrollView>

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  loginButton: {

  },
  inputLabel: {
    textAlign: 'center'
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
