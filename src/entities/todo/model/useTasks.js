import { useState, useRef, useCallback, useEffect, useMemo, useReducer} from "react";
import tasksAPI from "@/shared/api/tasks/index.js";

const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_All': {
            return Array.isArray(action.tasks) ? action.tasks : state
        }
        case 'ADD': {
            return [...state, action.task];
        }
        case 'TOGGLE_COMPLETE': {
            const {id, isDone} = action

            return state.map((task) => {
                return task.id === id ? { ...task, isDone} : task
            })
        }
        case 'DELETE': {
            return state.filter((task) => task.id !== action.id)
        }
        case 'DELETE_ALL': {
            return []
        }
        default: {
            return state
        }
    }
}

const useTasks = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [disappearingTaskId, setDisappearingTaskId] = useState(null);
    const [appearingTaskId, setAppearingTaskId] = useState(null);


    const newTaskInputRef = useRef(null);

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm("Вы уверены что хотите удалить все?");

        if (isConfirmed) {
            tasksAPI.deleteAll(tasks)
                .then(() => dispatch({type: 'DELETE_ALL'}))
        }
    }, [tasks]);

    const deleteTasks = useCallback(
        (taskID) => {
            tasksAPI.delete(taskID)
                .then(() => {
                    setDisappearingTaskId(taskID);
                    setTimeout(() => {
                        dispatch({type: 'DELETE', id: taskID})
                        setDisappearingTaskId(null);
                    }, 400)
                })
        },
        [],
    );

    const toggleTaskComplete = useCallback(
        (taskID, isDone) => {
           tasksAPI.toggleComplete(taskID, isDone)
                .then(() => {
                    dispatch({type: 'TOGGLE_COMPLETE', id: taskID, isDone})
                })
        },
        [],
    );

    const addTask = useCallback((title) => {
        const newTask = {
            title,
            isDone: false,
        };

         tasksAPI.add(newTask)
            .then((adedTask) => {
                dispatch({type: 'ADD', task: adedTask})
                setNewTaskTitle("");
                setSearchQuery("");
                newTaskInputRef.current.focus();
                setAppearingTaskId(adedTask.id);
                setTimeout(() => {
                    setAppearingTaskId(null)
                }, 400)
            })
    }, []);

    useEffect(() => {
        newTaskInputRef.current.focus();

        tasksAPI.getAll().then((serverTasks) => dispatch({type: 'SET_All', tasks: serverTasks}))
    }, []);

    const filteredTask = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase();

        return clearSearchQuery.length > 0
            ? tasks.filter(({ title }) =>
                title.toLowerCase().includes(clearSearchQuery),
            )
            : null;
    }, [searchQuery, tasks]);

    return {
        tasks,
        filteredTask,
        deleteTasks,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
    };
};

export default useTasks;
