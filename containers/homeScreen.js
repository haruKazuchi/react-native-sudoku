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
		}
	}

	componentDidMount(){
		this.generateSudoku()
	}

	generateSudoku(){
		fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
      .then((response) => {
				let board = JSON.parse(response._bodyText)
				const {DataJson, OriginalBoard, MasterBoard} = this.props
				const {solution} = this.props.board
				let arr = []

				for (let i = 0; i < board["board"].length; i++) {
					for (let j = 0; j < board["board"][i].length; j++) {
						if (board["board"][i][j] > 0) {
							arr.push([i] + '' + [j])
						}
					}
				}

				MasterBoard({dataArray: arr})
				DataJson({dataObject: board["board"]})



				this.setState({
					isLoading: false,
				})

				// console.log(this.checkSolve(board))
				// if (board) {
				// 	this.checkSolve(board)
				// 	setTimeout(()=>{
				// 		if (solution) {
				// 			DataJson({dataObject: board["board"]})
				// 			this.setState({
			  //         isLoading: false,
			  //       })
				// 		}
				// 		else{
				// 			this.generateSudoku()
				// 		}
				// 	},2000)
				// }

			})
      .catch((error) =>{
        console.error(error);
      })
	}

	checkSolve(body){
		console.log(JSON.stringify(body));
		fetch('https://sugoku.herokuapp.com/solve', {
		  method: 'POST',
		    headers: {
		     'Accept': 'application/json',
		     'Content-Type': 'application/json',
		    },
		    body: JSON.stringify(body)
		})
		.then((response) => {
			let data = JSON.parse(response._bodyText)
			const {Solution} = this.props

			console.log(data["status"])
			if(data["status"] == "solved"){
				Solution({dataObject: data["solution"]})
				return true
			}
			else{
				return false
			}
		})
		.catch((err) => {
			console.log(err)
			return false
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