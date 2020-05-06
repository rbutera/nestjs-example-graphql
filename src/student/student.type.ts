import {ObjectType, Field, ID} from '@nestjs/graphql'

// Student graphql type
@ObjectType('Student')
export class StudentType {
  @Field(type => ID) // ID is a type shipped with graphql
  id: string

  @Field()
  firstName: string

  @Field()
  lastName: string
}
