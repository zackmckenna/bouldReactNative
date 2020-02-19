import * as React from 'react';
import { TextInput,
          Image,
          Platform,
          StyleSheet,
          Text,
          TouchableOpacity,
          View,
          ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Card, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux'
import { loginUser } from '../redux/login'
import { getClimbs } from '../redux/climbs'
import { MonoText } from '../components/StyledText';
import { Avatar } from 'react-native-elements'
import climbService from '../services/climb'
import { AsyncStorage } from 'react-native'

const mapStateToProps = state => {
  console.log(state)
  return {
    climbs: state.climbs,
    login: state.login
  }
}

const mapDispatchToProps = {
  loginUser,
  getClimbs
}

const HomeScreen = props => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [userClimbs, setUserClimbs] = React.useState([])
  const [averageFlashgrade, setAverageFlashgrade] = React.useState(0)

  React.useEffect(() => {
    props.getClimbs()
    fetchAndSetUserClimbs()
  },[])

  const fetchAndSetUserClimbs = async () => {
    // await props.getClimbs()
    const climbArray = props.climbs.climbs.map(climb => climb.user.id === props.login.user.id ? climb : null)
    console.log(climbArray)
    await setUserClimbs(props.climbs.climbs.filter(climb => climb.user.id === props.login.user.id))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      console.log(username, password)
      await props.loginUser(username, password)
      // climbService.setToken(props.login.user.token)
      await AsyncStorage.setItem('loggedAppUser', props.login.user)
      await setUserClimbs(props.climbs.climbs.filter(climb => climb.user.id === props.login.user.id))
    } catch (error){
      console.log(error)
    }
    setUsername('')
    setPassword('')
  }

  if (!props.login.user.token){
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
            <Button
              style={[styles.loginButton, styles.blue]}
              title='Login'
              onPress={(e) => handleLogin(e)}/>
            <Text style={styles.createAccountLink} onPress={() => props.navigation.navigate('Register')}>create an account</Text>
          </View>
          {props.login.loading ? <ActivityIndicator size='large' color='#0000ff'/> : null}
        </ScrollView>

      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Avatar style={styles.avatar}
            rounded
            />
          <Text style={styles.bould}>{props.login.user.username}</Text>
            <Card containerStyle={{padding: 0}}>
              <Text>Climbs: {userClimbs.length}</Text>
              {/* {props.login.user ? <Text>{props.climbs.climbs.filter(climb => climb.user.id === props.login.user.id)}</Text> : null} */}
              <Text>Average Flash Grade: </Text>
            </Card>
          <View style={styles.login}>
          <Button
              style={[styles.loginButton, styles.blue]}
              title='Add Climb'
              onPress={() => props.navigation.navigate('AddClimb')}/>
          </View>
        </ScrollView>

      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  header: null,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
