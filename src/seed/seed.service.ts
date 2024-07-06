import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    //se inyecta el modelo pokemon para ser usado. se debe de poner el decorador @InjectModel y se agrega el nombre del modelo
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    try {
      await this.pokemonModel.deleteMany({});

      const { data } = await this.axios.get<PokeResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=650',
      );

      const pokemonResult = data.results.map(({ name, url }) => {
        const segments = url.split('/');
        const no = +segments[segments.length - 2];
        return {
          name,
          no,
        };
      });

      await this.pokemonModel.insertMany(pokemonResult);

      return {
        statu: 'ok',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
