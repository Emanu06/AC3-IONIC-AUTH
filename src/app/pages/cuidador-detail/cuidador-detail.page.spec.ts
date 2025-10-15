import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuidadorDetailPage } from './cuidador-detail.page';

describe('CuidadorDetailPage', () => {
  let component: CuidadorDetailPage;
  let fixture: ComponentFixture<CuidadorDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuidadorDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
