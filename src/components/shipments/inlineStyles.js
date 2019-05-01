const styles = {
    ShipmentsGridStyles : {
        itemCard : {
            width         : '99%',
            minHeight     : 30,
            margin        : '0.5em',
            display       : 'inline-block',
            verticalAlign : 'top'
        },
        itemsContainer : {
            maxHeight : 820,
            overflowY : 'scroll'
        },
        rootCard : {
            paddingBottom : 4
        },
        tableWrapper : {
            boxShadow : 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
        }
    },
    paginationContainer : {
        display        : 'flex',
        flexDirection  : 'row',
        justifyContent : 'flex-end',
        padding        : '.5em',
        fontSize       : '.75em'
    },
    paginationSection : {
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center'
    },
    paginationText : {
        margin : '0 1.25em'
    },
    paginationSelect : {
        width    : 80,
        fontSize : '1em'
    },
    navigationLeft : {
        marginRight : '.5em',
        cursor      : 'pointer'
    },
    navigationLeftFirstPage : {
        marginRight : '.5em',
        color       : 'rgba(0,0,0,0.26)'
    },
    navigationRight : {
        margin : '0 .5em',
        cursor : 'pointer'
    },
    navigationRightLastPage : {
        margin : '0 .5em',
        color  : 'rgba(0,0,0,0.26)'
    }
};

export default styles;
