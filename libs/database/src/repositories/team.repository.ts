import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamRepository {
  constructor(
    @InjectRepository(Team)
    private readonly repo: Repository<Team>,
  ) {}

  async create(team: Partial<Team>): Promise<Team> {
    const newTeam = this.repo.create(team);
    return this.repo.save(newTeam);
  }

  async findAll(): Promise<Team[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Team> {
    return this.repo.findOne({ where: { id } });
  } 

  async update(id: number, team: Partial<Team>): Promise<void> {
    await this.repo.update(id, team);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
