import {ObjectType, Field, ID} from '@nestjs/graphql'

// Lesson graphql type
@ObjectType('Lesson')
export class LessonType {
  @Field(type => ID) // ID is a type shipped with graphql
  id: string

  @Field()
  name: string

  @Field()
  startDate: string // ISO strings

  @Field()
  endDate: string // ISO strings
}
