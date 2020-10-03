import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { Box, Button, Divider, Grid, Paper, useMediaQuery } from '@material-ui/core';

import FormInput, { InputType } from './__input/form__input';

import theme from '../../theme';

interface Props {
    handleOpenModal: () => void;
    setNewValue: (value: string, type: InputType) => void;
}

const useStyles = makeStyles({
    paper: {
        width: '100%',
    },

    box: {
        display: 'flex',
        justifyContent: 'center',

        padding: theme.spacing(0.75, 0, 11),

        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1.5, 0, 4.25),
        }
    },

    button: {
        padding: theme.spacing(3.75, 6.5),

        color: '#fff',
        backgroundColor: teal.A700,
        borderRadius: theme.spacing(9),

        fontWeight: 600,
        lineHeight: 1.36,
        textTransform: 'none',
    },

    grid: {
        padding: theme.spacing(6.5, 0),

        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1.75, 0, 0),
        }
    },
});

const Form = ({ handleOpenModal, setNewValue }: Props) => {
    const classes = useStyles();
    const matches = useMediaQuery<Theme>(theme.breakpoints.up('sm'));

    return (
        <Paper className={classes.paper} data-testid="form">
            <form>
                <Grid className={classes.grid} container direction="row" justify="space-between">
                    <FormInput type="name" handleNewData={setNewValue} />
                    {matches && <Divider orientation="vertical" flexItem={true}/>}
                    <FormInput type="email" handleNewData={setNewValue} />
                    {matches && <Divider orientation="vertical" flexItem={true}/>}
                    <FormInput type="phone" handleNewData={setNewValue} />
                </Grid>
                <Box className={classes.box}>
                    <Button
                        className={classes.button}
                        data-testid="save-button"
                        onClick={handleOpenModal}
                        variant="contained"
                    >
                        Сохранить изменения
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}

export default Form;