import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const friendlyMessage = buildFriendlyMessage(error);
      return throwError(() => ({ ...error, friendlyMessage }));
    })
  );
};

function buildFriendlyMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'No se pudo conectar con el servidor. Verifica tu conexión o que la API esté corriendo.';
  }

  const backendMessage: string | undefined = error.error?.message;
  const backendErrors: string[] | undefined = error.error?.errors;

  switch (error.status) {
    case 400:
      return backendErrors?.length ? backendErrors.join(' ') : backendMessage || 'Datos inválidos.';
    case 404:
      return backendMessage || 'El recurso solicitado no existe.';
    case 500:
      return 'Ocurrió un error interno en el servidor. Intenta nuevamente más tarde.';
    case 504:
      return 'La solicitud tardó demasiado en responder (timeout).';
    default:
      return backendMessage || `Ocurrió un error inesperado (código ${error.status}).`;
  }
}