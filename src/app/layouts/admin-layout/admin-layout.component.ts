import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  Location,
  PopStateEvent
} from "@angular/common";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Subscription } from 'rxjs';
import PerfectScrollbar from "perfect-scrollbar";
import { filter } from 'rxjs/operators';

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(public location: Location, private router: Router) {}

  ngOnInit() {
    const isWindows = navigator.platform.indexOf("Win") > -1;
    if (isWindows) {
      document.body.classList.add("perfect-scrollbar-on");
    } else {
      document.body.classList.remove("perfect-scrollbar-on");
    }

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });

    this._router = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const elemMainPanel = document.querySelector(".main-panel") as HTMLElement;
      if (elemMainPanel) elemMainPanel.scrollTop = 0;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const elemMainPanel = document.querySelector(".main-panel") as HTMLElement;
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        if (elemMainPanel) {
          new PerfectScrollbar(elemMainPanel);
        }
      }
    }, 0);
  }

  isMac(): boolean {
    return /MAC|IPAD/.test(navigator.platform.toUpperCase());
  }
}
