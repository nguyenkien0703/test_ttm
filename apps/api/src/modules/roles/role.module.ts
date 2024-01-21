import { forwardRef, Module } from '@nestjs/common'
import { RoleService } from '@api/modules/roles/role.service'
import { RoleController } from '@api/modules/roles/role.controller'
import { CompanyModule } from '@api/modules/companys/company.module'
import { RolePermissionModule } from '@api/modules/role-permissions/role-permission.module'

@Module({
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService],
    imports: [forwardRef(() => CompanyModule), RolePermissionModule],
})
export class RoleModule {}
