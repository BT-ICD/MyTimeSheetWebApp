import { TestBed } from '@angular/core/testing';

import { ClientContactsService } from './client-contacts.service';

describe('ClientContactsService', () => {
  let service: ClientContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
