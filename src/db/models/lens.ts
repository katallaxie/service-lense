import {
  Table,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Column,
  PrimaryKey,
  DataType,
  NotEmpty,
  Min,
  Max,
  HasMany,
  BelongsToMany,
  Default
} from 'sequelize-typescript'
import { WorkloadLens } from './workload-lens'
import { Workload } from './workload'
import { LensPillar } from './lens-pillar'
import { LensPillars } from './lens-pillars'

export interface LensAttributes {
  id: string
  spec: object
  name: string
  isDraft: boolean
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type LensCreationAttributes = Omit<
  LensAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>

class Spec {
  constructor(
    public version: string,
    public name: string,
    public description: string,
    public pillars: Pillars
  ) {}
}

type Pillars = Pillar[]

class Pillar {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public questions?: Questions,
    public resources?: Resources
  ) {}
}

type Questions = Question[]

class Question {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public choices: Choices,
    public resources: Resources,
    public risks: Risks
  ) {}
}

type Choices = Choice[]

class Choice {
  constructor(
    public id: string,
    public title: string,
    public resources: Resources,
    public improvements: Improvements
  ) {}
}

type Resources = Resource[]

class Resource {
  constructor(
    public description: string,
    public url: string
  ) {}
}

type Risks = Risk[]

class Risk {
  constructor(
    public risk: string,
    public condition: string
  ) {}
}

type Improvements = Improvement[]

class Improvement {
  constructor(
    public description: string,
    public url: string
  ) {}
}

@Table({
  tableName: 'lenses'
})
export class Lens extends Model<LensAttributes, LensCreationAttributes> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string

  @NotEmpty
  @Min(3)
  @Max(256)
  @Column
  name!: string

  @NotEmpty
  @Column(DataType.JSONB)
  spec!: Spec

  @Default(true)
  @Column
  isDraft!: boolean

  @NotEmpty
  @Min(12)
  @Max(2048)
  @Column
  description!: string

  @BelongsToMany(() => Workload, () => WorkloadLens)
  workloads?: Workload[]

  @BelongsToMany(() => LensPillar, () => LensPillars)
  pillars?: LensPillar[]

  @CreatedAt
  @Column
  createdAt?: Date

  @UpdatedAt
  @Column
  updatedAt?: Date

  @DeletedAt
  @Column
  deletedAt?: Date
}
