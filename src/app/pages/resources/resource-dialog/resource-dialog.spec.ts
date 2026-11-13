import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceDialog } from './resource-dialog';

describe('ResourceDialog', () => {
  let component: ResourceDialog;
  let fixture: ComponentFixture<ResourceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
