import { create } from 'zustand';
import { UserType } from './auth-store.types';

type AuthStore = {
  isAuthenticated: boolean;
  onSetIsAuthenticated: (isAuthenticated: boolean) => void;

  user: any;
  onSetUserProfile: (user: any) => void;

  permissions: string[];
  onSetMyPermissions: (myPermissionsString: string) => void;

  getPermission: (key: string) => {
    canUpdate: boolean;
    canDelete: boolean;
    canCreate: boolean;
    canRead: boolean;
  };

  userType: UserType;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: null,
  onSetIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  user: null,
  userType: UserType.USER,
  onSetUserProfile: (user: any) => {
    set({ user });
    set({ userType: user?.userType });
    set({
      permissions: user.permission,
    });
  },

  myPermissionsString: '',
  permissions: [],
  onSetMyPermissions: (myPermissionsString: string) => {
    set({ permissions: myPermissionsString?.split(',') || [] });
  },

  getPermission: (key: string) => {
    const { permissions } = get();

    if (!permissions) {
      return {
        canUpdate: false,
        canDelete: false,
        canCreate: false,
        canRead: false,
      };
    }
    const filterPermissions = permissions.filter((permission) => permission.includes(key));

    return {
      canCreate: filterPermissions.includes(`${key}:C`),
      canRead: filterPermissions.includes(`${key}:R`),
      canUpdate: filterPermissions.includes(`${key}:U`),
      canDelete: filterPermissions.includes(`${key}:D`),
    };
  },
}));
