import { useState } from 'react';
import { router } from '@inertiajs/react';

export const useFileUpload = ({
    onSuccess = () => { },
    onError = () => { },
    onProgress = () => { },
}) => {
    const [isUploading, setIsUploading] = useState(false);

    const upload = async (files, options = {}) => {
        setIsUploading(true);
        const formData = new FormData();

        if (Array.isArray(files)) {
            files.forEach(file => formData.append('files[]', file));
        } else {
            formData.append('file', files);
        }

        // Add additional options
        Object.keys(options).forEach(key => {
            formData.append(key, options[key]);
        });

        router.post('/api/files/upload', formData, {
            forceFormData: true,
            onProgress: (progress) => {
                onProgress(progress);
            },
            onSuccess: () => {
                setIsUploading(false);
                onSuccess();
            },
            onError: (errors) => {
                setIsUploading(false);
                onError(errors);
            },
        });
    };

    return {
        upload,
        isUploading,
    };
};
