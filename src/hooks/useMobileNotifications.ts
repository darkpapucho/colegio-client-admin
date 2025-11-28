// hooks/useMobileNotifications.ts
export const useMobileNotifications = () => {
  const showNotification = async (title: string, options?: NotificationOptions) => {
    // Check if we can show notifications
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return false;
    }

    // Request permission if needed
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return false;
    }

    if (Notification.permission === 'granted') {
      // Try service worker notification first (works better on mobile)
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;

          // Show notification via service worker
          registration.showNotification(title, {
            icon: '/android-chrome-192x192.png',
            badge: '/favicon-32x32.png',
            ...options,
          });
          return true;
        } catch (error) {
          console.log('Service worker notification failed, falling back...');
        }
      }

      // Fallback to regular notification
      new Notification(title, {
        icon: '/android-chrome-192x192.png',
        ...options,
      });
      return true;
    }

    return false;
  };

  return { showNotification };
};
