import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportcardComponent } from './reportcard.component';

describe('ReportcardComponent', () => {
  let component: ReportcardComponent;
  let fixture: ComponentFixture<ReportcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
