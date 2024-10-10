import './Filter.css';

export const Filter: React.FC<{
  count: number;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  clearCompleted: () => void;
}> = ({ count, setFilter, clearCompleted }) => (
  <div className="filter">
    <span className="items">Items left: {count || 0}</span>
    <div className="centerBtn">
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('active')}>Active</button>
    </div>
    <button className="clearCompletedButton" onClick={clearCompleted}>
      Clear
    </button>
  </div>
);
