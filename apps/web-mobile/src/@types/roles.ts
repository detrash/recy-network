import { Roles } from '../constants';

export type Role = (typeof Roles)[keyof typeof Roles];
