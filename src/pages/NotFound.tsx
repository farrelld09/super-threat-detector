import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find that page.</p>
      <Link to="/tenant/tenant-1">Go back to dashboard</Link>
    </div>
  );
}