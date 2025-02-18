import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuditDto {
  @Field(() => ID) readonly _id: String;
  @Field() readonly Table_Name: string;
  @Field() readonly Audit_Type: string;  
  @Field() readonly Old_Values: string;
  @Field() readonly New_Values: string;  
  @Field() readonly Created_Date : string;
  @Field() readonly Created_By: string;
}

@ObjectType()
export class AuditCountDto {
  @Field() readonly Count: number;
}

@ObjectType()
export class PaginatedAuditDto {
  @Field(()=> [AuditDto]) readonly dataList: AuditDto[];
  @Field() readonly availableDataSize: number;
}
