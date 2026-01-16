// Mock Users Data
export const users = [
  {
    id: 'u1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    avatar: null,
    role: 'Project Manager',
    initials: 'SC',
    color: 'bg-indigo-500'
  },
  {
    id: 'u2',
    name: 'Michael Rodriguez',
    email: 'michael.r@company.com',
    avatar: null,
    role: 'Senior Developer',
    initials: 'MR',
    color: 'bg-purple-500'
  },
  {
    id: 'u3',
    name: 'Emily Watson',
    email: 'emily.watson@company.com',
    avatar: null,
    role: 'UI/UX Designer',
    initials: 'EW',
    color: 'bg-pink-500'
  },
  {
    id: 'u4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    avatar: null,
    role: 'Backend Developer',
    initials: 'DK',
    color: 'bg-cyan-500'
  },
  {
    id: 'u5',
    name: 'Jessica Taylor',
    email: 'jessica.t@company.com',
    avatar: null,
    role: 'QA Engineer',
    initials: 'JT',
    color: 'bg-emerald-500'
  },
  {
    id: 'u6',
    name: 'Alex Johnson',
    email: 'alex.j@company.com',
    avatar: null,
    role: 'DevOps Engineer',
    initials: 'AJ',
    color: 'bg-orange-500'
  },
  {
    id: 'u7',
    name: 'Maria Garcia',
    email: 'maria.g@company.com',
    avatar: null,
    role: 'Product Owner',
    initials: 'MG',
    color: 'bg-rose-500'
  },
  {
    id: 'u8',
    name: 'James Wilson',
    email: 'james.w@company.com',
    avatar: null,
    role: 'Full Stack Developer',
    initials: 'JW',
    color: 'bg-teal-500'
  }
];

export const getUserById = (id) => users.find(user => user.id === id);
export const getUsersByIds = (ids) => users.filter(user => ids.includes(user.id));
