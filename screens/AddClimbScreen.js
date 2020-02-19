import * as React from 'react';
import { TextInput, Image, Platform, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Rating, ButtonGroup } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux'
import { postClimb } from '../redux/climbs'
import { MonoText } from '../components/StyledText';

const mapStateToProps = state => {
  console.log(state)
  return {
    climbs: state.climbs,
    register: state.register,
    login: state.login
  }
}

const mapDispatchToProps = {
  postClimb
}

const AddClimbScreen = props => {
  const [personalDifficulty, setPersonalDifficulty] = React.useState(0)
  const [setDifficulty, setSetDifficulty] = React.useState(0)
  const [resultButtonIndex, setResultButtonIndex] = React.useState(3)
  const [completed, setCompleted] = React.useState(false)
  const [note, setNote] = React.useState('')
  const [difficultyButtonIndex, setDifficultyButtonIndex] = React.useState(0)

  const handleAddClimb= () => {
    if (resultButtonIndex < 3){
      setCompleted(true)
    }
    console.log(setDifficulty, difficultyButtonIndex, resultButtonIndex, completed)
    const newClimb = {
      setDifficulty: setDifficulty,
      personalDifficulty: difficultyButtonIndex,
      result: resultButtons[resultButtonIndex],
      completed: completed,
      userId: props.login.user.id
    }
    props.postClimb(newClimb)
    if (props.climbs.climbPosted){
      props.navigation.navigate('Home')
    } else {
      console.log('error adding climb')
    }
  }

  const setRatingCompleted = rating => {
    console.log('rating function')
    console.log(`rating ${rating}`)
    setSetDifficulty(rating)
    console.log('personal:', personalDifficulty)
  }

  const difficultyButtons = [
    '--', '-', '=', '+', '++'
  ]

  const resultButtons = [
    'onsight','flash','redpoint','attempt'
  ]

  const buttonDescription = [
    'Very Easy', 'Easy', 'Neutral', 'Hard', 'Very Hard'
  ]

  // const setRatingCompleted = rating => {
  //   console.log('rating function')
  //   console.log(`rating ${rating}`)
  //   setSetDifficulty(rating)
  //   console.log('personal:', personalDifficulty)
  // }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.setDifficultyView}>
          <Text style={styles.setDifficulty}>V{setDifficulty}</Text>
          <Rating
            type='heart'
            ratingCount={11}
            imageSize={30}
            onStartRating
            onFinishRating={rating => setRatingCompleted(rating)}
            />
        </View>
        <View style={styles.personalDifficultyView}>
          <Text style={styles.personalDifficultyText}>Personal Difficulty: {buttonDescription[difficultyButtonIndex]}</Text>
          <ButtonGroup
            onPress={(index) => setDifficultyButtonIndex(index)}
            selectedIndex={difficultyButtonIndex}
            buttons={difficultyButtons}/>
        </View>
        <View style={styles.personalDifficultyView}>
          <Text style={styles.personalDifficultyText}>Result: {resultButtons[resultButtonIndex]}</Text>
          <ButtonGroup
            onPress={(index) => setResultButtonIndex(index)}
            selectedIndex={resultButtonIndex}
            buttons={resultButtons}/>
        </View>
        <View style={styles.addClimbButtonView}>
        <Button
              style={styles.addClimbButton}
              title='Add Climb'
              onPress={() => handleAddClimb()}/>
        </View>
        {props.climbs.postClimbPending ? <ActivityIndicator size='large' color='#0000ff'/> : null}
      </ScrollView>
    </View>
  )
}

AddClimbScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  result: {

  },
  resultText: {

  },
  resultView: {

  },
  personalDifficulty: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  personalDifficultyText: {
    textAlign: 'center'
  },
  personalDifficultyView: {
    marginTop: 30
  },
  setDifficultyView: {

  },
  setDifficultyText: {
    textAlign: 'center'
  },
  setDifficulty: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  createAccountLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#17BEBB'
  },
  input: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1
  },
  addClimbButtonView: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(AddClimbScreen)
