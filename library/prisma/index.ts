// NOTE: barrel circular dependency
// LINK: https://stackoverflow.com/questions/57815145/nest-dependency-resolution-issue-with-tsconfig-paths-and-barrel-files-same-direc
export * from './prisma.service';
export * from './prisma.module';
