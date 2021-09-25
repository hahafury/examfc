import React from 'react';
import { toast } from 'react-toastify';
import WebSocket from './WebSocket';
import Notification from '../../../components/Notification/Notification';

class NotificationSocket extends WebSocket {
  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
  }

    anotherSubscribes = () => {
      this.onEntryCreated();
      this.onChangeMark();
      this.onChangeOfferStatus();
      this.onEventNotification();
    };

    onChangeMark = () => {
      this.socket.on('changeMark', () => {
        toast('Someone liked your offer');
      });
    };

    onEventNotification = () => {
      this.socket.on('event', (message) => {
        toast(<Notification message={message.message}/>);
      });
    };

    onChangeOfferStatus = () => {
      this.socket.on('changeOfferStatus', (message) => {
        toast(<Notification message={message.message} contestId={message.contestId} />);
      });
    };

    onEntryCreated = () => {
      this.socket.on('onEntryCreated', () => {
        toast('New Entry');
      });
    };

    subscribe = (id) => {
      this.socket.emit('subscribe', id);
    };

    unsubscribe = (id) => {
      this.socket.emit('unsubscribe', id);
    }
}

export default NotificationSocket;
