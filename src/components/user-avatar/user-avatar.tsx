import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { Person } from '@material-ui/icons';

import theme from '../../theme';

interface Props {
    size: 'small' | 'medium' | 'large',
}

const useStyles = makeStyles({
    colorDefault: {
        color: '#e0d5e9',
        backgroundColor: '#662d91',
    },

    small: {
        width: theme.spacing(6),
        height: theme.spacing(6),

        marginRight: 0,

        '& svg': {
            fontSize: '1.5rem',
        }
    },

    medium: {
        width: theme.spacing(10),
        height: theme.spacing(10),

        marginRight: theme.spacing(5),

        '& svg': {
            fontSize: '2.5rem',
        },

        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(2.5),
        },
    },

    large:  {
        width: theme.spacing(20),
        height: theme.spacing(20),

        marginRight: theme.spacing(10.5),

        '& svg': {
            fontSize: '5rem',
        },

        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(5),
        },
    },
});

const UserAvatar = ({ size }: Props) => {
    const classes = useStyles();

    return (
    <Avatar className={classes[size]} classes={{
        colorDefault: classes.colorDefault
    }}>
        <Person viewBox="2 0 20 20"/>
    </Avatar>
)}

export default UserAvatar;