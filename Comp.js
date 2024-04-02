
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import NetworkContext from './context/NetworkContext';
import { saveData, getData, removeData } from './utils/SecureStorage';
import rsaUtility from './utils/RsaEncryptDecycript';
const SimpleComp = ({ navigation }) => {

    const isConnected = useContext(NetworkContext);

    useEffect(() => {
        const runRSAExample = async () => {
            const { publicKey, privateKey } = await rsaUtility.generateKeys();
            setPublicKey(publicKey);
            setPrivateKey(privateKey)

        };

        runRSAExample();
    }, []);

    const [encodedMessage, setencodedMessage] = useState("")
    const [publicKey, setPublicKey] = useState("")
    const [privateKey, setPrivateKey] = useState("")
    const runEncrypt = async () => {


        const message = 'my secret message';
        const encodedMessages = await rsaUtility.encryptMessage(message, publicKey);
        setencodedMessage(encodedMessages)
    };
    const runDeEncrypt = async () => {

        const decryptedMessage = await rsaUtility.decryptMessage(encodedMessage, privateKey);
        Alert.alert('Decrypted Message:', decryptedMessage);
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>
                Error boundaries and Internet Connection
            </Text>

            <Text style={styles.text}>
                Lets produce error by clicking on the following button to render a component that will throw an error.
            </Text>
            <TouchableOpacity style={styles.buttons} onPress={() => { navigation.navigate('ComponentWithError') }}>
                <Text style={[{ color: '#ffff' }]}>Throw test error</Text>
            </TouchableOpacity>

            {isConnected ? (
                <Text style={styles.title}>Network Status: Connected </Text>
            ) : (
                <Text style={styles.title}>Network Status: Not connected </Text>
            )}


            <TouchableOpacity style={styles.buttons2} onPress={() => saveData('user', { name: 'John', age: 30 })}>
                <Text style={[{ color: 'black' }]}>Store Secure User data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons2} onPress={() => { getData('user').then((data) => Alert.alert('Retrieved data:', JSON.stringify(data))) }}>
                <Text style={[{ color: 'black' }]}>Get User data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons2} onPress={() => { removeData('user'); }}>
                <Text style={[{ color: 'black' }]}>Remove data</Text>
            </TouchableOpacity>


            <Text style={styles.title}>RSA Encryption / Decryption </Text>
            <TouchableOpacity style={styles.buttons2} onPress={runEncrypt}>
                <Text style={[{ color: 'black' }]}>Encrypt Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons2} onPress={runDeEncrypt}>
                <Text style={[{ color: 'black' }]}>Decncrypt data</Text>
            </TouchableOpacity>
        </View>

    );
};
const styles = StyleSheet.create({
    buttons: {


        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5
    },
    buttons2: {


        padding: 10,

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 22,
        //  backgroundColor: '#ecf0f1',
        padding: 28,
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    icon: {
        fontSize: 48
    },
    text: {
        marginVertical: 16
    }
});


export default SimpleComp
