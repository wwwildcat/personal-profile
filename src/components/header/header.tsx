import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Divider, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { NotificationsNone } from '@material-ui/icons';

import UserAvatar from '../user-avatar/user-avatar';

import theme from '../../theme';

interface Props {
    name: string;
}

const useStyles = makeStyles({
    grid: {
        display: 'flex',
        flexDirection: 'column',

        width: '100%',

        marginBottom: theme.spacing(7.5),

        color: '#fff',

        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(2.5),
        },
    },

    boxRight: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'flex-end',

        marginRight: theme.spacing(6.5),
        marginBottom: theme.spacing(4.5),

        fontWeight: 600,

        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
        },
    },

    divider: {
        marginLeft: theme.spacing(6.5),
        marginRight: theme.spacing(5),

        backgroundColor: 'currentColor',

        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(3.5),
            marginRight: theme.spacing(2.5),
        },
    },

    icon: {
        fontSize: '2.25rem',

        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        },
    },

    typografy1: {
        marginBottom: theme.spacing(2.5),

        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(2.25),
            fontSize: '0.875rem',
        },
    },

    typografy2: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.75rem',
        },
    },
});

const Header = ({ name }: Props) => {
    const classes = useStyles();
    const matches = useMediaQuery<Theme>(theme.breakpoints.down('xs'));
    const avatarSize = matches ? 'small' : 'medium';

    const handleName = () => {
        if (name === 'Пользователь') {
            return name;
        }
        let spaceIndex = name.search(/\s(?=\S)/);

        return name.slice(0, spaceIndex + 2) + '.';
    }

    return (
        <Grid className={classes.grid}>
            <Box className={classes.boxRight}>
                <NotificationsNone className={classes.icon}/>
                <Divider className={classes.divider} orientation="vertical" flexItem={true}/>
                <UserAvatar size={avatarSize} />
                {!matches && <span data-testid="header-username">{handleName()}</span>}
            </Box>
            <Box>
                <Typography className={classes.typografy1} variant="h6">ЛИЧНЫЙ ПРОФИЛЬ</Typography>
                <Typography className={classes.typografy2} variant="subtitle2">Главная/Личный профиль</Typography>
            </Box>
        </Grid>
    );
}

export default Header;