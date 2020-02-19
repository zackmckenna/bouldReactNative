import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import { RectButton, ScrollView } from 'react-native-gesture-handler'

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        icon="md-school"
        label="Read up on boulder grading"
        onPress={() => WebBrowser.openBrowserAsync('https://www.99boulders.com/bouldering-grades')}
      />

      <OptionButton
        icon="md-school"
        label="Read up on top-route grading"
        onPress={() => WebBrowser.openBrowserAsync('https://sportrock.com/understanding-climbing-grades/')}
      />

      <OptionButton
        icon="md-compass"
        label="Handy climbing knot guide"
        onPress={() => WebBrowser.openBrowserAsync('https://www.rei.com/learn/expert-advice/climbing-knots.html')}
      />

      <OptionButton
        icon="ios-school"
        label="Guide for climbing anchor safety"
        onPress={() => WebBrowser.openBrowserAsync('https://www.rei.com/media/1f544137-bc02-40cf-913a-782c511dd817')}
        isLastOption
      />
    </ScrollView>
  )
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
})
