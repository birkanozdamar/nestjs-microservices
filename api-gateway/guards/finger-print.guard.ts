import { BadRequestException, Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { getSHA512Hash } from 'src/util/sha512.hash';

@Injectable()
export class FingerPrintGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    try {
      const ip =
        request.headers['x-forwarded-for'] || request.socket.remoteAddress;

      const userAgent = request.headers['user-agent'];
      const calculatedFingerprint = getSHA512Hash(`${ip}${userAgent}`);
      const fingerprint = request.payload.fingerprint;

      if (fingerprint !== calculatedFingerprint) {
        throw new BadRequestException('Invalid fingerprint');
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
