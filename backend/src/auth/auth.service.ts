import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private jwtService: JwtService, // Inyectamos el servicio JWT
    ) { }

    // Validar credenciales del usuario
    async validarUsuario(correo: string, contrasena: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({ where: { correo } });

        if (!usuario) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!isMatch) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        return usuario;
    }

    // Generar token JWT
    async login(usuario: Usuario): Promise<{ access_token: string }> {
        const payload = {
            sub: usuario.id,
            correo: usuario.correo,
            rol: usuario.rol,
        };

        const token = this.jwtService.sign(payload);

        return { access_token: token };
    }
}
