import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  preset: 'ts-jest',
  testEnvironment: 'node',
});
