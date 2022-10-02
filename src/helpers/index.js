export const generateId = () => {
    const randomNum = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);
    return randomNum + date;
}

export const formatDate = () => {
    const actualDate = new Date();
    const dateStructure = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return actualDate.toLocaleDateString('es-ES', dateStructure);
}

export const setBudgetStyle = budget => {
    return (
        budget.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    )
}
