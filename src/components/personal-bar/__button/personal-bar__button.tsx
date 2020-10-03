import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, useMediaQuery } from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';

import theme from '../../../theme';

interface Props {
    isEdit: boolean,
    handleClick: () => void
}

const useStyles = makeStyles({
    button: {
        minWidth: 'unset',

        color: 'inherit',

        fontWeight: 'inherit',

        [theme.breakpoints.down('xs')]: {
            padding: 0,
        }
    },

    icon: {
        fontSize: '1.5rem',

        marginLeft: theme.spacing(2),

        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        }
    },
});

const PersonalBarButton = ({ isEdit, handleClick }: Props) => {
    const buttonText = isEdit ? 'закрыть' : 'редактировать';
    const matches = useMediaQuery<Theme>(theme.breakpoints.up('sm'));
    const classes = useStyles();

    return (
        <Button
             className={classes.button}
             data-testid="edit-close-button"
             onClick={handleClick}
        >
            {matches && buttonText}
            {isEdit
                ? <Close className={classes.icon}/>
                : <Edit className={classes.icon}/>}
        </Button>
    )
};

export default PersonalBarButton;