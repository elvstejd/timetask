import { useState, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GrDrag } from 'react-icons/gr';
import { BiRename, BiTrash } from 'react-icons/bi';
import { isValidDuration } from '../utils/helpers';
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
    text-decoration: ${props => props.crossOut ? 'line-through' : 'none'};
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

    &:focus {
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

const ActionsContainer = styled.div`
    opacity: ${props => props.hide ? 0 : 1};
    z-index: ${props => props.hide ? -99 : 'auto'};
`;


function Task(props) { // index, id, name: title, duration
    const [isEditing, setIsEditing] = useState(false);
    const { deleteTask, updateTaskTitle, updateTaskDuration, loadTask, countdownIsRunning } = useTasks();

    const editSpanRef = useRef();
    const durationSpanRef = useRef();

    useEffect(() => {
        if (!isEditing) return;
        cursorSelectTaskName();
    }, [isEditing])

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
        cursorSelectTaskName();
    };

    function handleDurationKeyDown(e) {
        const duration = e.target.innerText.trim();

        if (duration.length >= 5 && e.key !== "Backspace") {
            e.preventDefault();
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            if (!duration || duration === props.currentTask.duration) return;

            if (isValidDuration(duration)) {
                updateTaskDuration(duration, props.currentTask.id);
            } else {
                e.target.innerText = props.currentTask.duration;
                console.log("Please enter a valid duration next time");
            }

            durationSpanRef.current.blur();
        }
    };

    function handleDurationFocusOut(e) {
        const duration = e.target.innerText.trim();
        if (!duration || duration === props.currentTask.duration) return;

        if (isValidDuration(duration)) {
            updateTaskDuration(duration, props.currentTask.id);
        } else {
            e.target.innerText = props.currentTask.duration;
            console.log("Please enter a valid duration next time");
        }

        durationSpanRef.current.blur();
        e.target.innerText = props.currentTask.duration;
    };

    function cursorSelectTaskName() {
        if (!editSpanRef.current) return;

        const span = editSpanRef.current;
        const range = document.createRange();
        const selection = window.getSelection();

        try {
            range.selectNodeContents(span.childNodes[0], span.innerText.length);
            range.collapse(true);

            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('selectAll', false, null);
        } catch {

        }
    }

    function handleTaskSelect() {
        if (props.currentTask.done) return;
        loadTask(props.currentTask);
        console.log("task load", props.currentTask);
    }

    return (
        <Draggable
            draggableId={props.currentTask.id}
            index={props.index}
        >
            {(provided) => (
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

                        <ActionsContainer hide={props.currentTask.done}>
                            <EditButtonsContainer hide={props.currentTask.done}>
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
                                onClick={e => e.stopPropagation()}
                                onKeyDown={handleDurationKeyDown}
                                onBlur={handleDurationFocusOut}
                                ref={durationSpanRef}
                            >
                                {props.currentTask.duration}
                            </DurationInput>
                        </ActionsContainer>
                    </TaskContainer>
                </OutsideTaskContainer>
            )}
        </Draggable>
    );
}

export default Task;
