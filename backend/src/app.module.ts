import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity'; // Importa la entidad
import { UserLogModule } from './user-log/user-log.module';
import { UserLog } from './user-log/entities/user-log.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o el IP de tu base de datos
      port: 5432,        // puerto por defecto
      username: 'postgres', // tu usuario
      password: 'password123',   // tu contraseña
      database: 'activos_fijos', // nombre de tu base de datos
      entities: [Usuario, UserLog], // Agrega aquí
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Usuario]), // para usar en servicios
    UsuariosModule, UserLogModule, AuthModule,
  ],
})
export class AppModule { }
