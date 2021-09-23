import { useState, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GrDrag } from 'react-icons/gr';
import { BiRename, BiTrash } from 'react-icons/bi';
import { isValidDuration } from '../utils/helperFunctions';
import { useTasks } from '../contexts/TasksContext';


function Task(props) { // index, id, name: title, duration
    const [isEditing, setIsEditing] = useState(false);
    const { deleteTask, updateTaskTitle, updateTaskDuration, loadTask, countdownIsRunning } = useTasks();

    const editSpanRef = useRef(); /* HAVE TO CONFIGURE THESE REFS */
    const durationSpanRef = useRef();

    function onTaskDelete() {
        deleteTask(props.index, props.currentTask.id);
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            const value = e.target.innerText.trim();

            if (value) {
                const titleIsDifferent = value !== props.currentTask.name;
                if (titleIsDifferent) {
                    updateTaskTitle(props.currentTask.id, value);
                    console.log('value changed', value);
                } else {
                    console.log('no change');
                }
            }

            setIsEditing(false);
            // if(e.preventDefault) e.preventDefault(); 
        }
    }

    function handleTaskFocusOut(e) {
        const value = e.target.innerText.trim();

        if (value) {
            const titleIsDifferent = value !== props.currentTask.name;
            if (titleIsDifferent) {
                updateTaskTitle(props.currentTask.id, value);
                console.log('value changed', value);
            } else {
                console.log('no change');
            }
        }
        setIsEditing(false);
    };

    function handleEditClick() {
        setIsEditing(true);
    };

    function handleKeyDown(e) {
        const duration = e.target.innerText.trim();

        if (duration.length >= 5 && e.key !== "Backspace") {
            e.preventDefault();
        }

        if (e.key === 'Enter') {
            if (duration && duration !== props.currentTask.duration) {
                // console.log("isValidDuration", isValidDuration(duration));
                if (isValidDuration(duration)) {
                    updateTaskDuration(duration, props.currentTask.id);
                    durationSpanRef.current.blur(); /* FIX */
                } else {
                    durationSpanRef.current.blur(); /* FIX */
                    e.target.innerText = props.currentTask.duration;
                    console.log("Please enter a valid duration next time");
                }
            }
            if (e.preventDefault) e.preventDefault();
        }
    };

    function handleDurationFocusOut(e) {
        const duration = e.target.innerText.trim();

        if (duration && duration !== this.props.task.duration) {
            if (isValidDuration(duration)) {
                updateTaskDuration(duration, props.currentTask.id);
                durationSpanRef.current.blur(); /* FIX */
            } else {
                durationSpanRef.current.blur(); /* FIX */
                e.target.innerText = props.currentTask.duration;
                console.log("Please enter a valid duration next time");
            }
        }
        e.target.innerText = props.currentTask.duration;

    };

    /* I DONT REMEMBER WHAT THIS DID */
    // componentDidUpdate() { 
    //     if (this.state.isEditing) {
    //         const span = this.editSpan.current;
    //         const range = document.createRange();
    //         const selection = window.getSelection();

    //         try {
    //             range.selectNodeContents(span.childNodes[0], span.innerText.length);
    //             range.collapse(true);

    //             selection.removeAllRanges();
    //             selection.addRange(range);
    //             document.execCommand('selectAll', false, null);
    //         } catch (e) {

    //         }
    //     }
    // }

    function handleTaskSelect(e) {
        try {
            if (e.currentTarget.className.includes('task') &&
                !e.currentTarget.className.includes('done')) {
                loadTask(props.currentTask);
            }
        } catch (e) {

        }
    }

    return (
        <Draggable
            draggableId={props.currentTask.id}
            index={props.index}
        >
            {(provided,) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="task-wrapper"
                >
                    <div {...provided.dragHandleProps}><GrDrag /></div>

                    <div
                        className={`task ${isEditing && "is-editing"} ${props.currentTask.done && "done"} ${countdownIsRunning && "countdownRunning"}`}
                        onClick={handleTaskSelect}
                    >

                        {!isEditing && <p className="task-name">{props.currentTask.name}</p>}
                        {isEditing && <span onBlur={handleTaskFocusOut} onKeyDown={handleKeyPress} ref={editSpanRef} className={`add ${isEditing && "is-editing"}`} contentEditable suppressContentEditableWarning>{props.currentTask.name}</span>}
                        <div>
                            <div id="modify-btns">
                                <div className="mod-btn" onClick={handleEditClick} title="Rename">
                                    <BiRename />
                                </div>
                                <div className="mod-btn" onClick={onTaskDelete} title="Delete">
                                    <BiTrash />
                                </div>
                            </div>

                            <span
                                className="duration"
                                contentEditable
                                suppressContentEditableWarning
                                onKeyDown={handleKeyDown}
                                onBlur={handleDurationFocusOut}
                                ref={durationSpanRef}
                            >{props.currentTask.duration}</span>
                        </div>

                    </div>
                </div>
            )}
        </Draggable>
    );

}

export default Task;