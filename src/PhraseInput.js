import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    PermissionsAndroid,
    TextInput,
    ToastAndroid,
} from 'react-native';
import { primary, gray, red } from './styles.js';
import * as RNFS from 'react-native-fs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'

const FILENAME = 'thatsWhatSheLogged.txt';
const FILEPATH = RNFS.ExternalStorageDirectoryPath + '/' + FILENAME;

const PhraseInput = () => {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const requestStoragePermission = async (onGranted, onDenied) => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ).then(res => {
            if(res === PermissionsAndroid.RESULTS.GRANTED) onGranted();
            else onDenied();
        }).catch(console.warn);
    };

    const validInput = () => {
        const valid = (value !== '')
        if(!valid) setErrorMessage('Okey, that not funny. This field is obviously required!')
        else setErrorMessage('')
        return valid
    };

    const handleSubmit = () => {
        if(!validInput()) return;

        const content = `${new Date()} - ${value}\n`;
        requestStoragePermission(() => {
            RNFS.appendFile(FILEPATH, content, 'utf8').then(res => {
                ToastAndroid.showWithGravityAndOffset(
                    'What she said was writed at ' + FILENAME,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    0,
                    50
                );
            }).catch(console.warn);
        }, () => {
            ToastAndroid.showWithGravityAndOffset(
                'Permissions to write denied.\nI can\'t live this way! :\'(',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50
            );
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                    placeholder={"That's what she said"}
                    placeholderTextColor={gray}
                    selectTextOnFocus={true}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.iconContainer}>
                    <View style={styles.firstIcon}>
                        <FontAwesomeIcon
                            icon={ faHandPointRight }
                            color={'white'}
                            size={20}
                            transform={{ rotate: -42 }}
                        />
                    </View>
                    <View style={styles.secondIcon}>
                        <FontAwesomeIcon
                            icon={ faHandPointRight }
                            color={'white'}
                            size={20}
                            transform={{ rotate: -42 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        margin: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorMessage: {
        color: red,
        fontSize: 10,
    },
    input: {
        flex: 7,
        marginRight: 20,
        borderBottomColor: primary,
        borderBottomWidth: 1,
        marginBottom: 5,
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        height: 50,
        backgroundColor: primary,
    },
    firstIcon: {
        flex: 1,
        alignSelf: 'flex-start',
    },
    secondIcon: {
        flex: 1,
        alignSelf: 'flex-end',
    }
});

export default PhraseInput;
