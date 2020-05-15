import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
} from 'react-native';

import PhraseInput from './src/PhraseInput';
import { primary } from './src/styles';

const App: () => React$Node = () => {
    const [value, setValue] = useState('holi');

    const handleChange = (newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <StatusBar backgroundColor={primary} />
            <SafeAreaView style={styles.container}>
                <PhraseInput />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    }
});

export default App;
