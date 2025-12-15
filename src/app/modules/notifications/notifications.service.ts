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

  async findAll(
    pagination: {
      page: number;
      pageSize: number;
    }
  ): Promise<{ data: Notification[]; total: number; page: number; pageSize: number }> {
    const offset = (pagination.page - 1) * pagination.pageSize;
    const limit = pagination.pageSize;

    const { rows, count } = await this.notificationsModel.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      total: count,
      page: pagination.page,
      pageSize: pagination.pageSize,
      data: rows,
    };
  }

  async hasNotification(): Promise<boolean> {
    const notifications = await this.notificationsModel.findAll({
      where: { read: false }
    });

    return notifications.length > 0;
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

}
