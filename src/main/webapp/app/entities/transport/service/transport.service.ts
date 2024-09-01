import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITransport, NewTransport } from '../transport.model';

export type PartialUpdateTransport = Partial<ITransport> & Pick<ITransport, 'id'>;

type RestOf<T extends ITransport | NewTransport> = Omit<T, 'estimatedDeliveryTime'> & {
  estimatedDeliveryTime?: string | null;
};

export type RestTransport = RestOf<ITransport>;

export type NewRestTransport = RestOf<NewTransport>;

export type PartialUpdateRestTransport = RestOf<PartialUpdateTransport>;

export type EntityResponseType = HttpResponse<ITransport>;
export type EntityArrayResponseType = HttpResponse<ITransport[]>;

@Injectable({ providedIn: 'root' })
export class TransportService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/transports');

  create(transport: NewTransport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transport);
    return this.http
      .post<RestTransport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(transport: ITransport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transport);
    return this.http
      .put<RestTransport>(`${this.resourceUrl}/${this.getTransportIdentifier(transport)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(transport: PartialUpdateTransport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transport);
    return this.http
      .patch<RestTransport>(`${this.resourceUrl}/${this.getTransportIdentifier(transport)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTransport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTransport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTransportIdentifier(transport: Pick<ITransport, 'id'>): number {
    return transport.id;
  }

  compareTransport(o1: Pick<ITransport, 'id'> | null, o2: Pick<ITransport, 'id'> | null): boolean {
    return o1 && o2 ? this.getTransportIdentifier(o1) === this.getTransportIdentifier(o2) : o1 === o2;
  }

  addTransportToCollectionIfMissing<Type extends Pick<ITransport, 'id'>>(
    transportCollection: Type[],
    ...transportsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const transports: Type[] = transportsToCheck.filter(isPresent);
    if (transports.length > 0) {
      const transportCollectionIdentifiers = transportCollection.map(transportItem => this.getTransportIdentifier(transportItem));
      const transportsToAdd = transports.filter(transportItem => {
        const transportIdentifier = this.getTransportIdentifier(transportItem);
        if (transportCollectionIdentifiers.includes(transportIdentifier)) {
          return false;
        }
        transportCollectionIdentifiers.push(transportIdentifier);
        return true;
      });
      return [...transportsToAdd, ...transportCollection];
    }
    return transportCollection;
  }

  protected convertDateFromClient<T extends ITransport | NewTransport | PartialUpdateTransport>(transport: T): RestOf<T> {
    return {
      ...transport,
      estimatedDeliveryTime: transport.estimatedDeliveryTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTransport: RestTransport): ITransport {
    return {
      ...restTransport,
      estimatedDeliveryTime: restTransport.estimatedDeliveryTime ? dayjs(restTransport.estimatedDeliveryTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTransport>): HttpResponse<ITransport> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTransport[]>): HttpResponse<ITransport[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
