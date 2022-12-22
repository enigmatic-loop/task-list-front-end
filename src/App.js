import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        const tasksAPIResCopy = res.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            isComplete: task.is_complete,
          };
        });
        setTaskData(tasksAPIResCopy);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setComplete = (taskId, taskStatus) => {
    console.log('setComplete called');
    const newTaskData = [];
    axios
      .patch(`${URL}/${taskId}/${taskStatus}`)
      .then(() => {
        for (const task of taskData) {
          if (task.id === taskId) {
            task.isComplete = !task.isComplete;
            newTaskData.push(task);
          } else {
            const unchangedTask = {
              ...task,
            };
            newTaskData.push(unchangedTask);
          }
        }
        setTaskData(newTaskData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`${URL}/${taskId}`)
      .then(() => {
        const newTaskData = [];
        for (const task of taskData) {
          if (task.id !== taskId) {
            newTaskData.push(task);
          }
        }
        setTaskData(newTaskData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addTask = (newTaskInfo) => {
    console.log('addTask called');
    axios
      .post(URL, newTaskInfo)
      .then((response) => {
        console.log(response);
        console.log(newTaskInfo);
        const newTasks = [...taskData];
        const newTaskJSON = {
          ...newTaskInfo,
          id: response.data.task.id,
          isComplete: false,
        };
        newTasks.push(newTaskJSON);
        setTaskData(newTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            setComplete={setComplete}
            deleteTask={deleteTask}
          />
          <NewTaskForm addTaskCallbackFunc={addTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
