/**
 * Get a human-readable time ago string from a timestamp
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} - Human readable time ago (e.g., "2m ago", "3h ago")
 */
export const getTimeAgo = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffInSeconds = Math.floor((now - then) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return then.toLocaleDateString();
};

/**
 * Generate a unique ID
 * @returns {string} - Unique identifier
 */
export const generateId = () => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate task data
 * @param {Object} taskData - Task object to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateTask = (taskData) => {
  const errors = {};

  if (!taskData.title || taskData.title.trim().length === 0) {
    errors.title = 'Title is required';
  }

  if (taskData.title && taskData.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  if (taskData.description && taskData.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Get priority badge color
 * @param {string} priority - Priority level (low, medium, high)
 * @returns {Object} - Color values for the priority
 */
export const getPriorityColors = (priority) => {
  const colors = {
    high: {
      bg: 'rgba(239, 68, 68, 0.15)',
      text: '#ef4444',
      border: 'rgba(239, 68, 68, 0.3)'
    },
    medium: {
      bg: 'rgba(245, 158, 11, 0.15)',
      text: '#f59e0b',
      border: 'rgba(245, 158, 11, 0.3)'
    },
    low: {
      bg: 'rgba(16, 185, 129, 0.15)',
      text: '#10b981',
      border: 'rgba(16, 185, 129, 0.3)'
    }
  };

  return colors[priority] || colors.medium;
};
