import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexContentComponent } from './index-content.component';

describe('IndexContentComponent', () => {
  let component: IndexContentComponent;
  let fixture: ComponentFixture<IndexContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
