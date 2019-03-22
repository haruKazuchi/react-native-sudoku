import React, {Component} from 'react'
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../actions'
import BlockNumber from '../components/blockNumber'
import Numpad from '../components/numpad'

class HomeScreen extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLoading: true,
			originalBoard: null
		}
	}

	componentDidMount(){
		return fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
      .then((response) => {
				let board = JSON.parse(response._bodyText)
				const {DataJson} = this.props

				DataJson({dataObject: board["board"]})
				this.setState({
          isLoading: false,
					originalBoard: board
        })
			})
      .catch((error) =>{
        console.error(error);
      })
	}

	render(){
		return(
			<View style={{position:'relative', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<View style={[Style.loadingModal, this.state.isLoading ? {display: 'flex'} : {display: 'none'}]}>
					<ActivityIndicator size="large" color="#00ff00" />
				</View>
				<BlockNumber/>
				<Numpad/>
			</View>
		)
	}
}

const Style = StyleSheet.create({
	loadingModal : {
		position: 'absolute',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
		top: 0,
		left: 0
	}
})

function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch)
}

function mapStateToProps({board}){
  return {board}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)