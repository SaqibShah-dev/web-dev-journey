// hooks/useForm.js
import { useState } from "react";

function useForm(initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        // clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    function handleSubmit(e, onSubmit) {
        e.preventDefault();
        const newErrors = validate ? validate(values) : {};

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(values);
        setSubmitted(true);
    }

    function reset() {
        setValues(initialValues);
        setErrors({});
        setSubmitted(false);
    }

    return { values, errors, submitted, handleChange, handleSubmit, reset };
}

export default useForm;