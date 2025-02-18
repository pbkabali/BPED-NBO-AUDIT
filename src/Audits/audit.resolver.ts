import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuditService } from './audit.service';
import { AuditCountDto, AuditDto, PaginatedAuditDto } from './dto/audit.dto';
import { UseGuards } from '@nestjs/common';
// import { IsAuthenticatedGuard } from 'src/Auth/AuthGuards';

@Resolver(() => AuditDto)
// @UseGuards(IsAuthenticatedGuard)
export class AuditResolver {
  constructor(private readonly auditService: AuditService) {}
  @Query(() => [AuditDto])
  audits() {
    return this.auditService.findAll();
  }



  @Query(() => AuditCountDto, { name: 'auditsCount' })
  async auditsCount() {
      const count = await this.auditService.findAllcount(); 
      return {
        Count: count !== null && count !== undefined ? count : 0  // Replace null or undefined with 0
    };
  }

  @Query(() => PaginatedAuditDto, { nullable: true })
  auditsInDateRange(@Args('StartDate') StartDate: Date, @Args('EndDate') EndDate: Date, @Args('Offset') Offset: number, @Args('Limit') Limit: number) {
    return this.auditService.findAllInDateRange(StartDate, EndDate, Offset, Limit);
  }
}
