import { TodoT } from './types';

export const Todo: React.FC<TodoT> = ({ title }) => {
  return (
    <div className="todo">
      <div>Done</div>
      {title}
    </div>
  );
};
