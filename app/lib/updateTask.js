const updateTask = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`/api/manageTask?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        if (res.ok) {
            setTask({
                title: "",
                description: ""
            });
        }
    } catch (error) {
        console.error(error);
    }
}

export default updateTask;