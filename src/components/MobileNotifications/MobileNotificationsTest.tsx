import { useMobileNotifications } from '../../hooks/useMobileNotifications';

export default function MobileNotificationTest() {
  const { showNotification } = useMobileNotifications();

  const handleTestNotification = async () => {
    const success = await showNotification('Hello from JN System!', {
      body: 'This should work on Android now!',
      icon: '/android-chrome-192x192.png',
    });

    if (!success) {
      alert('Notifications not supported or permission denied');
    }
  };

  return <button onClick={handleTestNotification}>Test Android Notification</button>;
}
