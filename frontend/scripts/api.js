export const sendPushTokenToServer = async (token) => {
    try {
      await fetch('https://your-backend.com/api/push-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
    } catch (error) {
      console.error('Помилка при відправці токену:', error);
    }
  };
  