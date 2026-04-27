import { Component, inject, OnInit } from '@angular/core';
import {
  LOGGER_SERVICE,
  LoggerInterface,
} from 'src/app/features/factory-pattern/services/logger.service';

@Component({
  selector: 'app-factory-pattern',
  imports: [],
  templateUrl: './factory-pattern.html',
  styleUrl: './factory-pattern.scss',
})
export class FactoryPattern implements OnInit {
  private logger: LoggerInterface = inject(LOGGER_SERVICE);

  ngOnInit(): void {
    this.logger.log('MY Factory Pattern');
  }
}
