import { notification } from 'antd';

export const openNotificationWithIcon = (
  type,
  title,
  desc,
  placement = 'top',
  duration = 2
) => {
  notification[type]({
    message: title,
    description: desc,
    placement,
    duration,
  });
};
