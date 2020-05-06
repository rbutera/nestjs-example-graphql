import {Lesson} from './lesson.entity'
import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {CreateLessonDto} from './dto/create-lesson.dto'
import {v4 as uuid} from 'uuid'

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>
  ) {}

  async createLesson({
    name,
    startDate,
    endDate,
  }: CreateLessonDto): Promise<Lesson> {
    const lesson = await this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    })
    return this.lessonRepository.save(lesson)
  }
}
