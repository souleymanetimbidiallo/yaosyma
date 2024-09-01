import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITransport } from '../transport.model';
import { TransportService } from '../service/transport.service';

const transportResolve = (route: ActivatedRouteSnapshot): Observable<null | ITransport> => {
  const id = route.params['id'];
  if (id) {
    return inject(TransportService)
      .find(id)
      .pipe(
        mergeMap((transport: HttpResponse<ITransport>) => {
          if (transport.body) {
            return of(transport.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default transportResolve;
