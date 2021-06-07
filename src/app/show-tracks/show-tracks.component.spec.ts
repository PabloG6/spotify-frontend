import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTracksComponent } from './show-tracks.component';

describe('ShowTracksComponent', () => {
  let component: ShowTracksComponent;
  let fixture: ComponentFixture<ShowTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTracksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
