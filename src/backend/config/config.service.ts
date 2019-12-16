import { Injectable, Inject } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

import { EnvConfig, ConfigOptions } from './interfaces';
import { CONFIG_OPTIONS } from './constants';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) private options: ConfigOptions) {
    const envName = process.env.NODE_ENV || 'development';
    const filePath = `${envName}.env`;
    const envDir = path.resolve(__dirname, (envName === 'production') ? '../../env/' : '../../env/');
    const envFile = path.resolve(envDir, filePath);

    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
