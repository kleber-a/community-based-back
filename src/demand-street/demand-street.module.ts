import { Module } from '@nestjs/common';
import { DemandStreetService } from './demand-street.service';
import { DemandStreetController } from './demand-street.controller';

@Module({
  controllers: [DemandStreetController],
  providers: [DemandStreetService],
})
export class DemandStreetModule {}
