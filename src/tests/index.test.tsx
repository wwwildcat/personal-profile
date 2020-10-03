import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMatchMedia } from './mocks';
import Home from '../../pages/index';

describe('By default home page correctly renders', () => {
    beforeEach(() => {
        window.matchMedia = createMatchMedia(window.innerWidth);

        render(<Home />);
    });

    it('header', () => {
        expect(screen.getByTestId('header-username')).toHaveTextContent('Пользователь');
    });

    it('personal bar', () => {
        expect(screen.getByTestId('personal-bar-username')).toHaveTextContent('Пользователь');
    });

    describe('data list', () => {
        it('email', () => {
            expect(screen.getByTestId('data-list-email')).toHaveTextContent('Укажите e-mail');
        });

        it('phone', () => {
            expect(screen.getByTestId('data-list-phone')).toHaveTextContent('Укажите номер телефона');
        })
    });

    it('edit button', () => {
        expect(screen.getByTestId('edit-close-button')).toHaveTextContent('редактировать');
    });

    it('close button', () => {
        fireEvent.click(screen.getByTestId('edit-close-button'));

        expect(screen.getByTestId('edit-close-button')).toHaveTextContent('закрыть');
    });
});

describe('With saved user data home page correctly renders', () => {
    beforeEach(() => {
        window.matchMedia = createMatchMedia(window.innerWidth);

        localStorage.setItem('name', 'Иванова Анна Ивановна');
        localStorage.setItem('email', 'ivanova@mail.ru');
        localStorage.setItem('phone', '123-45-67');

        render(<Home />);
    });

    it('header', () => {
        expect(screen.getByTestId('header-username')).toHaveTextContent('Иванова А.');
    });

    it('personal bar', () => {
        expect(screen.getByTestId('personal-bar-username')).toHaveTextContent('Иванова Анна Ивановна');
    });

    describe('data list', () => {
        it('email', () => {
            expect(screen.getByTestId('data-list-email')).toHaveTextContent('ivanova@mail.ru');
        });

        it('phone', () => {
            expect(screen.getByTestId('data-list-phone')).toHaveTextContent('123-45-67');
        })
    });
});

describe('Home page correctly handles', () => {
    beforeEach(() => {
        window.matchMedia = createMatchMedia(window.innerWidth);
        (localStorage.setItem as jest.Mock).mockClear();

        render(<Home />);
    });

    describe('Edit button click: ', () => {
        beforeEach(() => {
            fireEvent.click(screen.getByTestId('edit-close-button'));
        });

        it('doesn\'t render data list', () => {
            expect(screen.queryByTestId('data-list')).not.toBeInTheDocument();
        });

        it('renders form', () => {
            expect(screen.getByTestId('form')).toBeInTheDocument();
        });
    });

    describe('Close button click: ', () => {
        beforeEach(() => {
            fireEvent.click(screen.getByTestId('edit-close-button'));
            fireEvent.click(screen.getByTestId('edit-close-button'));
        });

        it('doesn\'t render form', () => {
            expect(screen.queryByTestId('form')).not.toBeInTheDocument();
        });

        it('renders data list', () => {
            expect(screen.getByTestId('data-list')).toBeInTheDocument();
        });

        it('doesn\'t save data', () => {
            expect(localStorage.setItem).not.toBeCalled();
        });
    });

    it('Save button click', () => {
        fireEvent.click(screen.getByTestId('edit-close-button'));
        fireEvent.click(screen.getByTestId('save-button'));

        expect(screen.getByTestId('modal-confirm')).toBeInTheDocument();
    });
});

describe('Modal correctly handles', () => {
    beforeEach(() => {
        window.matchMedia = createMatchMedia(window.innerWidth);
        (localStorage.setItem as jest.Mock).mockClear();
        localStorage.clear();

        render(<Home />);

        fireEvent.click(screen.getByTestId('edit-close-button'));
        fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'Иванова Анна' } });
        fireEvent.blur(screen.getByTestId('input-name'));
        fireEvent.click(screen.getByTestId('save-button'));
    });

    describe('Close button click', () => {
        beforeEach(() => {
            fireEvent.click(screen.getByTestId('close-modal-button'));
        });

        it('doesn\'t render confirm modal', async () => {
            await waitFor(() =>
                expect(screen.queryByTestId('modal-confirm')).not.toBeInTheDocument());
        });

        it('renders form', () => {
            expect(screen.getByTestId('form')).toBeInTheDocument();
        });

        it('doesn\'t render data list', () => {
            expect(screen.queryByTestId('data-list')).not.toBeInTheDocument();
        });

        it('doesn\'t save data', () => {
            expect(localStorage.setItem).not.toBeCalled();
        });
    });

    describe('Save button click: ', () => {
        beforeEach(() => {
            console.log = jest.fn();
            fireEvent.click(screen.getByTestId('submit-form-button'));
        });

        it('doesn\'t render confirm modal', async () => {
            await waitFor(() =>
                expect(screen.queryByTestId('modal-confirm')).not.toBeInTheDocument());
        });

        it('renders notify modal', () => {
            expect(screen.getByTestId('modal-notify')).toBeInTheDocument();
        });

        it('saves form data', () => {
            expect(localStorage.setItem).toBeCalledTimes(1);
            expect(localStorage.setItem).toBeCalledWith('name', 'Иванова Анна');
            expect(localStorage.__STORE__['name']).toBe('Иванова Анна');
        });
    });

    describe('Don\'t save button click: ', () => {
        beforeEach(() => {
            fireEvent.click(screen.getByTestId('close-confirm-button'));
        });

        it('doesn\'t render confirm modal', async () => {
            await waitFor(() =>
                expect(screen.queryByTestId('modal-confirm')).not.toBeInTheDocument());
        });

        it('doesn\'t render notify modal', () => {
            expect(screen.queryByTestId('modal-notify')).not.toBeInTheDocument();
        });

        it('doesn\'t render form', () => {
            expect(screen.queryByTestId('form')).not.toBeInTheDocument();
        });

        it('renders data list', () => {
            expect(screen.getByTestId('data-list')).toBeInTheDocument();
        });

        it('doesn\'t save data', () => {
            expect(localStorage.setItem).not.toBeCalled();
        });
    });

    describe('OK button click', () => {
        beforeEach(() => {
            fireEvent.click(screen.getByTestId('submit-form-button'));
            fireEvent.click(screen.getByTestId('close-notify-button'));
        });

        it('doesn\'t render notify modal', async () => {
            await waitFor(() =>
                expect(screen.queryByTestId('modal-notify')).not.toBeInTheDocument());
        });

        it('doesn\'t render form', () => {
            expect(screen.queryByTestId('form')).not.toBeInTheDocument();
        });

        it('renders data list', () => {
            expect(screen.getByTestId('data-list')).toBeInTheDocument();
        });
    });
});