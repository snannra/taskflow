import { useState } from 'react';
import TaskCard from './TaskCard';
import '../styles/Column.css';

const Column = ({
  title,
  icon,
  status,
  tasks,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  onDrop
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // Only remove drag-over if leaving the container, not child elements
    if (e.currentTarget === e.target) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(status);
  };

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          <span className="column-icon" role="img" aria-label={title}>
            {icon}
          </span>
          <h2>{title}</h2>
        </div>
        <span className="task-count">{tasks.length}</span>
      </div>

      <div
        className={`tasks-container ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
