import { useState } from 'react';
import { useTaskManager } from './hooks/useTaskManager';
import Header from './components/Header';
import Controls from './components/Controls';
import Column from './components/Column';
import TaskModal from './components/TaskModal';
import './styles/App.css';

const COLUMNS = [
  { title: 'To Do', icon: '📋', status: 'todo' },
  { title: 'In Progress', icon: '⚡', status: 'in-progress' },
  { title: 'Done', icon: '✨', status: 'done' }
];

function App() {
  const {
    addTask,
    updateTask,
    deleteTask,
    getFilteredTasks,
    filter,
    setFilter,
    search,
    setSearch
  } = useTaskManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleModalSubmit = (formData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    // Add dragging class after a brief delay to allow drag preview to render
    setTimeout(() => {
      e.target.classList.add('dragging');
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedTaskId(null);
  };

  const handleDrop = (newStatus) => {
    if (draggedTaskId) {
      updateTask(draggedTaskId, { status: newStatus });
    }
  };

  return (
    <div className="app">
      <Header />
      
      <Controls
        onAddTask={handleAddTask}
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      <div className="board">
        {COLUMNS.map(column => (
          <Column
            key={column.status}
            title={column.title}
            icon={column.icon}
            status={column.status}
            tasks={getFilteredTasks(column.status)}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
          />
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingTask={editingTask}
      />
    </div>
  );
}

export default App;
