import React, { createContext, useContext, useState } from 'react';

export const USER_ROLES = {
  INVESTIGATOR: {
    id: 'INVESTIGATOR',
    key: 'INVESTIGATOR',
    name: 'Ins. Rajesh Verma',
    title: 'Senior Investigating Officer',
    agency: 'CERT-In / Cyber Crime Cell',
    badge: 'IO-88912',
    clearance: 'TOP_SECRET',
    color: 'emerald',
    canUpload: true,
    canEdit: true,
    canExport: true,
    canManageUsers: false
  },
  LEGAL_OFFICER: {
    id: 'LEGAL_OFFICER',
    key: 'LEGAL_OFFICER',
    name: 'Adv. V. Swaminathan',
    title: 'Special Public Prosecutor',
    agency: 'High Court of Delhi / CBI Counsel',
    badge: 'PP-00912',
    clearance: 'CONFIDENTIAL',
    color: 'purple',
    canUpload: false,
    canEdit: false,
    canExport: true,
    canManageUsers: false
  },
  ADMIN: {
    id: 'ADMIN',
    key: 'ADMIN',
    name: 'Admin - Sanchari Core',
    title: 'Security Operations Controller',
    agency: 'NIC / SANCHARI Command Center',
    badge: 'ADM-00001',
    clearance: 'LEVEL-5_SYSTEM_ADMIN',
    color: 'amber',
    canUpload: true,
    canEdit: true,
    canExport: true,
    canManageUsers: true
  },
  VIEWER: {
    id: 'VIEWER',
    key: 'VIEWER',
    name: 'Audit Observer',
    title: 'External Audit Viewer',
    agency: 'Ministry of Home Affairs Audit',
    badge: 'AUD-99102',
    clearance: 'READ_ONLY_OBSERVER',
    color: 'cyan',
    canUpload: false,
    canEdit: false,
    canExport: false,
    canManageUsers: false
  }
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(USER_ROLES.INVESTIGATOR);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [accessDeniedMessage, setAccessDeniedMessage] = useState(null);

  const switchRole = (roleKey) => {
    if (USER_ROLES[roleKey]) {
      setCurrentRole(USER_ROLES[roleKey]);
    }
  };

  // RBAC Permission Checker
  const checkPermission = (action, callback) => {
    let allowed = false;
    switch (action) {
      case 'UPLOAD_EVIDENCE':
      case 'EDIT_CASE':
      case 'TRANSFER_CUSTODY':
        allowed = currentRole.canUpload || currentRole.canEdit;
        break;
      case 'EXPORT_COURT':
      case 'GENERATE_LINK':
        allowed = currentRole.canExport;
        break;
      case 'MANAGE_USERS':
      case 'ROTATE_KEYS':
        allowed = currentRole.canManageUsers;
        break;
      default:
        allowed = true;
    }

    if (allowed) {
      if (callback) callback();
      return true;
    } else {
      setAccessDeniedMessage(`ACCESS DENIED: Action '${action}' requires elevated permissions. Your role [${currentRole.title}] is restricted to read-only operation.`);
      return false;
    }
  };

  const clearAccessDenied = () => setAccessDeniedMessage(null);

  return (
    <AuthContext.Provider value={{
      currentRole,
      switchRole,
      isAuthenticated,
      setIsAuthenticated,
      USER_ROLES,
      checkPermission,
      accessDeniedMessage,
      clearAccessDenied
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
