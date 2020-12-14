import {useCallback} from 'react';
import { notification } from 'antd';

export const useNotifier = () => {
    return useCallback((text, type) => {
        if (text) {
            notification[type]({
                message: 'Notification',
                description: text,
            });
        }
    }, [])
}