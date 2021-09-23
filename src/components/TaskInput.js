import { useRef, useEffect } from 'react';
import { GrDrag } from 'react-icons/gr';
import { useTasks } from '../contexts/TasksContext';

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
        <div className="task-wrapper hide-handle">
            <div><GrDrag /></div>
            <div className="task-add">
                <div className="task-input">
                    <span
                        contentEditable
                        onBlur={handleFocusOut}
                        onKeyDown={handleKeyPress}
                        rows={1}
                        name="taskInput"
                        ref={textareaRef}
                        className="add"
                    ></span>
                </div>
            </div>
        </div>
    );
}

export default TaskInput;