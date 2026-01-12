import { Plus, Search } from 'lucide-react';
import '../styles/Controls.css';

const Controls = ({ onAddTask, filter, setFilter, search, setSearch }) => {
  return (
    <div className="controls">
      <button className="btn btn-primary" onClick={onAddTask}>
        <Plus size={20} />
        New Task
      </button>

      <select
        className="filter-select"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Filter by priority"
      >
        <option value="">All Priorities</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>

      <div className="search-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search tasks"
        />
      </div>
    </div>
  );
};

export default Controls;
