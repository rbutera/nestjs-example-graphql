import {Entity, Column, PrimaryColumn, ObjectIdColumn} from 'typeorm'

@Entity()
export class Lesson {
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
