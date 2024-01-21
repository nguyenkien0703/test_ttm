import { Module } from '@nestjs/common'
import { ApiController } from './api.controller'
import { ApiService } from './api.service'
import { ConfigModule } from '@nestjs/config'
import configuration from '@shares/config/configuration'
import { DatabaseModule } from '@database/database.module'
import { GlobalRepository } from '@api/modules/global-repositories/global-repository.module'
import { UserModule } from '@api/modules/users/user.module'
import { AuthModule } from '@api/modules/auths/auth.module'
import { MeetingModule } from '@api/modules/meetings/meeting.module'
import { EmailModule } from '@api/modules/emails/email.module'
import { S3Module } from '@api/modules/s3/s3.module'
import { ProposalModule } from '@api/modules/proposals/proposal.module'
import { VotingModule } from '@api/modules/votings/voting.module'
import { RoleModule } from '@api/modules/roles/role.module'
import { UserRoleModule } from '@api/modules/user-roles/user-role.module'
import { SystemAdminModule } from '@api/modules/system-admin/system-admin.module'
import { PlanModule } from '@api/modules/plans/plan.module'
import { CompanyStatusModule } from '@api/modules/company-status/company-status.module'
import { UserStatusModule } from '@api/modules/user-status/user-status.module'
import { UserMeetingModule } from '@api/modules/user-meetings/user-meeting.module'
import { PermissionModule } from '@api/modules/permissions/permission.module'
import { RolePermissionModule } from '@api/modules/role-permissions/role-permission.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        DatabaseModule,
        GlobalRepository,
        UserModule,
        AuthModule,
        MeetingModule,
        EmailModule,
        S3Module,
        ProposalModule,
        VotingModule,
        UserRoleModule,
        RoleModule,
        SystemAdminModule,
        PlanModule,
        CompanyStatusModule,
        UserStatusModule,
        UserMeetingModule,
        PermissionModule,
        RolePermissionModule,
    ],
    controllers: [ApiController],
    providers: [ApiService],
})
export class ApiModule {}
