import './index.scss';
import { ErrorService } from './app/error.service';
import { ComponentService } from './app/component.service';
import { runApp } from './app/app';

const errorService = new ErrorService();
const componentService = new ComponentService();

runApp(errorService, componentService);
