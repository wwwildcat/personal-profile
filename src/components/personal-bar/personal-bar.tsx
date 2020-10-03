import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, useMediaQuery } from '@material-ui/core';

import UserAvatar from '../user-avatar/user-avatar';
import PersonalBarButton from './__button/personal-bar__button';

import theme from '../../theme';

interface Props {
    name: string,
    isEdit: boolean,
    handleButtonClick: () => void
}

const useStyles = makeStyles({
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        padding: theme.spacing(6, 4, 6, 7.5),
        marginBottom: theme.spacing(6),

        background: 'linear-gradient(270deg, #1A78C2 0%, #1A78C2 101.06%)',

        fontSize: '1.875rem',
        fontWeight: 600,

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2, 2.5),

            fontSize: '1.25rem',
        },

        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(2.5),

            fontSize: '0.875rem',
        },
    },
});

const PersonalBar = ({ name, isEdit, handleButtonClick }: Props) => {
    const classes = useStyles();
    const matches = useMediaQuery<Theme>(theme.breakpoints.down('xs'));
    const avatarSize = matches ? 'medium' : 'large';

    return (
        <AppBar
            elevation={1}
            position="static"
            className={classes.appBar}
            square={false}
        >
            <Toolbar data-testid="personal-bar-username" disableGutters>
                <UserAvatar size={avatarSize} />
                {name}
            </Toolbar>
            <PersonalBarButton isEdit={isEdit} handleClick={handleButtonClick}/>
        </AppBar>
    );
};

export default PersonalBar;