import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {

    it('check if show correctly user input name placeholder', () => {
        const { getByPlaceholderText } = render(<Profile />);

        const inputName = getByPlaceholderText('Nome');

        expect(inputName.props.placeholder).toBeTruthy();
    });

    it('Checks if user data has been loaded', () =>{
        const { getByTestId } = render(<Profile />);

        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');

        expect(inputName.props.value).toEqual('PH');
        expect(inputSurname.props.value).toEqual('Barbosa');
    });

    it('Checks if title render correctly', () => {
        const { getByTestId } = render(<Profile />);

        const textTitle = getByTestId('text-title');

        expect(textTitle.props.children).toContain('Perfil');
    });

});