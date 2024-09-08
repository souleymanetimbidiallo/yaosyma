import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router'; // Importer Router

import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { Login } from './login.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private accountService = inject(AccountService);
  private authServerProvider = inject(AuthServerProvider);
  private router = inject(Router); // Injecter Router pour la redirection

  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(
      mergeMap(() => this.accountService.identity(true)),
      mergeMap(account => {
        if (account) {
          // Redirection basée sur le rôle
          if (account.authorities.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin-dashboard']);
          } else if (account.authorities.includes('ROLE_USER')) {
            this.router.navigate(['/client-dashboard']);
          }
        }
        return new Observable<Account | null>(observer => {
          observer.next(account);
          observer.complete();
        });
      })
    );
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }
}
