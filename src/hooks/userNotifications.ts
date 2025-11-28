async function requestPermission() {
  if (!('Notification' in window)) {
    return false;
  }
  if (Notification.permission == 'granted') {
    return true;
  }
  const result = await Notification.requestPermission();
  return result === 'granted';
}

function showNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission == 'granted') {
    new Notification(title, options);
  }
}

export function useNotification() {
  return { requestPermission, showNotification };
}
