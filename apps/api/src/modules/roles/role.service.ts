import { Role } from '@entities/role.entity'
import { RoleRepository } from '@repositories/role.repository'
import { CreateRoleDto, GetAllNormalRolesDto } from '@dtos/role.dto'
import { Pagination } from 'nestjs-typeorm-paginate'
import { RoleEnum } from '@shares/constants'
import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common'
import { CompanyService } from '@api/modules/companys/company.service'
import { httpErrors } from '@shares/exception-filter'
import { RolePermissionService } from '@api/modules/role-permissions/role-permission.service'

@Injectable()
export class RoleService {
    constructor(
        private readonly roleRepository: RoleRepository,
        @Inject(forwardRef(() => CompanyService))
        private readonly companyService: CompanyService,
        private readonly rolePermissionService: RolePermissionService,
    ) {}
    async getPermissionsByRoleId(roleIds: number[]): Promise<string[]> {
        const permissionKeys = await this.roleRepository.getPermissionsByRoleId(
            roleIds,
        )
        return permissionKeys
    }

    async getRoleByRoleNameAndIdCompany(
        roleName: RoleEnum,
        companyId: number,
    ): Promise<Role> {
        const role = await this.roleRepository.findOne({
            where: {
                roleName: roleName,
                companyId: companyId,
            },
        })
        return role
    }

    // list role for screen new create account
    async getAllNormalRoles(
        getAllNormalRolesDto: GetAllNormalRolesDto,
        companyId: number,
    ): Promise<Pagination<Role>> {
        const roles = await this.roleRepository.getAllNormalRoles(
            getAllNormalRolesDto,
            companyId,
        )
        return roles
    }
    // list role for screen setting-role

    async getAllInternalRoleInCompany(companyId: number): Promise<Role[]> {
        const roles = await this.roleRepository.getAllInternalRoleInCompany(
            companyId,
        )
        return roles
    }
    async createCompanyRole(
        role: RoleEnum | string,
        companyId: number,
        description?: string,
    ): Promise<Role> {
        const createdCompanyRole = await this.roleRepository.createCompanyRole(
            role,
            companyId,
            description,
        )
        return createdCompanyRole
    }

    async createRoleHasPermissionInCompany(
        createRoleDto: CreateRoleDto,
    ): Promise<Role> {
        const { companyId, description, roleName, idPermissions } =
            createRoleDto
        const existedCompany = await this.companyService.getCompanyById(
            companyId,
        )
        if (!existedCompany) {
            throw new HttpException(
                httpErrors.COMPANY_NOT_FOUND,
                HttpStatus.NOT_FOUND,
            )
        }

        const createdRole = await this.createCompanyRole(
            roleName,
            companyId,
            description,
        )
        await Promise.all([
            ...idPermissions.map((idPermission) =>
                this.rolePermissionService.createRolePermission({
                    roleId: createdRole.id,
                    permissionId: idPermission,
                }),
            ),
        ])
        return createdRole
    }
}
