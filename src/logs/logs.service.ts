import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './entities/log.entity';

@Injectable()
export class LogsService {
  private userHistory: Log[] = [
    {
        id: 0,
        action: 'Log in',
        time: '10:00 2023-04-03'
    },
    {
        id: 1,
        action: 'Log out',
        time: '11:00 2023-04-03'
    },
  ];

  create(log: Log) {
    this.userHistory.push(log)
    return 'This action adds a new log';
  }

  findAll() {
    return this.userHistory;
  }

  findOne(id: number) {
    const logIndex = this.userHistory.findIndex(e => e.id === id)
    if (logIndex === -1)
      throw new NotFoundException('Log does not exist')
    return this.userHistory[logIndex];
  }

  update(id: number, logData) {
    const log = this.findOne(id)
    if (logData.id) log.id = logData.id
    if (logData.action) log.action = logData.action
    if (logData.time) log.time = logData.time
  }

  remove(id: number) {
    const logIndex = this.userHistory.findIndex(e => e.id === id)
    if (logIndex === -1)
      throw new NotFoundException('Log does not exist')
    if (logIndex === 0) this.userHistory = [...this.userHistory.slice(1)]
    else if (logIndex === this.userHistory.length) this.userHistory = [...this.userHistory.slice(0, -1)]
    else this.userHistory =  [...this.userHistory.slice(0, logIndex), ...this.userHistory.slice(logIndex + 1)]
  }
}
