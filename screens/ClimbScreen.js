import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux'

import { getClimbs } from '../redux/climbs'

import { MonoText } from '../components/StyledText';

const mapStateToProps = state => {
  return {
    climbs: state.climbs,
    login: state.login
  }
}

const mapDispatchToProps = {
  // listClimbs: () => listClimbs,
  getClimbs
}

const ClimbScreen = (props) => {
  const [userClimbs, setUserClimbs] = React.useState([])

  React.useEffect(() => {
    fetchAndSetUserClimbs()
  }, [])

  const keyExtractor = (item, index) => index.toString()

  const fetchAndSetUserClimbs = async () => {
    // await props.getClimbs()
    const climbArray = props.climbs.climbs.map(climb => climb.user.id === props.login.user.id ? climb : null)
    console.log(climbArray)
    await setUserClimbs(props.climbs.climbs.filter(climb => climb.user.id === props.login.user.id))
  }

  return (
    <View >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View >

          <Text styl={{ fontWeight: 'bold' }}>My Climbs</Text>
          {userClimbs.map((climb, index) => (
            <ListItem
              key={index}
              title={'V' + climb.setDifficulty}
              subtitle={climb.result}
              bottomDivider
            />
          ))}
          <FlatList
            keyExtractor={keyExtractor}
            data={userClimbs}
            renderItem={({item}) => <Text key={item.key}>{item.result}</Text>}
            />
          {console.log('userClimbs', userClimbs)}
        </View>
      </ScrollView>
    </View>
  );
}

ClimbScreen.navigationOptions = {
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

export default connect(mapStateToProps, mapDispatchToProps)(ClimbScreen)
