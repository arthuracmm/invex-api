import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification) private notificationsModel: typeof Notification,
  ) { }

  async create(data: Partial<Notification>): Promise<Notification> {
    return this.notificationsModel.create(data as Notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationsModel.findAll();
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationsModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt',] }
    });
    if (!notification) throw new NotFoundException('notification not found');
    return notification;
  }

  async update(id: string, data: Partial<Notification>): Promise<Notification> {
    const notification = await this.findOne(id);
    return notification.update(data);
  }

  async remove(id: string): Promise<void> {
    const notification = await this.findOne(id);
    await notification.destroy();
  }
}
