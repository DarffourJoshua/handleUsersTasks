const getTasks = async () => {
    try {
            const res = await fetch('/api/manageTask');
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
        }
}

export default getTasks;