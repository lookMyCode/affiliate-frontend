import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService implements OnDestroy {
  clicks: string[] = [];
  clicksStraem$: Subject<string[]> = new BehaviorSubject<string[]>(this.clicks);

  getClicks$(): Observable<string[]> {
    return this.clicksStraem$;
  }

  setClicks(clicks: string[]): void {
    this.clicks = clicks;

    this.clicksStraem$.next(this.clicks);
  }

  ngOnDestroy(): void {
    this.clicksStraem$.unsubscribe();
  }
}