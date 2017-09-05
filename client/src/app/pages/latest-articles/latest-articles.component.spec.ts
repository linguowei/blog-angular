import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestArticlesComponent } from './latest-articles.component';

describe('LatestArticlesComponent', () => {
  let component: LatestArticlesComponent;
  let fixture: ComponentFixture<LatestArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
