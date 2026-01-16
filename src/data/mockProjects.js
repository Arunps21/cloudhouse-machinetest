// Comprehensive Mock Projects Data
export const mockProjects = [
  {
    id: 'p1',
    name: 'E-Commerce Platform Redesign',
    description: 'Complete redesign of the customer-facing e-commerce platform with modern UI/UX, improved performance, and mobile-first approach. This project includes revamping the product catalog, checkout flow, and user account management.',
    status: 'in-progress',
    priority: 'high',
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    projectManager: 'u1',
    assignees: ['u1', 'u2', 'u3', 'u4'],
    tasks: [
      {
        id: 't1',
        name: 'Design System Creation',
        description: 'Create a comprehensive design system with components, colors, and typography',
        status: 'done',
        assignee: 'u3',
        createdAt: '2026-01-02'
      },
      {
        id: 't2',
        name: 'Product Catalog API',
        description: 'Develop RESTful API endpoints for product catalog management',
        status: 'done',
        assignee: 'u4',
        createdAt: '2026-01-05'
      },
      {
        id: 't3',
        name: 'Shopping Cart Implementation',
        description: 'Implement shopping cart functionality with persistent storage',
        status: 'in-progress',
        assignee: 'u2',
        createdAt: '2026-01-10'
      },
      {
        id: 't4',
        name: 'Payment Gateway Integration',
        description: 'Integrate Stripe and PayPal payment gateways',
        status: 'in-progress',
        assignee: 'u4',
        createdAt: '2026-01-12'
      },
      {
        id: 't5',
        name: 'User Authentication Flow',
        description: 'Implement OAuth2 authentication with social login options',
        status: 'todo',
        assignee: 'u2',
        createdAt: '2026-01-15'
      },
      {
        id: 't6',
        name: 'Mobile Responsive Testing',
        description: 'Comprehensive testing across all mobile devices and browsers',
        status: 'todo',
        assignee: 'u5',
        createdAt: '2026-01-15'
      }
    ],
    reminders: [
      {
        id: 'r1',
        date: '2026-01-20',
        description: 'Sprint Review Meeting with stakeholders'
      },
      {
        id: 'r2',
        date: '2026-02-01',
        description: 'Design freeze deadline - finalize all UI components'
      },
      {
        id: 'r3',
        date: '2026-02-15',
        description: 'Integration testing phase begins'
      }
    ],
    createdAt: '2026-01-01',
    updatedAt: '2026-01-16'
  },
  {
    id: 'p2',
    name: 'Mobile App Development',
    description: 'Develop a cross-platform mobile application using React Native for iOS and Android. The app will provide customers with a seamless shopping experience on mobile devices.',
    status: 'planned',
    priority: 'high',
    startDate: '2026-02-01',
    endDate: '2026-05-30',
    projectManager: 'u7',
    assignees: ['u2', 'u6', 'u7'],
    tasks: [
      {
        id: 't7',
        name: 'Project Setup & Architecture',
        description: 'Set up React Native project with proper folder structure and CI/CD',
        status: 'todo',
        assignee: 'u2',
        createdAt: '2026-01-15'
      },
      {
        id: 't8',
        name: 'UI Component Library',
        description: 'Create reusable UI component library for the mobile app',
        status: 'todo',
        assignee: 'u3',
        createdAt: '2026-01-15'
      }
    ],
    reminders: [
      {
        id: 'r4',
        date: '2026-01-25',
        description: 'Finalize technology stack and dependencies'
      },
      {
        id: 'r5',
        date: '2026-02-01',
        description: 'Kickoff meeting with mobile development team'
      }
    ],
    createdAt: '2026-01-10',
    updatedAt: '2026-01-15'
  },
  {
    id: 'p3',
    name: 'Data Analytics Dashboard',
    description: 'Build a comprehensive analytics dashboard for business intelligence. Features include real-time data visualization, custom report generation, and predictive analytics capabilities.',
    status: 'in-progress',
    priority: 'medium',
    startDate: '2025-12-01',
    endDate: '2026-02-28',
    projectManager: 'u1',
    assignees: ['u1', 'u4', 'u8'],
    tasks: [
      {
        id: 't9',
        name: 'Database Schema Design',
        description: 'Design optimized database schema for analytics data',
        status: 'done',
        assignee: 'u4',
        createdAt: '2025-12-01'
      },
      {
        id: 't10',
        name: 'Data Pipeline Setup',
        description: 'Set up ETL pipelines for data processing',
        status: 'done',
        assignee: 'u6',
        createdAt: '2025-12-05'
      },
      {
        id: 't11',
        name: 'Chart Components Development',
        description: 'Develop interactive chart components using D3.js',
        status: 'in-progress',
        assignee: 'u8',
        createdAt: '2025-12-15'
      },
      {
        id: 't12',
        name: 'Report Generator Module',
        description: 'Build PDF/Excel report generation functionality',
        status: 'todo',
        assignee: 'u4',
        createdAt: '2026-01-10'
      }
    ],
    reminders: [
      {
        id: 'r6',
        date: '2026-01-18',
        description: 'Demo presentation to stakeholders'
      },
      {
        id: 'r7',
        date: '2026-02-15',
        description: 'User acceptance testing begins'
      }
    ],
    createdAt: '2025-12-01',
    updatedAt: '2026-01-15'
  },
  {
    id: 'p4',
    name: 'Customer Support Portal',
    description: 'Develop an integrated customer support portal with ticketing system, live chat, and knowledge base. Aims to improve customer satisfaction and reduce support response times.',
    status: 'completed',
    priority: 'medium',
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    projectManager: 'u7',
    assignees: ['u2', 'u3', 'u5'],
    tasks: [
      {
        id: 't13',
        name: 'Ticketing System Backend',
        description: 'Develop ticket management system with priority queuing',
        status: 'done',
        assignee: 'u2',
        createdAt: '2025-10-05'
      },
      {
        id: 't14',
        name: 'Live Chat Integration',
        description: 'Integrate real-time chat functionality',
        status: 'done',
        assignee: 'u4',
        createdAt: '2025-10-15'
      },
      {
        id: 't15',
        name: 'Knowledge Base CMS',
        description: 'Build content management system for help articles',
        status: 'done',
        assignee: 'u8',
        createdAt: '2025-11-01'
      },
      {
        id: 't16',
        name: 'UI/UX Design & Implementation',
        description: 'Design and implement user-friendly support interface',
        status: 'done',
        assignee: 'u3',
        createdAt: '2025-10-10'
      }
    ],
    reminders: [],
    createdAt: '2025-10-01',
    updatedAt: '2025-12-31'
  },
  {
    id: 'p5',
    name: 'Infrastructure Migration to AWS',
    description: 'Migrate existing on-premise infrastructure to AWS cloud. Includes server migration, database optimization, and implementing auto-scaling capabilities.',
    status: 'on-hold',
    priority: 'high',
    startDate: '2025-11-01',
    endDate: '2026-04-30',
    projectManager: 'u6',
    assignees: ['u4', 'u6'],
    tasks: [
      {
        id: 't17',
        name: 'Infrastructure Assessment',
        description: 'Assess current infrastructure and plan migration strategy',
        status: 'done',
        assignee: 'u6',
        createdAt: '2025-11-01'
      },
      {
        id: 't18',
        name: 'AWS Architecture Design',
        description: 'Design scalable AWS architecture with best practices',
        status: 'done',
        assignee: 'u6',
        createdAt: '2025-11-15'
      },
      {
        id: 't19',
        name: 'Database Migration',
        description: 'Migrate databases to AWS RDS with zero downtime',
        status: 'in-progress',
        assignee: 'u4',
        createdAt: '2025-12-01'
      }
    ],
    reminders: [
      {
        id: 'r8',
        date: '2026-02-01',
        description: 'Budget review for cloud migration expenses'
      }
    ],
    createdAt: '2025-11-01',
    updatedAt: '2026-01-10'
  },
  {
    id: 'p6',
    name: 'Security Audit & Compliance',
    description: 'Comprehensive security audit of all systems and implementation of compliance requirements for SOC 2 and GDPR certification.',
    status: 'in-progress',
    priority: 'high',
    startDate: '2026-01-05',
    endDate: '2026-02-28',
    projectManager: 'u1',
    assignees: ['u1', 'u5', 'u6'],
    tasks: [
      {
        id: 't20',
        name: 'Vulnerability Assessment',
        description: 'Conduct comprehensive vulnerability scanning',
        status: 'done',
        assignee: 'u6',
        createdAt: '2026-01-05'
      },
      {
        id: 't21',
        name: 'Penetration Testing',
        description: 'Perform penetration testing on all public endpoints',
        status: 'in-progress',
        assignee: 'u5',
        createdAt: '2026-01-10'
      },
      {
        id: 't22',
        name: 'GDPR Compliance Review',
        description: 'Review and update data handling procedures for GDPR',
        status: 'todo',
        assignee: 'u1',
        createdAt: '2026-01-15'
      }
    ],
    reminders: [
      {
        id: 'r9',
        date: '2026-01-17',
        description: 'Security team sync - vulnerability findings review'
      },
      {
        id: 'r10',
        date: '2026-02-20',
        description: 'Final audit report submission deadline'
      }
    ],
    createdAt: '2026-01-05',
    updatedAt: '2026-01-16'
  },
  {
    id: 'p7',
    name: 'Marketing Website Refresh',
    description: 'Refresh the company marketing website with updated branding, improved SEO, and better lead generation capabilities.',
    status: 'planned',
    priority: 'low',
    startDate: '2026-03-01',
    endDate: '2026-04-15',
    projectManager: 'u7',
    assignees: ['u3', 'u8'],
    tasks: [
      {
        id: 't23',
        name: 'Content Audit',
        description: 'Audit existing content and plan updates',
        status: 'todo',
        assignee: 'u7',
        createdAt: '2026-01-15'
      }
    ],
    reminders: [
      {
        id: 'r11',
        date: '2026-02-15',
        description: 'Content strategy meeting with marketing team'
      }
    ],
    createdAt: '2026-01-12',
    updatedAt: '2026-01-12'
  },
  {
    id: 'p8',
    name: 'API Gateway Implementation',
    description: 'Implement a centralized API gateway for microservices architecture. Includes rate limiting, authentication, and request routing.',
    status: 'completed',
    priority: 'medium',
    startDate: '2025-09-01',
    endDate: '2025-11-30',
    projectManager: 'u6',
    assignees: ['u2', 'u4', 'u6'],
    tasks: [
      {
        id: 't24',
        name: 'Gateway Architecture',
        description: 'Design API gateway architecture',
        status: 'done',
        assignee: 'u6',
        createdAt: '2025-09-01'
      },
      {
        id: 't25',
        name: 'Rate Limiting Implementation',
        description: 'Implement rate limiting with Redis',
        status: 'done',
        assignee: 'u4',
        createdAt: '2025-09-15'
      },
      {
        id: 't26',
        name: 'OAuth2 Integration',
        description: 'Integrate OAuth2 authentication flow',
        status: 'done',
        assignee: 'u2',
        createdAt: '2025-10-01'
      }
    ],
    reminders: [],
    createdAt: '2025-09-01',
    updatedAt: '2025-11-30'
  }
];

// Utility function to generate unique IDs
export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get project by ID
export const getProjectById = (id) => mockProjects.find(p => p.id === id);

// Calculate completion percentage
export const calculateCompletion = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  return Math.round((completedTasks / tasks.length) * 100);
};

// Check if a date is overdue
export const isOverdue = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// Check if a date is upcoming (within next 7 days)
export const isUpcoming = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  today.setHours(0, 0, 0, 0);
  return date >= today && date <= nextWeek;
};

// Format date for display
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Get relative date string
export const getRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
  return formatDate(dateString);
};
