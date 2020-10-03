import { fireEvent, render, screen } from '@testing-library/react';
import Form from '../components/form/form';

describe('Form correctly handles', () => {
    beforeEach(() => {
        const setNewValue = jest.fn();
        const handleOpenModal = jest.fn();

        render(<Form handleOpenModal={handleOpenModal} setNewValue={setNewValue} />);
    });

    it('valid username', () => {
        fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'Иванов Иван' } });
        fireEvent.blur(screen.getByTestId('input-name'));

        expect(screen.getByTestId('helper-name')).not.toHaveTextContent('Вы неверно указали имя');
    });

    it('non-valid username', () => {
        fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John' } });
        fireEvent.blur(screen.getByTestId('input-name'));

        expect(screen.getByTestId('helper-name')).toHaveTextContent('Вы неверно указали имя');
    });

    it('valid email', () => {
        fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'mail@example.com' } });
        fireEvent.blur(screen.getByTestId('input-email'));

        expect(screen.getByTestId('helper-email')).not.toHaveTextContent('Вы неверно указали e-mail');
    });

    it('non-valid email', () => {
        fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'www.example.com' } });
        fireEvent.blur(screen.getByTestId('input-email'));

        expect(screen.getByTestId('helper-email')).toHaveTextContent('Вы неверно указали e-mail');
    });

    it('valid phone number', () => {
        fireEvent.change(screen.getByTestId('input-phone'), { target: { value: '12-34-56' } });
        fireEvent.blur(screen.getByTestId('input-phone'));

        expect(screen.getByTestId('helper-phone')).not.toHaveTextContent('Вы неверно указали номер');;
    });

    it('non-valid phone number', () => {
        fireEvent.change(screen.getByTestId('input-phone'), { target: { value: '(123)' } });
        fireEvent.blur(screen.getByTestId('input-phone'));

        expect(screen.getByTestId('helper-phone')).toHaveTextContent('Вы неверно указали номер');
    });
});