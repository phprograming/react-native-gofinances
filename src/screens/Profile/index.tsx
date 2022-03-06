import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from 'react-native';

import {
    Container
} from './styles';

export function Profile(){
    return(
        <Container>
            <View>
                <Text testID="text-title">
                    Perfil
                </Text>

                <TextInput 
                    testID="input-name"
                    placeholder="Nome"
                    autoCorrect={false}
                    value="PH"
                />

                <TextInput 
                    testID="input-surname"
                    placeholder="Sobrenome"
                    value="Barbosa"
                />

                <Button
                    title="Salvar"
                    onPress={() => {}}
                />
           </View>
        </Container>
    );
}