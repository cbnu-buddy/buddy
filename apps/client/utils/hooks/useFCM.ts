import { MessagePayload, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { messaging } from '../firebase';
import useFCMToken from './useFCMToken';
import { ToastInfoStore } from '@/store/ToastInfo';

const useFCM = () => {
  const fcmToken = useFCMToken();

  const updateToastMessage = ToastInfoStore(
    (state: any) => state.updateToastMessage
  );
  const updateOpenToastStatus = ToastInfoStore(
    (state: any) => state.updateOpenToastStatus
  );

  const [messages, setMessages] = useState<MessagePayload[]>([]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const fcmmessaging = messaging();
      const unsubscribe = onMessage(fcmmessaging, (payload) => {
        updateToastMessage(payload.notification?.body);
        updateOpenToastStatus(true);
        setMessages((messages) => [...messages, payload]);
      });
      return () => unsubscribe();
    }
  }, [fcmToken, updateToastMessage, updateOpenToastStatus]);
  return { fcmToken, messages };
};

export default useFCM;
