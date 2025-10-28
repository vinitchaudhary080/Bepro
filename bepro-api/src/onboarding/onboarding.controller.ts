import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OnboardingService } from './onboarding.service';
import { AccessTokenGuard } from '../auth/guards/access.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Onboarding')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly svc: OnboardingService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get my onboarding profile (or null)' })
  me(@GetUser('sub') userId: string) {
    return this.svc.getMine(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create my onboarding profile (once)' })
  create(@GetUser('sub') userId: string, @Body() dto: CreateProfileDto) {
    return this.svc.createMine(userId, dto);
  }

  @Put()
  @ApiOperation({ summary: 'Update my onboarding profile' })
  update(@GetUser('sub') userId: string, @Body() dto: UpdateProfileDto) {
    return this.svc.updateMine(userId, dto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete my onboarding profile' })
  remove(@GetUser('sub') userId: string) {
    return this.svc.deleteMine(userId);
  }
}
