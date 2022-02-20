import React, { useState } from "react";
import "./index.css";

export default function KanbanBoard () {

    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
  
  const [tasks, setTasks] = useState([ { name: '1', stage: 0 }, { name: '2', stage: 0 },]);
  const [newTasks, setNewTasks] = useState();
  const stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  

    let stagesTasks = [];
    for (let i = 0; i < stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    
    const handleSubmit = (event) => {
      event.preventDefault();
      if (newTasks) {
        const taskExist = tasks.find(task => task.name === newTasks);
        console.log(taskExist);
        if (taskExist) {
          alert('Task already exist');
          return;
        }
        setTasks([...tasks, { name: newTasks, stage: 0 }]);
        setNewTasks('');
        event.target.reset();
      } else {
        alert('Please enter a task name');
      }
    }
  
  const handleForward = (taskName) => {
    const updateTasks = tasks.map(task => {
      console.log(task.name, taskName, 'frist')
      console.log(task.name, 'task.Name')
      if (task.name === taskName) {
        if (task.stage < 3) {
          task.stage = task.stage + 1;
        }
      }
      return task;
    });
    setTasks(updateTasks);
  }

  const handleBackward = (taskName) => {
    const updateTasks = tasks.map(task => {
      if (task.name === taskName) {
        if (task.stage > 0) {
            task.stage = task.stage - 1;
        }
      }
      return task;
    });
    setTasks(updateTasks);
  }

  const handleDelete = (taskName) => {
    const updateTasks = tasks.filter(task => task.name !== taskName);
    setTasks(updateTasks);
  }


    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <form onSubmit={handleSubmit}>
            <input
              id="create-task-input"
              onChange={(e) => setNewTasks(e.target.value)}
              type="text" className="large" placeholder="New task name" data-testid="create-task-input" />
            <button type="submit" className="ml-30" data-testid="create-task-button">Create task</button>
          </form>  
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button
                                            onClick={() => handleBackward(task.name)}
                                            disabled={task.stage === 0}
                                            className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                                            <i className="material-icons">arrow_back</i>
                                          </button>
                                          <button
                                            onClick={() => handleForward(task.name)}
                                            disabled={task.stage === 3}
                                            className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                                            <i className="material-icons">arrow_forward</i>
                                          </button>
                                          <button
                                            onClick={() => handleDelete(task.name)}
                                            className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
                                            <i className="material-icons">delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
