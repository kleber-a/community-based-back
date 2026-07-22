// import { PartialType } from '@nestjs/mapped-types';
// import { CreateDemandStreetDto } from './create-demand-street.dto';

// export class UpdateDemandStreetDto extends PartialType(CreateDemandStreetDto) {}


import { PartialType } from '@nestjs/mapped-types';
import { CreateDemandStreetDto } from './create-demand-street.dto';

export class UpdateDemandStreetDto extends PartialType(
    CreateDemandStreetDto,
) { }