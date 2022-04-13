import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class GithubGuard extends AuthGuard('github') {}

export const GithubAuthGuard = () => UseGuards(GithubGuard);
