import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload";
import { AuditModule } from './Audits/audit.module';
import { FilesModule } from './Files/files.module';
import { ApolloServerPluginInlineTraceDisabled } from "apollo-server-core";

@Module({
	imports: [
		// MongooseModule.forRoot('mongodb://PbsUat:PbsUat2021@192.168.5.45:27017/PBS_NDP_AUDIT?authSource=admin'),
		MongooseModule.forRoot('mongodb://localhost:27017/PBS_NDP_AUDIT'),
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			context: ({ req, connection }) => connection ? { req: connection.context } : { req },
			resolvers: { Upload: GraphQLUpload },
			plugins: [ApolloServerPluginInlineTraceDisabled()],
			installSubscriptionHandlers: true,
			cors: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'),
		}),
		AuditModule, 
		FilesModule, 
	],
	providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 })).forRoutes("graphql")
  }
}