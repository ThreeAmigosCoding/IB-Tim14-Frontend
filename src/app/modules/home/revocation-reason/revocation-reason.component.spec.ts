import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevocationReasonComponent } from './revocation-reason.component';

describe('RevocationReasonComponent', () => {
  let component: RevocationReasonComponent;
  let fixture: ComponentFixture<RevocationReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevocationReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevocationReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
