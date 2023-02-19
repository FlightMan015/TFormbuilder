import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Button, Alert} from 'react-native';
import {useTheme} from 'react-native-paper';
// import {
//   CardField,
//   CardFieldInput,
//   useStripe,
//   StripeProvider,
// } from '@stripe/stripe-react-native';

const Stripe = props => {
  const {element, value, onChangeValue, userRole} = props;
  const {colors} = useTheme();
  const [card, setCard] = useState(CardFieldInput.Details | null);
  const {confirmPayment, handleCardAction} = useStripe();
  const API_URL = 'https://parseapi.back4app.com/functions/checkout';
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecred] = useState(null);
  const [price, setPrice] = useState(element.meta.price);
  const [stripePubKey, setStripePubKey] = useState('');

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${element.meta.server_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'HMlFXabIis69XxU7ZIzXv3Qk2tnh8MFmbbFWzGrT',
        'X-Parse-REST-API-Key': 'Au6joVebZZiZ43hVUY3h89Wa90cOANzgoc5rSmre',
      },
      body: JSON.stringify({
        price: element.meta.price * 100,
        currency: element.meta.currency,
      }),
    });
    const {result: {paymentIntent, ephemeralKey, customer, publishableKey}} = await response.json();
    setClientSecred(paymentIntent);
    setStripePubKey(publishableKey);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();
    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Merchant Name',
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet({clientSecret: clientSecret});
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      if (element.event.onSuccessPayment) {
        Alert.alert('Rule Action', `Fired onSuccessPayment action. rule - ${element.event.onSuccessPayment}.`);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
      }
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <StripeProvider
      publishableKey={stripePubKey}
    >
      <View style={styles.container}>
        <Button
          style={styles.button}
          disabled={!loading || !('pay' in userRole && userRole.pay)}
          title={element.meta.buttonText + `${element.meta.currency === 'usd' ? ' $' : ' €'}` + element.meta.price}
          color={colors.colorButton}
          onPress={openPaymentSheet}
        />
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    borderWidth: 5,
    borderRadius: 15,
  },
});

Stripe.propTypes = {
  element: PropTypes.object.isRequired,
};

export default React.memo(Stripe);
