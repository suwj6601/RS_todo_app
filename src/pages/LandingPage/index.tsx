import { Button } from 'antd';

function App() {
  return (
    <>
      <div>
        <Button
          onClick={() => {
            window.location.href = '/todo-list';
          }}
        >
          Go to Todo App
        </Button>
      </div>
    </>
  );
}

export default App;
