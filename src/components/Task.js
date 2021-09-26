import { useState, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GrDrag } from 'react-icons/gr';
import { BiRename, BiTrash } from 'react-icons/bi';
import { isValidDuration } from '../utils/helperFunctions';
import { useTasks } from '../contexts/TasksContext';
import styled from 'styled-components';

const TaskContainer = styled.div` 
    display: flex;
    justify-content: space-between;
    background-color: var(--gray-96);
    box-shadow: var(--shadow-sm);
    padding: .7rem 1.3rem;
    border-radius: var(--border-radius-md);
    align-items: center;
    cursor: ${props => props.autoCursor ? 'auto' : 'pointer'};
    flex-grow: 1;
    div { 
      display: flex;
      align-items: center;
    }
`;

const TaskTitle = styled.div`
    color: ${props => props.crossOut ? 'var(--text-secondary)' : 'var(--text-primary)'};
    font-weight: 600;
`;

const TitleInput = styled.span`
    width: 100%;
    color: var(--primary-text);
    font-weight: 600;
    outline: none; 
`;

const DurationInput = styled.span`
    font-weight: 600;
    color: var(--text-secondary);
    font-size: 0.95rem;
    padding: .2rem .4rem;
    outline: none;
    border: 1.5px dashed transparent;
    border-radius: var(--border-radius-md);

    &:hover {
        border: 1.5px dashed var(--gray-50);
        cursor: text;
    }
`;

const EditButtonsContainer = styled.div`
    display: flex;
    margin-right: .9rem;
    opacity: 0;
`;

const EditButton = styled.div`
    background: none;
    border-radius: var(--border-radius-sm);
    width: 1.7rem;
    height: 1.7rem;
    margin-right: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease .2s;
    cursor: pointer;

    svg {
        fill: var(--gray-20);
        transition: all ease .2s;
    }

    &:hover {
        background: var(--gray-90);
    }
`;

const OutsideTaskContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: .5rem;

    div {
        svg {
            opacity: 0;
        }
    }

    &:hover {
        div {
            svg {
                opacity: .5;
            }
        }

        ${EditButtonsContainer} {
            opacity: 1;
        }
    }
`;


function Task(props) { // index, id, name: title, duration
    const [isEditing, setIsEditing] = useState(false);
    const { deleteTask, updateTaskTitle, updateTaskDuration, loadTask, countdownIsRunning } = useTasks();

    const editSpanRef = useRef(); /* HAVE TO CONFIGURE THESE REFS */
    const durationSpanRef = useRef();

    function onTaskDelete(e) {
        e.stopPropagation();
        deleteTask(props.index, props.currentTask.id);
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            const value = e.target.innerText.trim();

            if (value) {
                const titleIsDifferent = value !== props.currentTask.title;
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
            const titleIsDifferent = value !== props.currentTask.title;
            if (titleIsDifferent) {
                updateTaskTitle(props.currentTask.id, value);
                console.log('value changed', value);
            } else {
                console.log('no change');
            }
        }
        setIsEditing(false);
    };

    function handleEditClick(e) {
        e.stopPropagation();
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
        // const duration = e.target.innerText.trim();

        // if (duration && duration !== this.props.task.duration) {
        //     if (isValidDuration(duration)) {
        //         updateTaskDuration(duration, props.currentTask.id);
        //         durationSpanRef.current.blur(); /* FIX */
        //     } else {
        //         durationSpanRef.current.blur(); /* FIX */
        //         e.target.innerText = props.currentTask.duration;
        //         console.log("Please enter a valid duration next time");
        //     }
        // }
        // e.target.innerText = props.currentTask.duration;

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
        // try { // TODO: use the props.currentTask.done property instead
        //     if (e.currentTarget.className.includes('task') &&
        //         !e.currentTarget.className.includes('done')) {
        //         loadTask(props.currentTask);
        //     }
        // } catch (e) {

        // }

        if (props.currentTask.done) return;
        loadTask(props.currentTask);
        console.log("task load", props.currentTask);
    }

    return (
        <Draggable
            draggableId={props.currentTask.id}
            index={props.index}
        >
            {(provided,) => (
                <OutsideTaskContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div {...provided.dragHandleProps}><GrDrag /></div>

                    <TaskContainer onClick={handleTaskSelect} autoCursor={countdownIsRunning || isEditing || props.currentTask.done}>
                        {isEditing ? (
                            <TitleInput onBlur={handleTaskFocusOut} onKeyDown={handleKeyPress} ref={editSpanRef} contentEditable suppressContentEditableWarning>{props.currentTask.title}</TitleInput>
                        ) : (
                            <TaskTitle crossOut={props.currentTask.done}>{props.currentTask.title}</TaskTitle>
                        )}

                        <div>
                            <EditButtonsContainer hide={props.currentTask.done} id="modify-btns">
                                <EditButton onClick={handleEditClick} title="Rename">
                                    <BiRename />
                                </EditButton>
                                <EditButton onClick={onTaskDelete} title="Delete">
                                    <BiTrash />
                                </EditButton>
                            </EditButtonsContainer>

                            <DurationInput
                                contentEditable
                                suppressContentEditableWarning
                                onKeyDown={handleKeyDown}
                                onBlur={handleDurationFocusOut}
                                ref={durationSpanRef}
                            >
                                {props.currentTask.duration}
                            </DurationInput>
                        </div>
                    </TaskContainer>
                </OutsideTaskContainer>
            )}
        </Draggable>
    );
}

export default Task;
