import {LessonType} from './lesson.type'
import {Resolver, Query} from '@nestjs/graphql'

@Resolver(_of => LessonType)
export class LessonResolver {
  @Query(_returns => LessonType)
  lesson() {
    return {
      id: 'asofihasjfo',
      name: 'Physics Class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    }
  }
}
