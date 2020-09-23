import {    
    updateRadius,
    addCart,
    updateCart,
    openAuthModal,
    setAmount
} from './actions/View'

export const mapStateToProps = (state) => {
    return {
        View: state.View,
    }
}

export const mapDispatchToProps = (dispatch) => {
	return {
		updateRadius: (radius) => {
            dispatch(updateRadius(radius))
        },
        addCart : (itemName) => {
            dispatch(addCart(itemName))
        },
        updateCart : (itemName) => {
            dispatch(updateCart(itemName))
        },
        openAuthModal : (data) => {
            dispatch(openAuthModal(data))
        },
        setAmount : (amount) => {
            dispatch(setAmount(amount))
        }
	}
}
