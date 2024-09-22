import { toast } from 'react-hot-toast';

const useNotification = () => {
    const showSuccess = (message) => {
        toast.success(message);
    };

    const showError = (message) => {
        toast.error(message);
    };

    return { showSuccess, showError };
};

export default useNotification;