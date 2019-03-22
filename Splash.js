import React from 'react'
import { StyleSheet, Text, View, Animated, Easing, Image, StatusBar } from 'react-native'
import { AppLoading, Asset, Font, Icon, SplashScreen } from 'expo'
import Navigation from './Navigation'

export default class Splash extends React.Component {
  state = {
    isLoadingComplete: false,
    splashAnimation: new Animated.Value(0),
    splashAnimationComplete: false,
    initBackground: new Animated.Value(0),
  }

  componentDidMount = () => {
    this._loadAsync()
    StatusBar.setHidden(true)
    SplashScreen.preventAutoHide();
  }

  _loadAsync = async () => {
    try {
      await this._loadResourcesAsync();
    } catch (e) {
      this._handleLoadingError(e);
    } finally {
      setTimeout(()=>{
        this._handleFinishLoading();
      },1000)
    }
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <Animated.View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
          }}>
          <Animated.Image
            source={require('./assets/img/icon.png')}
            style={{
              width: 128,
              height: 128,
              justifyContent: 'center',
              textAlign: 'center',
              resizeMode: 'contain',
              backgroundColor: "#000",
              opacity: this.state.initBackground
              }}
              onLoadEnd={this._initLoad}
            >
          </Animated.Image>
          <Animated.View
            style={{
              opacity: this.state.initBackground,
              marginTop: 10,
              transform: [
                {
                  scale: this.state.initBackground.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            }}>
            <Text style={{color: '#fff', fontSize: 32}}>SUDOKU</Text>
          </Animated.View>
        </Animated.View>
      )
    }


    return (
      <Animated.View style={styles.container}>
        <Navigation/>
        {this._maybeRenderLoadingImage()}
      </Animated.View>
    )
  }

  _maybeRenderLoadingImage = () => {
    if (this.state.splashAnimationComplete) {
      return null;
    }

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          opacity: this.state.splashAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}>
        <Animated.Image
          source={require('./assets/img/icon.png')}
          style={{
            width: 128,
            height: 128,
            alignItems: 'center',
            justifyContent: 'center',
            resizeMode: 'contain',
            opacity: this.state.splashAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            transform: [
              {
                scale: this.state.splashAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.25],
                }),
              },
            ],
          }}
          onLoadEnd={this._animateOut}
        />
        <Animated.Text
          style={{color: '#fff', fontSize: 32, marginTop: 10, opacity: this.state.splashAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
            })
          }}>
          SUDOKU
        </Animated.Text>
      </Animated.View>
      )
    }

  _animateOut = () => {
    Animated.timing(this.state.splashAnimation, {
      toValue: 1,
      delay: 1500,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ splashAnimationComplete: true });
    })
  }

  _initLoad = () => {
    SplashScreen.hide();
    Animated.timing(this.state.initBackground, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start()
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/img/icon.png'),
      ]),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
