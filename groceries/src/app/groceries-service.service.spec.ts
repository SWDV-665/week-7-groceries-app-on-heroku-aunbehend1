import { TestBed } from '@angular/core/testing';

import { GroceriesServiceProvider } from '../app/groceries-service.service';

describe('GroceriesServiceService', () => {
  let service: GroceriesServiceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceriesServiceProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
