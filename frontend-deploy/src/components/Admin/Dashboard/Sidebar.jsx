// frontend/src/components/Dashboard/Admin/Sidebar.jsx
import React from 'react';
import LogoutButton from './LogoutButton';

export default function Sidebar({ selected, onSelect }) {
  const items = [
    { id: 'posts', label: 'Posts' },
    { id: 'events', label: 'Events' },
    { id: 'reports', label: 'Reports' },
    { id: 'users', label: 'Users' },
    { id: 'pictures', label: 'Pictures' },
    { id: 'bin', label: 'Recycle Bin' },
  ];

  return (
    <nav className="sidebar">
      <ul>
        {items.map(({ id, label }) => (
          <li key={id}>
            <button
              className={selected === id ? 'active' : ''}
              onClick={() => onSelect(id)}
            >
              {label}
            </button>
          </li>
        ))}
        {/* Render LogoutButton as the last list item */}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}
