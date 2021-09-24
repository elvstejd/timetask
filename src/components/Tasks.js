import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTasks } from '../contexts/TasksContext';
import Task from './Task';
import TaskInput from './TaskInput';
import styled from 'styled-components';

const TaskContainer = styled.div`
    width: 40rem;
    background-color: var(--gray-90);
    padding: 1rem 1rem 0 .1rem;
    overflow: auto;
    border-radius: var(--border-radius-lg);
`;

const NewTaskButton = styled.div`
    padding: 1rem 1.3rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
    border-radius: var(--border-radius-md);
    color: var(--gray-50);
    cursor: pointer;

    &:hover{
        background: var(--gray-94);
    }
`;

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
                    <TaskContainer
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
                        <NewTaskButton onClick={openInput}>
                            <p>+ Add new task</p>
                        </NewTaskButton>
                    </TaskContainer>
                )}
            </Droppable>
        </DragDropContext>
    );

}

export default Tasks;