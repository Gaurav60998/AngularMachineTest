import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigisterFormComponent } from './rigister-form.component';

describe('RigisterFormComponent', () => {
  let component: RigisterFormComponent;
  let fixture: ComponentFixture<RigisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigisterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RigisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
