import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { UseGuards } from "@nestjs/common";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { createWriteStream } from 'fs';
// import { IsAuthenticatedGuard } from "src/Auth/AuthGuards";
import { FilesDto } from "./dto/files.dto";

@Resolver(() => FilesDto)
// @UseGuards(IsAuthenticatedGuard)
export class FilesResolver {
  constructor() { }

  @Mutation(() => FilesDto, { nullable: true })
  async uploadFile(
    @Args("file", { type: () => GraphQLUpload }) file: FileUpload,
    @Args("directory", { nullable: true }) directory: string,
  ): Promise<FilesDto> {
    return new Promise(async (resolve, reject) => {
      const { createReadStream, filename } = await file;
      const FileDirectory = directory ? directory : "ElectronicSignatures";
      const FileArray = filename.split('.');
      const File_Name = `${Date.now()}`;
      // const File_Ext = FileArray[FileArray.length - 1];
      const File_Ext = FileArray.pop();
      // const File =  FileDirectory === "ElectronicSignatures" ? `${File_Name}.${File_Ext}` : filename;
      // const File =  `${File_Name}.${File_Ext}`;
      const New_File_Name = File_Name.concat(`.${File_Ext}`);
      const File_Path = `${__dirname}/../../uploads/${FileDirectory}/${New_File_Name}`;
      createReadStream()
        .pipe(createWriteStream(File_Path))
        .on('finish', () => resolve({ File: New_File_Name, File_Name, File_Ext, File_Path }))
        .on('error', (error: any) => reject(error));
    });
  }
}

