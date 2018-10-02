import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelManagementComponent } from './channel-management.component';

describe('ChannelManagementComponent', () => {
  let component: ChannelManagementComponent;
  let fixture: ComponentFixture<ChannelManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
