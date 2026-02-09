import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Countries, States, Cities, Nationalities } from '../entities';

@Injectable()
export class WorldDataRepository {
  private readonly countriesRepo: Repository<Countries>;
  private readonly statesRepo: Repository<States>;
  private readonly citiesRepo: Repository<Cities>;
  private readonly nationalitiesRepo: Repository<Nationalities>;

  constructor(private readonly dataSource: DataSource) {
    this.countriesRepo = this.dataSource.getRepository(Countries);
    this.statesRepo = this.dataSource.getRepository(States);
    this.citiesRepo = this.dataSource.getRepository(Cities);
    this.nationalitiesRepo = this.dataSource.getRepository(Nationalities);
  }

  async getCountries(): Promise<any[]> {
    try {
      // Get all countries
      const countries = await this.countriesRepo
        .createQueryBuilder('country')
        .select([
          'country.id',
          'country.name',
          'country.iso2',
          'country.phonecode',
          'country.latitude',
          'country.longitude',
          'country.capital',
          'country.currency',
        ])
        .orderBy('country.name', 'ASC')
        .getMany();

      // Get all nationalities
      const nationalities = await this.nationalitiesRepo
        .createQueryBuilder('nationality')
        .select([
          'nationality.alpha_2Code',
          'nationality.nationality',
          'nationality.enShortName',
        ])
        .getMany();

      // Create nationality map for quick lookup
      const nationalityMap = new Map();
      nationalities.forEach(nat => {
        if (nat.alpha_2Code) {
          nationalityMap.set(nat.alpha_2Code, {
            nationality: nat.nationality,
            enShortName: nat.enShortName,
          });
        }
      });

      // Map nationalities to countries
      return countries.map(country => {
        const nationality = nationalityMap.get(country.iso2);
        return {
          ...country,
          nationality: nationality?.nationality || null,
          nationality_en_short_name: nationality?.enShortName || null,
        };
      });
    } catch (error) {
      throw new Error(`Failed to fetch countries: ${error.message}`);
    }
  }

  // Repository for World Data
  async getStates(countryId: number): Promise<States[]> {
    try {
      return await this.statesRepo
        .createQueryBuilder('state')
        .select([
          'state.id',
          'state.name',
          'state.countryId',
          'state.countryCode',
          'state.latitude',
          'state.longitude'
        ])
        .where('state.countryId = :countryId', { countryId })
        .orderBy('state.name', 'ASC')
        .getMany();
    } catch (error) {
      throw new Error(`Failed to fetch states: ${error.message}`);
    }
  }

  async getCities(stateId: number): Promise<Cities[]> {
    try {
      return await this.citiesRepo
        .createQueryBuilder('city')
        .select([
          'city.id',
          'city.name',
          'city.stateId',
          'city.stateCode',
          'city.countryId',
          'city.countryCode',
          'city.latitude',
          'city.longitude'
        ])
        .where('city.stateId = :stateId', { stateId })
        .orderBy('city.name', 'ASC')
        .getMany();
    } catch (error) {
      throw new Error(`Failed to fetch cities: ${error.message}`);
    }
  }
}
