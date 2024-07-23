import { Permission, PermissionDefinition } from '@vendure/core';

export enum CustomPermission {
  CreateBanner = 'CreateBanner',
  UpdateBanner = 'UpdateBanner',
}

export const createBanner = new PermissionDefinition({
    name: 'CreateBanner',
    description: 'Allows setting create banner',
});

export const updateBanner = new PermissionDefinition({
    name: 'UpdateBanner',
    description: 'Allows setting update banner',
});