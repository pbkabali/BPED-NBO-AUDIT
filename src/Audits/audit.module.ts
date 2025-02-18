import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditSchema } from './models/audit.model';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { AuditResolver } from './audit.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Audit', schema: AuditSchema }]),
  ],
  controllers: [AuditController],
  providers: [AuditResolver, AuditService],
})
export class AuditModule {}