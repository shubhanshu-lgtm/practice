// world-data.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { WorldDataRepository } from '../../../../../libs/database/src/repositories/world-data.repository';
import { Countries } from '../../../../../libs/database/src/entities/Countries';
import { States } from '../../../../../libs/database/src/entities/States';
import { Cities } from '../../../../../libs/database/src/entities/Cities';

@Injectable()
export class WorldDataService {
  constructor(private readonly worldDataRepo: WorldDataRepository) {}

  async getCountries(): Promise<Countries[]> {
    try {
      return await this.worldDataRepo.getCountries();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getStates(countryId: number): Promise<States[]> {
    if (!countryId) {
      throw new BadRequestException('Country ID is required');
    }

    try {
      return await this.worldDataRepo.getStates(countryId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCities(stateId: number): Promise<Cities[]> {
    if (!stateId) {
      throw new BadRequestException('State ID is required');
    }

    try {
      return await this.worldDataRepo.getCities(stateId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}