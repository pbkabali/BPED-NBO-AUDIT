import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAuditInput } from "./dto/create-audit.input";
import { Audit } from "./models/audit.model";
import { filterArrayUniqueByTwoKeys } from "src/helpers";

@Injectable()
export class AuditService {
  constructor(@InjectModel("Audit") private readonly auditModel: Model<Audit>) {}

  async create(data: CreateAuditInput) {
    const newAudit = new this.auditModel({
      ...data,
    });

    return await newAudit.save();
  }

  async findAll() {
    return await this.auditModel.find().exec();
  }

  async findAllcount() {
    return await this.auditModel.find().count();
  }

  async findAllInDateRange(StartDate: Date, EndDate: Date, Offset: number, Limit: number) {
    const dbData = await this.auditModel.find({ Created_Date: { $gt: StartDate, $lt: EndDate } }).sort({ Created_Date: -1 });

    const uniqueData = filterArrayUniqueByTwoKeys(dbData, "Created_By", "Created_Date");    

    return {
      // dataList: (await this.auditModel
      //   .find({ Created_Date: { $gt: StartDate, $lt: EndDate } })
      //   .sort({Created_Date: -1})
      //   .skip(Offset)
      //   .limit(Limit)
      //   .exec()),
      dataList: uniqueData.slice(Offset, Offset + Limit).map(item =>({...item._doc,Created_Date:
        new Date(item.Created_Date).toLocaleString('en-US', { timeZone: 'Africa/Kampala'})})),
      // availableDataSize: await this.auditModel
      //   .find({ Created_Date: { $gt: StartDate, $lt: EndDate } })
      //   .count()
      //   .exec(),
      availableDataSize: uniqueData.length,
    };
  }
}
