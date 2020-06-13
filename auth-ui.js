import PermissionsCreate from './js/views/permissions/PermissionsCreate';
import PermissionsEdit from './js/views/permissions/PermissionsEdit';
import PermissionsIndex from './js/views/permissions/PermissionsIndex';
import PermissionsUsers from './js/views/permissions/PermissionsUsers';

import ProfileEdit from './js/views/profile/ProfileEdit';
import ProfilePassword from './js/views/profile/ProfilePassword';

import RolesCreate from './js/views/roles/RolesCreate';
import RolesEdit from './js/views/roles/RolesEdit';
import RolesIndex from './js/views/roles/RolesIndex';
import RolesUsers from './js/views/roles/RolesUsers';

import UsersCreate from './js/views/users/UsersCreate';
import UsersEdit from './js/views/users/UsersEdit';
import UsersPassword from './js/views/users/UsersPassword';
import UsersIndex from './js/views/users/UsersIndex';

import PermissionDestroyed from './js/events/PermissionDestroyed';
import PermissionRevoked from './js/events/PermissionRevoked';
import PermissionsDestroyedBulk from './js/events/PermissionsDestroyedBulk';
import PermissionStored from './js/events/PermissionStored';
import PermissionUpdated from './js/events/PermissionUpdated';

import ProfileUpdated from './js/events/ProfileUpdated';
import ProfileUpdatedPassword from './js/events/ProfileUpdatedPassword';

import RoleDestroyed from './js/events/RoleDestroyed';
import RoleRevoked from './js/events/RoleRevoked';
import RolesDestroyedBulk from './js/events/RolesDestroyedBulk';
import RoleStored from './js/events/RoleStored';
import RoleUpdated from './js/events/RoleUpdated';

import UserDestroyed from './js/events/UserDestroyed';
import UsersDestroyedBulk from './js/events/UsersDestroyedBulk';
import UserStored from './js/events/UserStored';
import UserUpdated from './js/events/UserUpdated';
import UserUpdatedPassword from './js/events/UserUpdatedPassword';

export {
	PermissionsCreate, PermissionsEdit, PermissionsIndex, PermissionsUsers,
	ProfileEdit, ProfilePassword,
	RolesCreate, RolesEdit, RolesIndex, RolesUsers,
	UsersCreate, UsersEdit, UsersPassword, UsersIndex,
	PermissionDestroyed, PermissionRevoked, PermissionsDestroyedBulk, PermissionStored, PermissionUpdated,
	ProfileUpdated, ProfileUpdatedPassword,
	RoleDestroyed, RoleRevoked, RolesDestroyedBulk, RoleStored, RoleUpdated,
	UserDestroyed, UsersDestroyedBulk, UserStored, UserUpdated, UserUpdatedPassword
}