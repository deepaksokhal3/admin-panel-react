const styles = {
    product : {
        editForm : {
            sizeInput : {
                display     : 'inline-block',
                marginRight : 100
            },
            priseInput : {
                display : 'inline-block'
            },
            inputsWidth : {
                maxWidth : 100
            },
            dropdownInput : {
                display     : 'inline-block',
                marginRight : 100,
                position    : 'relative',
                top         : 16
            }
        },
        gridListComponent : {
            root : {
                margin : '-2px'
            },
            gridList : {
                margin : 10
            },
            titleBackground : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0) 100%)'
        }
    },
    inputsErrorStyle : {
        errorStyle : {
            position     : 'absolute',
            bottom       : '-18px',
            marginBottom : 10,
            height       : 'auto',
            width        : 'inherit'
        }
    }
};

export default styles;
