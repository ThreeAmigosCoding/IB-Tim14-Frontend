import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeRequestsComponent } from './revoke-requests.component';

describe('RevokeRequestsComponent', () => {
  let component: RevokeRequestsComponent;
  let fixture: ComponentFixture<RevokeRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevokeRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevokeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
