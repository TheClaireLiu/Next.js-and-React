// 在JSX code中，小写字母开头的元素被认为是HTML元素，components以大写字母开头

import './App.css'
import PostsList from './components/PostsList';

function App() {
  return (
  <main>
    <PostsList />
  </main>
  );
}

export default App
