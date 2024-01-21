import { Company } from '@entities/company.entity'
import { PartialType } from '@nestjs/mapped-types'

export class InsertCompanyDto extends PartialType(Company) {}
export const companyData: InsertCompanyDto[] = [
    {
        companyName: 'cty TTM1',
        address: 'so 8 pham hung ha noi',
        email: 'kiennv@trithucmoi.co',
        logo: 'https://i.seadn.io/gae/OKLcGukcmQqdypfwDR32CizFRU1NPFZ7OKUe6dl62707LcmluEOXi3z_L6Fzk63ycncFFYynXCPn7jDXGBhXCcGaKpyNmrLPpYdM?auto=format&w=3840',
        representativeUser: 'tungtt',
        businessType: 'advertisement',
        dateOfCorporation: new Date('2022-10-10'),
    },
    {
        companyName: 'cty TTM2',
        address: 'so 8 pham hung ha noi',
        email: 'nguyenkien123ns@gmail.com',
        logo: 'https://i.seadn.io/gcs/files/893d0ff24e35e342fc1da6c2fd2a0908.jpg?auto=format&w=3840',
        representativeUser: 'anhttk',
        businessType: 'advertisement',
        dateOfCorporation: new Date('2022-10-10'),
    },
    {
        companyName: 'cty TTM3',
        address: 'so 8 pham hung ha noi',
        email: 'nguyenkienns@gmail.com',
        logo: 'https://i.seadn.io/gcs/files/893d0ff24e35e342fc1da6c2fd2a0908.jpg?auto=format&w=3840',
        representativeUser: 'maitt',
        businessType: 'advertisement',
        dateOfCorporation: new Date('2022-10-10'),
    },
]
