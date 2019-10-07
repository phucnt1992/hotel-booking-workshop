import { AzureStorageOptions } from '@nestjs/azure-storage';
import { Injectable } from '@nestjs/common';

import { EnvironmentService } from '../shared';

@Injectable()
export class StorageService {
  readonly storageAccountKey = 'AZURE_STORAGE_ACCOUNT';
  readonly storageSASKey = 'AZURE_STORAGE_SAS_KEY';
  readonly storageContainerNameKey = 'AZURE_STORAGE_CONTAINER';

  constructor(private environmentService: EnvironmentService) {}

  public getConfig(): AzureStorageOptions {
    return {
      sasKey: this.environmentService.getEnv(this.storageSASKey),
      accountName: this.environmentService.getEnv(this.storageAccountKey),
      containerName: this.environmentService.getEnv(
        this.storageContainerNameKey,
      ),
    };
  }
}
