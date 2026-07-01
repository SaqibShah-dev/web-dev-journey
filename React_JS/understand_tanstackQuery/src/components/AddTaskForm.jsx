
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddTaskForm() {
    const [text, setText] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newTask) => {
            const response = await fetch("https://api.example.com/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            });
            if (!response.ok) throw new Error("Failed to add task");
            return response.json();
        },
        onSuccess: () => {
            // automatically refetch the tasks list after adding
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        mutation.mutate({ text }); // trigger the mutation
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="New task"
            />
            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Adding..." : "Add Task"}
            </button>
            {mutation.isError && <p>Error: {mutation.error.message}</p>}
        </form>
    );
}

export default AddTaskForm;