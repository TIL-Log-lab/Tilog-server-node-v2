import {
  BadRequestException,
  ClassSerializerInterceptor,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import {
  AllExceptionsFilter,
  ExceptionMessageInterface,
} from '@app/library/all-exceptions';
import validationSchema from '@env/validationSchema';
import { COUNTRY } from '@app/utils/';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environments/.${process.env.NODE_ENV}.env`,
      validationSchema,
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
        exceptionFactory: (errors: ValidationError[]) => {
          if (!errors[0]?.constraints) return new BadRequestException();
          const firstKey = Object.keys(errors[0].constraints)[0];
          const errorMessage: ExceptionMessageInterface = {
            [COUNTRY.en]: errors[0].constraints[`${firstKey}`],
          };
          return new BadRequestException(errorMessage);
        },
      }),
    },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
