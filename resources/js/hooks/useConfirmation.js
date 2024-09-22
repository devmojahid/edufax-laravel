import Swal from 'sweetalert2';

const useConfirmation = () => {
    const confirmDeletion = async (message) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            await Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
            });
        }
        return result.isConfirmed;
    };

    return { confirmDeletion };

};

export default useConfirmation;