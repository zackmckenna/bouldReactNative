import React from 'react'
import { Avatar } from 'react-native-elements'
import vColorArray from '../constants/Vcolors'

const VAvatar = ({difficulty, size}) => {

  const makeTitle = difficulty => {
    return `V${difficulty}`
  }

  return (
    <Avatar
      overlayContainerStyle={{ backgroundColor: vColorArray[difficulty]}}
      size={size ? size : 'small'}
      rounded
      title={makeTitle(difficulty)}
      />
  )
}

export default VAvatar
