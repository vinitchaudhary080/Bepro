import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumberString, IsOptional, IsString, validateSync } from 'class-validator';

enum NodeEnv { development='development', production='production', test='test' }

class EnvVars {
  @IsEnum(NodeEnv) NODE_ENV!: NodeEnv;
  @IsNumberString() PORT!: string;
  @IsString() DATABASE_URL!: string;

  // Step 2 ke liye:
  @IsOptional() @IsString() JWT_ACCESS_SECRET?: string;
  @IsOptional() @IsString() JWT_REFRESH_SECRET?: string;
  @IsOptional() @IsString() JWT_ACCESS_EXPIRES?: string;
  @IsOptional() @IsString() JWT_REFRESH_EXPIRES?: string;
}

export default () => {
  const validated = plainToInstance(EnvVars, process.env, { enableImplicitConversion: true });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length) throw new Error(`Invalid env: ${errors.map(e => e.property).join(', ')}`);
  return validated;
};
