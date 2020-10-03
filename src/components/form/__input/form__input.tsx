import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { Grid, TextField, useMediaQuery } from '@material-ui/core';
import { AssignmentInd, AlternateEmail, Phone } from '@material-ui/icons';

import theme from '../../../theme';

export type InputType = 'name' | 'email' | 'phone';

interface Props {
    handleNewData: (value: string, type: InputType) => void;
    type: InputType;
}

interface CustomFormHelperTextProps {
    className: string;
    'data-testid': string;
}

const inputData = {
    name: {
        Icon: AssignmentInd,
        label: 'Фамилия и имя',
        placeholder: 'Укажите ваши фамилию и имя',
        helper: 'Вы неверно указали имя'
    },
    email: {
        Icon: AlternateEmail,
        label: 'E-mail',
        placeholder: 'Укажите ваш e-mail',
        helper: 'Вы неверно указали e-mail'
    },
    phone: {
        Icon: Phone,
        label: 'Номер телефона',
        placeholder: 'Укажите ваш номер телефона',
        helper: 'Вы неверно указали номер'
    },
}

const useStyles = makeStyles({
    icon: {
        marginRight: theme.spacing(10.5),
        marginBottom: theme.spacing(5),

        color: teal.A700,

        fontSize: '2.25rem',
    },

    grid: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',

        padding: theme.spacing(5.75, 17, 0, 7.5),

        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(4.75, 5.75, 0),
        },
    },

    input: {
        height: 'auto',

        padding: theme.spacing(5.25, 2.5, 4.25),

        fontSize: '0.875rem',
    },

    helperText: {
        lineHeight: '1rem',

        marginTop: theme.spacing(1),
    },

    textField: {
        flexGrow: 1,

        '& label.Mui-focused': {
            color: '#359FF4',
        },

        '& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
            border: 'solid 1px #359FF4',
        }
    },
});

const FormInput = ({ handleNewData, type }: Props) => {
    const classes = useStyles();

    let [isValid, setIsValid] = useState(true);
    let [focus, setFocus] = useState(false);

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        let currentValue = event.target.value;
        setFocus(false);
        let re = new RegExp('');

        if (type === 'name') {
            re = /^(['а-яА-ЯЁё\-]{2,20}\s+){1,2}['а-яА-ЯЁё\-]{2,20}$/;
        }
        if (type === 'email') {
            re = /^\S+@\S+\.\S+$/;
        }
        if (type === 'phone') {
            re = /^[\d\+][\d\(\)\ \-]{3,14}\d$/;
        }

        setIsValid(!currentValue || re.test(currentValue));
        // if input is empty, return true

        if(re.test(currentValue)) {
            handleNewData(currentValue, type);
        }
    }

    const { Icon, label, placeholder, helper } = inputData[type];

    const matches = useMediaQuery<Theme>(theme.breakpoints.up('sm'));
    const helperText = !isValid && !focus ? helper : ' ';

    return (
        <Grid className={classes.grid}>
            {matches && <Icon className={classes.icon}/>}
            <TextField
                className={classes.textField}
                error={!isValid}
                inputProps={{
                    className: classes.input,
                    'data-testid': `input-${type}`
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                FormHelperTextProps={{
                    className: classes.helperText,
                    'data-testid': `helper-${type}`
                } as CustomFormHelperTextProps}
                helperText={helperText}
                label={label}
                onFocus={() => setFocus(true)}
                onBlur={handleBlur}
                placeholder={placeholder}
                variant="outlined"
            ></TextField>
        </Grid>
    );
}

export default FormInput;