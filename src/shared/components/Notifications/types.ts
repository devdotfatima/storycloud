export type NotificationT = {
  userName: string;
  action: string;
  story?: string;
  timeAgo: string;
};
export type NotificationsPropsT = {
  onClose: () => void;
};

export type NotificationItemPropsT = {
  notification: NotificationT;
};
