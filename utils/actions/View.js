export function updateRadius(radius){
	return {
		type  : "updateRadius",
		radius: radius
	}
}

export function addCart(payload){
	return{
		type : "addCart",
		payload : payload
	}
}

export function updateCart(payload){
	return{
		type : "updateCart",
		payload : payload
	}
}

export function openAuthModal(payload){
	return{
		type : "openAuthModal",
		payload : payload
	}
}

export function setAmount(amount){
	return{
		type : "setAmount",
		amount : amount
	}
}