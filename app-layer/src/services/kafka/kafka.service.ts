// import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// import { Kafka, Partitioners } from 'kafkajs';

// @Injectable()
// export class KafkaService implements OnModuleInit, OnModuleDestroy {
//   private kafka = new Kafka({
//     clientId: 'xplor-app',
//     brokers: ['localhost:9093'],
//   });

//   private producer = this.kafka.producer({
//     createPartitioner: Partitioners.LegacyPartitioner,
//   });

//   async onModuleInit() {
//     await this.producer.connect();
//   }

//   async produceMessage(message: any) {
//     return await this.producer.send({
//       topic: 'catalog',
//       messages: [{ value: JSON.stringify(message) }],
//     });
//   }

//   async onModuleDestroy() {
//     await this.producer.disconnect();
//   }
// }
