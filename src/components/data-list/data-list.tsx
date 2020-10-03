import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import { AlternateEmail, Phone } from '@material-ui/icons';

import theme from '../../theme';

interface Props {
    email: string,
    phone: string,
}

const useStyles = makeStyles({
    paper: {
        width: '100%',
    },

    listItem: {
        padding: theme.spacing(8.25, 18.5),

        borderColor: '#CAE7FE',

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(6, 14),
        },

        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(5.5, 3),
        },
    },

    listItemText: {
        color: '#313131',

        fontSize: '1.125rem',

        [theme.breakpoints.down('xs')]: {
            fontSize: '0.875rem'
        }
    },

    listItemIcon: {
        minWidth: 'unset',

        marginRight: theme.spacing(10.5),

        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(4.5),
        },

        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(3),
        },
    },

    icon: {
        color: teal.A700,

        fontSize: '2.25rem',

        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        }
    },
});

const DataList = ({ email, phone }: Props) => {
    const classes = useStyles();

    return (
        <Paper data-testid="data-list" className={classes.paper}>
            <List disablePadding>
                <ListItem divider className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <AlternateEmail className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText
                        data-testid="data-list-email"
                        disableTypography
                        className={classes.listItemText}
                        primary={email}
                    />
                </ListItem>

                <ListItem className={classes.listItem}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <Phone className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText
                        data-testid="data-list-phone"
                        disableTypography
                        className={classes.listItemText}
                        primary={phone}
                    />
                </ListItem>
            </List>
        </Paper>
    );
}

export default DataList;