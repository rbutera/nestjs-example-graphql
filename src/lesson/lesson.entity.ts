import {
  Entity,
  Column,
  PrimaryColumn,
  ObjectIdColumn,
  BaseEntity,
} from 'typeorm'

@Entity()
export class Lesson extends BaseEntity {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  startDate: string // ISO strings

  @Column()
  endDate: string // ISO strings
}
