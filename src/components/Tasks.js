import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTasks } from '../contexts/TasksContext';
import Task from './Task';
import TaskInput from './TaskInput';

function Tasks() {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const { tasks, taskOrder, setTaskOrder } = useTasks();

    function onDragEnd(result) {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (destination.index === source.index) {
            return;
        }

        const prevTaskOrder = taskOrder;
        const newTaskOrder = Array.from(prevTaskOrder);
        newTaskOrder.splice(source.index, 1);
        newTaskOrder.splice(destination.index, 0, draggableId);

        setTaskOrder(newTaskOrder);
    }

    function openInput() {
        setIsAddingTask(true);
    }

    function closeInput() {
        setIsAddingTask(false);
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
                {(provided, snapshot) => (
                    <div
                        className="task-container"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {taskOrder.map((taskId, index) => {
                            const task = tasks[taskId];
                            return (
                                <Task
                                    key={task.id}
                                    currentTask={task}
                                    index={index}
                                />
                            );
                        })}
                        {provided.placeholder}
                        {isAddingTask && <TaskInput onFocusOut={closeInput} />}
                        <div className="new-task-add" onClick={openInput}>
                            <p>+ Add new task</p>
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );

}

export default Tasks;