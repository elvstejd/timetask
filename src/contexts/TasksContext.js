import { useState, createContext, useContext } from 'react';
import { createTask, durationToMiliseconds } from '../utils/helperFunctions';

const TasksContext = createContext();

export function useTasks() {
    return useContext(TasksContext);
}

function TasksProvider({ children }) {
    const [tasks, setTasks] = useState({});
    const [taskOrder, setTaskOrder] = useState([]);
    const [loadedTask, setLoadedTask] = useState({}); // { title, id }

    /* countdown related state */
    const [date, setDate] = useState();
    const [countdownIsRunning, setCountdownIsRunning] = useState(false);

    function addNewTask(title) {
        const newTask = createTask(title);
        const newTasksObject = Object.assign({}, tasks);
        newTasksObject[newTask.id] = newTask;

        setTasks(newTasksObject);
        setTaskOrder(taskOrder.concat(newTask.id));
    }

    function updateTaskTitle(taskId, newName) {
        const newTasksObject = Object.assign({}, tasks);
        newTasksObject[taskId].name = newName;

        setTasks(newTasksObject);
    }

    function updateTaskDuration(newDuration, taskId) {
        const newTasksObject = Object.assign({}, tasks);
        newTasksObject[taskId].duration = newDuration;

        setTasks(newTasksObject);
    }

    function markTaskDone(taskId) {
        const newTasksObject = Object.assign({}, tasks);
        newTasksObject[taskId].done = true;

        setTasks(newTasksObject);
    }

    function loadTask(task) {
        if (!this.state.countdownIsRunning) { // TODO timer context
            const miliseconds = durationToMiliseconds(task.duration);

            setLoadedTask({ title: task.name, id: task.id });
            setDate(Date.now() + miliseconds);

            // this.setState(() => ({
            //     loadedTaskTitle: task.name,
            //     loadedTaskId: task.id,
            //     date: Date.now() + miliseconds
            // }));
        }
    }

    function clearLoadedTask() {
        setLoadedTask({ title: null, id: null });
        setDate(Date.now());

        // this.setState(() => ({
        //     loadedTaskTitle: null,
        //     loadedTaskId: null,
        //     date: Date.now()
        // }));
    };

    /* COUNTDOWN METHOD */

    function extendTime(ms) {
        setDate(Date.now() + 5000);

        // this.setState(() => ({
        //     date: Date.now(),
        // }));
    };


    function deleteTask(taskIndex, taskId) {
        const newTaskOrder = Array.from(taskOrder);
        newTaskOrder.splice(taskIndex, 1);
        const newTasksObject = Object.assign({}, tasks);
        delete newTasksObject[taskId];

        setTasks(newTasksObject);
        setTaskOrder(newTaskOrder);
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
    }



    const value = {

    }

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksContext
