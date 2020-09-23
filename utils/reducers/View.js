import _ from 'lodash'

const View = (state = {
	text	: "",
	radius	: "",
	cartItems : [],
	isOpenAuthModal : false,
	amount : 0
},action)=>{
	switch (action.type){
		case 'updateRadius':
			state = {
				...state,
				radius: action.radius
			}
			break
		case 'addCart' :
			let cartItems = _.unionBy(state.cartItems, [action.payload], 'id')
			state = {
				...state,
				cartItems,
			}
			break
		case 'updateCart' :
			state = {
				...state,
				cartItems : action.payload
			}
			break
		case 'setAmount' :
			state = {
				...state,
				amount : action.amount
			}
		break
		case 'openAuthModal' :
			state = {
				...state,
				isOpenAuthModal : action.payload
			}
		break
		default :			
	}
	return state
}
export default View