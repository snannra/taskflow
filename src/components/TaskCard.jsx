import { Edit2, Trash2 } from 'lucide-react';
import { getTimeAgo } from '../utils/helpers';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onDragStart, onDragEnd }) => {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
    >
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button
            className="task-btn"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="task-btn task-btn-danger"
            onClick={() => onDelete(task.id)}
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
        {task.assignee && (
          <span className="assignee-badge">
            👤 {task.assignee}
          </span>
        )}
      </div>

      <div className="task-footer">
        <span className="task-time">{getTimeAgo(task.updatedAt)}</span>
      </div>
    </div>
  );
};

export default TaskCard;
