import {ObjectType, Field} from '@nestjs/graphql'

// Lesson graphql type
@ObjectType()
export class LessonType {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  startDate: string // ISO strings

  @Field()
  endDate: string // ISO strings
}
