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

class Numpad extends Component{
	constructor(props){
		super(props)
	}

	numberPress(index){
		const {tapState, tapNumber} = this.props.board
		const {TapState, TapNumber} = this.props

		TapState({data: tapNumber === index ? !tapState : true})
		TapNumber({data: index})
	}

	showNumber(){
		const num = [9,8,7,6,5,4,3,2,1,0]
		const {tapState, tapNumber} = this.props.board

		let numpad = num.map((index)=>
			<View style={[
					Style.pad,
					index === 1 || index == 3 || index === 0 ? {borderBottomWidth: 1} : null,
					index === 0 || index === 1 || index == 4  || index === 7 ? {borderRightWidth: 1} : null,
					tapState ? index === tapNumber ? Style.active : null : null
				]}>
				<TouchableOpacity activeOpacity={1} style={{width: '100%', height: '100%'}} onPress={()=>this.numberPress(index)}>
					<Text style={{fontSize: 18, textAlign: 'center', lineHeight: 50}}>{index}</Text>
				</TouchableOpacity>
			</View>
		)

		return numpad
	}

	render(){
		return (
			<View style={Style.container}>
				{this.showNumber()}
			</View>
		)
	}
}

const Style = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%',
		height: 200,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 30
	},
	pad: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '30%',
		height: 50,
		borderColor: '#ccc',
		borderTopWidth: 1,
		borderLeftWidth: 1,
		boxSizing: 'border-box'
	},
	active: {
		backgroundColor: '#F5FCFF'
	}
})

function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch)
}

function mapStateToProps({board}){
  return {board}
}

export default connect(mapStateToProps, mapDispatchToProps)(Numpad)