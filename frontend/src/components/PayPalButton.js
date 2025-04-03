import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useGetPayPalClientIdQuery } from '../slices/apiSlice';
import Loader from './Loader';

const PayPalButton = ({ amount, onSuccess }) => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading, error } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!isLoading && !error && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPayPalScript();
    }
  }, [paypal, paypalDispatch, isLoading, error]);

  return isPending || isLoading ? (
    <Loader />
  ) : (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount,
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          onSuccess(details);
        });
      }}
    />
  );
};

export default PayPalButton; 