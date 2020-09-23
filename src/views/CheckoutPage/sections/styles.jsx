import Config from "~/utils/Config"

const styles = {
    imageDevelop : {
        height : 'auto',
        maxHeight : '100px',
        width : '100%',
        objectFit : 'contain',
        margin : 'auto',
        padding : 10
    },
    card : {
        background : '#fff',
        borderRadius : 5,
        //border : '1px solid #ddd',
        //boxShadow: '0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)'
    },
    devLabel : {
        padding: '10px',
        textAlign: 'center',
        background : '#132FFF',
        color : '#fff',
        borderRadius : '5px',
        fontWeight : 'bold',
        display : 'none'
    },
    sectionTitle : {
        fontWeight : 'bold',
        margin : '30px 0px 20px',
        fontSize : 18
    },
    jobs : {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom : 0
    },
    company : {
        fontSize : 16,
        margin : 0,
        fontWeight : 400,
    },
    wrapper : {
        borderLeft : '5px solid #132FFF', 
        padding : '0px 10px 20px 20px', 
        position : 'relative'
    },
    dots : {
        position: 'absolute',
        backgroundColor: 'rgb(19, 47, 255)',
        width: '20px',
        height: '20px',
        top: '-1px',
        borderRadius: '50%',
        left: '-12px',
    },
    portoMobile : {
        width : '48%', 
        height : '100%', 
        objectFit : 'contain',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        borderRadius : 10
    },
    playstore : {
        borderRadius :5,
        width : 150,
        objectFit : 'contain',
        display : 'block',
        margin : 'auto',
        "@media (min-width : 960px)" : {
            marginTop : 50,
        },
        boxShadow:
      '0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)',
        transition:
      'box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            boxShadow:
            '0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)',
        },
    },
    category : {
        display : 'flex', 
        alignItems : 'center', 
        padding : '5px 22px', 
        marginRight : 5, 
        border : '1px solid #ddd', 
        borderRadius : 25,
        cursor : 'pointer',
        transition:
        "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover,&:focus": {
            boxShadow:
            "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)",
        },
        '& p' : {
            margin : 0, 
            marginLeft : 5,
            whiteSpace : 'nowrap'
        }
    },
    iconCategory : {
        objectFit : 'contain', 
        height : 18
    },
    banner : {
        width : '100%', 
        height : '300px', 
        objectFit : 'cover', 
        borderRadius : 20
    },
    promo : {
        position : 'absolute', 
        fontSize : 30, 
        fontWeight : 'bold', 
        color : '#fff', 
        left : 20, 
        top : '45%'
    },
    counterWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '10px 0px 5px',
      },
      btnIncreament: {
        padding: '0px',
        height: '30px',
        width: '30px',
        borderRadius: '0px 5px 5px 0px',
        margin: '0px',
        backgroundColor: Config.primaryColor,
        fontSize: '20px',
        '&:hover': {
          backgroundColor: Config.primaryColor,
        },
        '&:focus': {
          backgroundColor: Config.primaryColor,
          boxShadow:
            '0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)',
        },
      },
      btnDecreament: {
        padding: '0px',
        height: '30px',
        width: '30px',
        borderRadius: '5px 0px 0px 5px',
        margin: '0px',
        backgroundColor: Config.primaryColor,
        backgroundColor: Config.primaryColor,
        fontSize: '20px',
        '&:hover': {
          backgroundColor: Config.primaryColor,
        },
        '&:focus': {
          backgroundColor: Config.primaryColor,
          boxShadow:
            '0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)',
        },
      },
      count: {
        margin : 0,
        width: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid '+Config.primaryColor,
        borderBottom: '1px solid '+Config.primaryColor,
        height: '30px',
        boxShadow:
          '0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)',
      },
      btnDelete : {
          height : 30
      },
      name : {
          textOverflow  : 'ellipsis',
          overflow : 'hidden',
          whiteSpace : 'nowrap'
      },
      cart : {
        display: 'flex',
        border: '1px solid rgb(221, 221, 221)',
        borderRadius: '5px',
        padding: '15px',
        marginBottom: '10px',
        alignItems: 'center'
      },
      imageCart : {
        width : '100%', 
        height : '100%', 
        objectFit : 'cover'
      },
      snackbar : {
        '& p' : {
          margin : 0,
          fontSize : 16,
        },
        padding : '15px 20px',
        width : 344,
        borderLeft : '5px solid '+Config.primaryColor,
        backgroundColor : '#fff',
        borderRadius : 5,
        boxShadow:
        "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
      },
      snackbarInfo : {
        '& p' : {
          margin : 0,
          fontSize : 16,
        },
        padding : '15px 20px',
        backgroundColor : '#fff',
        borderLeft : '5px solid #0277bd',
        borderRadius : 5,
        boxShadow:
        "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
      },
      payment : {
        margin : 0,
        textAlign : 'center',
        fontWeight : 'bold',
        '& h2' : {
          fontFamily : Config.font
        }
      },
      paymentProvider : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'flex-end',
        '& p' : {
          margin : 0,
          marginRight : 5
        }
      },
      btnClose : {
        position : 'absolute',
        right : 10,
        top : 10,
        color : '#747474'
      },
}

export default styles