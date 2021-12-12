import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// export object from here
export const typeOrmConfig: TypeOrmModuleOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "taskmanagement",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
}; 