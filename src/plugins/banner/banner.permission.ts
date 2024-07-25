import { PermissionDefinition } from "@vendure/core";

export const createBanner = new PermissionDefinition({
  name: "CreateBanner",
  description: "Allows setting create banner",
});

export const updateBanner = new PermissionDefinition({
  name: "UpdateBanner",
  description: "Allows setting update banner",
});

export const deleteBanner = new PermissionDefinition({
  name: "DeleteBanner",
  description: "Allows deleting a banner",
});

export const readBanner = new PermissionDefinition({
  name: "ReadBanner",
  description: "Allows reading banner information",
});
