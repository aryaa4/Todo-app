import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('completedTasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [taskList, completedTasks]);

  const handleAdd = () => {
    if (task.trim() !== '') {
      setTaskList([...taskList, task]);
      setTask('');
    }
  };

  const handleComplete = (index) => {
    const doneTask = taskList[index];
    setCompletedTasks([...completedTasks, doneTask]);
    setTaskList(taskList.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    const newTasks = [...taskList];
    newTasks.splice(index, 1);
    setTaskList(newTasks);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedTask(taskList[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks[index] = editedTask;
    setTaskList(updatedTasks);
    setEditingIndex(null);
    setEditedTask('');
  };

  return (
    <div className="app-container">
      <h1>To-Do App</h1>

      <div className="task-sections">
        <div className="task-list">
          <h2>Tasks</h2>
          {taskList.map((t, i) => (
            <div key={i} className="task-item">
              {editingIndex === i ? (
                <>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(i)}>✔</button>
                </>
              ) : (
                <>
                  <span>{t}</span>
                  <div>
                    <button onClick={() => handleComplete(i)}>✔</button>
                    <button onClick={() => handleEdit(i)}>✏️</button>
                    <button onClick={() => handleDelete(i)}>🗑️</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="completed-list">
          <h2>Completed</h2>
          {completedTasks.map((t, i) => (
            <div key={i} className="task-item completed">
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Write a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default App;
