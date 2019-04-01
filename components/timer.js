import React, {Component} from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../actions'

class Timer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			seconds : 0,
			minutes : 0,
		}
	}

	componentDidMount(){
	}

	myTimer(){
		const {seconds, minutes} = this.state
		let myInter = setInterval(()=>{
			minutes >= 60 ? clearInterval(myInter) : null
			if (seconds >= 60) {

				this.setState({
					seconds : 0,
					minutes : this.state.minutes++
				})
			}
			else{
				this.setState({
					seconds : this.state.seconds++
				})
			}
		},1000)

	}

	render(){
		return (
			<View>
				<Text style={{fontSize: 20}}>{this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes}:{this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}</Text>
			</View>
		)
	}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch)
}

function mapStateToProps({board}){
  return {board}
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)