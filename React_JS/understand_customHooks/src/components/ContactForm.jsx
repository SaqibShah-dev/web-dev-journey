// ContactForm.jsx
import useForm from "../hooks/useForm";

function validate(values) {
    const errors = {};
    if (!values.name.trim()) errors.name = "Name is required";
    if (!values.email.includes("@")) errors.email = "Valid email required";
    if (values.message.length < 10) errors.message = "Too short";
    return errors;
}

function ContactForm() {
    const { values, errors, submitted, handleChange, handleSubmit, reset }
        = useForm({ name: "", email: "", message: "" }, validate);

    if (submitted) {
        return (
            <div>
                <h2>✅ Sent!</h2>
                <button onClick={reset}>Send another</button>
            </div>
        );
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, (data) => console.log(data))}>
            <input
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Name"
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

            <input
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                placeholder="Message"
            />
            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

            <button type="submit">Send</button>
        </form>
    );
}
export default ContactForm;