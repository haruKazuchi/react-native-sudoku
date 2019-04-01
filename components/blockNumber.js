import React, {Component} from 'react'
import {
	Dimensions,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../actions'

const dimensions = Dimensions.get('window')
let arr = []


class BlockNumber extends Component{
	constructor(props){
		super(props)
	}

	createBlock(){
		const blockSum = [0,1,2,3,4,5,6,7,8]
		let indexCol = 0
		const {dataJson} = this.props.board
		const data = dataJson

		let blockRow = blockSum.map((index) =>
			<View key={index} style={[Style.blockRow, index == 2 || index == 5 ? {borderBottomColor: '#333'} : null]}>
				{this.callRow(index, blockSum, data)}
			</View>
		)

		return blockRow
	}

	callRow(n, blockSum, data){
		const {pressIndex, gameStart, masterBoard} = this.props.board

		let row = blockSum.map((index) =>
			<View style={[
				{justifyContent: 'center', alignItems: 'center'},
				data ? masterBoard.filter(i => i === n + '' + index).length > 0 ? Style.grayBg : null : null,
				data ? n + '' + index == pressIndex ? Style.activeblock : null : null
			]}>
				<TouchableOpacity activeOpacity={1}
					onPress={data ? masterBoard.filter(i => i === n + '' + index).length > 0 ? null  : ()=>this.tapStatus(n,index) : null}
					key={index} style={[
						Style.blockView,
						index == 2 || index == 5 ? {borderRightColor: '#333'} : null,
				]}>
					<Text style={Style.number}>{data ? data[n][index] > 0 ? data[n][index] : null : null}</Text>
				</TouchableOpacity>
			</View>
		)

		return row
	}

	tapStatus(n, index){
		const {tapBoard, pressIndex, dataJson} = this.props.board
		const {TapBoard, PressIndex, GameStart} = this.props
		let i = n + '' + index

		GameStart({data: true})

		if (i == pressIndex) {
			TapBoard({data: !tapBoard})
			PressIndex({data: !tapBoard ? i : null})
		}
		else{
			TapBoard({data: true})
			PressIndex({data: i})
		}
	}

	render(){
		return(
			<View>
				<View style={Style.viewStyle}>
					{this.createBlock()}
				</View>
			</View>
		)
	}
}

const Style = StyleSheet.create({
	blockView: {
		width: dimensions.width * 0.9 / 9,
		height: dimensions.width * 0.9 / 9,
		borderRightWidth: 1,
		borderColor: '#ccc',
		boxSizing: 'border-box',
	},
	blockRow: {
		width: dimensions.width * 0.9,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderColor: '#ccc',
		boxSizing: 'border-box',
		borderBottomWidth: 1,
	},
	viewStyle: {
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderColor: '#ccc',
		boxSizing: 'border-box'
	},
	number: {
		textAlign: 'center',
		fontSize: dimensions.width * 0.9 / 10
	},
	grayBg: {
		backgroundColor: "rgba(204,204,204,0.5)"
	},
	modal: {
		position: 'absolute',
		zIndex: 90,
		bottom: 0,
		left:0,
		width: '100%',
		height: '30%',
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	activeblock: {
		backgroundColor: '#90CB8C',
	}
})

function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch)
}

function mapStateToProps({board}){
  return {board}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockNumber)