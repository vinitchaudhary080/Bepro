import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OnboardingRepository } from './onboarding.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class OnboardingService {
  constructor(private readonly repo: OnboardingRepository) {}

  async getMine(userId: string) {
    const p = await this.repo.getByUserId(userId);
    return p || null;
  }

  async createMine(userId: string, dto: CreateProfileDto) {
    const existing = await this.repo.getByUserId(userId);
    if (existing) throw new BadRequestException('Profile already exists. Use update.');
    const data: any = {
      fullName: dto.fullName,
      gender: dto.gender as any,
      dob: dto.dob ? new Date(dto.dob) : undefined,
      country: dto.country,
      state: dto.state,
      city: dto.city,
      pincode: dto.pincode,
      role: dto.role as any,
      battingStyle: dto.battingStyle as any,
      bowlingStyle: dto.bowlingStyle as any,
      jerseyNumber: dto.jerseyNumber,
      heightCm: dto.heightCm,
      weightKg: dto.weightKg,
      bio: dto.bio,
      avatarUrl: dto.avatarUrl,
    };
    return this.repo.create(userId, data);
  }

  async updateMine(userId: string, dto: UpdateProfileDto) {
    const existing = await this.repo.getByUserId(userId);
    if (!existing) throw new NotFoundException('Profile not found. Create first.');
    const data: any = {
      fullName: dto.fullName,
      gender: (dto.gender as any) ?? undefined,
      dob: dto.dob ? new Date(dto.dob) : undefined,
      country: dto.country,
      state: dto.state,
      city: dto.city,
      pincode: dto.pincode,
      role: (dto.role as any) ?? undefined,
      battingStyle: (dto.battingStyle as any) ?? undefined,
      bowlingStyle: (dto.bowlingStyle as any) ?? undefined,
      jerseyNumber: dto.jerseyNumber,
      heightCm: dto.heightCm,
      weightKg: dto.weightKg,
      bio: dto.bio,
      avatarUrl: dto.avatarUrl,
    };
    return this.repo.update(userId, data);
  }

  async deleteMine(userId: string) {
    const existing = await this.repo.getByUserId(userId);
    if (!existing) throw new NotFoundException('Profile not found');
    await this.repo.delete(userId);
    return { message: 'Profile deleted' };
  }
}
