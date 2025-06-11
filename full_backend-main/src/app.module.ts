import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FallEventsModule } from './fall-events/fall-events.module';
import { DataModule } from './data/data.module';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';
import { ReportModule } from './report/report.module';
import { HeartRateModule } from './heart-rate/heart-rate.module';
import { BloodOxygenModule } from './blood-oxygen/blood-oxygen.module';
import { WaterIntakeModule } from './water-intake/water-intake.module'; // ✅ додаємо

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || '...',
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),

    DataModule,
    TypeOrmModule.forFeature([User]),
    HeartRateModule,
    BloodOxygenModule,
    ProfileSettingsModule,
    ReportModule,
    FallEventsModule,
    WaterIntakeModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
