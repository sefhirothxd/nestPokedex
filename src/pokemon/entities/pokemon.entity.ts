import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  // definimos que el nombre es unico y le damos un indice
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}
// exportamos y creamos el schema
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
