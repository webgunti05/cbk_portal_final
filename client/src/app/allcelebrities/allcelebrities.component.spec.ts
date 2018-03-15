import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcelebritiesComponent } from './allcelebrities.component';

describe('AllcelebritiesComponent', () => {
  let component: AllcelebritiesComponent;
  let fixture: ComponentFixture<AllcelebritiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcelebritiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcelebritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
