const styles = {
    'fileContainer' : {
        'position'       : 'relative',
        'overflow'       : 'hidden',
        'background'     : 'white',
        'color'          : '#353535',
        'border'         : '2px solid rgb(0, 188, 212)',
        'width'          : 170,
        'display'        : 'flex',
        'height'         : 34,
        'justifyContent' : 'center',
        'alignItems'     : 'center',
        margin           : '10px 0',
        marginRight      : 70
    },

    'inputFile' : {
        'display'   : 'block',
        'opacity'   : 0,
        'position'  : 'absolute',
        'right'     : 0,
        'textAlign' : 'right',
        'top'       : 0,
        'cursor'    : 'pointer'
    },

    'CreateShipmentFormStyles' : {
        padding : 10
    },
    AddItemBlock : {
        display        : 'flex',
        justifyContent : 'space-between',
        alignItems     : 'flex-end'
    },
    DropdownStyles : {
        width : 270
    },
    CounterStyles : {
        width     : 60,
        marginTop : 10
    },
    ButtonStyles : {
        hoverColor      : '#0bd5ef',
        backgroundColor : 'rgba(11, 213, 239, 0.31)'
    },
    errorStyle : {
        color    : 'red',
        fontSize : 12,
        bottom   : 15
    },
    buttonStyle : {
        borderRadius : 50
    },
    wrapper : {
        display       : 'flex',
        flexDirection : 'column'
    },
    main : {
        display       : 'flex',
        flexDirection : 'column',
        minHeight     : '100vh'
    },
    body : {
        backgroundColor : '#edecec',
        display         : 'flex',
        flex            : '1 1 auto',
        overflowY       : 'hidden',
        overflowX       : 'scroll'
    },
    bodySmall : {
        backgroundColor : '#fff'
    },
    content : {
        flex    : 1,
        padding : '2em'
    },
    contentSmall : {
        flex       : 1,
        paddingTop : '3em'
    },
    loader : {
        position : 'absolute',
        top      : 0,
        right    : 0,
        margin   : 16,
        zIndex   : 1200
    }
};

export default styles;
