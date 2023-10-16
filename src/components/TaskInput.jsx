import { useRef, useEffect } from 'react';
import { GrDrag } from 'react-icons/gr';
import styled from 'styled-components';
import { useTaskStore } from '../stores';
import { createTask } from '../utils/helpers';

const TaskInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: .5rem;
`;

const DragHandleHide = styled.div`
    svg {
        opacity: 0;
    }
`;

const InputSpanContainer = styled.div`
    display: flex;
    justify-content: space-between;
    span {
        width: 100%;
        color: var(--text-primary);
        font-weight: 500;
        outline: none;
    }
`;

const Container = styled.div`
    background-color: var(--gray-96);
    border: none;
    padding: 1rem 1.3rem;
    border-radius: 7px;
    width: 100%;
    box-shadow: var(--shadow-sm);
`;


function TaskInput(props) {
    const { addTask, taskOrder, setTaskOrder } = useTaskStore();
    const textareaRef = useRef();

    useEffect(() => {
        if (!textareaRef) return;
        textareaRef.current.focus();
    }, []);

    function saveNewTask(title) {
        const newTask = createTask(title);
        addTask(newTask);
        setTaskOrder(taskOrder.concat(newTask.id));
    }


    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            const title = e.target.innerText.trim();

            if (title) saveNewTask(title);

            e.target.innerText = "";
            if (e.preventDefault) e.preventDefault();
        }
    }

    function handleFocusOut(e) {
        const title = e.target.innerText.trim();

        if (title) saveNewTask(title);

        props.onFocusOut();
    }

    return (
        <TaskInputContainer className="task-wrapper hide-handle">
            <DragHandleHide><GrDrag /></DragHandleHide>
            <Container>
                <InputSpanContainer>
                    <span
                        contentEditable
                        onBlur={handleFocusOut}
                        onKeyDown={handleKeyPress}
                        rows={1}
                        name="taskInput"
                        ref={textareaRef}
                    ></span>
                </InputSpanContainer>
            </Container>
        </TaskInputContainer>
    );
}

export default TaskInput;