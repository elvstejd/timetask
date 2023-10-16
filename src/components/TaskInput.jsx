import { useRef, useEffect } from 'react';
import { GrDrag } from 'react-icons/gr';
import { useTasks } from '../contexts/TasksContext';
import styled from 'styled-components';

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
    const { addNewTask } = useTasks();
    const textareaRef = useRef();

    useEffect(() => {
        if (!textareaRef) return;
        textareaRef.current.focus();
    }, []);


    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            const value = e.target.innerText.trim();

            if (value) {
                addNewTask(value);
            }

            e.target.innerText = "";
            if (e.preventDefault) e.preventDefault();
        }
    }

    function handleFocusOut(e) {
        const value = e.target.innerText.trim();
        if (value) {
            addNewTask(value);
        }
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