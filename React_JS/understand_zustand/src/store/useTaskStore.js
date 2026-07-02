import { create } from "zustand";

const useTaskStore = create((set, get) => ({
    tasks: [],
    filter: "all",

    addTask: (text) => set((state) => ({
        tasks: [...state.tasks, {
            id: Date.now(),
            text,
            completed: false
        }]
    })),

    toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(task =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        )
    })),

    deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
    })),

    setFilter: (filter) => set({ filter }),

    // computed value — uses get() to read current state
    getFilteredTasks: () => {
        const { tasks, filter } = get();
        if (filter === "active") return tasks.filter(t => !t.completed);
        if (filter === "completed") return tasks.filter(t => t.completed);
        return tasks;
    }
}));

export default useTaskStore;