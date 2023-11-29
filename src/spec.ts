import Ajv, { JSONSchemaType } from 'ajv'
const ajv = new Ajv()

interface Spec {
  name: string
  description?: string
  pillars: [{ id: string }]
}

interface Pillar {
  id: string
  name: string
  description?: string
}

export const schema: JSONSchemaType<Spec> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string', nullable: true },
    pillars: {
      type: 'array',
      minItems: 1,
      additionalItems: false,
      items: [
        {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            }
          },
          required: ['id']
        }
      ]
    }
  },
  required: ['name', 'pillars'],
  additionalProperties: false
}

// class Spec {
//     constructor(
//       public version: string,
//       public name: string,
//       public description: string,
//       public pillars: Pillars
//     ) {}
//   }

//   type Pillars = Pillar[]

//   class Pillar {
//     constructor(
//       public id: string,
//       public name: string,
//       public description: string,
//       public questions?: Questions,
//       public resources?: Resources
//     ) {}
//   }

//   type Questions = Question[]

//   class Question {
//     constructor(
//       public id: string,
//       public title: string,
//       public description: string,
//       public choices: Choices,
//       public resources: Resources,
//       public risks: Risks
//     ) {}
//   }

//   type Choices = Choice[]

//   class Choice {
//     constructor(
//       public id: string,
//       public title: string,
//       public resources: Resources,
//       public improvements: Improvements
//     ) {}
//   }

//   type Resources = Resource[]

//   class Resource {
//     constructor(
//       public description: string,
//       public url: string
//     ) {}
//   }

//   type Risks = Risk[]

//   class Risk {
//     constructor(
//       public risk: string,
//       public condition: string
//     ) {}
//   }

//   type Improvements = Improvement[]

//   class Improvement {
//     constructor(
//       public description: string,
//       public url: string
//     ) {}
//   }
