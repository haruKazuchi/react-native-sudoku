import React, {Component} from 'react'
import {
	Dimensions,
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native'

const dimensions = Dimensions.get('window')


export default class BlockNumber extends Component{
	constructor(props){
		super(props)
		this.state = {
			widthboard : 0,
		}
	}

	componentDidMount(){
		this.setState({
			widthboard: dimensions.width * 0.9,
		})
	}

	createBlock(){
		const blockSum = [0,1,2,3,4,5,6,7,8]
		let indexCol = 0
		const data = this.props.data

		console.log(this.props.data)
		this.props.data ? console.log(this.props.data[0][1]) : console.log("B")

		let row = blockSum.map((index) =>
			<TouchableOpacity key={index} style={[Style.blockView, index == 2 || index == 5 ? {borderRightColor: '#333'} : null]}>
				<Text style={Style.number}>{data ? data[indexCol][index] : ''}</Text>
			</TouchableOpacity>
		)

		let blockRow = blockSum.map((index) =>
			<View key={index} style={[Style.blockRow, index == 2 || index == 5 ? {borderBottomColor: '#333'} : null]}>
				{row}
			</View>
		)



		// console.log(row);
		return blockRow
	}

	render(){
		return(
				<View style={Style.viewStyle}>
					{this.createBlock()}
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
		backgroundColor: '#eee',
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
		lineHeight: dimensions.width * 0.9 / 9,
		textAlign: 'center',
		fontSize: dimensions.width * 0.9 / 9
	}
})