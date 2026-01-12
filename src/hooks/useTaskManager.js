import { useState, useEffect } from 'react';

const STORAGE_KEY = 'taskflow_tasks';

const getInitialTasks = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  
  return [
    {
      id: 'task_1',
      title: "Build React Dashboard",
      description: "Create responsive admin panel with charts and analytics",
      priority: "high",
      status: "in-progress",
      assignee: "Alex Chen",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'task_2',
      title: "Implement Authentication",
      description: "Add JWT-based auth with protected routes and role management",
      priority: "high",
      status: "todo",
      assignee: "Sarah Kim",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'task_3',
      title: "Optimize API Performance",
      description: "Implement caching strategy and reduce API latency",
      priority: "medium",
      status: "in-progress",
      assignee: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'task_4',
      title: "Write Unit Tests",
      description: "Achieve 80% code coverage with Jest and React Testing Library",
      priority: "medium",
      status: "done",
      assignee: "Jordan Lee",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'task_5',
      title: "Deploy to Production",
      description: "Set up CI/CD pipeline with GitHub Actions and deploy to Vercel",
      priority: "low",
      status: "done",
      assignee: "Morgan Taylor",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
};

export const useTaskManager = () => {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const getTask = (id) => {
    return tasks.find(task => task.id === id);
  };

  const getFilteredTasks = (status) => {
    return tasks.filter(task => {
      const matchesStatus = task.status === status;
      const matchesPriority = !filter || task.priority === filter;
      const matchesSearch = !search ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      
      return matchesStatus && matchesPriority && matchesSearch;
    });
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTask,
    getFilteredTasks,
    filter,
    setFilter,
    search,
    setSearch
  };
};
