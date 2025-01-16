// src/seed/status.seeder.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlowStatus } from 'src/schemas/flow-status.schema';

@Injectable()
export class FlowStatusSeeder implements OnModuleInit {
  constructor(
    @InjectModel(FlowStatus.name) private flowStatusModel: Model<FlowStatus>,
  ) {}

  async onModuleInit() {
    const existing = await this.flowStatusModel.countDocuments();
    if (existing === 0) {
      await this.flowStatusModel.insertMany([
        { name: 'Pending' },
        { name: 'In Progress' },
        { name: 'Completed' },
      ]);
      console.log('Status collection seeded.');
    }
  }
}
