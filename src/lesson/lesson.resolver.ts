import {LessonType} from './lesson.type'
import {Resolver, Query, Mutation} from '@nestjs/graphql'

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

  @Mutation(_returns => LessonType)
  createLesson() {
    // TODO: implement
  }
}
