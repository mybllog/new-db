/* eslint-disable prettier/prettier */
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          const ctx = context.switchToHttp();
          const response = ctx.getResponse();
          const statusCode = response.statusCode;
  
          return {
            statusCode,
            message: data?.message || 'Request successful',
            data: data?.data !== undefined ? data.data : data,
          };
        }),
      );
    }
  }
  