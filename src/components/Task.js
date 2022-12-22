import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, setComplete, deleteTask }) => {
  const buttonClass = isComplete
    ? 'tasks__item__toggle--completed'
    : 'tasks__item__toggle';

  const updateComplete = (task) => {
    const taskStatus = task.isComplete ? 'mark_incomplete' : 'mark_complete';
    setComplete(id, taskStatus);
  };

  const removeTask = () => {
    deleteTask(id);
  };

  return (
    <li className="tasks__item">
      <button className={buttonClass} onClick={updateComplete}>
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={removeTask}>
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  setComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
