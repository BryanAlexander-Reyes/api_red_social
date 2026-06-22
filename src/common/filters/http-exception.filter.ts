import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common'
import { ResponseHelper } from '../helpers/response.helper';
// para errores de https
// captura de errores globales
// el @ es solo un decorador que ustilia type
@Catch(HttpException)
export class HttpExceptionFilter
implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = 
            host.switchToHttp().getResponse();
        
        const status= 
            exception.getStatus();
        
        response.status(status).json({
            success: false,
            statusCode: status,
            data: exception.getResponse()
        });
    }
}