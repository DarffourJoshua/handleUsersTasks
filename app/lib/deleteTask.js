
const deleteTask = async (id) => {
    try {
        const res = await fetch(`/api/manageTask/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export default deleteTask;