import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuditInput {
  @Field()
  Table_Name: string;

  @Field()
  Audit_Type: string;

  @Field()
  Old_Values: string;

  @Field()
  New_Values: string;

  @Field()
  Created_By: string;

}
