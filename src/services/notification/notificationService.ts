import PushNotification from 'react-native-push-notification';

export class NotificationService {
  static async initialize() {
    PushNotification.configure({
      onNotification(notification) {
        console.log('Notification received:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  static sendLocalNotification(title: string, message: string) {
    PushNotification.localNotification({
      autoCancel: true,
      bigText: message,
      subText: title,
      title,
      message,
      vibrate: true,
      vibration: 300,
      soundName: 'default',
      playSound: true,
    });
  }

  static cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }
}