import {Lesson} from './lesson.entity'
import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {CreateLessonDto} from './dto/create-lesson.dto'

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
    const lesson = this.lessonRepository.create({name, startDate, endDate})
    return this.lessonRepository.save(lesson)
  }
}
