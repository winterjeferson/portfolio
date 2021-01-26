class Form {
    validateEmpty(arr) {
        const length = arr.length;

        for (let i = 0; i < length; i++) {
            if (arr[i].value === '') {
                arr[i].focus();
                return false;
            }
        }

        return true;
    }
}

export {
    Form
};