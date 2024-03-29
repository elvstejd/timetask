import { useState, createContext, useContext } from 'react';
import { createTask, durationToMiliseconds } from '../utils/helpers';
import { useCountdown } from './countdownContext';
import axios from 'axios';

// axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const TasksContext = createContext();

export function useTasks() {
    return useContext(TasksContext);
}

function TasksProvider({ children }) {
    const [tasks, setTasks] = useState(null);
    const [taskOrder, setTaskOrder] = useState([]);
    const [loadedTask, setLoadedTask] = useState({}); // { title, id }
    const { countdownIsRunning, setTimeInMs } = useCountdown();

    function addNewTask(title) {
        const newTask = createTask(title);
        const newTasksObject = Object.assign({}, tasks);

        axios.post('/tasks', {
            title: newTask.title,
            duration: newTask.duration
        }).then(res => {
            const newId = res.data.id;
            newTask.id = newId;
            console.log('log obj', newTask);
            newTasksObject[newTask.id] = newTask;
            setTasks(newTasksObject);
            setTaskOrder(taskOrder.concat(newTask.id));
        })
    }

    function updateTaskTitle(taskId, newTitle) {
        const newTasksObject = Object.assign({}, tasks);
        newTasksObject[taskId].title = newTitle;

        setTasks(newTasksObject);
        axios.patch(`/tasks/${taskId}`, { title: newTitle });
    }

    function updateTaskDuration(taskId, newDuration) {
        const newTasksObject = Object.assign({}, tasks);
        newTasksObject[taskId].duration = newDuration;

        setTasks(newTasksObject);
        axios.patch(`/tasks/${taskId}`, { duration: newDuration });
    }

    function markTaskDone(taskId) {
        if (!tasks[taskId]) return;
        const newTasksObject = Object.assign({}, tasks);
        const today = new Date();
        newTasksObject[taskId].done = true;
        newTasksObject[taskId].completionDate = today;
        setTasks(newTasksObject);
        axios.patch(`/tasks/${taskId}`, { done: true, completionDate: today });

    }

    function loadTask(task) {
        if (!countdownIsRunning) {
            setLoadedTask({ title: task.title, id: task.id });
            setTimeInMs(durationToMiliseconds(task.duration));
        }
    }

    function clearLoadedTask() {
        setLoadedTask({});
    };


    function deleteTask(taskIndex, taskId) {
        const newTaskOrder = Array.from(taskOrder);
        newTaskOrder.splice(taskIndex, 1);
        const newTasksObject = Object.assign({}, tasks);
        delete newTasksObject[taskId];

        setTasks(newTasksObject);
        setTaskOrder(newTaskOrder);
        axios.delete(`/tasks/${taskId}`);
    }

    function clearCompletedTasks() {
        let newTaskOrder = Array.from(taskOrder);
        const newTasksObject = Object.assign({}, tasks);

        newTaskOrder = newTaskOrder.filter((taskId) => {
            if (newTasksObject[taskId].done) {
                delete newTasksObject[taskId];
                return false;
            }
            return true;
        });

        setTasks(newTasksObject);
        setTaskOrder(newTaskOrder);
        axios.delete(`/tasks`, { data: { done: true } });
    }

    function setFetchedTasks(taskArray) {
        const newTasksObject = {};
        const newTaskOrder = [];

        taskArray.forEach(task => {
            newTasksObject[task.id] = task;
            newTaskOrder.push(task.id);
        });

        setTasks(newTasksObject);
        setTaskOrder(newTaskOrder);
    }


    const value = {
        tasks,
        taskOrder,
        loadedTask,
        setTaskOrder,
        addNewTask,
        deleteTask,
        markTaskDone,
        loadTask,
        updateTaskTitle,
        updateTaskDuration,
        clearCompletedTasks,
        clearLoadedTask,
        countdownIsRunning,
        setFetchedTasks,
        thereIsALoadedTask: !(Object.keys(loadedTask).length === 0 && loadedTask.constructor === Object)
    }

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;
