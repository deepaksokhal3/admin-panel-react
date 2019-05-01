const styles =  {
    usersList : {
        textInput : {
            maxWidth     : '18em',
            overflow     : 'hidden',
            textOverflow : 'ellipsis',
            whiteSpace   : 'nowrap'
        }
    },
    createUser : {
        firstNameInput : {
            display : 'inline-block'
        },
        lastNameInput : {
            display    : 'inline-block',
            marginLeft : 32
        },
        tinInput : {
            display    : 'inline-block',
            marginLeft : 45
        },
        carInputFirstEl : {
            margin  : '0 calc((33.3333% - 200px) /2 )',
            display : 'inline-block'
        },
        uploadDocStyles : {
            marginTop : 25,
            display   : 'inline-block'
        },
        inputsErrorStyle : {
            errorStyle : {
                position     : 'absolute',
                bottom       : '-18px',
                marginBottom : 10,
                height       : 'auto',
                width        : 'inherit'
            }
        },
        passInputStyles : {
            inputStyle : {
                textSecurity       : 'disc',
                WebkitTextSecurity : 'disc',
                MozTextSecurity    : 'disc'
            }
        }
    },
    UserTitle     : { marginRight: '6px', marginBottom: '-6px' },
    fullNameField : {
        padding      : '14px 6px',
        whiteSpace   : 'nowrap',
        overflow     : 'hidden',
        textOverflow : 'ellipsis',
        display      : 'flex',
        alignItems   : 'center'
    }
};

export default  styles;
