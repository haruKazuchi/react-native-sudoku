import React, {Component} from 'react'
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet
} from 'react-native'
import BlockNumber from '../components/blockNumber'

export default class HomeScreen extends Component{
	constructor(props){
		super(props)
		this.state = {
			dataJson: null,
			isLoading: true
		}
	}

	componentDidMount(){
		return fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
      .then((response) => {
				let board = JSON.parse(response._bodyText)
				this.setState({
          isLoading: false,
          dataSource: board['board'],
        })
			})
      .catch((error) =>{
        console.error(error);
      })
	}

	render(){
		// console.log(this.state.dataSource)
		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<View style={[Style.loadingModal, this.state.isLoading ? {display: 'flex'} : {display: 'none'}]}>
					<ActivityIndicator size="large" color="#00ff00" />
				</View>
				<BlockNumber data={this.state.dataSource}/>
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