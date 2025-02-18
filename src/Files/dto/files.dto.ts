import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FilesDto {
  @Field() readonly File: string;
  @Field() readonly File_Name: string;
  @Field() readonly File_Ext: string;
  @Field() readonly File_Path: string;
}