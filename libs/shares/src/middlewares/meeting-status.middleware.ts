import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { MeetingService } from '@api/modules/meetings/meeting.service'

@Injectable()
export class MeetingStatusMiddleware implements NestMiddleware {
    constructor(private readonly meetingService: MeetingService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        // console.log('start middleware')
        try {
            const meetingId = parseInt(req.params?.id)
            await this.meetingService.standardStatusMeeting(meetingId)
            // console.log('end middleware')
            next()
        } catch (error) {
            throw new HttpException(
                {
                    message: error.message,
                },
                HttpStatus.BAD_REQUEST,
            )
        }
    }
}
