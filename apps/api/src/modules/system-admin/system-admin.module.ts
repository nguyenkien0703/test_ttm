import { Module } from '@nestjs/common'
import { SystemAdminController } from '@api/modules/system-admin/system-admin.controller'
import { SystemAdminService } from '@api/modules/system-admin/system-admin.service'
import { CompanyModule } from '@api/modules/companys/company.module'
import { UserModule } from '@api/modules/users/user.module'
import { PlanModule } from '@api/modules/plans/plan.module'
import { CompanyStatusModule } from '../company-status/company-status.module'
import { RoleModule } from '@api/modules/roles/role.module'
import { UserStatusModule } from '@api/modules/user-status/user-status.module'

@Module({
    imports: [
        CompanyModule,
        UserModule,
        PlanModule,
        CompanyStatusModule,
        RoleModule,
        UserStatusModule,
    ],
    controllers: [SystemAdminController],
    providers: [SystemAdminService],
    exports: [SystemAdminService],
})
export class SystemAdminModule {}
