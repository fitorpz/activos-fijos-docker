import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UserLogModule } from './user-log/user-log.module';
import { AuthModule } from './auth/auth.module';
import { EdificiosModule } from './edificios/edificios.module';
import { EquipoOficinaModule } from './equipo-oficina/equipo-oficina.module';
import { DireccionesAdministrativasModule } from './parametros/direcciones-administrativas/direcciones-administrativas.module';

@Module({
  imports: [
    /*
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password123',
      database: 'activos_fijos',

      // ✅ Elimina esto porque usarás autoLoadEntities
      // entities: [Usuario, UserLog],

      synchronize: true,      // ✔ crea/actualiza estructura automáticamente
      dropSchema: false,       // ⚠️ elimina todo y lo recrea — solo para desarrollo local
      autoLoadEntities: true, // ✔ carga automáticamente todas las entidades registradas en cada módulo
    }),
  */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,

      synchronize: true,
      dropSchema: false,
      autoLoadEntities: true,
    }),

    UsuariosModule,
    UserLogModule,
    AuthModule,
    EdificiosModule,
    EquipoOficinaModule,
    DireccionesAdministrativasModule,
  ],
})
export class AppModule { }
