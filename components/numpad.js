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
		const {tapNumber, tapBoard, dataJson, pressIndex} = this.props.board
		const {DataJson} = this.props
		let copyData = []

		copyData = dataJson.map((x) => x)

		if (tapBoard) {
			copyData[pressIndex.split('')[0]][pressIndex.split('')[1]] = index
			DataJson({dataObject: copyData})
		}
	}

	showNumber(){
		const num = [7,8,9,4,5,6,1,2,3]
		const {tapState, tapNumber} = this.props.board

		let numpad = num.map((index)=>
			<View style={[
					Style.pad,
					index === 1 || index == 3 ? {borderBottomWidth: 1} : null,
					index === 2 || index == 5  || index === 8 ? {borderLeftWidth: 0, borderRightWidth: 0} : null,
				]}>
				<TouchableOpacity activeOpacity={0.8} style={{width: '100%', height: '100%'}} onPress={()=>this.numberPress(index)}>
					<Text style={{color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 50}}>{index}</Text>
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
		backgroundColor: '#333',
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