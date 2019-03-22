import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Animated, Easing } from 'react-native'
import HomeScreen from './containers/homeScreen'
import InfoScreen from './containers/infoScreen'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'

function forVertical(props) {
  const { layout, position, scene } = props;

  const index = scene.index;
  const height = layout.initHeight;

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange: ([index - 1, index, index + 1]: Array<number>),
    outputRange: ([height, 0, 0]: Array<number>)
  });

  return {
    transform: [{ translateX }, { translateY }]
  };
}

const NavStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    Info: {
      screen: InfoScreen,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 1,
    },
    transitionConfig:  () => ({
      transitionSpec: {
        duration: 100,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const height = layout.initHeight;
        const translateX = 0
        const translateY = 0

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1 , 1],
        });

        return { opacity, transform: [{translateX}, {translateY}] };
      },
    }),
  }
)

const Navigation = createAppContainer(NavStack)

export default Navigation