import {
    Controller,
    Post,
    Body,
    Inject,
    UseGuards,
    Get,
    Put,
    Patch,
    Param,
    Delete,
    Req,
    BadRequestException,
    NotFoundException
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UserLogService } from '../user-log/user-log.service';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator'; // importa el decorador



@Controller('usuarios')
export class UsuariosController {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly userLogService: UserLogService,
        @Inject(REQUEST) private readonly request: Request, // para obtener IP y user-agent
    ) { }

    // Solo usuarios autenticados pueden registrar usuarios
    @UseGuards(AuthGuard('jwt'))
    @Roles('superadmininstrador') // Solo usuarios con rol 'admin' pueden acceder
    @Put(':id') // O @Patch(':id') según lo que uses
    update(@Param('id') id: string, @Body() data: Partial<CreateUsuarioDto>) {
        return this.usuariosService.update(Number(id), data);
    }
    @Patch(':id')
    patch(@Param('id') id: string, @Body() data: Partial<CreateUsuarioDto>) {
        return this.usuariosService.update(Number(id), data);
    }




    @Get()
    async findAll() {
        return this.usuariosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const usuario = await this.usuariosService.findOne(+id);
        if (!usuario) throw new NotFoundException('Usuario no encontrado');
        return usuario;
    }
    @UseGuards(AuthGuard('jwt'))
    @Roles('superadmininstrador') // Solo usuarios con este rol pueden crear
    @Post()
    async create(@Body() createDto: CreateUsuarioDto, @Req() request: Request) {
        const user = request.user as any; // 👈 Extraemos el usuario autenticado
        const usuario = await this.usuariosService.create(createDto, user.id); // 👈 Pasamos su ID al servicio

        await this.userLogService.registrarLog(
            usuario.id,
            'Registró un nuevo usuario',
            JSON.stringify(createDto),
            request.ip,
            request.headers['user-agent'],
        );

        return {
            message: 'Usuario registrado correctamente',
            usuario,
        };
    }
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.usuariosService.remove(id);
    }
}
