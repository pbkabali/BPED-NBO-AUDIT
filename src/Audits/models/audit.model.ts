import * as mongoose from "mongoose";

export const AuditSchema = new mongoose.Schema({
  Table_Name: { type: String, required: true },
  Audit_Type: { type: String, required: true },
  Old_Values: { type: mongoose.Schema.Types.Mixed },
  New_Values: { type: mongoose.Schema.Types.Mixed },
  Created_Date: { type: Date, default: Date.now, required: true },
  Created_By: { type: String, required: true },
});

export interface Audit extends mongoose.Document {
  Table_Name: string,
  Audit_Type: string,
  Old_Values: mongoose.Schema.Types.Mixed,
  New_Values: mongoose.Schema.Types.Mixed,
  Created_Date: Date,
  Created_By: string,
}
