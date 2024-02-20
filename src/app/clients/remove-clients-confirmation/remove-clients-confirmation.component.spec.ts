import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveClientsConfirmationComponent } from './remove-clients-confirmation.component';

describe('RemoveClientsConfirmationComponent', () => {
  let component: RemoveClientsConfirmationComponent;
  let fixture: ComponentFixture<RemoveClientsConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveClientsConfirmationComponent]
    });
    fixture = TestBed.createComponent(RemoveClientsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
