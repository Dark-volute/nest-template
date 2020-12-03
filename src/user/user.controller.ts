import { Controller, Request, Post, Get, UseGuards, forwardRef, Inject, SetMetadata } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { RolesGuard } from '../role/roles.guard'

const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller()
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService) {}

    @Get('users')
    getHello(): any {
        return this.usersService.findAll();
    }

    @Get('redis')
    set(): any {
        return this.usersService.test();
    }

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
