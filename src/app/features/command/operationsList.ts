import {
  AddService,
  CommandInterface,
  SubtractService,
} from 'src/app/features/command/command.services';

export const OperationsList: Record<string, CommandInterface> = {
  '+': new AddService(),
  '-': new SubtractService(),
};
