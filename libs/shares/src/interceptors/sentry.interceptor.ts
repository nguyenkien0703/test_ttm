import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common'
import * as Sentry from '@sentry/node'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class SentryInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<unknown> {
        return next.handle().pipe(
            catchError((err) => {
                console.log(err)
                if (err instanceof HttpException) {
                    throw err
                }
                Sentry.captureException(err)
                throw new InternalServerErrorException(
                    `Sorry, we're having temporary server issues`,
                )
            }),
        )
    }
}
