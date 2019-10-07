import { Global, Module } from '@nestjs/common';
import { CryptService } from './crypt.service';
import { EnvironmentService } from './environment.service';
import { JsonPatchPipe } from './json-patch.pipe';

@Global()
@Module({
  providers: [CryptService, EnvironmentService, JsonPatchPipe],
})
export class SharedModule {}
