import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import Header from '../src/components/header/header';
import PersonalBar from '../src/components/personal-bar/personal-bar';
import DataList from '../src/components/data-list/data-list';
import Form from '../src/components/form/form';
import Modal from '../src/components/modal/modal';
import { InputType } from '../src/components/form/__input/form__input';

import theme from '../src/theme';

const useStyles = makeStyles({
    layout: {
        height: '100vh',
        background: "url('/background.svg') no-repeat",
        backgroundSize: '100% 60%',

        [theme.breakpoints.down('sm')]: {
            backgroundSize: '100% 40%',
        },

        [theme.breakpoints.down('xs')]: {
            backgroundSize: '100% 36%',
        },
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        padding: theme.spacing(5, 5, 0, 7.5),

        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(4.25, 2.5, 0, 2.5),
        }
    }
});

const Home = () => {
    const classes = useStyles();
    const [isEdit, setIsEdit] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [isOpenNotifyModal, setIsOpenNotifyModal] = useState(false);
    const [currentUserData, setCurrentUserData] = useState({
        name: 'Пользователь',
        email: 'Укажите e-mail',
        phone: 'Укажите номер телефона',
    });
    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => setIsMounted(true), []);

    useEffect(() => {
        if (isMounted) {
            setCurrentUserData({
                name: localStorage.getItem('name') || 'Пользователь',
                email: localStorage.getItem('email') || 'Укажите e-mail',
                phone: localStorage.getItem('phone') || 'Укажите номер телефона',
            });
        }
    }, [
        isMounted && localStorage.getItem('name'),
        isMounted && localStorage.getItem('email'),
        isMounted && localStorage.getItem('phone')
    ]);

    const setNewValue = (value: string, type: InputType) => {
		if (value !== currentUserData[type]) {
			setNewUserData(data => {
				data[type] = value;
				return data;
            });
		}
    }

    const setLocalStorage = () => {
        let key: InputType;

		for(key in newUserData) {
			if (newUserData[key]) {
				localStorage.setItem(key, newUserData[key]);
			}
		}
    }

    const sendRequest = async () => {
        let response = await fetch(String(new URL('/api/posts', window.location.href)), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token-access': 'random',
            },
            body: JSON.stringify({
                name: localStorage.getItem('name') || 'Пользователь',
                email: localStorage.getItem('email') || 'Нет данных',
                phone: localStorage.getItem('phone') || 'Нет данных',
            }),
        });
        let result = await response.json();
        return result;
    }

    const handleOpenModal = () => {
		setIsOpenConfirmModal(true);
    }

    const handleCloseModal = () => {
		setIsOpenConfirmModal(false);
    }

    const handleCloseForm = () => {
        setIsEdit(false);
        setIsOpenNotifyModal(false);
        setIsOpenConfirmModal(false);
    }

    const handleSubmitForm = () => {
        setIsOpenConfirmModal(false);
        setLocalStorage();
        setIsOpenNotifyModal(true);
        sendRequest()
            .then(result => console.log(result));
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.layout}>
                <Container className={classes.container} fixed>
                    <Header name={currentUserData.name}/>
                    <PersonalBar
                        name={currentUserData.name}
                        isEdit={isEdit}
                        handleButtonClick={() => setIsEdit(!isEdit)}
                    />
                    {!isEdit &&
                        <DataList email={currentUserData.email} phone={currentUserData.phone} />}
                    {isEdit &&
                        <Form setNewValue={setNewValue} handleOpenModal={handleOpenModal}/>}
                    <Modal
                        handleCloseModal={handleCloseModal}
                        handleCloseForm={handleCloseForm}
                        handleSubmitForm={handleSubmitForm}
                        isOpen={isOpenConfirmModal}
                        type="confirm"
                    />
                    <Modal
                        handleCloseForm={handleCloseForm}
                        isOpen={isOpenNotifyModal}
                        type="notify"
                    />
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default Home;