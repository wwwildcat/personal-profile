import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogActions, useMediaQuery } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { teal } from '@material-ui/core/colors';

import theme from '../../theme';

interface Props {
    handleCloseModal?: () => void;
    handleCloseForm: () => void;
    handleSubmitForm?: () => void;
    isOpen: boolean;
    type: 'confirm' | 'notify';
}

interface StyleProps {
    type: 'confirm' | 'notify';
}

const useStyles = makeStyles({
    paper: {
        alignItems: 'center',
        justifyContent: 'center',

        maxWidth: theme.spacing(150),
        width: theme.spacing(150),
        height: theme.spacing(79.5),

        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(120),
        },

        [theme.breakpoints.down('xs')]: {
            position: 'relative',
            bottom: ({ type }: StyleProps) => type === 'confirm' ? '-15%' : '-42%',

            height: ({ type }: StyleProps) => type === 'confirm' ? '75%' : '15%',

            margin: 0,

            borderRadius: theme.spacing(5, 5, 0, 0)
        }
    },

    dialogTitle: {
        '& h2': {
            color: 'rgba(49, 49, 49, 0.7)',

            fontSize: '1.5rem',
            lineHeight: 1.375,
            fontWeight: 600,
            textAlign: 'center',

            [theme.breakpoints.down('xs')]: {
                fontSize: '1.125rem',
            }
        }
    },

    buttonClose: {
        position: 'absolute',
        top: theme.spacing(6),
        right: theme.spacing(6),

        minWidth: 0,

        padding: 0,

        color: 'inherit',
    },

    icon: {
        fontSize: '1.5rem',
    },

    dialogActions: {
        flexDirection: 'column',
        alignSelf: 'center',

        width: 'fit-content',

        padding: theme.spacing(4),

        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(6),
        }
    },

    button: {
        width: theme.spacing(50.5),

        padding: theme.spacing(4),

        borderRadius: theme.spacing(10.25),

        lineHeight: 1.36,
        fontWeight: 600,
        textTransform: 'none',
    },

    contained: {
        backgroundColor: teal.A700,
        color: '#fff',
    },

    outlined: {
        marginTop: theme.spacing(7),

        color: teal.A700,
        borderColor: 'currentColor',
    },
});

const Modal = ({ handleCloseModal, handleCloseForm, handleSubmitForm, isOpen, type }: Props) => {
    const classes = useStyles({ type });
    const matches = useMediaQuery<Theme>(theme.breakpoints.up('sm'));

    const onBackdrop = matches || type === 'confirm' ? undefined : handleCloseForm;

    const title = type === 'confirm' ? 'Сохранить изменения?' : 'Данные успешно сохранены';
    const buttonTitle = type === 'confirm' ? 'Не сохранять' : 'Хорошо';

    return (
        <Dialog
            data-testid={`modal-${type}`}
            onBackdropClick={onBackdrop}
            open={isOpen}
            PaperProps={{
                elevation: 0,
                classes: {
                    root: classes.paper,
                }
            }}
        >
            <DialogTitle className={classes.dialogTitle}>
                {title}
                {type === 'confirm' &&
                    <Button
                        className={classes.buttonClose}
                        data-testid="close-modal-button"
                        onClick={handleCloseModal}
                    >
                        <Close className={classes.icon}/>
                    </Button>}
            </DialogTitle>
            {(matches || type === 'confirm') &&
                <DialogActions className={classes.dialogActions}>
                    {type === 'confirm' && <Button
                        className={classes.button}
                        classes={{
                            contained: classes.contained,
                        }}
                        data-testid="submit-form-button"
                        onClick={handleSubmitForm}
                        variant="contained"
                    >
                        Сохранить
                    </Button>}
                    <Button
                        className={classes.button}
                        classes={{
                            contained: classes.contained,
                            outlined: classes.outlined,
                        }}
                        data-testid={`close-${type}-button`}
                        onClick={handleCloseForm}
                        variant={type === 'confirm' ? 'outlined' : 'contained'}
                    >
                        {buttonTitle}
                    </Button>
                </DialogActions>}
        </Dialog>
    );
}

export default Modal;