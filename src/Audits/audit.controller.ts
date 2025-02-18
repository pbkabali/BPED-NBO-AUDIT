import { Controller, UseGuards } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CreateAuditInput } from "./dto/create-audit.input";
import { AuditService } from "./audit.service";

@Controller("audit")
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @MessagePattern("create-audit")
  async createAudit(data: CreateAuditInput) {
    return await this.auditService.create(data);
  }

  @MessagePattern("get-audits")
  getAudits() {
    return this.auditService.findAll();
  }
}
