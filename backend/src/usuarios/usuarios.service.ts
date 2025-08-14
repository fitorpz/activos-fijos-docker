import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async create(data: CreateUsuarioDto, creadorId?: number): Promise<Usuario> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.contrasena, salt);

        const nuevoUsuario = this.usuarioRepository.create({
            correo: data.correo,
            contrasena: hashedPassword,
            rol: data.rol,
            nombre: data.nombre,
            creadoPorId: creadorId, // ✅ Este valor ya no será undefined
        });

        return this.usuarioRepository.save(nuevoUsuario);
    }


    async update(id: number, data: Partial<CreateUsuarioDto>): Promise<Usuario> {
        try {
            const usuario = await this.usuarioRepository.findOneBy({ id });
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            if (data.contrasena) {
                const salt = await bcrypt.genSalt();
                data.contrasena = await bcrypt.hash(data.contrasena, salt);
            }

            Object.assign(usuario, data);
            return await this.usuarioRepository.save(usuario);
        } catch (error) {
            console.error('Error al actualizar usuario:', error); // ⛔️ Muestra el error en consola
            throw new Error('No se pudo actualizar el usuario');   // Devuelve un mensaje genérico
        }
    }

    async remove(id: number): Promise<{ message: string }> {
        const resultado = await this.usuarioRepository.delete(id);
        if (resultado.affected === 0) {
            throw new Error('Usuario no encontrado');
        }
        return { message: 'Usuario eliminado correctamente' };
    }

    async findOne(id: number): Promise<Usuario | null> {
        return this.usuarioRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            relations: ['creadoPor'],
            order: { id: 'ASC' },
        });
    }


}
