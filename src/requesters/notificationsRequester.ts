import Notification from '../models/notifications';
import api from './baseApi';

export class NotificationsRequester {
    async getNotifications(): Promise<Notification[]> {
        const notifications = (await api.get('/notifications')).data.data;
        return notifications.map((n: Notification) => n);
    }

    async deleteNotification(notification: Notification) {
        await api.delete(`/notifications/${notification._id}`);
    }
}


