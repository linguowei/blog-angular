import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticleComponent } from './view-article.component';

describe('ViewArticleComponent', () => {
  let component: ViewArticleComponent;
  let fixture: ComponentFixture<ViewArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
